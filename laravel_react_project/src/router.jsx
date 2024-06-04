import { createBrowserRouter } from 'react-router-dom';
import ForgotPass from './components/ForgotPass.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import InitialLayout from './components/InitialLayout.jsx';
import Accounts from './components/Accounts.jsx';
import UpdateUser from './components/UpdateUser.jsx';
import Home from './components/Home.jsx';
import UserInfo from './components/UserInfo.jsx';
import Profile from './components/Profile.jsx';
import StudInfoForm from './components/StudInfoForm.jsx';

// router ni sa components lahi pud tong router sa data flow

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
                element: <Accounts />,
            },

            {   // This one determines if the admin wants to add new account
                path: '/users/new',
                element: <UpdateUser key="userCreate" />
            },

            {   // This one determines if the admin wants to update an account | id will make the form determine to display either edit or add
                path: '/users/:id',
                element: <UpdateUser key="userUpdate" />
            },

            {
                path: '/userinfo',
                element: <UserInfo /> // Adding a route for UserInfo component
            },

            {
                path: '/profile',
                element: <Profile /> // Adding a route for UserInfo component
            },

            {
                path: '/addnew/new',
                element: <StudInfoForm key="studentCreate"/>,
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
                path: '/forgotpass',
                element: <ForgotPass />,
            }
        ]
    },
]);

export default router;