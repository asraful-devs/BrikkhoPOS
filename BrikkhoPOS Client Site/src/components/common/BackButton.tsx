import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
    label?: string;
    to?: string;
    variant?: 'default' | 'outline' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const BackButton = ({
    label = 'ফিরে যান',
    to,
    variant = 'ghost',
    size = 'sm',
}: BackButtonProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <Button
            onClick={handleClick}
            variant={variant}
            size={size}
            className='gap-2'
        >
            <ArrowLeft className='h-4 w-4' />
            {label}
        </Button>
    );
};
