import { Navigate } from 'react-router-dom';
import Loading from '../components/common/Loading';
import { useUserInfoQuery } from '../redux/features/auth/auth.api';

const DashboardRedirect = () => {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (isLoading) {
        return (
            <div className='text-center'>
                <Loading />
            </div>
        );
    }

    const user = data?.data?.data;

    if (!user?.email) {
        return <Navigate to='/login' replace />;
    }

    // Redirect based on user role
    if (user?.role === 'ADMIN') {
        return <Navigate to='/dashboard/admin' replace />;
    } else if (user?.role === 'USER') {
        return <Navigate to='/dashboard/user' replace />;
    }

    return <Navigate to='/unauthorized' replace />;
};

export default DashboardRedirect;
