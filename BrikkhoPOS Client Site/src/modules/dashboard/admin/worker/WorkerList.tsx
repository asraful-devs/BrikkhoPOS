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
                                কর্মীদের তালিকা
                            </CardTitle>
                            <CardDescription className='mt-1'>
                                মোট {workers.length} জন কর্মী
                            </CardDescription>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className='w-full lg:w-auto'
                        >
                            <Link to='/dashboard/admin/create-worker'>
                                <Button className='w-full lg:w-auto'>
                                    <Plus className='mr-2 h-4 w-4' />
                                    নতুন কর্মী যোগ করুন
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Table */}
                    {workers.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className='text-center py-12'
                        >
                            <p className='text-muted-foreground mb-4'>
                                এখনো কোন কর্মী যোগ করা হয়নি
                            </p>
                            <Link to='/dashboard/admin/create-worker'>
                                <Button>
                                    <Plus className='mr-2 h-4 w-4' />
                                    প্রথম কর্মী যোগ করুন
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
                                        {workers.map(
                                            (
                                                worker: IWorker,
                                                index: number
                                            ) => (
                                                <motion.tr
                                                    key={worker.id}
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
                                                        {worker.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {worker.phoneNumber ||
                                                            '-'}
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
                                                            {worker.status ===
                                                            'ACTIVE'
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
                                                                    className='hover:scale-110 transition-transform'
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
                                                                    className='hover:scale-110 transition-transform'
                                                                >
                                                                    <Edit className='h-4 w-4' />
                                                                </Button>
                                                            </Link>

                                                            {/* Soft Delete */}
                                                            <AlertDialogComponent
                                                                trigger={
                                                                    <Button
                                                                        variant='ghost'
                                                                        size='icon'
                                                                        className='hover:scale-110 transition-transform'
                                                                    >
                                                                        <UserX className='h-4 w-4' />
                                                                    </Button>
                                                                }
                                                                title='কর্মী নিষ্ক্রিয় করবেন?'
                                                                description={`${worker.name} কে নিষ্ক্রিয় করলে তারা তালিকা থেকে লুকানো হবে কিন্তু তাদের ডেটা সংরক্ষিত থাকবে।`}
                                                                confirmText='নিষ্ক্রিয় করুন'
                                                                onConfirm={() =>
                                                                    handleSoftDelete(
                                                                        worker.id
                                                                    )
                                                                }
                                                            />

                                                            {/* Permanent Delete */}
                                                            <AlertDialogComponent
                                                                trigger={
                                                                    <Button
                                                                        variant='ghost'
                                                                        size='icon'
                                                                        className='text-destructive hover:scale-110 transition-transform'
                                                                    >
                                                                        <Trash2 className='h-4 w-4' />
                                                                    </Button>
                                                                }
                                                                title='কর্মী স্থায়ীভাবে মুছে ফেলবেন?'
                                                                description={`এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না। ${worker.name} কে মুছে ফেললে তাদের সমস্ত ডেটা স্থায়ীভাবে মুছে যাবে।`}
                                                                confirmText='স্থায়ীভাবে মুছে ফেলুন'
                                                                onConfirm={() =>
                                                                    handleDelete(
                                                                        worker.id
                                                                    )
                                                                }
                                                                variant='destructive'
                                                            />
                                                        </div>
                                                    </TableCell>
                                                </motion.tr>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Mobile Card View */}
                            <div className='md:hidden space-y-4'>
                                {workers.map(
                                    (worker: IWorker, index: number) => (
                                        <motion.div
                                            key={worker.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: index * 0.1,
                                                duration: 0.3,
                                            }}
                                        >
                                            <Card className='shadow-sm hover:shadow-md transition-shadow'>
                                                <CardContent className='p-4'>
                                                    <div className='flex items-start justify-between mb-3'>
                                                        <div className='flex-1'>
                                                            <h3 className='font-semibold text-lg mb-1'>
                                                                {worker.name}
                                                            </h3>
                                                            <div className='space-y-1 text-sm text-muted-foreground'>
                                                                <p className='flex items-center gap-2'>
                                                                    <span>
                                                                        📱
                                                                    </span>
                                                                    {worker.phoneNumber ||
                                                                        'ফোন নম্বর নেই'}
                                                                </p>
                                                                <p className='flex items-center gap-2'>
                                                                    <span>
                                                                        💰
                                                                    </span>
                                                                    ৳
                                                                    {worker.dailySalary.toLocaleString()}{' '}
                                                                    / দিন
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Badge
                                                            variant={
                                                                worker.status ===
                                                                'ACTIVE'
                                                                    ? 'default'
                                                                    : 'secondary'
                                                            }
                                                        >
                                                            {worker.status ===
                                                            'ACTIVE'
                                                                ? 'সক্রিয়'
                                                                : 'নিষ্ক্রিয়'}
                                                        </Badge>
                                                    </div>

                                                    <div className='flex gap-2 pt-3 border-t'>
                                                        <Link
                                                            to={`/dashboard/admin/worker/${worker.id}`}
                                                            className='flex-1'
                                                        >
                                                            <Button
                                                                variant='outline'
                                                                size='sm'
                                                                className='w-full'
                                                            >
                                                                <Eye className='mr-2 h-4 w-4' />
                                                                দেখুন
                                                            </Button>
                                                        </Link>
                                                        <Link
                                                            to={`/dashboard/admin/edit-worker/${worker.id}`}
                                                            className='flex-1'
                                                        >
                                                            <Button
                                                                variant='outline'
                                                                size='sm'
                                                                className='w-full'
                                                            >
                                                                <Edit className='mr-2 h-4 w-4' />
                                                                সম্পাদনা
                                                            </Button>
                                                        </Link>
                                                        <AlertDialogComponent
                                                            trigger={
                                                                <Button
                                                                    variant='outline'
                                                                    size='sm'
                                                                >
                                                                    <UserX className='h-4 w-4' />
                                                                </Button>
                                                            }
                                                            title='কর্মী নিষ্ক্রিয় করবেন?'
                                                            description={`${worker.name} কে নিষ্ক্রিয় করলে তারা তালিকা থেকে লুকানো হবে কিন্তু তাদের ডেটা সংরক্ষিত থাকবে।`}
                                                            confirmText='নিষ্ক্রিয় করুন'
                                                            onConfirm={() =>
                                                                handleSoftDelete(
                                                                    worker.id
                                                                )
                                                            }
                                                        />
                                                        <AlertDialogComponent
                                                            trigger={
                                                                <Button
                                                                    variant='outline'
                                                                    size='sm'
                                                                    className='text-destructive border-destructive'
                                                                >
                                                                    <Trash2 className='h-4 w-4' />
                                                                </Button>
                                                            }
                                                            title='কর্মী স্থায়ীভাবে মুছে ফেলবেন?'
                                                            description={`এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না। ${worker.name} কে মুছে ফেললে তাদের সমস্ত ডেটা স্থায়ীভাবে মুছে যাবে।`}
                                                            confirmText='স্থায়ীভাবে মুছে ফেলুন'
                                                            onConfirm={() =>
                                                                handleDelete(
                                                                    worker.id
                                                                )
                                                            }
                                                            variant='destructive'
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    )
                                )}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default WorkerList;
