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
    useDeleteWorkerMutation,
    useGetWorkersQuery,
    useSoftDeleteWorkerMutation,
} from '@/redux/features/worker/worker.api';
import type { IWorker } from '@/types/worker.types';
import { motion } from 'framer-motion';
import { Edit, Eye, Loader2, Plus, Trash2, UserX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const WorkerList = () => {
    const { data, isLoading, error } = useGetWorkersQuery({});
    const [softDeleteWorker] = useSoftDeleteWorkerMutation();
    const [deleteWorker] = useDeleteWorkerMutation();

    const workers: IWorker[] = data?.data || [];

    const handleSoftDelete = async (id: string) => {
        try {
            await softDeleteWorker(id).unwrap();
            toast.success('কর্মী সফলভাবে নিষ্ক্রিয় করা হয়েছে');
        } catch (error) {
            console.error(error);
            toast.error('কর্মী নিষ্ক্রিয় করতে ব্যর্থ হয়েছে');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteWorker(id).unwrap();
            toast.success('কর্মী স্থায়ীভাবে মুছে ফেলা হয়েছে');
        } catch (error) {
            console.error(error);
            toast.error('কর্মী মুছে ফেলতে ব্যর্থ হয়েছে');
        }
    };

    if (isLoading) {
        return (
            <div className='flex items-center justify-center min-h-100'>
                <div className='text-center'>
                    <Loader2 className='h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground' />
                    <p className='text-sm text-muted-foreground'>
                        কর্মীদের তালিকা লোড হচ্ছে...
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
                        কর্মীদের তালিকা আনতে ব্যর্থ হয়েছে
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
            className='container mx-auto px-4 py-6'
        >
            <Card className='shadow-sm'>
                <CardHeader>
                    <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4'>
                        <div>
                            <CardTitle className='text-2xl'>
                                কর্মীদের তালিকা
                            </CardTitle>
                            <CardDescription className='mt-1'>
                                মোট {workers.length} জন কর্মী
                            </CardDescription>
                        </div>
                        <Link to='/dashboard/admin/create-worker'>
                            <Button className='w-full lg:w-auto'>
                                <Plus className='mr-2 h-4 w-4' />
                                নতুন কর্মী যোগ করুন
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Table */}
                    {workers.length === 0 ? (
                        <div className='text-center py-12'>
                            <p className='text-muted-foreground mb-4'>
                                এখনো কোন কর্মী যোগ করা হয়নি
                            </p>
                            <Link to='/dashboard/admin/create-worker'>
                                <Button>
                                    <Plus className='mr-2 h-4 w-4' />
                                    প্রথম কর্মী যোগ করুন
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className='overflow-x-auto rounded-lg border'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>নাম</TableHead>
                                        <TableHead>ফোন</TableHead>
                                        <TableHead>দৈনিক বেতন</TableHead>
                                        <TableHead>অবস্থা</TableHead>
                                        <TableHead className='text-right'>
                                            কার্যক্রম
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {workers.map((worker: IWorker) => (
                                        <TableRow key={worker.id}>
                                            <TableCell className='font-medium'>
                                                {worker.name}
                                            </TableCell>
                                            <TableCell>
                                                {worker.phoneNumber || '-'}
                                            </TableCell>
                                            <TableCell>
                                                ৳
                                                {worker.dailySalary.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        worker.status ===
                                                        'ACTIVE'
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {worker.status === 'ACTIVE'
                                                        ? 'সক্রিয়'
                                                        : 'নিষ্ক্রিয়'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <div className='flex items-center justify-end gap-2'>
                                                    <Link
                                                        to={`/dashboard/admin/worker/${worker.id}`}
                                                    >
                                                        <Button
                                                            variant='ghost'
                                                            size='icon'
                                                        >
                                                            <Eye className='h-4 w-4' />
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        to={`/dashboard/admin/edit-worker/${worker.id}`}
                                                    >
                                                        <Button
                                                            variant='ghost'
                                                            size='icon'
                                                        >
                                                            <Edit className='h-4 w-4' />
                                                        </Button>
                                                    </Link>

                                                    {/* Soft Delete */}
                                                    <AlertDialog>
                                                        <AlertDialogTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant='ghost'
                                                                size='icon'
                                                            >
                                                                <UserX className='h-4 w-4' />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    কর্মী
                                                                    নিষ্ক্রিয়
                                                                    করবেন?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    {
                                                                        worker.name
                                                                    }
                                                                    কে
                                                                    নিষ্ক্রিয়
                                                                    করলে তারা
                                                                    তালিকা থেকে
                                                                    লুকানো হবে
                                                                    কিন্তু তাদের
                                                                    ডেটা
                                                                    সংরক্ষিত
                                                                    থাকবে।
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
                                                                    নিষ্ক্রিয়
                                                                    করুন
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>

                                                    {/* Permanent Delete */}
                                                    <AlertDialog>
                                                        <AlertDialogTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant='ghost'
                                                                size='icon'
                                                                className='text-destructive'
                                                            >
                                                                <Trash2 className='h-4 w-4' />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    কর্মী
                                                                    স্থায়ীভাবে
                                                                    মুছে ফেলবেন?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    এই কাজটি
                                                                    পূর্বাবস্থায়
                                                                    ফেরানো যাবে
                                                                    না।{' '}
                                                                    {
                                                                        worker.name
                                                                    }
                                                                    কে মুছে
                                                                    ফেললে তাদের
                                                                    সমস্ত ডেটা
                                                                    স্থায়ীভাবে
                                                                    মুছে যাবে।
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
                                                                    className='bg-destructive hover:bg-destructive/90'
                                                                >
                                                                    স্থায়ীভাবে
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
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default WorkerList;
