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

import Password from '@/components/ui/Password';
import { cn } from '@/lib/utils';
import { useLoginMutation } from '@/redux/features/auth/auth.api';
import { authZod } from '@/zod/auth.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

export function LoginForm({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof authZod.loginSchema>>({
        resolver: zodResolver(authZod.loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof authZod.loginSchema>) => {
        try {
            const res = await login(data).unwrap();

            if (res.data.accessToken) {
                localStorage.setItem('accessToken', res?.data?.accessToken);
            }

            toast.success('সফলভাবে লগইন হয়েছে');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error('লগইন ব্যর্থ হয়েছে। আপনার তথ্য যাচাই করুন।');
        }
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>
                    আপনার অ্যাকাউন্টে লগইন করুন
                </h1>
                <p className='text-sm text-muted-foreground'>
                    লগইন করতে আপনার ইমেইল এবং পাসওয়ার্ড লিখুন
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
                                        আপনার পাসওয়ার্ড লিখুন।
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='w-full'>
                            লগইন করুন
                        </Button>
                    </form>
                </Form>
            </div>

            <div className='text-center text-sm'>
                অ্যাকাউন্ট নেই?{' '}
                <Link to='/register' className='underline underline-offset-4'>
                    নিবন্ধন করুন
                </Link>
            </div>
        </div>
    );
}

export default LoginForm;
