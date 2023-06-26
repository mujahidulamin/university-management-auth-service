import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../modules/student/student.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  // {
  //   path: '/faculties',
  //   route: FacultyRoutes,
  // },
  // {
  //   path: '/admins',
  //   route: AdminRoutes,
  // },
  // {
  //   path: '/users',
  //   route: UserRoutes,
  // },
];

// router.use('/users/', UserRoutes)
// router.use('/academic-semesters', AcademicSemesterRoutes);
moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
