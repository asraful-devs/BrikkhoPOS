import InputComponents from '@/components/common/InputComponents';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useCreateWorkerMutation } from '@/redux/features/worker/worker.api';
import { workerZod } from '@/zod/worker.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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
            toast.success('কর্মী সফলভাবে তৈরি করা হয়েছে');
            navigate('/dashboard/admin/worker-list');
        } catch (error) {
            console.error(error);
            toast.error('কর্মী তৈরি করতে ব্যর্থ হয়েছে');
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
                        নতুন কর্মী যোগ করুন
                    </h1>
                    <p className='text-muted-foreground mt-2'>
                        নিচে কর্মীর তথ্য পূরণ করুন
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
                        <CardTitle className='text-xl'>কর্মীর তথ্য</CardTitle>
                        <CardDescription>
                            রেকর্ড সংরক্ষণের জন্য সঠিক কর্মীর বিবরণ প্রদান করুন
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='pt-6'>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-6'
                            >
                                <InputComponents
                                    control={form.control}
                                    name='name'
                                    title='সম্পূর্ণ নাম'
                                    placeholder='কর্মীর সম্পূর্ণ নাম লিখুন'
                                    delay={0.3}
                                    required
                                />

                                <InputComponents
                                    control={form.control}
                                    name='phoneNumber'
                                    title='ফোন নম্বর'
                                    placeholder='01XXXXXXXXX'
                                    typeName='tel'
                                    delay={0.4}
                                />

                                <InputComponents
                                    control={form.control}
                                    name='dailySalary'
                                    title='দৈনিক বেতন (৳)'
                                    placeholder='৫০০'
                                    typeName='number'
                                    min='0'
                                    delay={0.5}
                                    required
                                />

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className='flex flex-col sm:flex-row gap-3 pt-4'
                                >
                                    <Button
                                        type='submit'
                                        className='flex-1'
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? 'তৈরি হচ্ছে...'
                                            : 'কর্মী তৈরি করুন'}
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

export default CreateWorkerForm;
