import { MapPin, Calendar } from "lucide-react"
import { Card, CardContent, } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { JobParams } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/redux/Hook";
import { applyForJob } from "@/redux/features/Application/ApplicaitonThnuk";
import type { RootState } from "@/redux/store";
import { toast } from "sonner";




const JobCard = ({ job ,appliedAt}: {job:JobParams ,appliedAt?:string}) => {
    const dispatch = useAppDispatch();
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }
    const currentUser = useAppSelector((state) => state.auth.user);
    const currentAppliedJobs = useAppSelector(
    (state: RootState) => state.jobApply.appliedJobIds
  );


  const { loading,applyingJobId ,success} = useAppSelector(
    (state: RootState) => state.jobApply
  );
    
    const handleApply = (jobId: string) => {
    if (!currentUser?._id) return alert("You must be logged in to apply");
    dispatch(applyForJob({ jobId, userId: currentUser._id }));
      if (success) {
         toast('Job Apply successfully')
      }
    
  };
  const isApplying = loading && applyingJobId === job._id;
  const isApplied = job._id !== undefined && currentAppliedJobs.includes(job._id);
  console.log(job);
    return (
   <div className="">
      <Card className="group relative bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-gray-200 transition-all duration-500 hover:scale-[1.02]">
        {/* Header Section with Company Info */}
        <div className="relative bg-gradient-to-br from-slate-200 to-gray-300 p-4 border-b border-gray-100">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center overflow-hidden">
                <img src="https://i.ibb.co/ccWXHgWm/825159-preview.jpg" alt="Company logo" className="w-8 h-8 object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{job.companyName}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{job.location}</span>
                </div>
              </div>
            </div>
          <div className="flex items-center gap-2">
              <Badge
              variant={job.contract === "Full Time" ? "default" : "secondary"}
              className="bg-blue-50 text-blue-700 border-blue-200 text-xs font-medium hover:bg-blue-100"
            >
              {job.contract}
            </Badge>
            <Badge
              variant={job.contract === "Full Time" ? "default" : "secondary"}
              className="bg-blue-50 text-blue-700 border-blue-200 text-xs font-medium hover:bg-blue-100"
            >
              {job.position}
            </Badge>
          </div>
          </div>
          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>Posted {job.createdAt ? formatDate(job.createdAt) : appliedAt ? formatDate(appliedAt) : "N/A"}</span>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-4 space-y-3">
          {/* Description */}
          <div className="min-h-[3rem]">
            {job.description ? (
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{job.description}</p>
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                We are looking for a dedicated member
              </p>
            )}
          </div>

          {/* Action Button */}
          <Button
            onClick={() => job._id && handleApply(job._id)}
            disabled={isApplying || isApplied || !job._id || !!appliedAt}
            className={`w-full h-10 rounded-xl font-medium transition-all duration-300 ${
              isApplied || appliedAt
                ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                : "bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl"
            }`}
            variant={isApplied || appliedAt ? "outline" : "default"}
          >
            {isApplied || appliedAt ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Applied
              </span>
            ) : isApplying ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Applying...
              </span>
            ) : (
              "Apply Now"
            )}
          </Button>
        </CardContent>

        {/* Subtle hover indicator */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/5 group-hover:ring-gray-900/10 transition-all duration-300 pointer-events-none"></div>
      </Card>
    </div>
    );
};

export default JobCard;