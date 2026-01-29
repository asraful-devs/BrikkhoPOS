import AttendanceList from '../modules/dashboard/admin/attendance/AttendanceList';
import CreateAttendance from '../modules/dashboard/admin/attendance/CreateAttendance';
import EditAttendance from '../modules/dashboard/admin/attendance/EditAttendance';
import CreateSalaryAdjustment from '../modules/dashboard/admin/salaryAdjustment/CreateSalaryAdjustment';
import SalaryAdjustmentList from '../modules/dashboard/admin/salaryAdjustment/SalaryAdjustmentList';
import CreateWeeklySummary from '../modules/dashboard/admin/weeklySummary/CreateWeeklySummary';
import WeeklyReport from '../modules/dashboard/admin/weeklySummary/WeeklyReport';
import WeeklySummaryDetails from '../modules/dashboard/admin/weeklySummary/WeeklySummaryDetails';
import WeeklySummaryList from '../modules/dashboard/admin/weeklySummary/WeeklySummaryList';
import CreateWorkerForm from '../modules/dashboard/admin/worker/CreateWorkerForm';
import EditWorkerForm from '../modules/dashboard/admin/worker/EditWorkerForm';
import WorkerDetails from '../modules/dashboard/admin/worker/WorkerDetails';
import WorkerList from '../modules/dashboard/admin/worker/WorkerList';
import type { ISidebarItem } from '../types';

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: 'Worker Management',
        items: [
            {
                title: 'Add Worker',
                url: '/dashboard/admin/create-worker',
                component: CreateWorkerForm,
            },
            {
                title: 'Worker List',
                url: '/dashboard/admin/worker-list',
                component: WorkerList,
            },
            {
                title: 'Edit Worker',
                url: '/dashboard/admin/edit-worker/:id',
                component: EditWorkerForm,
            },
            {
                title: 'Worker Details',
                url: '/dashboard/admin/worker/:id',
                component: WorkerDetails,
            },
        ],
    },
    {
        title: 'Attendance Management',
        items: [
            {
                title: 'Create Attendance',
                url: '/dashboard/admin/create-attendance',
                component: CreateAttendance,
            },
            {
                title: 'Attendance List',
                url: '/dashboard/admin/attendance-list',
                component: AttendanceList,
            },
            {
                title: 'Edit Attendance',
                url: '/dashboard/admin/edit-attendance/:id',
                component: EditAttendance,
            },
        ],
    },
    {
        title: 'Weekly Summary',
        items: [
            {
                title: 'Create Summary',
                url: '/dashboard/admin/create-weekly-summary',
                component: CreateWeeklySummary,
            },
            {
                title: 'Summary List',
                url: '/dashboard/admin/weekly-summary-list',
                component: WeeklySummaryList,
            },
            {
                title: 'Summary Details',
                url: '/dashboard/admin/weekly-summary/:id',
                component: WeeklySummaryDetails,
            },
            {
                title: 'Weekly Report',
                url: '/dashboard/admin/weekly-report',
                component: WeeklyReport,
            },
        ],
    },
    {
        title: 'Salary Adjustment',
        items: [
            {
                title: 'Add Adjustment',
                url: '/dashboard/admin/add-salary-adjustment',
                component: CreateSalaryAdjustment,
            },
            {
                title: 'Adjustment List',
                url: '/dashboard/admin/salary-adjustment-list',
                component: SalaryAdjustmentList,
            },
        ],
    },
];
