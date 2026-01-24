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
import { useCreateWorkerMutation } from '@/redux/features/worker/worker.api';
import { workerZod } from '@/zod/worker.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof workerZod.createWorkerSchema>;

const CreateWorkerForm = () => {
    const [createWorker, { isLoading }] = useCreateWorkerMutation();
    const navigate = useNavigate();

    const form = useForm<FormData>({
        resolver: zodResolver(workerZod.createWorkerSchema),
        defaultValues: {
            name: '',
            phoneNumber: '',
            dailySalary: 0,
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await createWorker(data).unwrap();
            toast.success('শ্রমিক সফলভাবে তৈরি হয়েছে');
            navigate('/dashboard/admin/worker-list');
        } catch (error) {
            console.error(error);
            toast.error('শ্রমিক তৈরি করতে ব্যর্থ হয়েছে');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">নতুন শ্রমিক যোগ করুন</CardTitle>
                    <CardDescription>
                        শ্রমিকের তথ্য প্রদান করুন
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
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>নাম *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="শ্রমিকের নাম"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            শ্রমিকের পুরো নাম লিখুন
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ফোন নম্বর</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="01XXXXXXXXX"
                                                type="tel"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            শ্রমিকের মোবাইল নম্বর
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dailySalary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>দৈনিক বেতন (টাকা) *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="500"
                                                type="number"
                                                min="0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            দৈনিক বেতন টাকায়
                                        </FormDescription>
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
                                    {isLoading ? 'তৈরি হচ্ছে...' : 'শ্রমিক তৈরি করুন'}
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

export default CreateWorkerForm;
