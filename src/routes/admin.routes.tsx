
import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import OfferCourse from "../pages/admin/courseManagement/OfferCourse";
import OfferedCourse from "../pages/admin/courseManagement/OfferedCourse";
import RegisteredSemesters from "../pages/admin/courseManagement/RegisteredSemesters";
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration";

import AdminData from "../pages/admin/userManagement/admin/AdminData";
import AdminDetails from "../pages/admin/userManagement/admin/AdminDetails";
import CreateAdmin from "../pages/admin/userManagement/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/faculty/CreateFaculty";
import FacultyData from "../pages/admin/userManagement/faculty/FacultyData";
import FacultyDetails from "../pages/admin/userManagement/faculty/FacultyDetails";
import CreateStudent from "../pages/admin/userManagement/student/CreateStudent";
import StudentData from "../pages/admin/userManagement/student/StudentData";
import StudentDetails from "../pages/admin/userManagement/student/StudentDetails";



export const adminPaths = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <AdminDashboard />,
    },
    {
        name: 'Academic Management',
        children: [
            {
                name: 'Create A. Semester',
                path: 'create-academic-semester',
                element: <CreateAcademicSemester />,
            },
            {
                name: 'Academic Semester',
                path: 'academic-semester',
                element: <AcademicSemester />,
            },
            {
                name: 'Create A. Faculty',
                path: 'create-academic-faculty',
                element: <CreateAcademicFaculty />,
            },
            {
                name: 'Academic Faculty',
                path: 'academic-faculty',
                element: <AcademicFaculty />,
            },
            {
                name: 'Create A. Department',
                path: 'create-academic-department',
                element: <CreateAcademicDepartment />,
            },
            {
                name: 'Academic Department',
                path: 'academic-department',
                element: <AcademicDepartment />,
            },
        ],
    },
    {
        name: 'User Management',
        children: [
            {
                name: 'Create Student',
                path: 'create-student',
                element: <CreateStudent />,
            },
            {
                name: 'Students',
                path: 'students-data',
                element: <StudentData />,
            },
            {

                path: 'student-data/:studentId',
                element: <StudentDetails />,
            },
            {
                name: 'Create Admin',
                path: 'create-admin',
                element: <CreateAdmin />,
            },
            {
                name: 'Admins',
                path: 'admin-data',
                element: <AdminData />,
            },
            {

                path: 'admin-data/:adminId',
                element: <AdminDetails />,
            },
            {
                name: 'Create Faculty',
                path: 'create-faculty',
                element: <CreateFaculty />,
            }, {
                name: 'Faculties',
                path: 'faculty-data',
                element: <FacultyData />,
            },
            {

                path: 'faculty-data/:facultyId',
                element: <FacultyDetails />,
            },


        ],
    },
    {
        name: 'Course Management',
        children: [
            {
                name: 'Semester Registration',
                path: 'semester-registration',
                element: <SemesterRegistration />,
            },
            {
                name: 'Registered Semesters',
                path: 'registered-semesters',
                element: <RegisteredSemesters />,
            },
            {
                name: 'Create Course',
                path: 'create-course',
                element: <CreateCourse />,
            },
            // {
            //     name: 'Courses',
            //     path: 'courses',
            //     element: <Courses />,
            // },
            {
                name: 'Offer Course',
                path: 'offer-course',
                element: <OfferCourse />,
            },
            {
                name: 'Offered Courses',
                path: 'offered-courses',
                element: <OfferedCourse />,
            },
        ],
    },
];

