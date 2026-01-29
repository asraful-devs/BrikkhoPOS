import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useGetSingleWorkerQuery } from '@/redux/features/worker/worker.api';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Banknote,
    Calendar,
    CheckCircle2,
    Clock,
    Edit,
    Mail,
    MapPin,
    Phone,
    User,
    XCircle,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const WorkerDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetSingleWorkerQuery(id!);

    const worker = data?.data;

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
                    className='p-4 rounded-full bg-primary/10'
                >
                    <User className='h-12 w-12 text-primary' />
                </motion.div>
                <p className='text-lg text-muted-foreground'>
                    Loading worker details...
                </p>
            </motion.div>
        );
    }

    if (error || !worker) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className='flex flex-col items-center justify-center h-[60vh] gap-4'
            >
                <div className='p-4 rounded-full bg-destructive/10'>
                    <XCircle className='h-16 w-16 text-destructive' />
                </div>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold text-destructive mb-2'>
                        Worker Not Found
                    </h2>
                    <p className='text-muted-foreground'>
                        The requested worker could not be located
                    </p>
                </div>
                <Button variant='outline' onClick={() => navigate(-1)}>
                    <ArrowLeft className='mr-2 h-4 w-4' />
                    Go Back
                </Button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='container max-w-5xl mx-auto px-4 py-6 space-y-6'
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'
            >
                <Button
                    variant='ghost'
                    onClick={() => navigate(-1)}
                    className='hover:bg-primary/10 transition-colors'
                >
                    <ArrowLeft className='mr-2 h-4 w-4' />
                    Go Back
                </Button>
                <Link to={`/dashboard/admin/edit-worker/${worker.id}`}>
                    <Button className='w-full sm:w-auto bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-600/90 hover:to-cyan-600/90 shadow-lg hover:shadow-xl transition-all'>
                        <Edit className='mr-2 h-4 w-4' />
                        Edit Worker
                    </Button>
                </Link>
            </motion.div>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <Card className='border-2 shadow-xl hover:shadow-2xl transition-shadow duration-300'>
                    <CardHeader className='bg-linear-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border-b'>
                        <div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: 'spring' }}
                                className='flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary via-purple-500 to-pink-500 shadow-lg'
                            >
                                <User className='h-10 w-10 text-white' />
                            </motion.div>
                            <div className='flex-1'>
                                <CardTitle className='text-3xl md:text-4xl font-bold bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                                    {worker.name}
                                </CardTitle>
                                <CardDescription className='text-base mt-2'>
                                    Worker ID: {worker.id.slice(0, 8)}...
                                </CardDescription>
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Badge
                                    variant={
                                        worker.status === 'ACTIVE'
                                            ? 'default'
                                            : 'destructive'
                                    }
                                    className={`text-base px-4 py-2 ${
                                        worker.status === 'ACTIVE'
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : ''
                                    }`}
                                >
                                    {worker.status === 'ACTIVE' ? (
                                        <CheckCircle2 className='mr-2 h-4 w-4' />
                                    ) : (
                                        <XCircle className='mr-2 h-4 w-4' />
                                    )}
                                    {worker.status === 'ACTIVE'
                                        ? 'Active'
                                        : 'Inactive'}
                                </Badge>
                            </motion.div>
                        </div>
                    </CardHeader>
                    <CardContent className='pt-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className='space-y-6'
                            >
                                <div className='flex items-center gap-3 pb-4 border-b'>
                                    <div className='p-2 rounded-lg bg-blue-500/10'>
                                        <Phone className='h-5 w-5 text-blue-600' />
                                    </div>
                                    <h3 className='font-semibold text-xl'>
                                        Contact Information
                                    </h3>
                                </div>

                                <div className='space-y-4'>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className='flex items-center gap-4 p-4 rounded-lg bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800'
                                    >
                                        <div className='p-2 rounded-lg bg-green-100 dark:bg-green-900'>
                                            <Phone className='h-5 w-5 text-green-600' />
                                        </div>
                                        <div>
                                            <p className='text-xs text-muted-foreground'>
                                                Phone
                                            </p>
                                            <p className='font-medium'>
                                                {worker.phoneNumber ||
                                                    'Not provided'}
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className='flex items-center gap-4 p-4 rounded-lg bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800'
                                    >
                                        <div className='p-2 rounded-lg bg-blue-100 dark:bg-blue-900'>
                                            <Mail className='h-5 w-5 text-blue-600' />
                                        </div>
                                        <div>
                                            <p className='text-xs text-muted-foreground'>
                                                Email
                                            </p>
                                            <p className='font-medium'>
                                                {worker.email || 'Not provided'}
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className='flex items-center gap-4 p-4 rounded-lg bg-linear-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 border border-rose-200 dark:border-rose-800'
                                    >
                                        <div className='p-2 rounded-lg bg-rose-100 dark:bg-rose-900'>
                                            <MapPin className='h-5 w-5 text-rose-600' />
                                        </div>
                                        <div>
                                            <p className='text-xs text-muted-foreground'>
                                                Address
                                            </p>
                                            <p className='font-medium'>
                                                {worker.address ||
                                                    'Not provided'}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Salary & Additional Info */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className='space-y-6'
                            >
                                <div className='flex items-center gap-3 pb-4 border-b'>
                                    <div className='p-2 rounded-lg bg-emerald-500/10'>
                                        <Banknote className='h-5 w-5 text-emerald-600' />
                                    </div>
                                    <h3 className='font-semibold text-xl'>
                                        Salary & Details
                                    </h3>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className='p-6 rounded-xl bg-linear-to-br from-emerald-500 via-green-500 to-teal-500 text-white shadow-lg'
                                >
                                    <div className='flex items-center gap-3 mb-2'>
                                        <Banknote className='h-6 w-6' />
                                        <div className='text-sm font-medium opacity-90'>
                                            Daily Salary
                                        </div>
                                    </div>
                                    <div className='text-4xl font-bold'>
                                        ৳{worker.dailySalary.toLocaleString()}
                                    </div>
                                    <div className='text-sm opacity-80 mt-2'>
                                        Per working day
                                    </div>
                                </motion.div>

                                {worker.age && (
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className='flex items-center gap-4 p-4 rounded-lg bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800'
                                    >
                                        <div className='p-2 rounded-lg bg-amber-100 dark:bg-amber-900'>
                                            <Calendar className='h-5 w-5 text-amber-600' />
                                        </div>
                                        <div>
                                            <p className='text-xs text-muted-foreground'>
                                                Age
                                            </p>
                                            <p className='font-medium text-lg'>
                                                {worker.age} years
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        {/* Timestamps */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className='mt-8 pt-6 border-t'
                        >
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='flex items-center gap-3 p-4 rounded-lg bg-muted/50'>
                                    <Clock className='h-5 w-5 text-muted-foreground' />
                                    <div>
                                        <p className='text-xs text-muted-foreground'>
                                            Created
                                        </p>
                                        <p className='font-medium'>
                                            {new Date(
                                                worker.createdAt
                                            ).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3 p-4 rounded-lg bg-muted/50'>
                                    <Clock className='h-5 w-5 text-muted-foreground' />
                                    <div>
                                        <p className='text-xs text-muted-foreground'>
                                            Last Updated
                                        </p>
                                        <p className='font-medium'>
                                            {new Date(
                                                worker.updatedAt
                                            ).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default WorkerDetails;
