"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/redux/store"
import { loginUser } from "@/redux/features/Auth/authThunk"
import { toast } from "sonner"
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const dispatch = useDispatch<AppDispatch>();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // this user react thunk to dispatch the login action and save on auth slice
      const resultAction = await dispatch(loginUser(formData));
      setLoading(false);
      if (loginUser.fulfilled.match(resultAction)) {
        const role = resultAction.payload.user.role;
        if (role === "admin") {
          navigate("/dashboard/admin");
        } else {
          navigate("/dashboard/jobs");
        }
      } else {
        toast(resultAction.payload as string, {
          description: "Please try again.",
        })
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        toast(err.message || "Login failed. Please try again.", {
          description: "Please check your credentials and try again.",
        })
      } else {
        toast("An unexpected error occurred. Please try again.", {
          description: "Please try again later.",
        })
      }
    }
  };

  return (
    <Card className="w-full 
max-w-md mx-auto bg-white/40 shadow-lg rounded-lg md:p-6 space-y-4 border border-gray-200
    
    ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
        <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter your email"
              className="w-full"
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
              className="w-full"
            />
          </div>



          <Button


            type="submit" disabled={loading} className="w-full bg-sky-400
hover:bg-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
          ">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to={'/signup'} className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginForm