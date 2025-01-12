
import React, { useState } from "react";
import instructor from "../assets/Images/instructor.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { login } from "../services/operations/authAPI"; // Importing the login function

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data Submitted: ", data);
    // Dispatching the login action
    dispatch(login(data.email, data.password, navigate));
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 max-w-maxContent mx-auto">
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Column */}
        <div className="space-y-8 lg:mr-10">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-4xl font-bold text-white">Welcome Back</h1>
            <p className="text-richblack-300 text-xl">Build skills for today, tomorrow, and beyond.</p>
            <p className="text-blue-400 italic">Education to future-proof your career.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full max-w-maxContent px-4 py-3 rounded-lg bg-richblack-700 text-white placeholder-richblack-200 focus:outline-none focus:border-blue-500 transition-colors"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-richblack-700 text-richblack-900 placeholder-richblack-200 focus:outline-none focus:border-blue-500 transition-colors pr-10"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 "
                >
                  {showPassword ? <IoEye size={24} /> : <IoEyeOff size={24} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              <div className="flex justify-end">
                <Link to={"/forgot-password"}>
                  <p className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot Password
                  </p>
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-lg py-3 rounded-lg transition-colors font-medium"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Right Column */}
        <div className="hidden lg:block relative lg:ml-11">
          <div className="relative aspect-square max-w-maxContent mx-auto flex items-center justify-center lg:mt-10">
            <img
              src={instructor}
              alt="Student with tablet"
              className="w-[70%] h-[70%] object-cover rounded-lg shadow-[0_0_30px_10px_rgba(0,56,128,0.5)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
