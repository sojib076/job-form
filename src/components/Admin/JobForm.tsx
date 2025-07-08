/* eslint-disable react-hooks/exhaustive-deps */


import type React from "react"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

interface JobFormProps {
  jobId?: string
}

export default function JobForm({ jobId }: JobFormProps) {
  const isEditing = !!jobId
  const router = useNavigate()

  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    contract: "Full Time" as "Full Time" | "Part Time",
    location: "",
    description: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isEditing && jobId) {
      fetchJob()
    }
  }, [isEditing, jobId ])

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`)
      if (response.ok) {
        const job = await response.json()
        setFormData({
          companyName: job.companyName,
          position: job.position,
          contract: job.contract,
          location: job.location,
          description: job.description || "",
    
        })
      }
    } catch (error) {
      console.error("Error fetching job:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const jobData = {
        ...formData,
      }

      const url = isEditing ? `/api/jobs/${jobId}` : "/api/jobs"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      })

      if (response.ok) {
       console.log("Job saved successfully");
      } else {
        const data = await response.json()
        setError(data.error || "Failed to save job")
      }
    } catch (error) {
      console.error("Error saving job:", error)
      setError("Failed to save job")
    } finally {
      setIsLoading(false)
    }
  }

  return (
     <div className="space-y-6">
        <Card>
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
                <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                  {isLoading ? "Saving..." : isEditing ? "Update Job" : "Post Job"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router("/admin/jobs")}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  )
}
