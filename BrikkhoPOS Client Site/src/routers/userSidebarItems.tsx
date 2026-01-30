import UserDashboard from '../modules/dashboard/user/UserDashboard';
import type { ISidebarItem } from '../types';

export const userSidebarItems: ISidebarItem[] = [
    {
        title: 'ড্যাশবোর্ড',
        items: [
            {
                title: 'প্রধান',
                url: '/dashboard/user/main',
                component: UserDashboard,
            },
        ],
    },
];
