/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
  needsPasswordChange: true | false;
  passwordChangedAt?: Date;
};

// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser> | null>;
//   isPasswordMatch(givenPass: string, savedPass: string): Promise<boolean>;
// };

// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'needsPasswordChange' | 'role'>>;
  isPasswordMatch(givenPass: string, savedPass: string): Promise<boolean>;
} & Model<IUser>;
