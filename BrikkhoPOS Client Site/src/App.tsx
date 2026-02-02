import { LogIn, UserPlus } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';
import { Button } from './components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './components/ui/card';
import CommonLayout from './layout/CommonLayout';

function App() {
    return (
        <>
            <CommonLayout>
                <Outlet />
                <div className='min-h-screen bg-background'>
                    <div className='container max-w-4xl mx-auto px-4 py-8 md:py-16'>
                        <Card className='shadow-sm'>
                            <CardHeader className='text-center space-y-4 pb-8'>
                                <CardTitle className='text-3xl md:text-4xl font-bold'>
                                    বৃক্ষ POS সিস্টেম
                                </CardTitle>
                                <CardDescription className='text-base md:text-lg'>
                                    কর্মী ব্যবস্থাপনা, উপস্থিতি ট্র্যাকিং এবং
                                    বেতন সামঞ্জস্যের জন্য সম্পূর্ণ সমাধান
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-6 pb-8'>
                                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                                    <Link
                                        to='/register'
                                        className='w-full sm:w-auto'
                                    >
                                        <Button size='lg' className='w-full'>
                                            <UserPlus className='mr-2 h-4 w-4' />
                                            নতুন অ্যাকাউন্ট তৈরি করুন
                                        </Button>
                                    </Link>
                                    <Link
                                        to='/login'
                                        className='w-full sm:w-auto'
                                    >
                                        <Button
                                            size='lg'
                                            variant='outline'
                                            className='w-full'
                                        >
                                            <LogIn className='mr-2 h-4 w-4' />
                                            লগইন করুন
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </CommonLayout>
        </>
    );
}

export default App;
