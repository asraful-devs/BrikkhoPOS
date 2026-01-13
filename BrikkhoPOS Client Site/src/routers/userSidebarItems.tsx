import UserDashboard from '../modules/dashboard/user/UserDashboard';
import type { ISidebarItem } from '../types';

export const userSidebarItems: ISidebarItem[] = [
    {
        title: 'Dashboard',
        items: [
            {
                title: 'Main',
                url: '/dashboard/user/main',
                component: UserDashboard,
            },
        ],
    },
];
