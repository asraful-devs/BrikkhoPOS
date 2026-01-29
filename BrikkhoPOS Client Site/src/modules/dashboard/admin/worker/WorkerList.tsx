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
import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertTriangle,
    Edit,
    Eye,
    Loader2,
    Plus,
    Search,
    Trash2,
    UserX,
    Users,
} from 'lucide-react';
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
            toast.success('Worker deactivated successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to deactivate worker');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteWorker(id).unwrap();
            toast.success('Worker deleted permanently');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete worker');
        }
    };

    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex flex-col items-center justify-center h-[60vh] gap-4'
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    <Loader2 className='h-12 w-12 text-primary' />
                </motion.div>
                <p className='text-lg text-muted-foreground'>
                    Loading workers...
                </p>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className='flex flex-col items-center justify-center h-[60vh] gap-4'
            >
                <div className='p-4 rounded-full bg-destructive/10'>
                    <AlertTriangle className='h-16 w-16 text-destructive' />
                </div>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold text-destructive mb-2'>
                        Error Loading Data
                    </h2>
                    <p className='text-muted-foreground'>
                        Failed to fetch worker list
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='container mx-auto px-4 py-6 space-y-6'
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <Card className='border-2 shadow-xl hover:shadow-2xl transition-shadow duration-300'>
                    <CardHeader className='bg-linear-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border-b'>
                        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4'>
                            <div className='flex items-center gap-3'>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className='p-3 rounded-xl bg-linear-to-br from-primary via-purple-500 to-pink-500'
                                >
                                    <Users className='h-6 w-6 text-white' />
                                </motion.div>
                                <div>
                                    <CardTitle className='text-2xl md:text-3xl font-bold bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                                        Worker List
                                    </CardTitle>
                                    <CardDescription className='text-base mt-1'>
                                        Total {workers.length} worker
                                        {workers.length !== 1 ? 's' : ''}
                                    </CardDescription>
                                </div>
                            </div>
                            <Link to='/dashboard/admin/create-worker'>
                                <Button className='w-full lg:w-auto bg-linear-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 shadow-lg hover:shadow-xl transition-all'>
                                    <Plus className='mr-2 h-4 w-4' />
                                    Add New Worker
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className='pt-6'>
                        {/* Search */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className='flex items-center gap-4 mb-6'
                        >
                            <div className='relative flex-1 max-w-md'>
                                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
                                <Input
                                    placeholder='Search workers...'
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className='pl-10 h-11 border-2 focus:border-primary transition-colors'
                                />
                            </div>
                        </motion.div>

                        {/* Table */}
                        {workers.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className='text-center py-16'
                            >
                                <div className='flex flex-col items-center gap-4'>
                                    <div className='p-4 rounded-full bg-muted'>
                                        <Users className='h-12 w-12 text-muted-foreground' />
                                    </div>
                                    <div>
                                        <h3 className='text-xl font-semibold mb-2'>
                                            No Workers Found
                                        </h3>
                                        <p className='text-muted-foreground'>
                                            {searchTerm
                                                ? 'Try a different search term'
                                                : 'Add your first worker to get started'}
                                        </p>
                                    </div>
                                    {!searchTerm && (
                                        <Link to='/dashboard/admin/create-worker'>
                                            <Button className='mt-2'>
                                                <Plus className='mr-2 h-4 w-4' />
                                                Add Worker
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className='overflow-x-auto rounded-lg border'
                            >
                                <Table>
                                    <TableHeader>
                                        <TableRow className='bg-muted/50 hover:bg-muted/70'>
                                            <TableHead className='font-bold'>
                                                Name
                                            </TableHead>
                                            <TableHead className='font-bold'>
                                                Phone
                                            </TableHead>
                                            <TableHead className='font-bold'>
                                                Daily Salary
                                            </TableHead>
                                            <TableHead className='font-bold'>
                                                Status
                                            </TableHead>
                                            <TableHead className='text-right font-bold'>
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <AnimatePresence>
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
                                                        exit={{
                                                            opacity: 0,
                                                            x: -100,
                                                        }}
                                                        transition={{
                                                            delay: index * 0.05,
                                                        }}
                                                        className='border-b hover:bg-muted/50 transition-colors'
                                                    >
                                                        <TableCell className='font-medium'>
                                                            <div className='flex items-center gap-3'>
                                                                <div className='h-10 w-10 rounded-full bg-linear-to-br from-primary to-purple-500 flex items-center justify-center text-white font-semibold'>
                                                                    {worker.name
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase()}
                                                                </div>
                                                                <span>
                                                                    {
                                                                        worker.name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            {worker.phoneNumber ||
                                                                '-'}
                                                        </TableCell>
                                                        <TableCell>
                                                            <span className='font-semibold text-emerald-600'>
                                                                ৳
                                                                {worker.dailySalary.toLocaleString()}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant={
                                                                    worker.status ===
                                                                    'ACTIVE'
                                                                        ? 'default'
                                                                        : 'destructive'
                                                                }
                                                                className={`${
                                                                    worker.status ===
                                                                    'ACTIVE'
                                                                        ? 'bg-green-600 hover:bg-green-700'
                                                                        : ''
                                                                }`}
                                                            >
                                                                {worker.status ===
                                                                'ACTIVE'
                                                                    ? 'Active'
                                                                    : 'Inactive'}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className='text-right'>
                                                            <div className='flex items-center justify-end gap-1'>
                                                                <Link
                                                                    to={`/dashboard/admin/worker/${worker.id}`}
                                                                >
                                                                    <Button
                                                                        variant='ghost'
                                                                        size='icon'
                                                                        className='hover:bg-blue-100 hover:text-blue-600 transition-colors'
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
                                                                        className='hover:bg-amber-100 hover:text-amber-600 transition-colors'
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
                                                                            className='hover:bg-orange-100 hover:text-orange-600 transition-colors'
                                                                        >
                                                                            <UserX className='h-4 w-4' />
                                                                        </Button>
                                                                    </AlertDialogTrigger>
                                                                    <AlertDialogContent>
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle className='flex items-center gap-2'>
                                                                                <UserX className='h-5 w-5 text-orange-600' />
                                                                                Deactivate
                                                                                Worker?
                                                                            </AlertDialogTitle>
                                                                            <AlertDialogDescription className='text-base'>
                                                                                Deactivating{' '}
                                                                                <strong>
                                                                                    {
                                                                                        worker.name
                                                                                    }
                                                                                </strong>{' '}
                                                                                will
                                                                                hide
                                                                                them
                                                                                from
                                                                                the
                                                                                list
                                                                                but
                                                                                preserve
                                                                                their
                                                                                data.
                                                                                You
                                                                                can
                                                                                reactivate
                                                                                them
                                                                                later.
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel>
                                                                                Cancel
                                                                            </AlertDialogCancel>
                                                                            <AlertDialogAction
                                                                                onClick={() =>
                                                                                    handleSoftDelete(
                                                                                        worker.id
                                                                                    )
                                                                                }
                                                                                className='bg-orange-600 hover:bg-orange-700'
                                                                            >
                                                                                Deactivate
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
                                                                            className='text-destructive hover:text-destructive hover:bg-red-100 transition-colors'
                                                                        >
                                                                            <Trash2 className='h-4 w-4' />
                                                                        </Button>
                                                                    </AlertDialogTrigger>
                                                                    <AlertDialogContent>
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle className='flex items-center gap-2 text-destructive'>
                                                                                <AlertTriangle className='h-5 w-5' />
                                                                                Delete
                                                                                Worker
                                                                                Permanently?
                                                                            </AlertDialogTitle>
                                                                            <AlertDialogDescription className='text-base'>
                                                                                This
                                                                                action{' '}
                                                                                <strong>
                                                                                    cannot
                                                                                    be
                                                                                    undone
                                                                                </strong>

                                                                                .
                                                                                Deleting{' '}
                                                                                <strong>
                                                                                    {
                                                                                        worker.name
                                                                                    }
                                                                                </strong>{' '}
                                                                                will
                                                                                permanently
                                                                                remove
                                                                                all
                                                                                their
                                                                                data
                                                                                from
                                                                                the
                                                                                system.
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel>
                                                                                Cancel
                                                                            </AlertDialogCancel>
                                                                            <AlertDialogAction
                                                                                onClick={() =>
                                                                                    handleDelete(
                                                                                        worker.id
                                                                                    )
                                                                                }
                                                                                className='bg-destructive hover:bg-destructive/90'
                                                                            >
                                                                                Delete
                                                                                Permanently
                                                                            </AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                    </AlertDialogContent>
                                                                </AlertDialog>
                                                            </div>
                                                        </TableCell>
                                                    </motion.tr>
                                                )
                                            )}
                                        </AnimatePresence>
                                    </TableBody>
                                </Table>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default WorkerList;
