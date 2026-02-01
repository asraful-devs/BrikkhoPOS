import { BackButton } from '@/components/common/BackButton';
import { StatCard } from '@/components/common/StatCard';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { weeklySummaryZod } from '@/zod/weeklySummary.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
    BadgeDollarSign,
    CalendarDays,
    TrendingDown,
    TrendingUp,
    Users,
    Wallet,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { useGenerateWeeklyReportMutation } from '../../../../redux/features/weeklySummary/weeklySummary.api';

type FormData = z.infer<typeof weeklySummaryZod.weeklyReportSchema>;

interface IWorkerReportDetail {
    workerId: string;
    workerName: string;
    dailySalary: number;
    totalDaysWorked: number;
    baseSalary: number;
    bonus: number;
    overtime: number;
    deduction: number;
    advance: number;
    finalAmount: number;
}

interface IReportData {
    reportPeriod: {
        startDate: string;
        endDate: string;
        totalDays: number;
    };
    summaryTotals: {
        totalWorkers: number;
        totalBaseSalary: number;
        totalBonus: number;
        totalOvertime: number;
        totalDeduction: number;
        totalAdvance: number;
        totalFinalAmount: number;
    };
    workerDetails: IWorkerReportDetail[];
}

const WeeklyReport = () => {
    const [generateReport] = useGenerateWeeklyReportMutation();
    const [reportData, setReportData] = useState<IReportData | null>(null);
    const [searchParams] = useSearchParams();

    // Get current week dates
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
        today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    );
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Get dates from URL params or use defaults
    const startParam = searchParams.get('start');
    const endParam = searchParams.get('end');

    const form = useForm<FormData>({
        resolver: zodResolver(weeklySummaryZod.weeklyReportSchema),
        defaultValues: {
            weekStartDate:
                startParam || startOfWeek.toISOString().split('T')[0],
            weekEndDate: endParam || endOfWeek.toISOString().split('T')[0],
        },
    });

    const onSubmit = useCallback(
        async (data: FormData) => {
            try {
                const result = await generateReport(data).unwrap();
                setReportData(result.data);
                toast.success('রিপোর্ট জেনারেট হয়েছে');
            } catch (error) {
                console.error(error);
                toast.error('রিপোর্ট জেনারেট করতে ব্যর্থ');
            }
        },
        [generateReport]
    );

    // Auto-generate report if URL params exist
    useEffect(() => {
        if (startParam && endParam) {
            form.handleSubmit(onSubmit)();
        }
    }, [startParam, endParam, form, onSubmit]);

    return (
        <div className='container mx-auto py-6 space-y-6'>
            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
            >
                <BackButton
                    label='তালিকায় ফিরে যান'
                    to='/dashboard/admin/weekly-summary-list'
                />
            </motion.div>

            {/* Report Result */}
            {reportData && (
                <>
                    {/* Summary Statistics */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <CalendarDays className='h-5 w-5' />
                                রিপোর্ট সারাংশ
                            </CardTitle>
                            <CardDescription>
                                {new Date(
                                    reportData.reportPeriod?.startDate
                                ).toLocaleDateString('bn-BD')}{' '}
                                থেকে{' '}
                                {new Date(
                                    reportData.reportPeriod?.endDate
                                ).toLocaleDateString('bn-BD')}{' '}
                                ({reportData.reportPeriod?.totalDays} দিন)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                <StatCard
                                    title='মোট শ্রমিক'
                                    value={`${reportData.summaryTotals?.totalWorkers} জন`}
                                    icon={Users}
                                    bgColor='bg-blue-50 dark:bg-blue-950'
                                    textColor='text-blue-600'
                                    delay={0.1}
                                />
                                <StatCard
                                    title='মোট মূল বেতন'
                                    value={`৳${reportData.summaryTotals?.totalBaseSalary?.toLocaleString()}`}
                                    icon={Wallet}
                                    bgColor='bg-green-50 dark:bg-green-950'
                                    textColor='text-green-600'
                                    delay={0.15}
                                />
                                <StatCard
                                    title='মোট বোনাস'
                                    value={`৳${reportData.summaryTotals?.totalBonus?.toLocaleString()}`}
                                    icon={TrendingUp}
                                    bgColor='bg-purple-50 dark:bg-purple-950'
                                    textColor='text-purple-600'
                                    delay={0.2}
                                />
                                <StatCard
                                    title='মোট ওভারটাইম'
                                    value={`৳${reportData.summaryTotals?.totalOvertime?.toLocaleString()}`}
                                    icon={BadgeDollarSign}
                                    bgColor='bg-yellow-50 dark:bg-yellow-950'
                                    textColor='text-yellow-600'
                                    delay={0.25}
                                />
                                <StatCard
                                    title='মোট কর্তন'
                                    value={`৳${reportData.summaryTotals?.totalDeduction?.toLocaleString()}`}
                                    icon={TrendingDown}
                                    bgColor='bg-red-50 dark:bg-red-950'
                                    textColor='text-red-600'
                                    delay={0.3}
                                />
                                <StatCard
                                    title='চূড়ান্ত মোট'
                                    value={`৳${reportData.summaryTotals?.totalFinalAmount?.toLocaleString()}`}
                                    icon={Wallet}
                                    bgColor='bg-orange-50 dark:bg-orange-950'
                                    textColor='text-orange-600'
                                    delay={0.35}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Worker Details - Responsive Layout */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <Users className='h-5 w-5' />
                                    শ্রমিক বিস্তারিত
                                </CardTitle>
                                <CardDescription>
                                    প্রতিটি শ্রমিকের বিস্তারিত হিসাব
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Desktop Table View - Hidden on Mobile */}
                                <div className='hidden lg:block overflow-x-auto'>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className='min-w-37.5'>
                                                    শ্রমিকের নাম
                                                </TableHead>
                                                <TableHead className='text-right'>
                                                    দৈনিক বেতন
                                                </TableHead>
                                                <TableHead className='text-right'>
                                                    কাজের দিন
                                                </TableHead>
                                                <TableHead className='text-right'>
                                                    মূল বেতন
                                                </TableHead>
                                                <TableHead className='text-right'>
                                                    বোনাস
                                                </TableHead>
                                                <TableHead className='text-right'>
                                                    ওভারটাইম
                                                </TableHead>
                                                <TableHead className='text-right'>
                                                    কর্তন
                                                </TableHead>
                                                <TableHead className='text-right'>
                                                    অগ্রিম
                                                </TableHead>
                                                <TableHead className='text-right font-bold'>
                                                    চূড়ান্ত
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {reportData.workerDetails?.map(
                                                (
                                                    worker: IWorkerReportDetail,
                                                    index
                                                ) => (
                                                    <motion.tr
                                                        key={worker.workerId}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                0.5 +
                                                                index * 0.05,
                                                        }}
                                                        className='hover:bg-muted/50 transition-colors'
                                                    >
                                                        <TableCell className='font-medium'>
                                                            {worker.workerName}
                                                        </TableCell>
                                                        <TableCell className='text-right'>
                                                            ৳
                                                            {worker.dailySalary?.toLocaleString()}
                                                        </TableCell>
                                                        <TableCell className='text-right'>
                                                            {
                                                                worker.totalDaysWorked
                                                            }{' '}
                                                            দিন
                                                        </TableCell>
                                                        <TableCell className='text-right'>
                                                            ৳
                                                            {worker.baseSalary?.toLocaleString()}
                                                        </TableCell>
                                                        <TableCell className='text-right text-green-600 font-medium'>
                                                            +৳
                                                            {worker.bonus?.toLocaleString()}
                                                        </TableCell>
                                                        <TableCell className='text-right text-green-600 font-medium'>
                                                            +৳
                                                            {worker.overtime?.toLocaleString()}
                                                        </TableCell>
                                                        <TableCell className='text-right text-red-600 font-medium'>
                                                            -৳
                                                            {worker.deduction?.toLocaleString()}
                                                        </TableCell>
                                                        <TableCell className='text-right text-red-600 font-medium'>
                                                            -৳
                                                            {worker.advance?.toLocaleString()}
                                                        </TableCell>
                                                        <TableCell className='text-right font-bold text-lg'>
                                                            ৳
                                                            {worker.finalAmount?.toLocaleString()}
                                                        </TableCell>
                                                    </motion.tr>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Mobile Card View - Hidden on Desktop */}
                                <div className='lg:hidden space-y-4'>
                                    {reportData.workerDetails?.map(
                                        (
                                            worker: IWorkerReportDetail,
                                            index
                                        ) => (
                                            <motion.div
                                                key={worker.workerId}
                                                initial={{
                                                    opacity: 0,
                                                    y: 20,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    delay: 0.5 + index * 0.1,
                                                }}
                                                className='border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow bg-card'
                                            >
                                                {/* Worker Name Header */}
                                                <div className='flex items-center justify-between pb-3 border-b'>
                                                    <h3 className='font-semibold text-lg'>
                                                        {worker.workerName}
                                                    </h3>
                                                    <div className='text-xs text-muted-foreground'>
                                                        দৈনিক ৳
                                                        {worker.dailySalary?.toLocaleString()}
                                                    </div>
                                                </div>

                                                {/* Worker Stats Grid */}
                                                <div className='grid grid-cols-2 gap-3'>
                                                    <div className='space-y-1'>
                                                        <div className='text-xs text-muted-foreground'>
                                                            কাজের দিন
                                                        </div>
                                                        <div className='font-medium text-blue-600'>
                                                            {
                                                                worker.totalDaysWorked
                                                            }{' '}
                                                            দিন
                                                        </div>
                                                    </div>
                                                    <div className='space-y-1'>
                                                        <div className='text-xs text-muted-foreground'>
                                                            মূল বেতন
                                                        </div>
                                                        <div className='font-medium'>
                                                            ৳
                                                            {worker.baseSalary?.toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className='space-y-1'>
                                                        <div className='text-xs text-muted-foreground'>
                                                            বোনাস
                                                        </div>
                                                        <div className='font-medium text-green-600'>
                                                            +৳
                                                            {worker.bonus?.toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className='space-y-1'>
                                                        <div className='text-xs text-muted-foreground'>
                                                            ওভারটাইম
                                                        </div>
                                                        <div className='font-medium text-green-600'>
                                                            +৳
                                                            {worker.overtime?.toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className='space-y-1'>
                                                        <div className='text-xs text-muted-foreground'>
                                                            কর্তন
                                                        </div>
                                                        <div className='font-medium text-red-600'>
                                                            -৳
                                                            {worker.deduction?.toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className='space-y-1'>
                                                        <div className='text-xs text-muted-foreground'>
                                                            অগ্রিম
                                                        </div>
                                                        <div className='font-medium text-red-600'>
                                                            -৳
                                                            {worker.advance?.toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Final Amount - Prominent */}
                                                <div className='pt-3 border-t bg-primary/5 -mx-4 px-4 py-3 -mb-4 rounded-b-lg'>
                                                    <div className='flex items-center justify-between'>
                                                        <span className='text-sm font-medium'>
                                                            চূড়ান্ত বেতন
                                                        </span>
                                                        <span className='text-xl font-bold text-primary'>
                                                            ৳
                                                            {worker.finalAmount?.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default WeeklyReport;
