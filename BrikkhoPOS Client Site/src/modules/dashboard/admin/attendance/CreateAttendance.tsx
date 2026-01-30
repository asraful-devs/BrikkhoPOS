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
import { useCreateAttendanceMutation } from '@/redux/features/attendance/attendance.api';
import { useGetWorkersQuery } from '@/redux/features/worker/worker.api';
import { attendanceZod } from '@/zod/attendance.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof attendanceZod.createAttendanceSchema>;

const CreateAttendance = () => {
    const [createAttendance, { isLoading }] = useCreateAttendanceMutation();
    const { data: workersData, isLoading: isLoadingWorkers } =
        useGetWorkersQuery();
    const navigate = useNavigate();

    const workers = workersData?.data || [];

    const form = useForm<FormData>({
        resolver: zodResolver(attendanceZod.createAttendanceSchema),
        defaultValues: {
            workerId: '',
            date: new Date().toISOString().split('T')[0],
            isPresent: true,
            workHours: 8,
            note: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await createAttendance(data).unwrap();
            toast.success('হাজিরা সফলভাবে দেওয়া হয়েছে');
            navigate('/dashboard/admin/attendance-list');
        } catch (error) {
            console.error(error);
            toast.error('হাজিরা দিতে ব্যর্থ হয়েছে');
        }
    };

    return (
        <div className='max-w-2xl mx-auto'>
            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl'>হাজিরা দিন</CardTitle>
                    <CardDescription>
                        শ্রমিকের দৈনিক হাজিরা এন্ট্রি করুন
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-6'
                        >
                            <FormField
                                control={form.control}
                                name='workerId'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            শ্রমিক নির্বাচন করুন *
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isLoadingWorkers}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='শ্রমিক নির্বাচন করুন' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {workers.map((worker) => (
                                                    <SelectItem
                                                        key={worker.id}
                                                        value={worker.id}
                                                    >
                                                        {worker.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className='sr-only'>
                                            যে শ্রমিকের হাজিরা দিতে চান
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>তারিখ</FormLabel>
                                        <FormControl>
                                            <Input type='date' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='isPresent'
                                render={({ field }) => (
                                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className='space-y-1 leading-none'>
                                            <FormLabel>উপস্থিত</FormLabel>
                                            <FormDescription>
                                                শ্রমিক আজ কাজে এসেছে কিনা
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='workHours'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            কাজের সময় (ঘণ্টা)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='8'
                                                type='number'
                                                min='0'
                                                max='24'
                                                step='0.5'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='note'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>নোট</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='কোন বিশেষ নোট থাকলে লিখুন'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='flex gap-4'>
                                <Button
                                    type='submit'
                                    className='flex-1'
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? 'দেওয়া হচ্ছে...'
                                        : 'হাজিরা দিন'}
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
        </div>
    );
};

export default CreateAttendance;
