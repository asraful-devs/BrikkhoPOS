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
import { useGenerateWeeklyReportMutation } from '@/redux/features/weeklySummary/weeklySummary.api';
import { useGetWorkersQuery } from '@/redux/features/worker/worker.api';
import { weeklySummaryZod } from '@/zod/weeklySummary.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof weeklySummaryZod.weeklyReportSchema>;

const WeeklyReport = () => {
    const [generateReport, { isLoading }] = useGenerateWeeklyReportMutation();
    const { data: workersData, isLoading: isLoadingWorkers } =
        useGetWorkersQuery();
    const [reportData, setReportData] = useState<any>(null);

    const workers = workersData?.data?.data || [];

    // Get current week dates
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const form = useForm<FormData>({
        resolver: zodResolver(weeklySummaryZod.weeklyReportSchema),
        defaultValues: {
            workerId: '',
            weekStartDate: startOfWeek.toISOString().split('T')[0],
            weekEndDate: endOfWeek.toISOString().split('T')[0],
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            const result = await generateReport(data).unwrap();
            setReportData(result.data);
            toast.success('রিপোর্ট জেনারেট হয়েছে');
        } catch (error) {
            console.error(error);
            toast.error('রিপোর্ট জেনারেট করতে ব্যর্থ');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">সাপ্তাহিক রিপোর্ট</CardTitle>
                    <CardDescription>
                        একজন শ্রমিকের সাপ্তাহিক কাজের রিপোর্ট জেনারেট করুন
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
                                            যে শ্রমিকের রিপোর্ট দেখতে চান
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

                            <Button type="submit" disabled={isLoading}>
                                {isLoading
                                    ? 'জেনারেট হচ্ছে...'
                                    : 'রিপোর্ট জেনারেট করুন'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Report Result */}
            {reportData && (
                <Card>
                    <CardHeader>
                        <CardTitle>রিপোর্ট ফলাফল</CardTitle>
                        <CardDescription>
                            {reportData.worker?.name} - সাপ্তাহিক সারাংশ
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                                <div className="text-sm text-muted-foreground">
                                    মোট কাজের দিন
                                </div>
                                <div className="text-2xl font-bold text-blue-600">
                                    {reportData.totalDaysWorked} দিন
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950">
                                <div className="text-sm text-muted-foreground">
                                    মোট বেতন
                                </div>
                                <div className="text-2xl font-bold text-green-600">
                                    ৳{reportData.totalSalary?.toLocaleString()}
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950">
                                <div className="text-sm text-muted-foreground">
                                    পরিশোধ অবস্থা
                                </div>
                                <div className="text-2xl font-bold text-purple-600">
                                    {reportData.isPaid ? 'পরিশোধিত' : 'বকেয়া'}
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950">
                                <div className="text-sm text-muted-foreground">
                                    সমন্বয়
                                </div>
                                <div className="text-2xl font-bold text-orange-600">
                                    {reportData.adjustments?.length || 0} টি
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default WeeklyReport;
