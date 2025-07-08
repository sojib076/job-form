"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { signupUser } from "@/redux/features/Auth/authThunk"

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
 const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
    const resultAction = await dispatch(signupUser(formData));
    
    if (signupUser.fulfilled.match(resultAction)) {
      const user = resultAction.payload.user;
      if (user.role === "admin") {
        navigate("/dashboard/");
      } else {
        navigate("/dashboard/jobs");
      }
    } else {
      setError(resultAction.payload as string);
    }
  } catch (error: any) {
    setError(error.message || "Signup failed");
  } finally {
    setIsLoading(false);
  }
};
  return (
    <Card className="w-full ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
        <CardDescription className="text-center">Fill in your details to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                 Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John"
              />
            </div>
        
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
        
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          

          {auth.error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">{error}</div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
            {auth.loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to={'/login'} className="text-blue-600 hover:text-blue-500 font-medium">
              Login in here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
