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
    useDeleteAttendanceMutation,
    useGetAttendancesQuery,
} from '@/redux/features/attendance/attendance.api';
import type { IAttendance } from '@/types/attendance.types';
import { Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const AttendanceList = () => {
    const { data, isLoading, error } = useGetAttendancesQuery();
    const [deleteAttendance] = useDeleteAttendanceMutation();

    const attendances = data?.data || [];

    const handleDelete = async (id: string) => {
        try {
            await deleteAttendance(id).unwrap();
            toast.success('হাজিরা মুছে ফেলা হয়েছে');
        } catch (error) {
            console.error(error);
            toast.error('হাজিরা মুছতে ব্যর্থ');
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
                            <CardTitle className="text-2xl">হাজিরা তালিকা</CardTitle>
                            <CardDescription>
                                মোট {attendances.length} টি হাজিরা রেকর্ড
                            </CardDescription>
                        </div>
                        <Link to="/dashboard/admin/create-attendance">
                            <Button>হাজিরা দিন</Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    {attendances.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            কোন হাজিরা রেকর্ড পাওয়া যায়নি
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>শ্রমিক</TableHead>
                                    <TableHead>তারিখ</TableHead>
                                    <TableHead>উপস্থিতি</TableHead>
                                    <TableHead>কাজের সময়</TableHead>
                                    <TableHead>নোট</TableHead>
                                    <TableHead className="text-right">
                                        অ্যাকশন
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attendances.map((attendance: IAttendance) => (
                                    <TableRow key={attendance.id}>
                                        <TableCell className="font-medium">
                                            {attendance.worker?.name || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                attendance.date
                                            ).toLocaleDateString('bn-BD')}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    attendance.isPresent
                                                        ? 'success'
                                                        : 'destructive'
                                                }
                                            >
                                                {attendance.isPresent
                                                    ? 'উপস্থিত'
                                                    : 'অনুপস্থিত'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {attendance.workHours || 0} ঘণ্টা
                                        </TableCell>
                                        <TableCell>
                                            {attendance.note || '-'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/dashboard/admin/edit-attendance/${attendance.id}`}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>

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
                                                                হাজিরা মুছে ফেলুন?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                এই হাজিরা রেকর্ড
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
                                                                        attendance.id
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

export default AttendanceList;
