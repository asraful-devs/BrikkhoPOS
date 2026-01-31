import AlertDialogComponent from '@/components/common/AlertDialogComponent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    useDeleteAttendanceMutation,
    useGetAttendancesByDateQuery,
} from '@/redux/features/attendance/attendance.api';
import type { IAttendance } from '@/types/attendance.types';
import { motion } from 'framer-motion';
import { Calendar, Edit, Loader2, Plus, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const AttendanceList = () => {
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );

    const { data, isLoading, error } =
        useGetAttendancesByDateQuery(selectedDate);
    const [deleteAttendance] = useDeleteAttendanceMutation();

    const attendances: IAttendance[] = data?.data || [];

    const handleDelete = async (id: string) => {
        try {
            await deleteAttendance(id).unwrap();
            toast.success('হাজিরা মুছে ফেলা হয়েছে');
        } catch (error) {
            console.error(error);
            toast.error('হাজিরা মুছতে ব্যর্থ');
        }
    };

    // Statistics
    const presentCount = attendances.filter((att) => att.isPresent).length;
    const absentCount = attendances.filter((att) => !att.isPresent).length;
    const halfDayCount = attendances.filter(
        (att) => att.isPresent && att.workHours === 4
    ).length;
    const totalWorkHours = attendances.reduce(
        (sum, att) => sum + (att.workHours || 0),
        0
    );

    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex items-center justify-center h-64'
            >
                <div className='text-center'>
                    <Loader2 className='h-8 w-8 animate-spin mx-auto mb-4 text-primary' />
                    <p className='text-sm text-muted-foreground'>
                        লোড হচ্ছে...
                    </p>
                </div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex items-center justify-center h-64'
            >
                <div className='text-center'>
                    <p className='text-destructive font-semibold mb-2'>
                        ডেটা লোড করতে সমস্যা হয়েছে
                    </p>
                    <p className='text-sm text-muted-foreground'>
                        আবার চেষ্টা করুন
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='w-full px-4 py-6 max-w-400 mx-auto space-y-6'
        >
            {/* Header Card */}
            <Card className='shadow-sm'>
                <CardHeader>
                    <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4'>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <CardTitle className='text-2xl lg:text-3xl flex items-center gap-2'>
                                <Calendar className='h-6 w-6' />
                                হাজিরা তালিকা
                            </CardTitle>
                            <CardDescription className='mt-1'>
                                তারিখ অনুযায়ী হাজিরা দেখুন এবং পরিচালনা করুন
                            </CardDescription>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className='flex flex-col sm:flex-row gap-3 w-full lg:w-auto'
                        >
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor='filterDate' className='text-sm'>
                                    তারিখ নির্বাচন
                                </Label>
                                <Input
                                    id='filterDate'
                                    type='date'
                                    value={selectedDate}
                                    max={new Date().toISOString().split('T')[0]}
                                    onChange={(e) =>
                                        setSelectedDate(e.target.value)
                                    }
                                    className='w-full sm:w-48'
                                />
                            </div>
                            <div className='flex items-end'>
                                <Link
                                    to='/dashboard/admin/create-attendance'
                                    className='w-full sm:w-auto'
                                >
                                    <Button className='w-full sm:w-auto'>
                                        <Plus className='mr-2 h-4 w-4' />
                                        হাজিরা দিন
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </CardHeader>
            </Card>

            {/* Statistics Cards */}
            {attendances.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className='grid grid-cols-2 md:grid-cols-4 gap-4'
                >
                    <Card>
                        <CardContent className='pt-6'>
                            <div className='text-center'>
                                <Users className='h-8 w-8 mx-auto mb-2 text-primary' />
                                <div className='text-2xl font-bold'>
                                    {attendances.length}
                                </div>
                                <div className='text-sm text-muted-foreground'>
                                    মোট হাজিরা
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className='pt-6'>
                            <div className='text-center'>
                                <div className='text-2xl font-bold text-green-600'>
                                    {presentCount}
                                </div>
                                <div className='text-sm text-muted-foreground'>
                                    উপস্থিত
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className='pt-6'>
                            <div className='text-center'>
                                <div className='text-2xl font-bold text-orange-600'>
                                    {halfDayCount}
                                </div>
                                <div className='text-sm text-muted-foreground'>
                                    অর্ধদিবস
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className='pt-6'>
                            <div className='text-center'>
                                <div className='text-2xl font-bold text-red-600'>
                                    {absentCount}
                                </div>
                                <div className='text-sm text-muted-foreground'>
                                    অনুপস্থিত
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* Attendance List */}
            <Card className='shadow-sm'>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <div>
                            <CardTitle>
                                {new Date(selectedDate).toLocaleDateString(
                                    'bn-BD',
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    }
                                )}
                            </CardTitle>
                            {attendances.length > 0 && (
                                <CardDescription className='mt-1'>
                                    মোট কাজের সময়: {totalWorkHours} ঘণ্টা
                                </CardDescription>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {attendances.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className='text-center py-12'
                        >
                            <Calendar className='h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50' />
                            <p className='text-muted-foreground mb-4'>
                                এই তারিখে কোন হাজিরা রেকর্ড নেই
                            </p>
                            <Link to='/dashboard/admin/create-attendance'>
                                <Button>
                                    <Plus className='mr-2 h-4 w-4' />
                                    হাজিরা দিন
                                </Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className='hidden md:block overflow-x-auto rounded-lg border'>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>শ্রমিক</TableHead>
                                            <TableHead>উপস্থিতি</TableHead>
                                            <TableHead>কাজের সময়</TableHead>
                                            <TableHead>দৈনিক বেতন</TableHead>
                                            <TableHead>প্রাপ্য বেতন</TableHead>
                                            <TableHead>নোট</TableHead>
                                            <TableHead className='text-right'>
                                                কার্যক্রম
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {attendances.map(
                                            (
                                                attendance: IAttendance,
                                                index: number
                                            ) => {
                                                const dailySalary =
                                                    attendance.worker
                                                        ?.dailySalary || 0;
                                                const earnedSalary =
                                                    (dailySalary / 8) *
                                                    (attendance.workHours || 0);

                                                return (
                                                    <motion.tr
                                                        key={attendance.id}
                                                        initial={{
                                                            opacity: 0,
                                                            y: 20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            delay: index * 0.05,
                                                            duration: 0.3,
                                                        }}
                                                        className='border-b transition-colors hover:bg-muted/50'
                                                    >
                                                        <TableCell className='font-medium'>
                                                            {attendance.worker
                                                                ?.name || 'N/A'}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant={
                                                                    attendance.isPresent
                                                                        ? 'default'
                                                                        : 'destructive'
                                                                }
                                                                className={
                                                                    attendance.isPresent &&
                                                                    attendance.workHours ===
                                                                        4
                                                                        ? 'bg-orange-500 hover:bg-orange-600'
                                                                        : ''
                                                                }
                                                            >
                                                                {attendance.isPresent
                                                                    ? attendance.workHours ===
                                                                      4
                                                                        ? 'অর্ধদিবস'
                                                                        : 'উপস্থিত'
                                                                    : 'অনুপস্থিত'}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {attendance.workHours ||
                                                                0}{' '}
                                                            ঘণ্টা
                                                        </TableCell>
                                                        <TableCell>
                                                            ৳
                                                            {dailySalary.toLocaleString()}
                                                        </TableCell>
                                                        <TableCell className='font-semibold text-primary'>
                                                            ৳
                                                            {Math.round(
                                                                earnedSalary
                                                            ).toLocaleString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            {attendance.note ||
                                                                '-'}
                                                        </TableCell>
                                                        <TableCell className='text-right'>
                                                            <div className='flex items-center justify-end gap-2'>
                                                                <Link
                                                                    to={`/dashboard/admin/edit-attendance/${attendance.id}`}
                                                                >
                                                                    <Button
                                                                        variant='ghost'
                                                                        size='icon'
                                                                        className='hover:scale-110 transition-transform'
                                                                    >
                                                                        <Edit className='h-4 w-4' />
                                                                    </Button>
                                                                </Link>

                                                                <AlertDialogComponent
                                                                    trigger={
                                                                        <Button
                                                                            variant='ghost'
                                                                            size='icon'
                                                                            className='text-destructive hover:scale-110 transition-transform'
                                                                        >
                                                                            <Trash2 className='h-4 w-4' />
                                                                        </Button>
                                                                    }
                                                                    title='হাজিরা মুছে ফেলুন?'
                                                                    description={`${attendance.worker?.name} এর এই হাজিরা রেকর্ড মুছে ফেললে তা আর ফেরত পাবেন না।`}
                                                                    confirmText='মুছে ফেলুন'
                                                                    onConfirm={() =>
                                                                        handleDelete(
                                                                            attendance.id
                                                                        )
                                                                    }
                                                                    variant='destructive'
                                                                />
                                                            </div>
                                                        </TableCell>
                                                    </motion.tr>
                                                );
                                            }
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Mobile Card View */}
                            <div className='md:hidden space-y-4'>
                                {attendances.map(
                                    (
                                        attendance: IAttendance,
                                        index: number
                                    ) => {
                                        const dailySalary =
                                            attendance.worker?.dailySalary || 0;
                                        const earnedSalary =
                                            (dailySalary / 8) *
                                            (attendance.workHours || 0);

                                        return (
                                            <motion.div
                                                key={attendance.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: index * 0.1,
                                                    duration: 0.3,
                                                }}
                                            >
                                                <Card className='shadow-sm hover:shadow-md transition-shadow'>
                                                    <CardContent className='p-4'>
                                                        <div className='flex items-start justify-between mb-3'>
                                                            <div className='flex-1'>
                                                                <h3 className='font-semibold text-lg mb-2'>
                                                                    {attendance
                                                                        .worker
                                                                        ?.name ||
                                                                        'N/A'}
                                                                </h3>
                                                                <div className='space-y-2 text-sm'>
                                                                    <div className='flex items-center justify-between'>
                                                                        <span className='text-muted-foreground'>
                                                                            উপস্থিতি:
                                                                        </span>
                                                                        <Badge
                                                                            variant={
                                                                                attendance.isPresent
                                                                                    ? 'default'
                                                                                    : 'destructive'
                                                                            }
                                                                            className={
                                                                                attendance.isPresent &&
                                                                                attendance.workHours ===
                                                                                    4
                                                                                    ? 'bg-orange-500'
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            {attendance.isPresent
                                                                                ? attendance.workHours ===
                                                                                  4
                                                                                    ? 'অর্ধদিবস'
                                                                                    : 'উপস্থিত'
                                                                                : 'অনুপস্থিত'}
                                                                        </Badge>
                                                                    </div>
                                                                    <div className='flex items-center justify-between'>
                                                                        <span className='text-muted-foreground'>
                                                                            কাজের
                                                                            সময়:
                                                                        </span>
                                                                        <span className='font-medium'>
                                                                            {attendance.workHours ||
                                                                                0}{' '}
                                                                            ঘণ্টা
                                                                        </span>
                                                                    </div>
                                                                    <div className='flex items-center justify-between'>
                                                                        <span className='text-muted-foreground'>
                                                                            প্রাপ্য
                                                                            বেতন:
                                                                        </span>
                                                                        <span className='font-semibold text-primary'>
                                                                            ৳
                                                                            {Math.round(
                                                                                earnedSalary
                                                                            ).toLocaleString()}
                                                                        </span>
                                                                    </div>
                                                                    {attendance.note && (
                                                                        <div className='pt-2 border-t'>
                                                                            <p className='text-xs text-muted-foreground'>
                                                                                নোট:{' '}
                                                                                {
                                                                                    attendance.note
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='flex gap-2 pt-3 border-t'>
                                                            <Link
                                                                to={`/dashboard/admin/edit-attendance/${attendance.id}`}
                                                                className='flex-1'
                                                            >
                                                                <Button
                                                                    variant='outline'
                                                                    size='sm'
                                                                    className='w-full'
                                                                >
                                                                    <Edit className='mr-2 h-4 w-4' />
                                                                    সম্পাদনা
                                                                </Button>
                                                            </Link>
                                                            <AlertDialogComponent
                                                                trigger={
                                                                    <Button
                                                                        variant='outline'
                                                                        size='sm'
                                                                        className='text-destructive border-destructive'
                                                                    >
                                                                        <Trash2 className='h-4 w-4' />
                                                                    </Button>
                                                                }
                                                                title='হাজিরা মুছে ফেলুন?'
                                                                description={`${attendance.worker?.name} এর এই হাজিরা রেকর্ড মুছে ফেললে তা আর ফেরত পাবেন না।`}
                                                                confirmText='মুছে ফেলুন'
                                                                onConfirm={() =>
                                                                    handleDelete(
                                                                        attendance.id
                                                                    )
                                                                }
                                                                variant='destructive'
                                                            />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        );
                                    }
                                )}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default AttendanceList;
