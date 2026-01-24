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
import { useCreateSalaryAdjustmentMutation } from '@/redux/features/salaryAdjustment/salaryAdjustment.api';
import { useGetWeeklySummariesQuery } from '@/redux/features/weeklySummary/weeklySummary.api';
import { salaryAdjustmentZod } from '@/zod/salaryAdjustment.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof salaryAdjustmentZod.createSalaryAdjustmentSchema>;

const adjustmentTypes = [
    { value: 'BONUS', label: 'বোনাস', description: 'অতিরিক্ত পুরস্কার' },
    { value: 'OVERTIME', label: 'ওভারটাইম', description: 'অতিরিক্ত সময়ের জন্য' },
    { value: 'DEDUCTION', label: 'কর্তন', description: 'বেতন থেকে কাটা' },
    { value: 'ADVANCE', label: 'অগ্রিম', description: 'আগাম বেতন' },
];

const CreateSalaryAdjustment = () => {
    const [searchParams] = useSearchParams();
    const summaryId = searchParams.get('summaryId') || '';

    const [createAdjustment, { isLoading }] = useCreateSalaryAdjustmentMutation();
    const { data: summariesData, isLoading: isLoadingSummaries } =
        useGetWeeklySummariesQuery();
    const navigate = useNavigate();

    const summaries = summariesData?.data || [];

    const form = useForm<FormData>({
        resolver: zodResolver(salaryAdjustmentZod.createSalaryAdjustmentSchema),
        defaultValues: {
            weeklySummaryId: summaryId,
            type: 'BONUS',
            amount: 0,
            reason: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await createAdjustment(data).unwrap();
            toast.success('সমন্বয় সফলভাবে যোগ হয়েছে');
            navigate('/dashboard/admin/salary-adjustment-list');
        } catch (error) {
            console.error(error);
            toast.error('সমন্বয় যোগ করতে ব্যর্থ');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">বেতন সমন্বয় যোগ করুন</CardTitle>
                    <CardDescription>
                        বোনাস, ওভারটাইম, কর্তন বা অগ্রিম যোগ করুন
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
                                name="weeklySummaryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            সাপ্তাহিক সারাংশ নির্বাচন করুন *
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isLoadingSummaries}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="সারাংশ নির্বাচন করুন" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {summaries.map((summary) => (
                                                    <SelectItem
                                                        key={summary.id}
                                                        value={summary.id}
                                                    >
                                                        {summary.worker?.name} -{' '}
                                                        {new Date(
                                                            summary.weekStartDate
                                                        ).toLocaleDateString(
                                                            'bn-BD'
                                                        )}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="sr-only">
                                            যে সাপ্তাহিক সারাংশে সমন্বয় যোগ করতে চান
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>সমন্বয়ের ধরন *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="ধরন নির্বাচন করুন" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {adjustmentTypes.map((type) => (
                                                    <SelectItem
                                                        key={type.value}
                                                        value={type.value}
                                                    >
                                                        <div>
                                                            <span className="font-medium">
                                                                {type.label}
                                                            </span>
                                                            <span className="text-muted-foreground ml-2 text-sm">
                                                                - {type.description}
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>পরিমাণ (টাকা) *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="500"
                                                type="number"
                                                min="0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="reason"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>কারণ</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="সমন্বয়ের কারণ লিখুন"
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
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'যোগ হচ্ছে...' : 'সমন্বয় যোগ করুন'}
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

export default CreateSalaryAdjustment;
