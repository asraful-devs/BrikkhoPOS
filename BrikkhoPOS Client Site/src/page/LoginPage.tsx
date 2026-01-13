import { LoginForm } from '@/modules/auth/LoginForm';

const LoginPage = () => {
    return (
        <div className='flex items-center justify-center min-h-screen bg-background'>
            <div className='w-full max-w-md px-4'>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
