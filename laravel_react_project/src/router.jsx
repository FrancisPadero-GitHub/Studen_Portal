import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Jsx imports

import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import InitialLayout from './components/InitialLayout.jsx';
import UpdateUser from './components/UpdateUser.jsx';
import Home from './components/Home.jsx';
import PersonalProfile from './components/PersonalProfile.jsx';
import StudentList from './components/StudentList';
import Enrollment from './components/Enrollment.jsx';
import Grades from './components/Grades.jsx';
import Subjects from './components/Subjects.jsx';
import EnrollForm from './components/EnrollForm.jsx';
import IT2R2 from './components/IT2R2.jsx';
import EnrollStudents from './components/EnrollStudents.jsx';
import Notification from './components/Notification.jsx';
import AdminList from './components/AdminList.jsx';
import ProfileForm from './components/ProfileForm.jsx';
import Register from './components/Register.jsx';
import InstructorList from './components/InstructorList.jsx';



// router ni sa components lahi pud tong router sa data flow

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />,
        children: [

            { // default render route if the token is active 
                path: '/',
                element: <Navigate to="/home" replace />,
            },

            {
                path: '/studentlist',
                element: <StudentList />,
            },

            
            {
                path: '/loginupdate',
                element: <UpdateUser />,
            },

            // {
            //     path: '/createUsers/new',
            //     element: <UpdateUser key="userCreate" />,
            // },

            // {
            //     path: '/updateUsers/:id',
            //     element: <UpdateUser key="userUpdate" />,
            // },

            {
                path: '/home',
                element: <Home />,
            },

            {
                path: '/profile',
                element: <PersonalProfile />,
            },

            {
                path: '/enrollment',
                element: <Enrollment />,
            },

            {
                path: '/grades',
                element: <Grades />,
            },

            {
                path: '/subjects',
                element: <Subjects />,
            },

            {
                path: '/enrollform/new',
                element: <EnrollForm key="enrollCreate" />,
            },

            {
                path: '/section',
                element: <IT2R2/>,
            },

            {
                path: '/subjects',
                element: <Subjects/>,
            },

            {
                path: '/enroll/students',
                element: <EnrollStudents />,
            },
            
            {
                path: '/enrollpage',
                element: <Enrollment />,
            },

            {
                path: '/notification',
                element: <Notification />,
            },


            {
                path: '/adminlist',
                element: <AdminList />,
            },

            {
                path: '/instructorlist',
                element: <InstructorList />,
            },

            {
                path: '/login/register',
                element: <Register />,
            },

            {
                path: '/register/profile/new',
                element: <ProfileForm />,
            },


        ],
    },
    {
        path: '/',
        element: <InitialLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            
            {
                path: '/register',
                element: <ProfileForm key="studentCreate" />,
            },

            // this one is the old admin registration where
            // {
            //     path: '/register',
            //     element: <Register />,
            // },

        ],
    },
]);

export default router;