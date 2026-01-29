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
import { motion } from 'framer-motion';
import { Edit, Eye, Loader2, Plus, Search, Trash2, UserX } from 'lucide-react';
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
            <div className='flex items-center justify-center min-h-100'>
                <div className='text-center'>
                    <Loader2 className='h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground' />
                    <p className='text-sm text-muted-foreground'>
                        Loading workers...
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
                        Error Loading Data
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                        Failed to fetch worker list
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
                                Worker List
                            </CardTitle>
                            <CardDescription className='mt-1'>
                                Total {workers.length} worker
                                {workers.length !== 1 ? 's' : ''}
                            </CardDescription>
                        </div>
                        <Link to='/dashboard/admin/create-worker'>
                            <Button className='w-full lg:w-auto'>
                                <Plus className='mr-2 h-4 w-4' />
                                Add New Worker
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Search */}
                    <div className='flex items-center gap-4 mb-6'>
                        <div className='relative flex-1 max-w-sm'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                            <Input
                                placeholder='Search workers...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='pl-9'
                            />
                        </div>
                    </div>

                    {/* Table */}
                    {workers.length === 0 ? (
                        <div className='text-center py-12'>
                            <p className='text-muted-foreground mb-4'>
                                {searchTerm
                                    ? 'No workers found matching your search'
                                    : 'No workers added yet'}
                            </p>
                            {!searchTerm && (
                                <Link to='/dashboard/admin/create-worker'>
                                    <Button>
                                        <Plus className='mr-2 h-4 w-4' />
                                        Add First Worker
                                    </Button>
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className='overflow-x-auto rounded-lg border'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Daily Salary</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className='text-right'>
                                            Actions
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
                                                        ? 'Active'
                                                        : 'Inactive'}
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
                                                                    Deactivate
                                                                    Worker?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Deactivating{' '}
                                                                    {
                                                                        worker.name
                                                                    }{' '}
                                                                    will hide
                                                                    them from
                                                                    the list but
                                                                    preserve
                                                                    their data.
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
                                                                className='text-destructive'
                                                            >
                                                                <Trash2 className='h-4 w-4' />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Delete
                                                                    Worker
                                                                    Permanently?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action
                                                                    cannot be
                                                                    undone.
                                                                    Deleting{' '}
                                                                    {
                                                                        worker.name
                                                                    }{' '}
                                                                    will
                                                                    permanently
                                                                    remove all
                                                                    their data.
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
