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
    useBulkUpsertAttendanceMutation,
    useLazyGetAttendancesByDateQuery,
} from '@/redux/features/attendance/attendance.api';
import { useGetWorkersQuery } from '@/redux/features/worker/worker.api';
import type { IAttendance } from '@/types/attendance.types';
import type { IWorker } from '@/types/worker.types';
import { Check, Loader2, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface WorkerAttendanceState {
    workerId: string;
    status: 'PRESENT' | 'ABSENT' | null;
    workHours: number;
    note: string;
}

const CreateAttendance = () => {
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );
    const [workerStates, setWorkerStates] = useState<
        Record<string, WorkerAttendanceState>
    >({});
    const [isSaving, setIsSaving] = useState(false);

    const { data: workersData, isLoading: isLoadingWorkers } =
        useGetWorkersQuery();
    const [getAttendancesByDate, { data: existingAttendances }] =
        useLazyGetAttendancesByDateQuery();
    const [bulkUpsertAttendance] = useBulkUpsertAttendanceMutation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const workers = workersData?.data || [];

    // Load existing attendances when date changes
    useEffect(() => {
        if (selectedDate) {
            getAttendancesByDate(selectedDate);
        }
    }, [selectedDate, getAttendancesByDate]);

    // Initialize worker states from existing attendances
    useEffect(() => {
        const initialStates: Record<string, WorkerAttendanceState> = {};

        workers.forEach((worker: IWorker) => {
            const existingAttendance = existingAttendances?.data?.find(
                (att: IAttendance) => att.workerId === worker.id
            );

            if (existingAttendance) {
                let status: 'PRESENT' | 'ABSENT' | null = null;
                if (existingAttendance.isPresent) {
                    status = 'PRESENT';
                } else {
                    status = 'ABSENT';
                }

                initialStates[worker.id] = {
                    workerId: worker.id,
                    status,
                    workHours: existingAttendance.workHours || 8,
                    note: existingAttendance.note || '',
                };
            } else {
                initialStates[worker.id] = {
                    workerId: worker.id,
                    status: null,
                    workHours: 8,
                    note: '',
                };
            }
        });

        setWorkerStates(initialStates);
    }, [workers, existingAttendances]);

    const handleStatusClick = (
        workerId: string,
        status: 'PRESENT' | 'ABSENT'
    ) => {
        const currentState = workerStates[workerId];
        const newStatus = currentState?.status === status ? null : status;

        let workHours = 8;
        if (newStatus === 'ABSENT') workHours = 0;

        setWorkerStates((prev) => ({
            ...prev,
            [workerId]: {
                ...prev[workerId],
                status: newStatus,
                workHours,
            },
        }));
    };

    const handleSaveAll = async () => {
        setIsSaving(true);
        try {
            const attendances = Object.values(workerStates)
                .filter((state) => state.status !== null)
                .map((state) => ({
                    workerId: state.workerId,
                    isPresent: state.status !== 'ABSENT',
                    workHours: state.workHours,
                    note: state.note,
                }));

            if (attendances.length === 0) {
                toast.error('অন্তত একজন শ্রমিকের হাজিরা দিন');
                return;
            }

            await bulkUpsertAttendance({
                date: selectedDate,
                attendances,
            }).unwrap();

            toast.success('সকল হাজিরা সফলভাবে সংরক্ষণ করা হয়েছে');
        } catch (error) {
            console.error(error);
            toast.error('হাজিরা সংরক্ষণে সমস্যা হয়েছে');
        } finally {
            setIsSaving(false);
        }
    };

    const getStatusBadge = (status: WorkerAttendanceState['status']) => {
        if (!status) return null;

        const config = {
            PRESENT: {
                label: 'উপস্থিত',
                variant: 'default' as const,
                className: 'bg-green-500 hover:bg-green-600',
            },
            ABSENT: {
                label: 'অনুপস্থিত',
                variant: 'destructive' as const,
                className: '',
            },
        };

        const { label, className } = config[status];
        return <Badge className={className}>{label}</Badge>;
    };

    const markedCount = Object.values(workerStates).filter(
        (state) => state.status !== null
    ).length;

    if (isLoadingWorkers) {
        return (
            <div className='flex items-center justify-center h-64'>
                <Loader2 className='h-8 w-8 animate-spin text-primary' />
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            {/* Header Card with Date Selection */}
            <Card>
                <CardHeader>
                    <div className='flex items-center justify-between flex-wrap gap-4'>
                        <div>
                            <CardTitle className='text-2xl'>
                                দৈনিক হাজিরা
                            </CardTitle>
                            <CardDescription>
                                তারিখ নির্বাচন করুন এবং শ্রমিকদের হাজিরা দিন
                            </CardDescription>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor='date'>তারিখ</Label>
                                <Input
                                    id='date'
                                    type='date'
                                    value={selectedDate}
                                    max={new Date().toISOString().split('T')[0]}
                                    onChange={(e) =>
                                        setSelectedDate(e.target.value)
                                    }
                                    className='w-48'
                                />
                                {/* {existingAttendances?.data &&
                                    existingAttendances.data.length > 0 && (
                                        <Badge
                                            variant='secondary'
                                            className='text-xs'
                                        >
                                            ✓ {existingAttendances.data.length}{' '}
                                            জনের হাজিরা আছে
                                        </Badge>
                                    )} */}
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Stats Card */}
            <Card>
                <CardContent className='pt-6'>
                    <div className='flex items-center justify-between flex-wrap gap-4'>
                        <div className='flex items-center gap-6'>
                            <div className='text-center'>
                                <div className='text-2xl font-bold'>
                                    {workers.length || 0}
                                </div>
                                <div className='text-sm text-muted-foreground'>
                                    মোট শ্রমিক
                                </div>
                            </div>
                            <div className='text-center'>
                                <div className='text-2xl font-bold text-primary'>
                                    {markedCount}
                                </div>
                                <div className='text-sm text-muted-foreground'>
                                    হাজিরা দেওয়া হয়েছে
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={handleSaveAll}
                            disabled={isSaving || markedCount === 0}
                            size='lg'
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    সংরক্ষণ হচ্ছে...
                                </>
                            ) : (
                                `সকল হাজিরা সংরক্ষণ করুন (${markedCount})`
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Legend Card */}
            <Card>
                <CardContent className='pt-6'>
                    <div className='flex items-center gap-6 flex-wrap'>
                        <div className='flex items-center gap-2'>
                            <div className='w-3 h-3 rounded-full bg-green-500' />
                            <span className='text-sm'>উপস্থিত (৮ ঘণ্টা)</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-3 h-3 rounded-full bg-red-500' />
                            <span className='text-sm'>অনুপস্থিত (০ ঘণ্টা)</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Workers Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {workers.map((worker: IWorker) => {
                    const state = workerStates[worker.id];
                    if (!state) return null;

                    return (
                        <Card
                            key={worker.id}
                            className={`transition-all hover:shadow-lg ${
                                state.status
                                    ? 'border-primary shadow-md'
                                    : 'border-border'
                            }`}
                        >
                            <CardHeader className='pb-3'>
                                <div className='flex items-start justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center'>
                                            {worker.profilePicture ? (
                                                <img
                                                    src={worker.profilePicture}
                                                    alt={worker.name}
                                                    className='h-12 w-12 rounded-full object-cover'
                                                />
                                            ) : (
                                                <User className='h-6 w-6 text-primary' />
                                            )}
                                        </div>
                                        <div>
                                            <CardTitle className='text-lg'>
                                                {worker.name}
                                            </CardTitle>
                                            <CardDescription>
                                                ৳{worker.dailySalary}/দিন
                                            </CardDescription>
                                        </div>
                                    </div>
                                    {getStatusBadge(state.status)}
                                </div>
                            </CardHeader>
                            <CardContent className='space-y-3'>
                                {/* Status Buttons */}
                                <div className='grid grid-cols-2 gap-2'>
                                    <Button
                                        type='button'
                                        variant={
                                            state.status === 'PRESENT'
                                                ? 'default'
                                                : 'outline'
                                        }
                                        size='sm'
                                        onClick={() =>
                                            handleStatusClick(
                                                worker.id,
                                                'PRESENT'
                                            )
                                        }
                                        className={
                                            state.status === 'PRESENT'
                                                ? 'bg-green-500 hover:bg-green-600'
                                                : 'hover:bg-green-50'
                                        }
                                    >
                                        <Check className='h-4 w-4 mr-1' />
                                        উপস্থিত
                                    </Button>
                                    <Button
                                        type='button'
                                        variant={
                                            state.status === 'ABSENT'
                                                ? 'destructive'
                                                : 'outline'
                                        }
                                        size='sm'
                                        onClick={() =>
                                            handleStatusClick(
                                                worker.id,
                                                'ABSENT'
                                            )
                                        }
                                        className={
                                            state.status !== 'ABSENT'
                                                ? 'hover:bg-red-50'
                                                : ''
                                        }
                                    >
                                        <X className='h-4 w-4 mr-1' />
                                        অনুপস্থিত
                                    </Button>
                                </div>

                                {/* Note Input (only show if status is selected) */}
                                {state.status && (
                                    <div>
                                        <Input
                                            placeholder='নোট (ঐচ্ছিক)'
                                            value={state.note}
                                            onChange={(e) =>
                                                setWorkerStates((prev) => ({
                                                    ...prev,
                                                    [worker.id]: {
                                                        ...prev[worker.id],
                                                        note: e.target.value,
                                                    },
                                                }))
                                            }
                                            className='text-sm'
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {workers.length === 0 && (
                <Card>
                    <CardContent className='py-12 text-center text-muted-foreground'>
                        কোন শ্রমিক পাওয়া যায়নি
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default CreateAttendance;
