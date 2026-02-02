import InputComponents from '@/components/common/InputComponents';
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
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<
    typeof salaryAdjustmentZod.createSalaryAdjustmentSchema
>;

const CreateSalaryAdjustment = () => {
    const [searchParams] = useSearchParams();
    const summaryId = searchParams.get('summaryId') || '';

    const [createAdjustment, { isLoading }] =
        useCreateSalaryAdjustmentMutation();
    const { data: summariesData, isLoading: isLoadingSummaries } =
        useGetWeeklySummariesQuery();
    const navigate = useNavigate();

    const summaries = summariesData?.data || [];

    // গত সপ্তাহের তারিখ বের করা
    const getLastWeekDate = () => {
        const today = new Date();
        const lastWeek = new Date(today.setDate(today.getDate() - 7));
        return lastWeek;
    };

    // শুধুমাত্র গত সপ্তাহ থেকে বর্তমান সপ্তাহের সারাংশ ফিল্টার করা
    const recentSummaries = summaries.filter((summary) => {
        const summaryDate = new Date(summary.weekStartDate);
        const lastWeekDate = getLastWeekDate();
        return summaryDate >= lastWeekDate;
    });

    const form = useForm<FormData>({
        resolver: zodResolver(
            salaryAdjustmentZod.createSalaryAdjustmentSchema
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) as any,
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
                    variant='outline'
                    onClick={() => navigate(-1)}
                    className='mb-6'
                >
                    <ArrowLeft className='mr-2 h-4 w-4' />
                    ফিরে যান
                </Button>
                <div className='mb-6'>
                    <h1 className='text-3xl font-bold text-foreground'>
                        বেতন সমন্বয় যোগ করুন
                    </h1>
                    <p className='text-muted-foreground mt-2'>
                        নিচে সমন্বয়ের তথ্য পূরণ করুন
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <Card className='shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl'>
                            সমন্বয়ের তথ্য
                        </CardTitle>
                        <CardDescription>
                            বোনাস, ওভারটাইম, কর্তন বা অগ্রিম যোগ করার জন্য তথ্য
                            প্রদান করুন
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='pt-6'>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-6'
                            >
                                <FormField
                                    control={form.control}
                                    name='weeklySummaryId'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                কর্মী ও সপ্তাহ নির্বাচন করুন *
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                disabled={isLoadingSummaries}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='কর্মী ও সপ্তাহ নির্বাচন করুন' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {recentSummaries.length ===
                                                    0 ? (
                                                        <div className='p-4 text-center text-muted-foreground'>
                                                            গত সপ্তাহের কোনো
                                                            সারাংশ পাওয়া যায়নি
                                                        </div>
                                                    ) : (
                                                        recentSummaries.map(
                                                            (summary) => {
                                                                const weekStart =
                                                                    new Date(
                                                                        summary.weekStartDate
                                                                    );
                                                                const weekEnd =
                                                                    new Date(
                                                                        summary.weekEndDate
                                                                    );

                                                                return (
                                                                    <SelectItem
                                                                        key={
                                                                            summary.id
                                                                        }
                                                                        value={
                                                                            summary.id
                                                                        }
                                                                    >
                                                                        <div className='flex flex-col'>
                                                                            <span className='font-semibold'>
                                                                                {
                                                                                    summary
                                                                                        .worker
                                                                                        ?.name
                                                                                }
                                                                            </span>
                                                                            <span className='text-sm text-muted-foreground'>
                                                                                {weekStart.toLocaleDateString(
                                                                                    'bn-BD'
                                                                                )}{' '}
                                                                                -{' '}
                                                                                {weekEnd.toLocaleDateString(
                                                                                    'bn-BD'
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    </SelectItem>
                                                                );
                                                            }
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                শুধুমাত্র গত সপ্তাহের সারাংশে
                                                সমন্বয় যোগ করা যাবে
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='type'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                সমন্বয়ের ধরন *
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='ধরন নির্বাচন করুন' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='BONUS'>
                                                        বোনাস
                                                    </SelectItem>
                                                    <SelectItem value='OVERTIME'>
                                                        ওভারটাইম
                                                    </SelectItem>
                                                    <SelectItem value='DEDUCTION'>
                                                        কর্তন
                                                    </SelectItem>
                                                    <SelectItem value='ADVANCE'>
                                                        অগ্রিম
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <InputComponents
                                    control={form.control}
                                    name='amount'
                                    title='টাকার পরিমাণ'
                                    placeholder='0'
                                    typeName='number'
                                    min='0'
                                    delay={0.1}
                                />

                                <InputComponents
                                    control={form.control}
                                    name='reason'
                                    title='কারণ (ঐচ্ছিক)'
                                    placeholder='কারণ লিখুন'
                                    delay={0.2}
                                />

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className='flex flex-col sm:flex-row gap-3 pt-4'
                                >
                                    <Button
                                        type='submit'
                                        className='flex-1'
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? 'সংরক্ষণ হচ্ছে...'
                                            : 'সংরক্ষণ করুন'}
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
        </motion.div>
    );
};

export default CreateSalaryAdjustment;
