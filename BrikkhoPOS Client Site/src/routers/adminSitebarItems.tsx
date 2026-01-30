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
        title: 'কর্মী ব্যবস্থাপনা',
        items: [
            {
                title: 'কর্মী যোগ করুন',
                url: '/dashboard/admin/create-worker',
                component: CreateWorkerForm,
            },
            {
                title: 'কর্মীদের তালিকা',
                url: '/dashboard/admin/worker-list',
                component: WorkerList,
            },
            {
                title: 'কর্মী সম্পাদনা',
                url: '/dashboard/admin/edit-worker/:id',
                component: EditWorkerForm,
                showInSidebar: false,
            },
            {
                title: 'কর্মীর বিস্তারিত',
                url: '/dashboard/admin/worker/:id',
                component: WorkerDetails,
                showInSidebar: false,
            },
        ],
    },
    {
        title: 'উপস্থিতি ব্যবস্থাপনা',
        items: [
            {
                title: 'উপস্থিতি তৈরি করুন',
                url: '/dashboard/admin/create-attendance',
                component: CreateAttendance,
            },
            {
                title: 'উপস্থিতির তালিকা',
                url: '/dashboard/admin/attendance-list',
                component: AttendanceList,
            },
            {
                title: 'উপস্থিতি সম্পাদনা',
                url: '/dashboard/admin/edit-attendance/:id',
                component: EditAttendance,
            },
        ],
    },
    {
        title: 'সাপ্তাহিক সারসংক্ষেপ',
        items: [
            {
                title: 'সারসংক্ষেপ তৈরি করুন',
                url: '/dashboard/admin/create-weekly-summary',
                component: CreateWeeklySummary,
            },
            {
                title: 'সারসংক্ষেপের তালিকা',
                url: '/dashboard/admin/weekly-summary-list',
                component: WeeklySummaryList,
            },
            {
                title: 'সারসংক্ষেপের বিস্তারিত',
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
        title: 'বেতন সামঞ্জস্য',
        items: [
            {
                title: 'সামঞ্জস্য যোগ করুন',
                url: '/dashboard/admin/add-salary-adjustment',
                component: CreateSalaryAdjustment,
            },
            {
                title: 'সামঞ্জস্যের তালিকা',
                url: '/dashboard/admin/salary-adjustment-list',
                component: SalaryAdjustmentList,
            },
        ],
    },
];
