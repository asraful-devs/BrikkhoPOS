import { ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';
import { Button } from './components/ui/button';
import CommonLayout from './layout/CommonLayout';

function App() {
    return (
        <>
            <CommonLayout>
                <Outlet />
                <div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
                    {/* Hero Section */}
                    <div className='container mx-auto px-4 py-16'>
                        <div className='text-center mb-16 space-y-6'>
                            <h1 className='text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400'>
                                বৃক্ষ POS সিস্টেম
                            </h1>
                            <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
                                আপনাকে স্বাগতম! আধুনিক এবং সহজ ব্যবস্থাপনা
                                সিস্টেমে
                            </p>
                            <p className='text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto'>
                                কর্মী ব্যবস্থাপনা, উপস্থিতি ট্র্যাকিং এবং বেতন
                                সামঞ্জস্যের জন্য সম্পূর্ণ সমাধান
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-6 justify-center items-center mb-20'>
                            <Link to='/register'>
                                <Button
                                    size='lg'
                                    className='text-lg px-8 py-6 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all'
                                >
                                    <UserPlus className='mr-2 h-5 w-5' />
                                    নতুন অ্যাকাউন্ট তৈরি করুন
                                    <ArrowRight className='ml-2 h-5 w-5' />
                                </Button>
                            </Link>
                            <Link to='/login'>
                                <Button
                                    size='lg'
                                    variant='outline'
                                    className='text-lg px-8 py-6 border-2 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-md hover:shadow-lg transition-all'
                                >
                                    <LogIn className='mr-2 h-5 w-5' />
                                    লগইন করুন
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </CommonLayout>
        </>
    );
}

export default App;
