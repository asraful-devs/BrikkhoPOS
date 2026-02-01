import { FormDateInput } from '@/components/common/FormDateInput';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { useCreateWeeklySummaryMutation } from '@/redux/features/weeklySummary/weeklySummary.api';
import { weeklySummaryZod } from '@/zod/weeklySummary.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof weeklySummaryZod.createWeeklySummarySchema>;

const CreateWeeklySummary = () => {
    const [createWeeklySummary, { isLoading }] =
        useCreateWeeklySummaryMutation();
    const navigate = useNavigate();

    // Get current week dates
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
        today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    );
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const form = useForm<FormData>({
        resolver: zodResolver(
            weeklySummaryZod.createWeeklySummarySchema
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) as any,
        defaultValues: {
            weekStartDate: startOfWeek.toISOString().split('T')[0],
            weekEndDate: endOfWeek.toISOString().split('T')[0],
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await createWeeklySummary(data).unwrap();
            toast.success('সকল শ্রমিকের সাপ্তাহিক সারাংশ তৈরি হয়েছে');
            navigate('/dashboard/admin/weekly-summary-list');
        } catch (error) {
            console.error(error);
            toast.error('সাপ্তাহিক সারাংশ তৈরি করতে ব্যর্থ');
        }
    };

    return (
        <div className='container max-w-3xl mx-auto py-6'>
            <Card>
                <PageHeader
                    title='সাপ্তাহিক সারাংশ তৈরি'
                    description='সকল সক্রিয় শ্রমিকের জন্য স্বয়ংক্রিয়ভাবে সাপ্তাহিক সারাংশ তৈরি করুন'
                    showBackButton={true}
                    backButtonLabel='ফিরে যান'
                />
                <CardContent className='pt-6'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Info Alert */}
                        <div className='mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'>
                            <div className='flex items-start gap-3'>
                                <Calendar className='h-5 w-5 text-blue-600 mt-0.5' />
                                <div className='space-y-1'>
                                    <p className='text-sm font-medium text-blue-900 dark:text-blue-100'>
                                        স্বয়ংক্রিয় সারাংশ তৈরি
                                    </p>
                                    <p className='text-sm text-blue-700 dark:text-blue-300'>
                                        নির্বাচিত সপ্তাহের জন্য সকল সক্রিয়
                                        শ্রমিকের উপস্থিতি ও বেতন হিসাব করে
                                        স্বয়ংক্রিয়ভাবে সারাংশ তৈরি হবে।
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-6'
                            >
                                {/* Date Range */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <FormDateInput
                                        control={form.control}
                                        name='weekStartDate'
                                        label='সপ্তাহ শুরুর তারিখ'
                                        required
                                        delay={0.1}
                                    />
                                    <FormDateInput
                                        control={form.control}
                                        name='weekEndDate'
                                        label='সপ্তাহ শেষের তারিখ'
                                        required
                                        delay={0.2}
                                    />
                                </div>

                                {/* Payment Status */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <FormField
                                        control={form.control}
                                        name='isPaid'
                                        render={({ field }) => (
                                            <FormItem className='flex flex-row items-center gap-3 space-y-0 rounded-lg border p-4 hover:bg-muted/50 transition-colors'>
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className='flex-1 space-y-1 leading-none'>
                                                    <FormLabel className='flex items-center gap-2 cursor-pointer'>
                                                        {field.value ? (
                                                            <CheckCircle2 className='h-4 w-4 text-green-600' />
                                                        ) : (
                                                            <XCircle className='h-4 w-4 text-orange-600' />
                                                        )}
                                                        পরিশোধের স্ট্যাটাস
                                                    </FormLabel>
                                                    <FormDescription>
                                                        {field.value
                                                            ? 'বেতন পরিশোধিত হিসেবে চিহ্নিত থাকবে'
                                                            : 'বেতন বকেয়া হিসেবে চিহ্নিত থাকবে'}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* Action Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className='flex gap-4 pt-2'
                                >
                                    <Button
                                        type='submit'
                                        className='flex-1'
                                        disabled={isLoading}
                                        size='lg'
                                    >
                                        {isLoading
                                            ? 'সারাংশ তৈরি হচ্ছে...'
                                            : 'সকল শ্রমিকের সারাংশ তৈরি করুন'}
                                    </Button>
                                    <Button
                                        type='button'
                                        variant='outline'
                                        onClick={() => navigate(-1)}
                                        size='lg'
                                    >
                                        বাতিল
                                    </Button>
                                </motion.div>
                            </form>
                        </Form>
                    </motion.div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateWeeklySummary;
