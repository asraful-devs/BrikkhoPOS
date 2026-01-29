import { type ComponentType } from 'react';
import { Navigate } from 'react-router';
import Loading from '../components/common/Loading';
import { useUserInfoQuery } from '../redux/features/auth/auth.api';
import type { TRole } from '../types';

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(undefined);

        if (isLoading) {
            return (
                <div className='text-center'>
                    <Loading />
                </div>
            );
        }

        console.log(
            { requiredRole, userRole: data?.data?.data?.role },
            'withAuth'
        );

        if (!isLoading && !data?.data?.data?.email) {
            return <Navigate to='/login' />;
        }

        if (
            requiredRole &&
            !isLoading &&
            requiredRole !== data?.data?.data?.role &&
            data?.data?.data?.role !== 'ADMIN'
        ) {
            return <Navigate to='/unauthorized' />;
        }

        return <Component />;
    };
};
