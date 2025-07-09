import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/redux/Hook"
import { postJob } from "@/redux/features/jobs/jobThunk"
import Welcomemessage from "../Welcomemessage"
import { toast } from "sonner"

interface JobFormProps {
  jobId?: string
}

const  JobForm = ({ jobId }: JobFormProps) => {
  const isEditing = !!jobId
  const router = useNavigate()

  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    contract: "Full Time" as "Full Time" | "Part Time",
    location: "",
    description: "",
  })
   const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await dispatch(postJob(formData));
    if (postJob.fulfilled.match(result)) {
       toast("Job Created successfully ", {
        description: "Your job posting has been successfully created.",
        duration: 3000,
      });
      setFormData({
        companyName: "",
        position: "",
        contract: "Full Time",
        location: "",
        description: "",
      });
    } else {
      setError(result.payload as string);
    }
    setIsLoading(false);
  };


  return (
     <div className="">
        <Welcomemessage/>
        <Card className="md:w-[90%] mx-auto">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Fill in the information below to {isEditing ? "update" : "create"} a job posting
            </CardDescription>
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
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">{error}</div>
              )}

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}  size={"lg"} className="bg-sky-600 hover:bg-sky-700">
                  {isLoading ? "Saving..." : 'Save'}
                </Button>
                <Button type="button" size={"lg"}  variant="outline" onClick={() => router("/dashboard/list-jobs")}>
                 All jobs list
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  )
}


export default JobForm