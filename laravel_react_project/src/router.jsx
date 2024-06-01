import {createBrowserRouter} from 'react-router-dom';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Dashboard from './components/Dashboard.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Users from './components/users.jsx';
import UserForm from './components/UserForm.jsx';

const router = createBrowserRouter ([
    {
        path: '/',
        element: <Dashboard />,
        children: [
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
        ]
    },

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element:  <Register />,
            }
        ]
    },
]);

export default router;