import InputComponents from '@/components/common/InputComponents';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import {
    useGetSingleAttendanceQuery,
    useUpdateAttendanceMutation,
} from '@/redux/features/attendance/attendance.api';
import { attendanceZod } from '@/zod/attendance.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof attendanceZod.updateAttendanceSchema>;

const EditAttendance = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: attendanceData, isLoading: isLoadingAttendance } =
        useGetSingleAttendanceQuery(id!);
    const [updateAttendance, { isLoading: isUpdating }] =
        useUpdateAttendanceMutation();

    const attendance = attendanceData?.data;

    const form = useForm<FormData>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(attendanceZod.updateAttendanceSchema) as any,
        defaultValues: {
            isPresent: true,
            workHours: 8,
            note: '',
        },
    });

    useEffect(() => {
        if (attendance) {
            form.reset({
                isPresent: attendance.isPresent,
                workHours: attendance.workHours || 8,
                note: attendance.note || '',
            });
        }
    }, [attendance, form]);

    const onSubmit = async (data: FormData) => {
        try {
            await updateAttendance({ id: id!, data }).unwrap();
            toast.success('হাজিরা আপডেট হয়েছে');
            navigate('/dashboard/admin/attendance-list');
        } catch (error) {
            console.error(error);
            toast.error('আপডেট করতে ব্যর্থ হয়েছে');
        }
    };

    if (isLoadingAttendance) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex items-center justify-center h-64'
            >
                <div className='text-center'>
                    <Loader2 className='h-8 w-8 animate-spin mx-auto mb-4 text-primary' />
                    <p className='text-sm text-muted-foreground'>
                        লোড হচ্ছে...
                    </p>
                </div>
            </motion.div>
        );
    }

    if (!attendance) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex items-center justify-center h-64'
            >
                <div className='text-center'>
                    <p className='text-destructive font-semibold mb-2'>
                        হাজিরা পাওয়া যায়নি
                    </p>
                    <Button
                        variant='outline'
                        onClick={() => navigate(-1)}
                        className='mt-4'
                    >
                        <ArrowLeft className='mr-2 h-4 w-4' />
                        ফিরে যান
                    </Button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='max-w-2xl mx-auto px-4 py-6'
        >
            <Button
                variant='outline'
                onClick={() => navigate(-1)}
                className='mb-6'
            >
                <ArrowLeft className='mr-2 h-4 w-4' />
                ফিরে যান
            </Button>

            <Card className='shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-2xl'>হাজিরা সম্পাদনা</CardTitle>
                    <CardDescription>
                        {attendance.worker?.name} -{' '}
                        {new Date(attendance.date).toLocaleDateString('bn-BD')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-6'
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <FormField
                                    control={form.control}
                                    name='isPresent'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className='space-y-1 leading-none'>
                                                <FormLabel>উপস্থিত</FormLabel>
                                                <FormDescription>
                                                    শ্রমিক এই দিন কাজে এসেছিল
                                                    কিনা
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <InputComponents
                                control={form.control}
                                name='workHours'
                                title='কাজের সময় (ঘণ্টা)'
                                placeholder='8'
                                typeName='number'
                                min='0'
                                delay={0.2}
                            />

                            <InputComponents
                                control={form.control}
                                name='note'
                                title='নোট'
                                placeholder='কোন বিশেষ নোট থাকলে লিখুন'
                                delay={0.3}
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className='flex flex-col sm:flex-row gap-3 pt-4'
                            >
                                <Button
                                    type='submit'
                                    className='flex-1'
                                    disabled={isUpdating}
                                >
                                    {isUpdating
                                        ? 'আপডেট হচ্ছে...'
                                        : 'আপডেট করুন'}
                                </Button>
                                <Button
                                    type='button'
                                    variant='outline'
                                    onClick={() => navigate(-1)}
                                >
                                    বাতিল
                                </Button>
                            </motion.div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default EditAttendance;
