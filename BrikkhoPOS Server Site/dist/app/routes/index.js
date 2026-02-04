import express from 'express';
import { AttendanceRoutes } from '../modules/attendance/attendance.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { SalaryAdjustmentRoutes } from '../modules/salaryAdjustment/salaryAdjustment.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { WeeklySummaryRoutes } from '../modules/weeklySummary/weeklySummary.routes';
import { WorkerRoutes } from '../modules/worker/worker.routes';
const router = express.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/worker',
        route: WorkerRoutes,
    },
    {
        path: '/attendance',
        route: AttendanceRoutes,
    },
    {
        path: '/salary-adjustment',
        route: SalaryAdjustmentRoutes,
    },
    {
        path: '/weekly-summary',
        route: WeeklySummaryRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
