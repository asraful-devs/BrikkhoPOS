import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { role } from '../constant/role';
import DashboardLayout from '../layout/DashboardLayout';
import LoginPage from '../page/LoginPage';
import RegisterPage from '../page/RegisterPage';
import UnauthorizedPage from '../page/UnauthorizedPage';
import type { TRole } from '../types';
import { generateRoutes } from '../utils/generateRoutes';
import { withAuth } from '../utils/withAuth';
import { adminSidebarItems } from './adminSitebarItems';
import DashboardRedirect from './dashboardRedirect';
import { userSidebarItems } from './userSidebarItems';

const router = createBrowserRouter([
    {
        path: '/',
        index: true,
        Component: App,
    },
    {
        path: '/login',
        Component: LoginPage,
    },
    {
        path: '/register',
        Component: RegisterPage,
    },
    {
        path: '/dashboard',
        Component: DashboardRedirect,
    },
    {
        Component: withAuth(DashboardLayout, role.admin as TRole),
        path: '/dashboard/admin',
        children: [
            {
                index: true,
                element: <Navigate to='/dashboard/admin/analytics' />,
            },
            ...generateRoutes(adminSidebarItems),
        ],
    },
    {
        Component: withAuth(DashboardLayout, role.user as TRole),
        path: '/dashboard/user',
        children: [
            {
                index: true,
                element: <Navigate to='/dashboard/user/main' />,
            },
            ...generateRoutes(userSidebarItems),
        ],
    },
    {
        path: '/unauthorized',
        Component: UnauthorizedPage,
    },
]);

export default router;
