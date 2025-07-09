/* eslint-disable react-hooks/exhaustive-deps */

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trash2, Edit, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/Hook"
import { deleteJob, fetchJobs, updateJob } from "@/redux/features/jobs/jobThunk"
import type { RootState } from "@/redux/store"
import { toast } from "sonner"
interface Job {
  id: number
  _id?: string
  companyName: string
  description: string
  contract: string
  position: string
  location: string
}


const UpdateJob = () => {
  
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const userId = useAppSelector((state: RootState) => state.auth.user?._id) || "" 


  const [formData, setFormData] = useState({
    _id: "",
    companyName: "",
    description: "",
    contract: "",
    position: "",
    location: "",
  })
  const dispatch = useAppDispatch()
 const { jobs, loading } = useAppSelector((state: RootState) => state.jobs)

  useEffect(() => {
    dispatch(fetchJobs({ page: 1, limit: 10 , userId: userId || "" }))
  }, [dispatch ])


  const handleEdit = (job: Job) => {
    setEditingJob(job)
    setFormData({
      _id: job._id as unknown as string,
      companyName: job.companyName,
      description: job.description,
      contract: job.contract,
      position: job.position,
      location: job.location,
    })
    setIsUpdateModalOpen(true)
    setError("")
  }

  const handleDelete =async(id: number) => {
    const result = await dispatch(deleteJob(id.toString()));

  if (deleteJob.fulfilled.match(result)) {
      toast("Job deleted ", {
        description: "Your job posting has been successfully created.",
        duration: 3000,
      });
      
  } else {
      toast('Something went wrong please try again ')
  }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

const handleSubmit = async (e: React.FormEvent) => {
 
  e.preventDefault();
  
  setError("");
  const jobId = editingJob?._id || ""; 

  try {

    const resultAction = await dispatch(updateJob({ jobId, updatedData: formData }));
    if (updateJob.fulfilled.match(resultAction)) {
         toast("Job Updated", {
        description: "Job updated successfully",
        duration: 3000,
      });
    } else {
      
      const errorMsg = resultAction.payload || "Failed to update job";
      setError(errorMsg);
    }
  } catch (err) {
    console.log(err);
    setError("Unexpected error occurred");
  } finally {
    setIsLoading(false);
    setIsUpdateModalOpen(false);
    setEditingJob(null);
  }
};

  const handleCancel = () => {
    setIsUpdateModalOpen(false)
    setEditingJob(null)
    setFormData({
      _id: "",
      companyName: "",
      description: "",
      contract: "Full Time",
      position: "",
      location: "",
    })
    setError("")
  }

  const handlePageChange = (page:number) => {
   dispatch(fetchJobs({ page, limit: 10, userId: userId || "" }))
    
  }

 

    return (
         <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
        <p className="text-gray-600 mt-2">Manage your job postings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Listings</CardTitle>
          <CardDescription>View and manage all job postings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading jobs...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : jobs.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No jobs found
                  </TableCell>
                </TableRow>
              ) : (
                jobs?.data.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.companyName}</TableCell>
                    <TableCell>{job.position}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.contract === "Full Time" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {job.contract}
                      </span>
                    </TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={job.description}>
                        {job.description}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(job._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={jobs?.meta?.page === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(jobs.meta.page - 1)}
                disabled={jobs?.meta?.page === 1}
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
                disabled={jobs?.meta?.page === jobs?.meta?.totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(jobs?.meta?.totalPages)}
                disabled={jobs?.meta?.page === jobs?.meta?.totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
        {/*  Admin can update the job   */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Job</DialogTitle>
          </DialogHeader>
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Fill in the information below to update a job posting</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                      Company Name *
                    </label>
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="position" className="text-sm font-medium text-gray-700">
                      Position *
                    </label>
                    <Input
                      id="position"
                      name="position"
                      type="text"
                      required
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="Enter job position"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contract" className="text-sm font-medium text-gray-700">
                      Contract Type *
                    </label>
                    <select
                      id="contract"
                      name="contract"
                      required
                      value={formData.contract}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium text-gray-700">
                      Location *
                    </label>
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter job location"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter job description..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                    {isLoading ? "Saving..." : "Update Job"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

    </div>
    );
};

export default UpdateJob;