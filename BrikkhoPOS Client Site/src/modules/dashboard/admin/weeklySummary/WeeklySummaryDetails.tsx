import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useGetSingleWeeklySummaryQuery } from '@/redux/features/weeklySummary/weeklySummary.api';
import { ArrowLeft, Calendar, DollarSign, User } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const WeeklySummaryDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetSingleWeeklySummaryQuery(id!);

    const summary = data?.data;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">লোড হচ্ছে...</div>
            </div>
        );
    }

    if (error || !summary) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="text-destructive">সারাংশ পাওয়া যায়নি</div>
                <Button variant="outline" onClick={() => navigate(-1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    ফিরে যান
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => navigate(-1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    ফিরে যান
                </Button>
                <Link
                    to={`/dashboard/admin/add-salary-adjustment?summaryId=${summary.id}`}
                >
                    <Button variant="outline">সমন্বয় যোগ করুন</Button>
                </Link>
            </div>

            {/* Main Card */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">
                                {summary.worker?.name}
                            </CardTitle>
                            <CardDescription>সাপ্তাহিক সারাংশ</CardDescription>
                        </div>
                        <div className="ml-auto">
                            <Badge
                                variant={summary.isPaid ? 'success' : 'warning'}
                            >
                                {summary.isPaid ? 'পরিশোধিত' : 'বকেয়া'}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Date Range */}
                    <div className="flex items-center gap-2 mb-6 p-4 rounded-lg bg-muted/50">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span>
                            {new Date(summary.weekStartDate).toLocaleDateString(
                                'bn-BD'
                            )}{' '}
                            থেকে{' '}
                            {new Date(summary.weekEndDate).toLocaleDateString(
                                'bn-BD'
                            )}
                        </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-lg border">
                            <div className="text-sm text-muted-foreground">
                                কাজের দিন
                            </div>
                            <div className="text-3xl font-bold">
                                {summary.totalDaysWorked} দিন
                            </div>
                        </div>
                        <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-950">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <DollarSign className="h-4 w-4" />
                                মোট বেতন
                            </div>
                            <div className="text-3xl font-bold text-green-600">
                                ৳{summary.totalSalary.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* Adjustments */}
                    {summary.adjustments && summary.adjustments.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-3">সমন্বয়সমূহ</h3>
                            <div className="space-y-2">
                                {summary.adjustments.map((adj) => (
                                    <div
                                        key={adj.id}
                                        className="flex items-center justify-between p-3 rounded-lg border"
                                    >
                                        <div>
                                            <Badge
                                                variant={
                                                    adj.type === 'BONUS' ||
                                                    adj.type === 'OVERTIME'
                                                        ? 'success'
                                                        : 'destructive'
                                                }
                                            >
                                                {adj.type === 'BONUS'
                                                    ? 'বোনাস'
                                                    : adj.type === 'OVERTIME'
                                                      ? 'ওভারটাইম'
                                                      : adj.type === 'DEDUCTION'
                                                        ? 'কর্তন'
                                                        : 'অগ্রিম'}
                                            </Badge>
                                            {adj.reason && (
                                                <span className="ml-2 text-sm text-muted-foreground">
                                                    {adj.reason}
                                                </span>
                                            )}
                                        </div>
                                        <div
                                            className={`font-semibold ${
                                                adj.type === 'BONUS' ||
                                                adj.type === 'OVERTIME'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {adj.type === 'BONUS' ||
                                            adj.type === 'OVERTIME'
                                                ? '+'
                                                : '-'}
                                            ৳{adj.amount.toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Timestamps */}
                    <div className="mt-8 pt-6 border-t text-sm text-muted-foreground">
                        <div className="flex justify-between">
                            <span>
                                তৈরি:{' '}
                                {new Date(summary.createdAt).toLocaleDateString(
                                    'bn-BD'
                                )}
                            </span>
                            {summary.paidAt && (
                                <span>
                                    পরিশোধ:{' '}
                                    {new Date(summary.paidAt).toLocaleDateString(
                                        'bn-BD'
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default WeeklySummaryDetails;
