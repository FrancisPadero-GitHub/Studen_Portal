import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Jsx imports

import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import InitialLayout from './components/InitialLayout.jsx';
import Accounts from './components/Accounts.jsx';
import UpdateUser from './components/UpdateUser.jsx';
import Home from './components/Home.jsx';
import StudInfoForm from './components/StudInfoForm.jsx';
import Register from './components/Register.jsx';
import StudentProfile from './components/StudentProfile.jsx';
import StudentList from './components/StudentList';

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
                path: '/users',
                element: <Accounts />,
            },
            {
                path: '/users/new',
                element: <UpdateUser key="userCreate" />,
            },
            {
                path: '/users/:id',
                element: <UpdateUser key="userUpdate" />,
            },
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/form/new',
                element: <StudInfoForm key="studentCreate" />,
            },
            
            {
                path: '/studentprofile',
                element: <StudentProfile/>,
            },
            {
                path: '/studentlist',
                element: <StudentList />,
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
                element: <Register />,
            },


        ],
    },
]);

export default router;