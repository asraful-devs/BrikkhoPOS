import { motion } from 'framer-motion';
import { CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BackButton } from './BackButton';

interface PageHeaderProps {
    title: string;
    description: string;
    actions?: React.ReactNode;
    showBackButton?: boolean;
    backButtonLabel?: string;
    backButtonTo?: string;
}

export const PageHeader = ({
    title,
    description,
    actions,
    showBackButton = false,
    backButtonLabel,
    backButtonTo,
}: PageHeaderProps) => {
    return (
        <CardHeader>
            {showBackButton && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className='mb-2'
                >
                    <BackButton label={backButtonLabel} to={backButtonTo} />
                </motion.div>
            )}
            <div className='flex items-center justify-between'>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <CardTitle className='text-2xl'>{title}</CardTitle>
                    <CardDescription className='mt-1.5'>
                        {description}
                    </CardDescription>
                </motion.div>
                {actions && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className='flex gap-2'
                    >
                        {actions}
                    </motion.div>
                )}
            </div>
        </CardHeader>
    );
};
