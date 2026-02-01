import { motion } from 'framer-motion';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface FormDateInputProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    label: string;
    placeholder?: string;
    delay?: number;
    disabled?: boolean;
    required?: boolean;
}

export const FormDateInput = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    delay = 0,
    disabled = false,
    required = false,
}: FormDateInputProps<TFieldValues>) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
        >
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            {label}{' '}
                            {required && (
                                <span className='text-destructive'>*</span>
                            )}
                        </FormLabel>
                        <FormControl>
                            <Input
                                type='date'
                                placeholder={placeholder}
                                disabled={disabled}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </motion.div>
    );
};
