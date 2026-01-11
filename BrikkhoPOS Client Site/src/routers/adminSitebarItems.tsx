import type { ISidebarItem } from '../types';

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: 'Dashboard',
        items: [
            {
                title: 'Analytics',
                url: '/dashboard/admin/analytics',
                component: <div className=''></div>,
            },
            {
                title: 'Me',
                url: '/dashboard/admin/me',
                component: <div className=''></div>,
            },
        ],
    },
];
