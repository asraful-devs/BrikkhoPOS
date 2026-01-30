import { Button } from '@/components/ui/button';
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

import { cn } from '@/lib/utils';
import { useRegisterMutation } from '@/redux/features/auth/auth.api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import Password from '../../components/ui/Password';
import { authZod } from './../../zod/auth.zod';

export function RegisterForm({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof authZod.registerSchema>>({
        resolver: zodResolver(authZod.registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof authZod.registerSchema>) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        try {
            await register(userInfo).unwrap();

            toast.success('ব্যবহারকারী সফলভাবে তৈরি হয়েছে');
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error('নিবন্ধন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
        }
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>
                    আপনার অ্যাকাউন্ট নিবন্ধন করুন
                </h1>
                <p className='text-sm text-muted-foreground'>
                    অ্যাকাউন্ট তৈরি করতে আপনার তথ্য লিখুন
                </p>
            </div>

            <div className='grid gap-6'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>নাম</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='আপনার নাম লিখুন'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className='sr-only'>
                                        এটি আপনার প্রদর্শন নাম।
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ইমেইল</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='আপনার ইমেইল লিখুন'
                                            type='email'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className='sr-only'>
                                        আপনার ইমেইল ঠিকানা লিখুন।
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>পাসওয়ার্ড</FormLabel>
                                    <FormControl>
                                        <Password
                                            placeholder='আপনার পাসওয়ার্ড লিখুন'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className='sr-only'>
                                        কমপক্ষে ৮টি অক্ষর সহ পাসওয়ার্ড লিখুন।
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        পাসওয়ার্ড নিশ্চিত করুন
                                    </FormLabel>
                                    <FormControl>
                                        <Password
                                            placeholder='আপনার পাসওয়ার্ড নিশ্চিত করুন'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className='sr-only'>
                                        আপনার পাসওয়ার্ড নিশ্চিত করুন।
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='w-full'>
                            নিবন্ধন করুন
                        </Button>
                    </form>
                </Form>
            </div>

            <div className='text-center text-sm'>
                ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                <Link to='/login' className='underline underline-offset-4'>
                    লগইন করুন
                </Link>
            </div>
        </div>
    );
}

export default RegisterForm;
