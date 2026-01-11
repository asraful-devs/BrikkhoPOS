// import { Navigate } from "react-router-dom";

// const DashboardRedirect = () => {
//     const { data, isLoading } = useUserInfoQuery(undefined);

//     if (isLoading) {
//         return (
//             <div className='text-center'>
//                 <Loading />
//             </div>
//         );
//     }

//     const user = data?.data?.data;

//     if (!user?.email) {
//         return <Navigate to='/login' replace />;
//     }

//     // Redirect based on user role
//     if (user?.role === 'ADMIN') {
//         return <Navigate to='/dashboard/admin' replace />;
//     } else if (user?.role === 'RIDER') {
//         return <Navigate to='/dashboard/rider' replace />;
//     } else if (user?.role === 'DRIVER') {
//         return <Navigate to='/dashboard/driver' replace />;
//     }

//     return <Navigate to='/unauthorized' replace />;
// };

// export default DashboardRedirect;
