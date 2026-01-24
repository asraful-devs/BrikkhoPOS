import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useGetSingleWorkerQuery } from '@/redux/features/worker/worker.api';
import { ArrowLeft, Edit, Mail, MapPin, Phone, User } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const WorkerDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetSingleWorkerQuery(id!);

    const worker = data?.data;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">লোড হচ্ছে...</div>
            </div>
        );
    }

    if (error || !worker) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="text-destructive">শ্রমিক পাওয়া যায়নি</div>
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
                <Link to={`/dashboard/admin/edit-worker/${worker.id}`}>
                    <Button>
                        <Edit className="mr-2 h-4 w-4" />
                        সম্পাদনা করুন
                    </Button>
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
                            <CardTitle className="text-2xl">{worker.name}</CardTitle>
                            <CardDescription>
                                শ্রমিক আইডি: {worker.id.slice(0, 8)}...
                            </CardDescription>
                        </div>
                        <div className="ml-auto">
                            <Badge
                                variant={
                                    worker.status === 'ACTIVE'
                                        ? 'success'
                                        : 'destructive'
                                }
                            >
                                {worker.status === 'ACTIVE' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">যোগাযোগ</h3>

                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <span>{worker.phoneNumber || 'নেই'}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <span>{worker.email || 'নেই'}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <span>{worker.address || 'নেই'}</span>
                            </div>
                        </div>

                        {/* Salary Info */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">বেতন তথ্য</h3>

                            <div className="p-4 rounded-lg bg-primary/5 border">
                                <div className="text-sm text-muted-foreground">
                                    দৈনিক বেতন
                                </div>
                                <div className="text-3xl font-bold text-primary">
                                    ৳{worker.dailySalary.toLocaleString()}
                                </div>
                            </div>

                            {worker.age && (
                                <div>
                                    <div className="text-sm text-muted-foreground">
                                        বয়স
                                    </div>
                                    <div className="font-medium">
                                        {worker.age} বছর
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Timestamps */}
                    <div className="mt-8 pt-6 border-t text-sm text-muted-foreground">
                        <div className="flex justify-between">
                            <span>
                                তৈরি:{' '}
                                {new Date(worker.createdAt).toLocaleDateString(
                                    'bn-BD'
                                )}
                            </span>
                            <span>
                                আপডেট:{' '}
                                {new Date(worker.updatedAt).toLocaleDateString(
                                    'bn-BD'
                                )}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default WorkerDetails;
