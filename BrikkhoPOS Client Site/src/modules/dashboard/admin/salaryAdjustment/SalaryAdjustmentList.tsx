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
import type { ISalaryAdjustment } from '@/types/salaryAdjustment.types';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const typeLabels: Record<
    string,
    { label: string; variant: 'success' | 'destructive' | 'warning' }
> = {
    BONUS: { label: 'বোনাস', variant: 'success' },
    OVERTIME: { label: 'ওভারটাইম', variant: 'success' },
    DEDUCTION: { label: 'কর্তন', variant: 'destructive' },
    ADVANCE: { label: 'অগ্রিম', variant: 'warning' },
};

const SalaryAdjustmentList = () => {
    const { data, isLoading, error } = useGetSalaryAdjustmentsQuery();
    const [deleteAdjustment] = useDeleteSalaryAdjustmentMutation();

    const adjustments = data?.data || [];

    const handleDelete = async (id: string) => {
        try {
            await deleteAdjustment(id).unwrap();
            toast.success('সমন্বয় মুছে ফেলা হয়েছে');
        } catch (error) {
            console.error(error);
            toast.error('মুছতে ব্যর্থ');
        }
    };

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-64'>
                <div className='text-muted-foreground'>লোড হচ্ছে...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex items-center justify-center h-64'>
                <div className='text-destructive'>
                    ডেটা লোড করতে সমস্যা হয়েছে
                </div>
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            <Card>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <div>
                            <CardTitle className='text-2xl'>
                                বেতন সমন্বয়
                            </CardTitle>
                            <CardDescription>
                                মোট {adjustments.length} টি সমন্বয়
                            </CardDescription>
                        </div>
                        <Link to='/dashboard/admin/add-salary-adjustment'>
                            <Button>নতুন সমন্বয়</Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    {adjustments.length === 0 ? (
                        <div className='text-center py-12 text-muted-foreground'>
                            কোন সমন্বয় পাওয়া যায়নি
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>সারাংশ আইডি</TableHead>
                                    <TableHead>ধরন</TableHead>
                                    <TableHead>পরিমাণ</TableHead>
                                    <TableHead>কারণ</TableHead>
                                    <TableHead>তারিখ</TableHead>
                                    <TableHead className='text-right'>
                                        অ্যাকশন
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {adjustments.map(
                                    (adjustment: ISalaryAdjustment) => (
                                        <TableRow key={adjustment.id}>
                                            <TableCell className='font-mono text-xs'>
                                                {adjustment.weeklySummaryId.slice(
                                                    0,
                                                    8
                                                )}
                                                ...
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        typeLabels[
                                                            adjustment.type
                                                        ]?.variant || 'default'
                                                    }
                                                >
                                                    {typeLabels[adjustment.type]
                                                        ?.label ||
                                                        adjustment.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell
                                                className={`font-semibold ${
                                                    adjustment.type ===
                                                        'BONUS' ||
                                                    adjustment.type ===
                                                        'OVERTIME'
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                }`}
                                            >
                                                {adjustment.type === 'BONUS' ||
                                                adjustment.type === 'OVERTIME'
                                                    ? '+'
                                                    : '-'}
                                                ৳
                                                {adjustment.amount.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                {adjustment.reason || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    adjustment.createdAt
                                                ).toLocaleDateString('bn-BD')}
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant='ghost'
                                                            size='icon'
                                                            className='text-destructive hover:text-destructive'
                                                        >
                                                            <Trash2 className='h-4 w-4' />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                সমন্বয় মুছে
                                                                ফেলুন?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                এই সমন্বয় মুছে
                                                                ফেললে তা আর ফেরত
                                                                পাবেন না।
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                বাতিল
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        adjustment.id
                                                                    )
                                                                }
                                                                className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                                            >
                                                                মুছে ফেলুন
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default SalaryAdjustmentList;
