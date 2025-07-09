/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { useAppSelector } from "@/redux/Hook";
import axiosInstance from "@/utils/axiosInstance";
import { Card, CardContent } from "@/components/ui/card";
import JobCard from "@/components/User/JobCard";
import {  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button";

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

type Meta = {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    page: number;
};

const MyAllJobs = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    // this just axois instance to fetch the data from the server
    const userId = useAppSelector((state) => state.auth.user?._id);
    useEffect(() => {
        if (!userId) return;

        const fetchApplications = async () => {
            setLoading(true);
            setApplications([]);
            try {
                const res = await axiosInstance.get(
                    `/user/applications?userId=${userId}&page=${page}`
                );
                setApplications(res.data.data.applications);
                setMeta(res.data.data.meta);
            
            } catch (err: any) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, [userId, page]);
  

   
    return (
        <div className="p-4  mx-auto">
            <h2 className="text-xl font-semibold mb-4">Jobs You Applied For</h2>
            {applications.length === 0 && !loading && <p>No applications yet.</p>}

            <div className="space-y-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:min-h-[70vh]">
                {loading && (

                    Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className="w-full max-h-[300px] overflow-hidden shadow-lg">
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

                    <JobCard job={app.jobId} appliedAt={app.createdAt} />

                ))}
            </div>
            {meta && (
                <div className="flex items-center justify-between mt-4 w-[30%] mx-auto">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(1)}
                            disabled={meta.page === 1
                                || meta.totalPages === 0
                                || loading
                            }
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={meta.page === 1
                                || loading
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-gray-600">
                            Page {meta.page} of {meta.totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((prev) => Math.min(prev + 1, meta.totalPages))}
                            disabled={meta.page === meta.totalPages
                                || loading
                            }
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(meta.totalPages)}
                            disabled={meta.page === meta.totalPages
                                || loading
                            }
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAllJobs;
