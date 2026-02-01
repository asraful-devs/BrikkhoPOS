import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetWeeklySummariesQuery } from '@/redux/features/weeklySummary/weeklySummary.api';
import type { IWeeklySummary } from '@/types/weeklySummary.types';
import { motion } from 'framer-motion';
import {
    Calendar,
    CalendarDays,
    Eye,
    FileText,
    TrendingUp,
    Users,
    Wallet,
} from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

interface WeekGroup {
    weekRange: string;
    weekStartDate: string;
    weekEndDate: string;
    summaries: IWeeklySummary[];
    totalWorkers: number;
    totalDaysWorked: number;
    totalSalary: number;
    paidCount: number;
    unpaidCount: number;
}

const WeeklySummaryList = () => {
    const { data, isLoading, error } = useGetWeeklySummariesQuery();

    const summaries = useMemo(() => data?.data || [], [data]);

    // Group summaries by week
    const weeklyGroups = useMemo<WeekGroup[]>(() => {
        const groups = new Map<string, WeekGroup>();

        summaries.forEach((summary: IWeeklySummary) => {
            const key = `${summary.weekStartDate}-${summary.weekEndDate}`;

            if (!groups.has(key)) {
                const start = new Date(summary.weekStartDate);
                const end = new Date(summary.weekEndDate);

                groups.set(key, {
                    weekRange: `${start.toLocaleDateString('bn-BD')} - ${end.toLocaleDateString('bn-BD')}`,
                    weekStartDate: summary.weekStartDate,
                    weekEndDate: summary.weekEndDate,
                    summaries: [],
                    totalWorkers: 0,
                    totalDaysWorked: 0,
                    totalSalary: 0,
                    paidCount: 0,
                    unpaidCount: 0,
                });
            }

            const group = groups.get(key)!;
            group.summaries.push(summary);
            group.totalWorkers++;
            group.totalDaysWorked += summary.totalDaysWorked;
            group.totalSalary += summary.totalSalary;

            if (summary.isPaid) {
                group.paidCount++;
            } else {
                group.unpaidCount++;
            }
        });

        return Array.from(groups.values()).sort(
            (a, b) =>
                new Date(b.weekStartDate).getTime() -
                new Date(a.weekStartDate).getTime()
        );
    }, [summaries]);

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-64'>
                <div className='flex flex-col items-center gap-3'>
                    <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-primary' />
                    <p className='text-sm text-muted-foreground'>
                        লোড হচ্ছে...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex items-center justify-center h-64'>
                <div className='text-center space-y-3'>
                    <FileText className='h-12 w-12 text-destructive mx-auto' />
                    <p className='text-destructive font-medium'>
                        ডেটা লোড করতে সমস্যা হয়েছে
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto py-6 space-y-6'>
            {/* Header Card */}
            <Card>
                <PageHeader
                    title='সাপ্তাহিক সারাংশ তালিকা'
                    description={`মোট ${weeklyGroups.length} টি সাপ্তাহিক রিপোর্ট`}
                    actions={
                        <>
                            <Link to='/dashboard/admin/weekly-report'>
                                <Button variant='outline' className='gap-2'>
                                    <TrendingUp className='h-4 w-4' />
                                    রিপোর্ট দেখুন
                                </Button>
                            </Link>
                            <Link to='/dashboard/admin/create-weekly-summary'>
                                <Button className='gap-2'>
                                    <CalendarDays className='h-4 w-4' />
                                    নতুন সারাংশ
                                </Button>
                            </Link>
                        </>
                    }
                />
            </Card>

            {/* Weekly Summary Cards */}
            {weeklyGroups.length === 0 ? (
                <Card>
                    <CardContent className='py-12'>
                        <div className='text-center space-y-3'>
                            <Calendar className='h-16 w-16 text-muted-foreground mx-auto opacity-50' />
                            <h3 className='text-lg font-medium text-muted-foreground'>
                                কোন সাপ্তাহিক সারাংশ পাওয়া যায়নি
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                                নতুন সাপ্তাহিক সারাংশ তৈরি করুন
                            </p>
                            <div className='pt-4'>
                                <Link to='/dashboard/admin/create-weekly-summary'>
                                    <Button className='gap-2'>
                                        <CalendarDays className='h-4 w-4' />
                                        সারাংশ তৈরি করুন
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className='grid gap-6'>
                    {weeklyGroups.map((group, index) => (
                        <motion.div
                            key={`${group.weekStartDate}-${group.weekEndDate}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className='overflow-hidden hover:shadow-lg transition-shadow'>
                                <div className='bg-linear-to-r from-primary/10 to-primary/5 px-6 py-4 border-b'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-3'>
                                            <div className='p-2 bg-primary/10 rounded-lg'>
                                                <Calendar className='h-5 w-5 text-primary' />
                                            </div>
                                            <div>
                                                <h3 className='text-lg font-semibold'>
                                                    {group.weekRange}
                                                </h3>
                                                <p className='text-sm text-muted-foreground'>
                                                    সপ্তাহিক সারাংশ রিপোর্ট
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/dashboard/admin/weekly-report?start=${group.weekStartDate}&end=${group.weekEndDate}`}
                                        >
                                            <Button
                                                variant='outline'
                                                size='sm'
                                                className='gap-2'
                                            >
                                                <Eye className='h-4 w-4' />
                                                বিস্তারিত দেখুন
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                <CardContent className='p-6'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                                        <StatCard
                                            title='মোট শ্রমিক'
                                            value={`${group.totalWorkers} জন`}
                                            icon={Users}
                                            bgColor='bg-blue-50 dark:bg-blue-950'
                                            textColor='text-blue-600'
                                            delay={index * 0.1}
                                        />
                                        <StatCard
                                            title='মোট কাজের দিন'
                                            value={`${group.totalDaysWorked} দিন`}
                                            icon={CalendarDays}
                                            bgColor='bg-purple-50 dark:bg-purple-950'
                                            textColor='text-purple-600'
                                            delay={index * 0.1 + 0.05}
                                        />
                                        <StatCard
                                            title='মোট বেতন'
                                            value={`৳${group.totalSalary.toLocaleString()}`}
                                            icon={Wallet}
                                            bgColor='bg-green-50 dark:bg-green-950'
                                            textColor='text-green-600'
                                            delay={index * 0.1 + 0.1}
                                        />
                                        <StatCard
                                            title='পরিশোধ স্ট্যাটাস'
                                            value={`${group.paidCount}/${group.totalWorkers}`}
                                            icon={TrendingUp}
                                            bgColor='bg-orange-50 dark:bg-orange-950'
                                            textColor='text-orange-600'
                                            delay={index * 0.1 + 0.15}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeeklySummaryList;
