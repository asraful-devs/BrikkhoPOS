import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes,
    },
    // {
    //     path: '/admin',
    //     route: adminRouters,
    // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
