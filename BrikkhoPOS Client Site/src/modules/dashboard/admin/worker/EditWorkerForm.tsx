import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    useGetSingleWorkerQuery,
    useUpdateWorkerMutation,
} from '@/redux/features/worker/worker.api';
import { workerZod } from '@/zod/worker.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Banknote,
    Calendar,
    CheckCircle2,
    Edit2,
    Loader2,
    Mail,
    MapPin,
    Phone,
    User,
    XCircle,
} from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof workerZod.updateWorkerSchema>;

const EditWorkerForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: workerData, isLoading: isLoadingWorker } =
        useGetSingleWorkerQuery(id!);
    const [updateWorker, { isLoading: isUpdating }] = useUpdateWorkerMutation();

    const worker = workerData?.data;

    const form = useForm<FormData>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(workerZod.updateWorkerSchema) as any,
        defaultValues: {
            name: '',
            phoneNumber: '',
            dailySalary: 0,
            address: '',
            age: 0,
            email: '',
            status: 'ACTIVE',
        },
    });

    useEffect(() => {
        if (worker) {
            form.reset({
                name: worker.name,
                phoneNumber: worker.phoneNumber || '',
                dailySalary: worker.dailySalary,
                address: worker.address || '',
                age: worker.age || 0,
                email: worker.email || '',
                status: worker.status,
            });
        }
    }, [worker, form]);

    const onSubmit = async (data: FormData) => {
        try {
            await updateWorker({ id: id!, data }).unwrap();
            toast.success('Worker information updated successfully');
            navigate('/dashboard/admin/worker-list');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update worker');
        }
    };

    if (isLoadingWorker) {
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
                    Loading worker data...
                </p>
            </motion.div>
        );
    }

    if (!worker) {
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
            className='container max-w-4xl mx-auto px-4 py-6'
        >
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className='mb-6'
            >
                <Button
                    variant='ghost'
                    onClick={() => navigate(-1)}
                    className='mb-4 hover:bg-primary/10 transition-colors'
                >
                    <ArrowLeft className='mr-2 h-4 w-4' />
                    Go Back
                </Button>
                <div className='flex items-center gap-3 mb-2'>
                    <div className='p-3 rounded-xl bg-linear-to-br from-blue-500/20 via-cyan-500/10 to-transparent'>
                        <Edit2 className='h-6 w-6 text-blue-600' />
                    </div>
                    <div>
                        <h1 className='text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent'>
                            Edit Worker
                        </h1>
                        <p className='text-muted-foreground mt-1'>
                            Update {worker.name}'s information
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <Card className='border-2 shadow-xl hover:shadow-2xl transition-shadow duration-300'>
                    <CardHeader className='bg-linear-to-r from-blue-500/5 via-cyan-500/5 to-teal-500/5 border-b'>
                        <CardTitle className='text-2xl flex items-center gap-2'>
                            <Edit2 className='h-6 w-6 text-blue-600' />
                            Worker Information
                        </CardTitle>
                        <CardDescription>
                            Update worker details below
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='pt-6'>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-6'
                            >
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name='name'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='flex items-center gap-2 text-base'>
                                                        <User className='h-4 w-4 text-primary' />
                                                        Full Name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Worker's full name"
                                                            className='h-11 border-2 focus:border-primary transition-colors'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription className='sr-only'>
                                                        Worker's complete name
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name='phoneNumber'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='flex items-center gap-2 text-base'>
                                                        <Phone className='h-4 w-4 text-green-600' />
                                                        Phone Number
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='01XXXXXXXXX'
                                                            type='tel'
                                                            className='h-11 border-2 focus:border-green-500 transition-colors'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name='dailySalary'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='flex items-center gap-2 text-base'>
                                                        <Banknote className='h-4 w-4 text-emerald-600' />
                                                        Daily Salary (৳)
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className='relative'>
                                                            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold'>
                                                                ৳
                                                            </span>
                                                            <Input
                                                                placeholder='500'
                                                                type='number'
                                                                min='0'
                                                                className='h-11 pl-8 border-2 focus:border-emerald-500 transition-colors'
                                                                {...field}
                                                                onChange={(e) =>
                                                                    field.onChange(
                                                                        e.target
                                                                            .valueAsNumber
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name='address'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='flex items-center gap-2 text-base'>
                                                        <MapPin className='h-4 w-4 text-rose-600' />
                                                        Address
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Home address'
                                                            className='h-11 border-2 focus:border-rose-500 transition-colors'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name='age'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='flex items-center gap-2 text-base'>
                                                        <Calendar className='h-4 w-4 text-amber-600' />
                                                        Age
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='25'
                                                            type='number'
                                                            min='0'
                                                            className='h-11 border-2 focus:border-amber-500 transition-colors'
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    e.target
                                                                        .valueAsNumber
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name='email'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='flex items-center gap-2 text-base'>
                                                        <Mail className='h-4 w-4 text-indigo-600' />
                                                        Email
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='example@email.com'
                                                            type='email'
                                                            className='h-11 border-2 focus:border-indigo-500 transition-colors'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 }}
                                >
                                    <FormField
                                        control={form.control}
                                        name='status'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='flex items-center gap-2 text-base'>
                                                    <CheckCircle2 className='h-4 w-4 text-green-600' />
                                                    Status
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className='h-11 border-2 focus:border-green-500'>
                                                            <SelectValue placeholder='Select status' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value='ACTIVE'>
                                                            <div className='flex items-center gap-2'>
                                                                <CheckCircle2 className='h-4 w-4 text-green-600' />
                                                                Active
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value='INACTIVE'>
                                                            <div className='flex items-center gap-2'>
                                                                <XCircle className='h-4 w-4 text-red-600' />
                                                                Inactive
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 }}
                                    className='flex flex-col sm:flex-row gap-3 pt-4'
                                >
                                    <Button
                                        type='submit'
                                        className='flex-1 h-11 bg-linear-to-r from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-600/90 hover:via-cyan-600/90 hover:to-teal-600/90 transition-all duration-300 shadow-lg hover:shadow-xl'
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        ease: 'linear',
                                                    }}
                                                    className='mr-2'
                                                >
                                                    <Loader2 className='h-4 w-4' />
                                                </motion.div>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className='mr-2 h-4 w-4' />
                                                Update Worker
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        type='button'
                                        variant='outline'
                                        onClick={() => navigate(-1)}
                                        className='h-11 border-2 hover:bg-muted transition-colors'
                                    >
                                        Cancel
                                    </Button>
                                </motion.div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default EditWorkerForm;
