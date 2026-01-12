import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
    return (
        <div className='flex items-center justify-center h-screen rounded-2xl mt-5 bg-gray-50 dark:bg-gray-900 transition-colors'>
            <div className='bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-10 text-center max-w-md'>
                {/* Icon */}
                <div className='flex justify-center mb-6'>
                    <div className='p-4 bg-red-100 dark:bg-red-900 rounded-full'>
                        <Lock className='text-red-500 w-12 h-12' />
                    </div>
                </div>

                {/* Heading */}
                <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
                    Unauthorized Access
                </h1>

                {/* Description */}
                <p className='text-gray-600 dark:text-gray-300 mb-6'>
                    You don’t have permission to view this page. This might be
                    an issue with your{' '}
                    <span className='font-semibold'>role</span>.
                </p>

                {/* Suggestion */}
                <p className='text-gray-700 dark:text-gray-400 mb-8'>
                    Please try logging in again with the correct account.
                </p>

                {/* Button */}
                <Link
                    to='/login'
                    className='inline-block px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition'
                >
                    Go to Login
                </Link>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
