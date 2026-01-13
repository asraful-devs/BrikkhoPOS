import type { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
    return (
        <div className='min-h-screen flex flex-col'>
            {/* Main Content with padding for fixed navbar */}
            <div className='mt-16 grow'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    {children}
                </div>
            </div>
        </div>
    );
}
