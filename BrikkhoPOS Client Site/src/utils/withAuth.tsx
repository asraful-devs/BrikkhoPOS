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

        if (!isLoading && !data?.data?.email) {
            return <Navigate to='/login' />;
        }

        if (
            requiredRole &&
            !isLoading &&
            requiredRole !== data?.data?.role &&
            data?.data?.role !== 'ADMIN'
        ) {
            return <Navigate to='/unauthorized' />;
        }

        return <Component />;
    };
};
