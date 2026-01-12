import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../page/HomePage';
import LoginPage from '../page/LoginPage';
import RegisterPage from '../page/RegisterPage';

const router = createBrowserRouter([
    {
        path: '/',
        Component: HomePage,
        children: [
            { index: true, Component: HomePage },
            { path: 'login', Component: LoginPage },
            { path: 'register', Component: RegisterPage },
        ],
    },
    // {
    //     path: '/login',
    //     element: <LoginPage />,
    // },
    // {
    //     path: '/register',
    //     element: <RegisterPage />,
    // },
    // {
    //     path: '/dashboard',
    //     Component: Dashboard,
    //     children: [
    //         { index: true, Component: Home },
    //         { path: 'settings', Component: Settings },
    //     ],
    // },
]);

export default router;
