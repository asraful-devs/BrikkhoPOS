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
import {
    useGetSingleWorkerQuery,
    useUpdateWorkerMutation,
} from '@/redux/features/worker/worker.api';
import { workerZod } from '@/zod/worker.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

type FormData = z.infer<typeof workerZod.updateWorkerSchema>;

const EditWorkerForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: workerData, isLoading: isLoadingWorker } =
        useGetSingleWorkerQuery(id!);
    const [updateWorker, { isLoading: isUpdating }] = useUpdateWorkerMutation();

    const worker = workerData?.data;

    const form = useForm<FormData>({
        resolver: zodResolver(workerZod.updateWorkerSchema),
        defaultValues: {
            name: '',
            phoneNumber: '',
            dailySalary: 0,
            address: '',
            age: undefined,
            email: '',
            status: 'ACTIVE',
        },
    });

    useEffect(() => {
        if (worker) {
            form.reset({
                name: worker.name,
                phoneNumber: worker.phoneNumber || '',
                dailySalary: worker.dailySalary,
                address: worker.address || '',
                age: worker.age || undefined,
                email: worker.email || '',
                status: worker.status,
            });
        }
    }, [worker, form]);

    const onSubmit = async (data: FormData) => {
        try {
            await updateWorker({ id: id!, data }).unwrap();
            toast.success('শ্রমিকের তথ্য আপডেট হয়েছে');
            navigate('/dashboard/admin/worker-list');
        } catch (error) {
            console.error(error);
            toast.error('আপডেট করতে ব্যর্থ হয়েছে');
        }
    };

    if (isLoadingWorker) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">লোড হচ্ছে...</div>
            </div>
        );
    }

    if (!worker) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-destructive">শ্রমিক পাওয়া যায়নি</div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">শ্রমিক সম্পাদনা</CardTitle>
                    <CardDescription>
                        {worker.name} এর তথ্য আপডেট করুন
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
                                        <FormLabel>নাম</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="শ্রমিকের নাম"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            শ্রমিকের পুরো নাম
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dailySalary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>দৈনিক বেতন (টাকা)</FormLabel>
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
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ঠিকানা</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="বাসার ঠিকানা"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>বয়স</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="25"
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ইমেইল</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="example@email.com"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>স্ট্যাটাস</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="ACTIVE">
                                                    সক্রিয়
                                                </SelectItem>
                                                <SelectItem value="INACTIVE">
                                                    নিষ্ক্রিয়
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
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

export default EditWorkerForm;
