import { role } from '../constant/role';
import { adminSidebarItems } from '../routers/adminSitebarItems';
import { userSidebarItems } from '../routers/userSidebarItems';
import type { TRole } from '../types';

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.admin:
            return [...adminSidebarItems];
        case role.user:
            return [...userSidebarItems];
        default:
            return [];
    }
};
