
"use client"

import { useEffect, useState } from "react"
import { AlertCircle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAppDispatch, useAppSelector } from "@/redux/Hook"
import type { JobParams } from "@/utils/types"
import { fetchJobs } from "@/redux/features/jobs/jobThunk"
import JobCard from "@/components/User/JobCard"
import Jobfilter from "./Jobfilter"
import type { RootState } from "@/redux/store"
import { fetchUserAppliedJobs } from "@/redux/features/Application/ApplicaitonThnuk"
import Welcomemessage from "@/components/Welcomemessage"
import { Button } from "@/components/ui/button"


const AllJobs = () => {
  const dispatch = useAppDispatch()
  const { jobs, loading } = useAppSelector((state: RootState) => state.jobs)

  const currentUser = useAppSelector((state) => state.auth.user);

  const [currentFilters, setCurrentFilters] = useState<JobParams>({})
  // This save the user's applied jobs in the state
  // so that we can use it later to show the applied jobs in the dashboard
  useEffect(() => {
    if (currentUser?._id) {
      dispatch(fetchUserAppliedJobs(currentUser._id))
    }
  }, [currentUser, dispatch])

  useEffect(() => {

    dispatch(fetchJobs({
      page: 1, limit: 3,
    }))
  }, [dispatch])

// Handle filter change and reset pagination
  const handleFilterChange = (filters: JobParams) => {
    const newFilters = { ...filters, page: 1, limit: 3 }
    setCurrentFilters(newFilters)
    dispatch(fetchJobs(newFilters))
  }


  // Handle page change and fetch jobs with current filters
  // This function will be called when the user clicks on pagination buttons
  const handlePageChange = (page: number) => {
    const { location, contract, companyName, } = currentFilters
    dispatch(fetchJobs({ page, limit: 3, location, contract, companyName, }))
  }
  return (
    <div>
      <Welcomemessage />
      <div className="min-h-screen bg-gray-200 rounded-2xl">

        <div className="">
          <div className="md:container mx-auto px-4 md:py-8 py-4 min-h-[60vh]">
            {/* Header */}
            <div className="mb-8
          
        ">
              <div className="flex items-center gap-3 mb-4">

                <h1 className="text-3xl font-bold">
                  All Avaiable Jobs

                </h1>
              </div>
              <p className="text-muted-foreground">Discover your next career opportunity from our curated job listings</p>
            </div>

            {/* Filters */}
            <div className="mb-8">
              <Jobfilter onFilterChange={handleFilterChange} loading={loading} />
            </div>




            {
              jobs?.data?.length === 0 && !loading && (
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>No jobs found matching your criteria.</AlertDescription>
                </Alert>
              )
            }



            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-muted animate-pulse md:h-[317px] h-[300px] rounded-lg" />
                ))}
              </div>
            ) : jobs?.data?.length > 0 && (
              <>
                <div className="grid gap-6  md:grid-cols-2 lg:grid-cols-3 md:mb-8">
                  {(jobs.data as { _id: string }[]).map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              </>
            )

            }

            {
              jobs?.meta && jobs.data.length > 0 && (
                <div className="flex items-center justify-between mt-4 md:w-[20%] w-[70%] mx-auto">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      disabled={jobs?.meta?.page === 1 || loading}
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(jobs.meta.page - 1)}
                      disabled={jobs?.meta?.page === 1

                        || loading
                      }
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {jobs?.meta.page} of {jobs?.meta?.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(jobs.meta.page + 1)}
                      disabled={jobs?.meta?.page === jobs?.meta?.totalPages
                        || loading

                      }
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(jobs?.meta?.totalPages)}
                      disabled={jobs?.meta?.page === jobs?.meta?.totalPages
                        || loading

                      }
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJobs;