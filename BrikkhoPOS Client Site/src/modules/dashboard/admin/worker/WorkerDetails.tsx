import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useGetSingleWorkerQuery } from '@/redux/features/worker/worker.api';
import { ArrowLeft, Edit, Mail, MapPin, Phone, User, Banknote, Loader2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const WorkerDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetSingleWorkerQuery(id!);

    const worker = data?.data;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Loading worker details...</p>
                </div>
            </div>
        );
    }

    if (error || !worker) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h2 className="text-lg font-semibold mb-2">Worker Not Found</h2>
                    <p className="text-sm text-muted-foreground mb-4">The requested worker could not be located</p>
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="container max-w-4xl mx-auto px-4 py-6 space-y-6"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                </Button>
                <Link to={`/dashboard/admin/edit-worker/${worker.id}`}>
                    <Button>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Worker
                    </Button>
                </Link>
            </div>

            {/* Main Card */}
            <Card className="shadow-sm">
                <CardHeader className="border-b">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-2xl font-bold">
                                {worker.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Worker ID: {worker.id.slice(0, 8)}...
                            </p>
                        </div>
                        <Badge
                            variant={worker.status === 'ACTIVE' ? 'default' : 'secondary'}
                        >
                            {worker.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h3 className="font-semibold text-lg">Contact Information</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Phone</p>
                                        <p className="font-medium">{worker.phoneNumber || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Email</p>
                                        <p className="font-medium">{worker.email || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Address</p>
                                        <p className="font-medium">{worker.address || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Salary & Additional Info */}
                        <div className="space-y-6">
                            <h3 className="font-semibold text-lg">Salary & Details</h3>

                            <div className="p-6 rounded-lg bg-primary/5 border">
                                <div className="flex items-center gap-2 mb-2">
                                    <Banknote className="h-5 w-5 text-primary" />
                                    <div className="text-sm text-muted-foreground">
                                        Daily Salary
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-primary">
                                    ৳{worker.dailySalary.toLocaleString()}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    Per working day
                                </div>
                            </div>

                            {worker.age && (
                                <div>
                                    <p className="text-xs text-muted-foreground">Age</p>
                                    <p className="font-medium text-lg">{worker.age} years</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Timestamps */}
                    <div className="mt-8 pt-6 border-t">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div>
                                <span className="font-medium">Created:</span>{' '}
                                {new Date(worker.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <div>
                                <span className="font-medium">Last Updated:</span>{' '}
                                {new Date(worker.updatedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default WorkerDetails;
