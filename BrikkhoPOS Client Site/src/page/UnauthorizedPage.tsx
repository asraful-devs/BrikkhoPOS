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
                    অননুমোদিত প্রবেশ
                </h1>

                {/* Description */}
                <p className='text-gray-600 dark:text-gray-300 mb-6'>
                    আপনার এই পেজ দেখার অনুমতি নেই। এটি আপনার{' '}
                    <span className='font-semibold'>ভূমিকা</span> সম্পর্কিত
                    সমস্যা হতে পারে।
                </p>

                {/* Suggestion */}
                <p className='text-gray-700 dark:text-gray-400 mb-8'>
                    অনুগ্রহ করে সঠিক অ্যাকাউন্ট দিয়ে আবার লগইন করার চেষ্টা
                    করুন।
                </p>

                {/* Button */}
                <Link
                    to='/login'
                    className='inline-block px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition'
                >
                    লগইন পেজে যান
                </Link>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
