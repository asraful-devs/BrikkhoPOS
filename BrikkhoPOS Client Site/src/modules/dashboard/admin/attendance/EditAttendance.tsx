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
    useGetSingleAttendanceQuery,
    useUpdateAttendanceMutation,
} from '@/redux/features/attendance/attendance.api';
import { attendanceZod } from '@/zod/attendance.zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
        resolver: zodResolver(attendanceZod.updateAttendanceSchema),
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
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">লোড হচ্ছে...</div>
            </div>
        );
    }

    if (!attendance) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-destructive">হাজিরা পাওয়া যায়নি</div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">হাজিরা সম্পাদনা</CardTitle>
                    <CardDescription>
                        {attendance.worker?.name} -{' '}
                        {new Date(attendance.date).toLocaleDateString('bn-BD')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="isPresent"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>উপস্থিত</FormLabel>
                                            <FormDescription>
                                                শ্রমিক এই দিন কাজে এসেছিল কিনা
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="workHours"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>কাজের সময় (ঘণ্টা)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="8"
                                                type="number"
                                                min="0"
                                                max="24"
                                                step="0.5"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="note"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>নোট</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="কোন বিশেষ নোট থাকলে লিখুন"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? 'আপডেট হচ্ছে...' : 'আপডেট করুন'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
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

export default EditAttendance;
