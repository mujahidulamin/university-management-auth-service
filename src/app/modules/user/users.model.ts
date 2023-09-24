/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<
  IUser,
  'id' | 'password' | 'needsPasswordChange' | 'role'
> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1, role: 1 }
  ).lean();

  return user;
};

userSchema.statics.isPasswordMatch = async function (
  givenPass: string,
  savedPass: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(givenPass, savedPass);

  return isMatch;
};

userSchema.pre('save', async function (next) {
  //hashing user password
  //hash password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  if (!this.needsPasswordChange) {
    this.passwordChangedAt = new Date();
  }

  next();
});

// instance methods
// userSchema.methods.isUserExists = async function (
//   id: string
// ): Promise<Partial<IUser> | null> {
//   const user = await User.findOne(
//     { id },
//     { id: 1, password: 1, needsPasswordChange: 1 }
//   ).lean();

//   return user;
// };

// userSchema.methods.isPasswordMatch = async function (
//   givenPass: string,
//   savedPass: string
// ): Promise<boolean> {
//   const isMatch = await bcrypt.compare(givenPass, savedPass);

//   return isMatch;
// };

export const User = model<IUser, UserModel>('User', userSchema);
