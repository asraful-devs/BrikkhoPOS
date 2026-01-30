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
import { ArrowLeft, Loader2 } from 'lucide-react';
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
            toast.success('কর্মীর তথ্য সফলভাবে আপডেট করা হয়েছে');
            navigate('/dashboard/admin/worker-list');
        } catch (error) {
            console.error(error);
            toast.error('কর্মীর তথ্য আপডেট করতে ব্যর্থ হয়েছে');
        }
    };

    if (isLoadingWorker) {
        return (
            <div className='flex items-center justify-center min-h-100'>
                <div className='text-center'>
                    <Loader2 className='h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground' />
                    <p className='text-sm text-muted-foreground'>
                        কর্মীর তথ্য লোড হচ্ছে...
                    </p>
                </div>
            </div>
        );
    }

    if (!worker) {
        return (
            <div className='flex items-center justify-center min-h-100'>
                <div className='text-center'>
                    <h2 className='text-lg font-semibold mb-2'>
                        কর্মী পাওয়া যায়নি
                    </h2>
                    <p className='text-sm text-muted-foreground mb-4'>
                        অনুরোধিত কর্মীর অবস্থান নির্ণয় করা যায়নি
                    </p>
                    <Button variant='outline' onClick={() => navigate(-1)}>
                        <ArrowLeft className='mr-2 h-4 w-4' />
                        ফিরে যান
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='container max-w-4xl mx-auto px-4 py-6'
        >
            <Button
                variant='outline'
                onClick={() => navigate(-1)}
                className='mb-6'
            >
                <ArrowLeft className='mr-2 h-4 w-4' />
                ফিরে যান
            </Button>

            <div className='mb-6'>
                <h1 className='text-3xl font-bold text-foreground'>
                    কর্মী সম্পাদনা
                </h1>
                <p className='text-muted-foreground mt-2'>
                    {worker.name}এর তথ্য আপডেট করুন
                </p>
            </div>

            <Card className='shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-xl'>কর্মীর তথ্য</CardTitle>
                    <CardDescription>
                        নিচে কর্মীর বিবরণ আপডেট করুন
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-6'
                        >
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>সম্পূর্ণ নাম</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='কর্মীর সম্পূর্ণ নাম'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='phoneNumber'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ফোন নম্বর</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='01XXXXXXXXX'
                                                    type='tel'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='dailySalary'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                দৈনিক বেতন (৳)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='৫০০'
                                                    type='number'
                                                    min='0'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='address'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ঠিকানা</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='বাসার ঠিকানা'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='age'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>বয়স</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='২৫'
                                                    type='number'
                                                    min='0'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ইমেইল</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='example@email.com'
                                                    type='email'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name='status'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>অবস্থা</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='অবস্থা নির্বাচন করুন' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='ACTIVE'>
                                                    সক্রিয়
                                                </SelectItem>
                                                <SelectItem value='INACTIVE'>
                                                    নিষ্ক্রিয়
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='flex flex-col sm:flex-row gap-3 pt-4'>
                                <Button
                                    type='submit'
                                    className='flex-1'
                                    disabled={isUpdating}
                                >
                                    {isUpdating
                                        ? 'আপডেট হচ্ছে...'
                                        : 'কর্মী আপডেট করুন'}
                                </Button>
                                <Button
                                    type='button'
                                    variant='outline'
                                    onClick={() => navigate(-1)}
                                >
                                    বাতিল
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default EditWorkerForm;
