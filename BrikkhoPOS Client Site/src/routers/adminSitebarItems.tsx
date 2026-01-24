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
        title: 'শ্রমিক ব্যবস্থাপনা',
        items: [
            {
                title: 'শ্রমিক যোগ করুন',
                url: '/dashboard/admin/create-worker',
                component: CreateWorkerForm,
            },
            {
                title: 'শ্রমিক তালিকা',
                url: '/dashboard/admin/worker-list',
                component: WorkerList,
            },
            {
                title: 'শ্রমিক সম্পাদনা',
                url: '/dashboard/admin/edit-worker/:id',
                component: EditWorkerForm,
            },
            {
                title: 'শ্রমিক বিস্তারিত',
                url: '/dashboard/admin/worker/:id',
                component: WorkerDetails,
            },
        ],
    },
    {
        title: 'হাজিরা ব্যবস্থাপনা',
        items: [
            {
                title: 'হাজিরা দিন',
                url: '/dashboard/admin/create-attendance',
                component: CreateAttendance,
            },
            {
                title: 'হাজিরা তালিকা',
                url: '/dashboard/admin/attendance-list',
                component: AttendanceList,
            },
            {
                title: 'হাজিরা সম্পাদনা',
                url: '/dashboard/admin/edit-attendance/:id',
                component: EditAttendance,
            },
        ],
    },
    {
        title: 'সাপ্তাহিক সারাংশ',
        items: [
            {
                title: 'সারাংশ তৈরি',
                url: '/dashboard/admin/create-weekly-summary',
                component: CreateWeeklySummary,
            },
            {
                title: 'সারাংশ তালিকা',
                url: '/dashboard/admin/weekly-summary-list',
                component: WeeklySummaryList,
            },
            {
                title: 'সারাংশ বিস্তারিত',
                url: '/dashboard/admin/weekly-summary/:id',
                component: WeeklySummaryDetails,
            },
            {
                title: 'সাপ্তাহিক রিপোর্ট',
                url: '/dashboard/admin/weekly-report',
                component: WeeklyReport,
            },
        ],
    },
    {
        title: 'বেতন সমন্বয়',
        items: [
            {
                title: 'সমন্বয় যোগ করুন',
                url: '/dashboard/admin/add-salary-adjustment',
                component: CreateSalaryAdjustment,
            },
            {
                title: 'সমন্বয় তালিকা',
                url: '/dashboard/admin/salary-adjustment-list',
                component: SalaryAdjustmentList,
            },
        ],
    },
];
