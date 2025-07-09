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
    return (
        <div>
          <Card className="hover:shadow-lg md:min-h-[400px] min-h-[340px]  transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
        <div className="relative">
        
          <div className="relative md:h-40 h-20 top-[-30px] overflow-hidden">
            <img
              src={ "https://i.ibb.co/ccWXHgWm/825159-preview.jpg"}
              alt={`${job.companyName} job`}
               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
             
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center shadow-md overflow-hidden">
                  <img
                    src="https://i.ibb.co/ccWXHgWm/825159-preview.jpg"
                    alt={`${job.companyName} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white">
    
                  <p className="text-blue-100 text-xl">{job.companyName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contract Badge */}
          <div className="absolute top-4 right-4">
            <Badge
              variant={job.contract === "Full Time" ? "default" : "secondary"}
              className="bg-white/90 text-gray-800 hover:bg-white"
            >
              {job.contract}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
       
       

          {/* Location and Date */}
          <div className="flex items-center justify-between text-sm ">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="">{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{job.createdAt ? formatDate(job.createdAt) : appliedAt ? formatDate(appliedAt) : 'N/A'}</span>
              
            </div>
          </div>

          {/* Description */}
          {job.description ? (
            <p className="text-sm  line-clamp-3 leading-relaxed min-h-11">{job.description 
            }</p> 

          ) : <p className="text-sm   line-clamp-3 leading-relaxed min-h-11">
              We are looking for a dedicated memeber 
            </p>
           
        
        }

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
             <Button
      onClick={() => job._id && handleApply(job._id)}
      disabled={isApplying || isApplied || !job._id || !!appliedAt }
      size="lg"
      className="flex-1 bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700"
    >
      {isApplied || appliedAt ? "✅ Applied" : isApplying ? "Applying..." : "Apply Now"}
    </Button>
              
            
          </div>
        </CardContent>
      </Card>
        </div>
    );
};

export default JobCard;