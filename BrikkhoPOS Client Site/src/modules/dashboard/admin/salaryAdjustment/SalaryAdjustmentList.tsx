import AlertDialogComponent from '@/components/common/AlertDialogComponent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import {
    useDeleteSalaryAdjustmentMutation,
    useGetSalaryAdjustmentsQuery,
} from '@/redux/features/salaryAdjustment/salaryAdjustment.api';
import { motion } from 'framer-motion';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import type { ISalaryAdjustment } from '../../../../types/salaryAdjustment.types';

const typeLabels: Record<
    string,
    { label: string; variant: 'default' | 'destructive' | 'secondary' }
> = {
    BONUS: { label: 'বোনাস', variant: 'default' },
    OVERTIME: { label: 'ওভারটাইম', variant: 'default' },
    DEDUCTION: { label: 'কর্তন', variant: 'destructive' },
    ADVANCE: { label: 'অগ্রিম', variant: 'secondary' },
};

const SalaryAdjustmentList = () => {
    const { data, isLoading, error } = useGetSalaryAdjustmentsQuery();
    const [deleteAdjustment] = useDeleteSalaryAdjustmentMutation();

    const adjustments: ISalaryAdjustment[] = data?.data || [];

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
            <div className='flex items-center justify-center min-h-100'>
                <div className='text-center'>
                    <Loader2 className='h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground' />
                    <p className='text-sm text-muted-foreground'>
                        তালিকা লোড হচ্ছে...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex items-center justify-center min-h-100'>
                <div className='text-center'>
                    <h2 className='text-lg font-semibold text-destructive mb-2'>
                        ডেটা লোড করতে সমস্যা
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                        সমন্বয় তালিকা আনতে ব্যর্থ হয়েছে
                    </p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='w-full px-4 py-6 max-w-400 mx-auto'
        >
            <Card className='shadow-sm'>
                <CardHeader>
                    <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4'>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <CardTitle className='text-2xl lg:text-3xl'>
                                বেতন সমন্বয় তালিকা
                            </CardTitle>
                            <CardDescription className='mt-1'>
                                মোট {adjustments.length} টি লেনদেন
                            </CardDescription>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className='w-full lg:w-auto'
                        >
                            <Link to='/dashboard/admin/add-salary-adjustment'>
                                <Button className='w-full lg:w-auto'>
                                    <Plus className='mr-2 h-4 w-4' />
                                    নতুন সমন্বয় যোগ করুন
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Table */}
                    {adjustments.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className='text-center py-12'
                        >
                            <p className='text-muted-foreground mb-4'>
                                এখনো কোন সমন্বয় যোগ করা হয়নি
                            </p>
                            <Link to='/dashboard/admin/add-salary-adjustment'>
                                <Button>
                                    <Plus className='mr-2 h-4 w-4' />
                                    প্রথম সমন্বয় যোগ করুন
                                </Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className='hidden md:block overflow-x-auto rounded-lg border'>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>কর্মী</TableHead>
                                            <TableHead>তারিখ</TableHead>
                                            <TableHead>ধরন</TableHead>
                                            <TableHead>পরিমাণ</TableHead>
                                            <TableHead>কারণ</TableHead>
                                            <TableHead className='text-right'>
                                                কার্যক্রম
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {adjustments.map(
                                            (
                                                adjustment: ISalaryAdjustment,
                                                index: number
                                            ) => {
                                                const typeInfo =
                                                    typeLabels[
                                                        adjustment.type
                                                    ] || {};
                                                const isPositive =
                                                    adjustment.type ===
                                                        'BONUS' ||
                                                    adjustment.type ===
                                                        'OVERTIME';

                                                return (
                                                    <motion.tr
                                                        key={adjustment.id}
                                                        initial={{
                                                            opacity: 0,
                                                            y: 20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            delay: index * 0.05,
                                                            duration: 0.3,
                                                        }}
                                                        className='border-b transition-colors hover:bg-muted/50'
                                                    >
                                                        <TableCell className='font-medium'>
                                                            {adjustment.workerId
                                                                ?.name ||
                                                                'অজানা কর্মী'}
                                                        </TableCell>
                                                        <TableCell>
                                                            {formatDate(
                                                                adjustment.createdAt
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant={
                                                                    typeInfo.variant
                                                                }
                                                            >
                                                                {typeInfo.label ||
                                                                    adjustment.type}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <span
                                                                className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}
                                                            >
                                                                {isPositive
                                                                    ? '+'
                                                                    : '-'}{' '}
                                                                ৳
                                                                {adjustment.amount.toLocaleString()}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className='max-w-xs truncate'>
                                                            {adjustment.reason ||
                                                                '-'}
                                                        </TableCell>
                                                        <TableCell className='text-right'>
                                                            <AlertDialogComponent
                                                                trigger={
                                                                    <Button
                                                                        variant='ghost'
                                                                        size='icon'
                                                                        className='hover:scale-110 transition-transform'
                                                                    >
                                                                        <Trash2 className='h-4 w-4' />
                                                                    </Button>
                                                                }
                                                                title='সমন্বয় মুছে ফেলবেন?'
                                                                description={`আপনি কি নিশ্চিত যে এই লেনদেনটি মুছে ফেলতে চান? এটি আর ফিরিয়ে আনা যাবে না।`}
                                                                confirmText='মুছে ফেলুন'
                                                                onConfirm={() =>
                                                                    handleDelete(
                                                                        adjustment.id ||
                                                                            adjustment.id
                                                                    )
                                                                }
                                                            />
                                                        </TableCell>
                                                    </motion.tr>
                                                );
                                            }
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Mobile Card View */}
                            <div className='md:hidden space-y-4'>
                                {adjustments.map(
                                    (
                                        adjustment: ISalaryAdjustment,
                                        index: number
                                    ) => {
                                        const typeInfo =
                                            typeLabels[adjustment.type] || {};
                                        const isPositive =
                                            adjustment.type === 'BONUS' ||
                                            adjustment.type === 'OVERTIME';

                                        return (
                                            <motion.div
                                                key={adjustment.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: index * 0.05,
                                                    duration: 0.3,
                                                }}
                                                className='bg-card border rounded-lg p-4 space-y-3'
                                            >
                                                <div className='flex justify-between items-start'>
                                                    <div>
                                                        <h3 className='font-semibold text-lg'>
                                                            {adjustment.workerId
                                                                ?.name ||
                                                                'অজানা কর্মী'}
                                                        </h3>
                                                        <p className='text-sm text-muted-foreground'>
                                                            {formatDate(
                                                                adjustment.createdAt
                                                            )}
                                                        </p>
                                                    </div>
                                                    <Badge
                                                        variant={
                                                            typeInfo.variant
                                                        }
                                                    >
                                                        {typeInfo.label ||
                                                            adjustment.type}
                                                    </Badge>
                                                </div>

                                                <div className='flex justify-between items-center pt-2 border-t'>
                                                    <span
                                                        className={`text-xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}
                                                    >
                                                        {isPositive ? '+' : '-'}{' '}
                                                        ৳
                                                        {adjustment.amount.toLocaleString()}
                                                    </span>

                                                    <AlertDialogComponent
                                                        trigger={
                                                            <Button
                                                                variant='ghost'
                                                                size='sm'
                                                                className='text-destructive'
                                                            >
                                                                <Trash2 className='h-4 w-4 mr-1' />
                                                                মুছুন
                                                            </Button>
                                                        }
                                                        title='সমন্বয় মুছে ফেলবেন?'
                                                        description='এই লেনদেনটি স্থায়ীভাবে মুছে ফেলা হবে।'
                                                        confirmText='মুছে ফেলুন'
                                                        onConfirm={() =>
                                                            handleDelete(
                                                                adjustment.id ||
                                                                    adjustment.id
                                                            )
                                                        }
                                                    />
                                                </div>

                                                {adjustment.reason && (
                                                    <p className='text-sm text-muted-foreground bg-muted/50 p-2 rounded'>
                                                        {adjustment.reason}
                                                    </p>
                                                )}
                                            </motion.div>
                                        );
                                    }
                                )}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default SalaryAdjustmentList;
