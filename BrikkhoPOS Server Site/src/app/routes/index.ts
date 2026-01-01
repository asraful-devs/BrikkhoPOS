import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { WorkerRoutes } from '../modules/worker/worker.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes,
    },
    {
        path: '/worker',
        route: WorkerRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
