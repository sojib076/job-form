"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { loginUser } from "@/redux/features/Auth/authThunk"
export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
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
        setError(resultAction.payload as string);
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong.");
    }
  };

  return (
    <Card className="w-full 
max-w-md mx-auto bg-white/40 shadow-lg rounded-lg p-6 space-y-4 border border-gray-200
    
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

          {(auth.error || error) && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {auth.error || error}
            </div>
          )}

          <Button type="submit" disabled={auth.loading} className="w-full">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to={'/'} className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
