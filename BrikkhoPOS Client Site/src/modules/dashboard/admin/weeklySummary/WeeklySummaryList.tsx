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
    useDeleteWeeklySummaryMutation,
    useGetWeeklySummariesQuery,
    useUpdateWeeklySummaryMutation,
} from '@/redux/features/weeklySummary/weeklySummary.api';
import type { IWeeklySummary } from '@/types/weeklySummary.types';
import { CheckCircle, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const WeeklySummaryList = () => {
    const { data, isLoading, error } = useGetWeeklySummariesQuery();
    const [deleteWeeklySummary] = useDeleteWeeklySummaryMutation();
    const [updateWeeklySummary] = useUpdateWeeklySummaryMutation();

    const summaries = data?.data || [];

    const handleDelete = async (id: string) => {
        try {
            await deleteWeeklySummary(id).unwrap();
            toast.success('সাপ্তাহিক সারাংশ মুছে ফেলা হয়েছে');
        } catch (error) {
            console.error(error);
            toast.error('মুছতে ব্যর্থ');
        }
    };

    const handleMarkAsPaid = async (id: string) => {
        try {
            await updateWeeklySummary({ id, data: { isPaid: true } }).unwrap();
            toast.success('পরিশোধিত হিসেবে চিহ্নিত করা হয়েছে');
        } catch (error) {
            console.error(error);
            toast.error('আপডেট করতে ব্যর্থ');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">লোড হচ্ছে...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-destructive">ডেটা লোড করতে সমস্যা হয়েছে</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">
                                সাপ্তাহিক সারাংশ
                            </CardTitle>
                            <CardDescription>
                                মোট {summaries.length} টি সারাংশ
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Link to="/dashboard/admin/weekly-report">
                                <Button variant="outline">রিপোর্ট জেনারেট</Button>
                            </Link>
                            <Link to="/dashboard/admin/create-weekly-summary">
                                <Button>নতুন সারাংশ</Button>
                            </Link>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {summaries.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            কোন সাপ্তাহিক সারাংশ পাওয়া যায়নি
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>শ্রমিক</TableHead>
                                    <TableHead>সপ্তাহ</TableHead>
                                    <TableHead>কাজের দিন</TableHead>
                                    <TableHead>মোট বেতন</TableHead>
                                    <TableHead>স্ট্যাটাস</TableHead>
                                    <TableHead className="text-right">
                                        অ্যাকশন
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {summaries.map((summary: IWeeklySummary) => (
                                    <TableRow key={summary.id}>
                                        <TableCell className="font-medium">
                                            {summary.worker?.name || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                summary.weekStartDate
                                            ).toLocaleDateString('bn-BD')}{' '}
                                            -{' '}
                                            {new Date(
                                                summary.weekEndDate
                                            ).toLocaleDateString('bn-BD')}
                                        </TableCell>
                                        <TableCell>
                                            {summary.totalDaysWorked} দিন
                                        </TableCell>
                                        <TableCell>
                                            ৳{summary.totalSalary.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    summary.isPaid
                                                        ? 'success'
                                                        : 'warning'
                                                }
                                            >
                                                {summary.isPaid
                                                    ? 'পরিশোধিত'
                                                    : 'বকেয়া'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/dashboard/admin/weekly-summary/${summary.id}`}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>

                                                {!summary.isPaid && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleMarkAsPaid(
                                                                summary.id
                                                            )
                                                        }
                                                        title="পরিশোধিত হিসেবে চিহ্নিত করুন"
                                                    >
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                    </Button>
                                                )}

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-destructive hover:text-destructive"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                সারাংশ মুছে ফেলুন?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                এই সাপ্তাহিক সারাংশ
                                                                মুছে ফেললে তা আর
                                                                ফেরত পাবেন না।
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                বাতিল
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        summary.id
                                                                    )
                                                                }
                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            >
                                                                মুছে ফেলুন
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default WeeklySummaryList;
