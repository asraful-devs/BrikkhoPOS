import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    useDeleteSalaryAdjustmentMutation,
    useGetSalaryAdjustmentsQuery,
} from '@/redux/features/salaryAdjustment/salaryAdjustment.api';
import { Calendar, DollarSign, FileText, Trash2, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const typeLabels: Record<
    string,
    { label: string; variant: 'success' | 'destructive' | 'warning' | 'info' }
> = {
    BONUS: { label: 'বোনাস', variant: 'success' },
    OVERTIME: { label: 'ওভারটাইম', variant: 'info' }, // Changed color for distinction
    DEDUCTION: { label: 'কর্তন', variant: 'destructive' },
    ADVANCE: { label: 'অগ্রিম', variant: 'warning' },
};

// স্টাইল হেল্পার
const getBadgeStyles = (variant: string) => {
    switch (variant) {
        case 'success':
            return 'bg-green-100 text-green-700 border-green-200';
        case 'destructive':
            return 'bg-red-100 text-red-700 border-red-200';
        case 'warning':
            return 'bg-orange-100 text-orange-700 border-orange-200';
        case 'info':
            return 'bg-blue-100 text-blue-700 border-blue-200';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-200';
    }
};

interface Worker {
    _id: string;
    name: string;
}

interface WeeklySummary {
    _id: string;
    weekStartDate: string;
    weekEndDate: string;
}

interface SalaryAdjustment {
    _id: string;
    id: string;
    workerId: Worker;
    weeklySummaryId: WeeklySummary;
    type: 'BONUS' | 'OVERTIME' | 'DEDUCTION' | 'ADVANCE';
    amount: number;
    reason: string;
    createdAt: string;
}

const SalaryAdjustmentList = () => {
    const { data, isLoading, error } = useGetSalaryAdjustmentsQuery();
    const [deleteAdjustment] = useDeleteSalaryAdjustmentMutation();

    const adjustments = data?.data || [];

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('bn-BD', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteAdjustment(id).unwrap();
            toast.success('সমন্বয় সফলভাবে মুছে ফেলা হয়েছে');
        } catch (error) {
            console.error(error);
            toast.error('মুছতে ব্যর্থ হয়েছে');
        }
    };

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-[50vh]'>
                <div className='flex flex-col items-center gap-2'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
                    <div className='text-muted-foreground'>লোড হচ্ছে...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex items-center justify-center h-[50vh]'>
                <div className='text-destructive bg-destructive/10 px-4 py-2 rounded-md'>
                    ডেটা লোড করতে সমস্যা হয়েছে
                </div>
            </div>
        );
    }

    return (
        <div className='p-4 md:p-6 space-y-6'>
            <Card className='shadow-sm border-none bg-background/50'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-6'>
                    <div className='space-y-1'>
                        <CardTitle className='text-2xl font-bold tracking-tight'>
                            বেতন সমন্বয় তালিকা
                        </CardTitle>
                        <CardDescription className='text-muted-foreground'>
                            মোট {adjustments.length} টি লেনদেন পাওয়া গেছে
                        </CardDescription>
                    </div>
                    <Link to='/dashboard/admin/add-salary-adjustment'>
                        <Button className='shadow-sm'>
                            <DollarSign className='mr-2 h-4 w-4' /> নতুন সমন্বয়
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    {adjustments.length === 0 ? (
                        <div className='flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/30'>
                            <FileText className='h-10 w-10 mb-2 opacity-50' />
                            <p>কোন সমন্বয় বা লেনদেন পাওয়া যায়নি</p>
                        </div>
                    ) : (
                        <>
                            {/* Mobile View (Cards) */}
                            <div className='grid grid-cols-1 gap-4 md:hidden'>
                                {adjustments.map((adjustment) => {
                                    const typeInfo =
                                        typeLabels[adjustment.type] || {};
                                    const isPositive =
                                        adjustment.type === 'BONUS' ||
                                        adjustment.type === 'OVERTIME';

                                    return (
                                        <div
                                            key={adjustment._id}
                                            className='bg-card rounded-xl border shadow-sm p-4 space-y-3 relative overflow-hidden'
                                        >
                                            <div
                                                className={`absolute top-0 left-0 w-1 h-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                                            ></div>

                                            <div className='flex justify-between items-start pl-2'>
                                                <div>
                                                    <h3 className='font-bold text-lg text-foreground flex items-center gap-2'>
                                                        <User className='h-4 w-4 text-muted-foreground' />
                                                        {adjustment.workerId
                                                            ?.name ||
                                                            'অজানা কর্মী'}
                                                    </h3>
                                                    <p className='text-xs text-muted-foreground flex items-center gap-1 mt-1'>
                                                        <Calendar className='h-3 w-3' />
                                                        {formatDate(
                                                            adjustment.createdAt
                                                        )}
                                                    </p>
                                                </div>
                                                <div className='text-right'>
                                                    <p
                                                        className={`text-xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}
                                                    >
                                                        {isPositive ? '+' : '-'}{' '}
                                                        ৳
                                                        {adjustment.amount.toLocaleString()}
                                                    </p>
                                                    <span
                                                        className={`text-[10px] px-2 py-0.5 rounded-full border ${getBadgeStyles(typeInfo.variant)}`}
                                                    >
                                                        {typeInfo.label ||
                                                            adjustment.type}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className='pl-2 pt-2 border-t border-dashed'>
                                                <div className='grid grid-cols-2 gap-2 text-sm'>
                                                    {adjustment.weeklySummaryId && (
                                                        <div className='flex flex-col'>
                                                            <span className='text-xs text-muted-foreground'>
                                                                সপ্তাহ
                                                            </span>
                                                            <span className='font-medium'>
                                                                {formatDate(
                                                                    adjustment
                                                                        .weeklySummaryId
                                                                        .weekStartDate
                                                                )}{' '}
                                                                -{' '}
                                                                {formatDate(
                                                                    adjustment
                                                                        .weeklySummaryId
                                                                        .weekEndDate
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {adjustment.reason && (
                                                        <div className='col-span-2 flex flex-col mt-1 bg-muted/50 p-2 rounded'>
                                                            <span className='text-xs text-muted-foreground font-semibold'>
                                                                কারণ:
                                                            </span>
                                                            <span className='text-sm text-foreground/80'>
                                                                {
                                                                    adjustment.reason
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className='flex justify-end pt-2 pl-2'>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant='ghost'
                                                            size='sm'
                                                            className='text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-3'
                                                        >
                                                            <Trash2 className='h-4 w-4 mr-1.5' />{' '}
                                                            মুছে ফেলুন
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                সতর্কতা
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                আপনি কি নিশ্চিত
                                                                যে আপনি এই
                                                                সমন্বয়টি মুছে
                                                                ফেলতে চান? এটি
                                                                আর ফিরিয়ে আনা
                                                                যাবে না।
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                বাতিল
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        adjustment.id ||
                                                                            adjustment._id
                                                                    )
                                                                }
                                                                className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                                            >
                                                                মুছে ফেলুন
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Desktop View (Table) */}
                            <div className='hidden md:block rounded-md border'>
                                <table className='w-full text-sm text-left'>
                                    <thead className='bg-muted/50 text-muted-foreground font-medium'>
                                        <tr>
                                            <th className='px-4 py-3'>
                                                কর্মীর তথ্য
                                            </th>
                                            <th className='px-4 py-3'>
                                                সপ্তাহের বিবরণ
                                            </th>
                                            <th className='px-4 py-3'>ধরন</th>
                                            <th className='px-4 py-3 text-right'>
                                                পরিমাণ
                                            </th>
                                            <th className='px-4 py-3'>কারণ</th>
                                            <th className='px-4 py-3 text-center'>
                                                অ্যাকশন
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y'>
                                        {adjustments.map((adjustment) => {
                                            const typeInfo =
                                                typeLabels[adjustment.type] ||
                                                {};
                                            const isPositive =
                                                adjustment.type === 'BONUS' ||
                                                adjustment.type === 'OVERTIME';

                                            return (
                                                <tr
                                                    key={adjustment._id}
                                                    className='bg-card hover:bg-muted/50 transition-colors'
                                                >
                                                    <td className='px-4 py-3'>
                                                        <div className='font-medium text-foreground'>
                                                            {adjustment.workerId
                                                                ?.name || 'N/A'}
                                                        </div>
                                                        <div className='text-xs text-muted-foreground'>
                                                            {formatDate(
                                                                adjustment.createdAt
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className='px-4 py-3 text-muted-foreground'>
                                                        {adjustment.weeklySummaryId ? (
                                                            <span className='bg-muted px-2 py-1 rounded text-xs'>
                                                                {formatDate(
                                                                    adjustment
                                                                        .weeklySummaryId
                                                                        .weekStartDate
                                                                )}{' '}
                                                                -{' '}
                                                                {formatDate(
                                                                    adjustment
                                                                        .weeklySummaryId
                                                                        .weekEndDate
                                                                )}
                                                            </span>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </td>
                                                    <td className='px-4 py-3'>
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyles(typeInfo.variant)}`}
                                                        >
                                                            {typeInfo.label ||
                                                                adjustment.type}
                                                        </span>
                                                    </td>
                                                    <td className='px-4 py-3 text-right font-mono font-medium'>
                                                        <span
                                                            className={
                                                                isPositive
                                                                    ? 'text-green-600'
                                                                    : 'text-red-600'
                                                            }
                                                        >
                                                            {isPositive
                                                                ? '+'
                                                                : '-'}{' '}
                                                            ৳
                                                            {adjustment.amount.toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className='px-4 py-3 max-w-[200px]'>
                                                        <p
                                                            className='truncate text-muted-foreground'
                                                            title={
                                                                adjustment.reason
                                                            }
                                                        >
                                                            {adjustment.reason ||
                                                                '-'}
                                                        </p>
                                                    </td>
                                                    <td className='px-4 py-3 text-center'>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant='ghost'
                                                                    size='icon'
                                                                    className='text-muted-foreground hover:text-destructive hover:bg-destructive/10'
                                                                >
                                                                    <Trash2 className='h-4 w-4' />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>
                                                                        নিশ্চিতকরণ
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        আপনি কি
                                                                        এই বেতন
                                                                        সমন্বয়
                                                                        রেকর্ডটি
                                                                        মুছে
                                                                        ফেলতে
                                                                        চান?
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>
                                                                        না
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                adjustment.id ||
                                                                                    adjustment._id
                                                                            )
                                                                        }
                                                                        className='bg-destructive hover:bg-destructive/90'
                                                                    >
                                                                        হ্যাঁ,
                                                                        মুছে
                                                                        ফেলুন
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default SalaryAdjustmentList;
