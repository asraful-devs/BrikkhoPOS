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
import { useCreateWeeklySummaryMutation } from '@/redux/features/weeklySummary/weeklySummary.api';
import { useGetWorkersQuery } from '@/redux/features/worker/worker.api';
import { weeklySummaryZod } from '@/zod/weeklySummary.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof weeklySummaryZod.createWeeklySummarySchema>;

const CreateWeeklySummary = () => {
    const [createWeeklySummary, { isLoading }] = useCreateWeeklySummaryMutation();
    const { data: workersData, isLoading: isLoadingWorkers } =
        useGetWorkersQuery();
    const navigate = useNavigate();

    const workers = workersData?.data?.data || [];

    // Get current week dates
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const form = useForm<FormData>({
        resolver: zodResolver(weeklySummaryZod.createWeeklySummarySchema),
        defaultValues: {
            workerId: '',
            weekStartDate: startOfWeek.toISOString().split('T')[0],
            weekEndDate: endOfWeek.toISOString().split('T')[0],
            isPaid: false,
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await createWeeklySummary(data).unwrap();
            toast.success('সাপ্তাহিক সারাংশ তৈরি হয়েছে');
            navigate('/dashboard/admin/weekly-summary-list');
        } catch (error) {
            console.error(error);
            toast.error('সাপ্তাহিক সারাংশ তৈরি করতে ব্যর্থ');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">সাপ্তাহিক সারাংশ তৈরি</CardTitle>
                    <CardDescription>
                        শ্রমিকের সাপ্তাহিক কাজের সারাংশ তৈরি করুন
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
                                name="workerId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>শ্রমিক নির্বাচন করুন *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isLoadingWorkers}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="শ্রমিক নির্বাচন করুন" />
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
                                        <FormDescription className="sr-only">
                                            যে শ্রমিকের সাপ্তাহিক সারাংশ তৈরি করতে চান
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="weekStartDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>সপ্তাহ শুরু *</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="weekEndDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>সপ্তাহ শেষ *</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="isPaid"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>পরিশোধিত</FormLabel>
                                            <FormDescription>
                                                বেতন পরিশোধ করা হয়েছে কিনা
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'তৈরি হচ্ছে...' : 'সারাংশ তৈরি করুন'}
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

export default CreateWeeklySummary;
