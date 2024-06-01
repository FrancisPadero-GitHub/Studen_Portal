import { createBrowserRouter } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import InitialLayout from './components/InitialLayout.jsx';
import Users from './components/Users.jsx';
import UserForm from './components/UserForm.jsx';
import Home from './components/Home.jsx';
import UserInfo from './components/UserInfo.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />,
        children: [
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/users',
                element: <Users />,
            },

            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },


            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
            {
                path: '/userinfo',
                element: <UserInfo /> // Adding a route for UserInfo component
            },
        ]
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
            }
        ]
    },
]);

export default router;