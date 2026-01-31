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

interface InputComponentsProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    title: string;
    placeholder: string;
    typeName?: string;
    delay?: number;
    min?: string;
    required?: boolean;
}

const InputComponents = <TFieldValues extends FieldValues>({
    control,
    name,
    title,
    typeName = 'text',
    placeholder,
    delay = 0.4,
    min,
    required = false,
}: InputComponentsProps<TFieldValues>) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
        >
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            {title} {required && '*'}
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                type={typeName}
                                min={min}
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

export default InputComponents;
