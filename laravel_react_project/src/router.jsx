import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Jsx imports

import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import InitialLayout from './components/InitialLayout.jsx';
import UpdateUser from './components/UpdateUser.jsx';
import Home from './components/Home.jsx';
import StudInfoForm from './components/StudInfoForm.jsx';
import Register from './components/Register.jsx';
import StudentProfile from './components/StudentProfile.jsx';
import StudentList from './components/StudentList';
import Enrollment from './components/Enrollment.jsx';
import Grades from './components/Grades.jsx';
import Subjects from './components/Subjects.jsx';
import EnrollForm from './components/EnrollForm.jsx';
import IT2R2 from './components/IT2R2.jsx';

// router ni sa components lahi pud tong router sa data flow

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />,
        children: [
            {
                path: '/',
                element: <Navigate to="/home" replace />,
            },

            {
                path: '/studentlist',
                element: <StudentList />,
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
                path: '/studentprofile',
                element: <StudentProfile />,
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
                path: '/form/new',
                element: <StudInfoForm key="studentCreate" />,
            },
            {
                path: '/register',
                element: <Register />,
            },

        ],
    },
]);

export default router;