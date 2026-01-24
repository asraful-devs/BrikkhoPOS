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
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    useDeleteWorkerMutation,
    useGetWorkersQuery,
    useSoftDeleteWorkerMutation,
} from '@/redux/features/worker/worker.api';
import type { IWorker } from '@/types/worker.types';
import { Edit, Eye, Search, Trash2, UserX } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const WorkerList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, isLoading, error } = useGetWorkersQuery({
        searchTerm,
    });
    const [softDeleteWorker] = useSoftDeleteWorkerMutation();
    const [deleteWorker] = useDeleteWorkerMutation();

    const workers = data?.data?.data || [];

    const handleSoftDelete = async (id: string) => {
        try {
            await softDeleteWorker(id).unwrap();
            toast.success('শ্রমিক নিষ্ক্রিয় করা হয়েছে');
        } catch (error) {
            console.error(error);
            toast.error('শ্রমিক নিষ্ক্রিয় করতে ব্যর্থ');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteWorker(id).unwrap();
            toast.success('শ্রমিক সম্পূর্ণরূপে মুছে ফেলা হয়েছে');
        } catch (error) {
            console.error(error);
            toast.error('শ্রমিক মুছতে ব্যর্থ');
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
                            <CardTitle className="text-2xl">শ্রমিক তালিকা</CardTitle>
                            <CardDescription>
                                মোট {workers.length} জন শ্রমিক
                            </CardDescription>
                        </div>
                        <Link to="/dashboard/admin/create-worker">
                            <Button>নতুন শ্রমিক যোগ করুন</Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Search */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="শ্রমিক খুঁজুন..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    {workers.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            কোন শ্রমিক পাওয়া যায়নি
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>নাম</TableHead>
                                    <TableHead>ফোন</TableHead>
                                    <TableHead>দৈনিক বেতন</TableHead>
                                    <TableHead>স্ট্যাটাস</TableHead>
                                    <TableHead className="text-right">
                                        অ্যাকশন
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {workers.map((worker: IWorker) => (
                                    <TableRow key={worker.id}>
                                        <TableCell className="font-medium">
                                            {worker.name}
                                        </TableCell>
                                        <TableCell>
                                            {worker.phoneNumber || '-'}
                                        </TableCell>
                                        <TableCell>
                                            ৳{worker.dailySalary.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    worker.status === 'ACTIVE'
                                                        ? 'success'
                                                        : 'destructive'
                                                }
                                            >
                                                {worker.status === 'ACTIVE'
                                                    ? 'সক্রিয়'
                                                    : 'নিষ্ক্রিয়'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/dashboard/admin/worker/${worker.id}`}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link
                                                    to={`/dashboard/admin/edit-worker/${worker.id}`}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>

                                                {/* Soft Delete */}
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                        >
                                                            <UserX className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                শ্রমিক নিষ্ক্রিয় করুন?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                এই শ্রমিককে নিষ্ক্রিয়
                                                                করলে তাকে তালিকায়
                                                                দেখাবে না কিন্তু ডেটা
                                                                মুছে যাবে না।
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                বাতিল
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleSoftDelete(
                                                                        worker.id
                                                                    )
                                                                }
                                                            >
                                                                নিষ্ক্রিয় করুন
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                                {/* Permanent Delete */}
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
                                                                শ্রমিক মুছে ফেলুন?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                এই শ্রমিককে সম্পূর্ণরূপে
                                                                মুছে ফেললে তার সব ডেটা
                                                                চিরতরে হারিয়ে যাবে।
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                বাতিল
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        worker.id
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

export default WorkerList;
