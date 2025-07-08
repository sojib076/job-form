/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import { Briefcase, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAppDispatch, useAppSelector } from "@/redux/Hook"
import type { JobParams } from "@/utils/types"
import { fetchJobs } from "@/redux/features/jobs/jobThunk"
import JobCard from "@/components/User/JobCard"
import Jobfilter from "./Jobfilter"
import type { RootState } from "@/redux/store"
import { fetchUserAppliedJobs } from "@/redux/features/Application/ApplicaitonThnuk"






const AllJobs = () => {
  const dispatch = useAppDispatch()
  const { jobs, loading } = useAppSelector((state: RootState) => state.jobs)
  console.log(jobs);
  const { error, success } = useAppSelector(
    (state: RootState) => state.jobApply
  );

  const currentUser = useAppSelector((state) => state.auth.user);


  const [currentFilters, setCurrentFilters] = useState<JobParams>({})
  console.log("Current Filters:", currentFilters);
  useEffect(() => {

    dispatch(fetchJobs({ page: 1, limit: 10 }))
    dispatch(fetchUserAppliedJobs(currentUser?._id || ""))
  }, [dispatch])

  const handleFilterChange = (filters: JobParams) => {
    const newFilters = { ...filters, page: 1, limit: 10 }
    setCurrentFilters(newFilters)
    dispatch(fetchJobs(newFilters))
  }
  return (
    <div className="min-h-screen bg-gray-200 rounded-2xl">
      <div className="">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8
          
        ">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Job Listings</h1>
            </div>
            <p className="text-muted-foreground">Discover your next career opportunity from our curated job listings</p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <Jobfilter onFilterChange={handleFilterChange} loading={loading} />
          </div>

          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}. Please try again.</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Job application submitted successfully!</AlertDescription>
            </Alert>
          )}
          {
            jobs?.data?.length === 0 && !loading && (
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>No jobs found matching your criteria.</AlertDescription>
              </Alert>
            )
          }

          {/* Meta Information */}

          {/* {meta && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {(meta.page - 1) * meta.limit + 1} to {Math.min(meta.page * meta.limit, meta.total)} of{" "}
              {meta.total} jobs
            </p>
          </div>
        )} */}

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : jobs?.data?.length > 0 && (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {(jobs.data as { _id: string }[]).map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>


              {/* {meta && meta.totalPages > 1 && (
              <Pagination
                currentPage={meta.page}
                totalPages={meta.totalPages}
                onPageChange={handlePageChange}
                loading={loading}
              />
            )} */}
            </>
          )




          }



        </div>
      </div>
    </div>
  );
};

export default AllJobs;