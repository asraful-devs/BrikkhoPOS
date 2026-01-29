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
import { useCreateWorkerMutation } from '@/redux/features/worker/worker.api';
import { workerZod } from '@/zod/worker.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Banknote, Phone, Sparkles, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof workerZod.createWorkerSchema>;

const CreateWorkerForm = () => {
    const [createWorker, { isLoading }] = useCreateWorkerMutation();
    const navigate = useNavigate();

    const form = useForm<FormData>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(workerZod.createWorkerSchema) as any,
        defaultValues: {
            name: '',
            phoneNumber: '',
            dailySalary: 0,
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await createWorker(data).unwrap();
            toast.success('Worker created successfully');
            navigate('/dashboard/admin/worker-list');
        } catch (error) {
            console.error(error);
            toast.error('Failed to create worker');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='container max-w-3xl mx-auto px-4 py-6'
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
                    <div className='p-3 rounded-xl bg-linear-to-br from-primary/20 via-primary/10 to-transparent'>
                        <Sparkles className='h-6 w-6 text-primary' />
                    </div>
                    <div>
                        <h1 className='text-3xl md:text-4xl font-bold bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                            Add New Worker
                        </h1>
                        <p className='text-muted-foreground mt-1'>
                            Fill in the worker information below
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
                    <CardHeader className='bg-linear-to-r from-primary/5 via-purple-500/5 to-pink-500/5 border-b'>
                        <CardTitle className='text-2xl flex items-center gap-2'>
                            <User className='h-6 w-6 text-primary' />
                            Worker Information
                        </CardTitle>
                        <CardDescription>
                            Provide accurate worker details for record keeping
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='pt-6'>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-6'
                            >
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
                                                    Full Name *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter worker's full name"
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
                                                <FormDescription className='sr-only'>
                                                    Worker's mobile number
                                                </FormDescription>
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
                                                    Daily Salary (৳) *
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
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormDescription className='sr-only'>
                                                    Daily salary in BDT
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className='flex flex-col sm:flex-row gap-3 pt-4'
                                >
                                    <Button
                                        type='submit'
                                        className='flex-1 h-11 bg-linear-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 transition-all duration-300 shadow-lg hover:shadow-xl'
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
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
                                                    <Sparkles className='h-4 w-4' />
                                                </motion.div>
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className='mr-2 h-4 w-4' />
                                                Create Worker
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

export default CreateWorkerForm;
