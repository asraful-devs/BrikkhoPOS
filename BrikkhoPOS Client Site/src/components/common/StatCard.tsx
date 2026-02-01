import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    bgColor?: string;
    textColor?: string;
    delay?: number;
}

export const StatCard = ({
    title,
    value,
    icon: Icon,
    bgColor = 'bg-blue-50 dark:bg-blue-950',
    textColor = 'text-blue-600',
    delay = 0,
}: StatCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.3 }}
        >
            <Card className={cn('border-none', bgColor)}>
                <CardContent className='p-6'>
                    <div className='flex items-center justify-between'>
                        <div className='space-y-1'>
                            <p className='text-sm text-muted-foreground'>
                                {title}
                            </p>
                            <p className={cn('text-2xl font-bold', textColor)}>
                                {value}
                            </p>
                        </div>
                        {Icon && (
                            <Icon
                                className={cn(
                                    'h-8 w-8',
                                    textColor,
                                    'opacity-80'
                                )}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
