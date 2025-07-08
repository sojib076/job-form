import { useEffect, useState } from "react";

import { useAppSelector } from "@/redux/Hook";
import axiosInstance from "@/utils/axiosInstance";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface Job {
    _id: string;
    position: string;
    companyName: string;
    location: string;
}

interface Application {
    _id: string;
    jobId: Job;
    createdAt: string;
}

const MyAllJobs = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(false);


    const userId = useAppSelector((state) => state.auth.user?._id);


    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get(`/user/applications?userId=${userId}`);
                setApplications(res.data.data);
            } catch (err: any) {
               console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [userId]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Jobs You Applied For</h2>



       

            {applications.length === 0 && !loading && <p>No applications yet.</p>}

            <ul className="space-y-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                { loading && (

                    Array.from({ length: 4 }).map((_, index) => (
                        <Card key={index} className="w-full max-h-[400px] overflow-hidden shadow-lg">
                        {/* Header Image Skeleton */}
                        <div className="h-48 bg-gray-200 animate-pulse" />

                        <CardContent className="p-6 text-center">
                            <div className="space-y-4">
                                {/* Company Name Skeleton */}
                                <div className="space-y-2">
                                    <div className="h-8 bg-gray-200 rounded animate-pulse mx-auto w-3/4" />
                                </div>

                                {/* Location Skeleton */}
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                                </div>

                                {/* Divider */}
                                <div className="pt-4 border-t border-gray-200">
                                    {/* Description Skeleton */}
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-5/6" />
                                        <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-2/3" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
                ))}


                {applications.map((app) => (

                    <Card className=" shadow-lg max-h-[400px]">
                        <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-700
                            py-1
                            ">
                            <img
                                src="/placeholder.svg?height=200&width=400"
                                alt="Company Image"
                                className="w-full h-full object-cover opacity-20"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        <CardContent className="p-6 text-center">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{app.jobId.companyName}</h2>
                                </div>

                                <div className="flex items-center justify-center gap-2 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">
                                        {app.jobId.location || "Remote"}
                                    </span>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-500">
                                        Applied on: {new Date(app.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                ))}
            </ul>
        </div>
    );
};

export default MyAllJobs;
