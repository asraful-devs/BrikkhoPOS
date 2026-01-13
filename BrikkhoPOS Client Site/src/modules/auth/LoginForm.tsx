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
            await login(data).unwrap();

            toast.success('Login successful');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>Login to your account</h1>
                <p className='text-sm text-muted-foreground'>
                    Enter your email and password to login
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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='john.doe@company.com'
                                            type='email'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className='sr-only'>
                                        Enter your email address.
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Password
                                            placeholder='Enter your password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className='sr-only'>
                                        Enter your password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='w-full'>
                            Login
                        </Button>
                    </form>
                </Form>
            </div>

            <div className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link to='/register' className='underline underline-offset-4'>
                    Register
                </Link>
            </div>
        </div>
    );
}

export default LoginForm;
