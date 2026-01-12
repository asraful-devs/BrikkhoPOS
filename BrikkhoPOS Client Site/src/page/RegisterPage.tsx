import { RegisterForm } from '@/modules/auth/RegisterForm';

const RegisterPage = () => {
    return (
        <div className='flex items-center justify-center min-h-screen bg-background'>
            <div className='w-full max-w-md px-4'>
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;
