import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5"; // Eye icons for toggling
import instructor from "../assets/Images/instructor.jpg";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import { sendOtp } from "../services/operations/authAPI";

const Signup = () => {
  const [userType, setUserType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  
  


const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

   const onSubmit = (data) => {
      const signupData = { ...data, accountType: userType };
      dispatch(setSignupData(signupData));
      dispatch(sendOtp(data.email, navigate));
    };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-transparent text-gray-200 p-8 rounded-lg shadow-lg mx-auto max-w-maxContent mt-2 w-11/12">
      
        <div className="mb-8 md:mb-0  max-w-maxContent w-[40%]">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Join the millions learning to{" "}
          <span className="text-white lg:pr-10">code with </span>
          <span className="text-white">ExcellenceAcademia</span> for free
        </h1>
        <p className="text-sm mb-2 text-white">
          Build skills for today, tomorrow, and beyond.
        </p>
        <p className="italic text-blue-400 mb-6 text-sm">
          Education to future-proof your career.
        </p>

        {/* User Type Toggle */}
        <div className="flex space-x-4 mb-8 bg-richblack-700 pt-3 pl-4 pr-4 pb-3 rounded-full max-w-maxContent w-fit">
          <button
            className={`px-4 py-2 rounded-lg ${
              userType === "Student"
                ? "bg-yellow-500 text-gray-900"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setUserType("Student")}
          >
            Student
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              userType === "Instructor"
                ? "bg-yellow-500 text-gray-900"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setUserType("Instructor")}
          >
            Instructor
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <label
                htmlFor="firstName"
                className="absolute -top-5 left-1 bg-gray-900 px-1 text-sm text-yellow-500 "
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", { required: "First Name is required" })}
                placeholder="Enter first name"
                className="w-full p-3 bg-gray-800 border border-gray-700 bg-richblack-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="relative w-1/2">
              <label
                htmlFor="lastName"
                className="absolute -top-5 left-1 bg-gray-900 px-1 text-sm text-yellow-500"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", { required: "Last Name is required" })}
                placeholder="Enter last name"
                className="w-full p-3 bg-gray-800 border border-gray-700 bg-richblack-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="absolute -top-5 left-1 bg-gray-900 px-1 text-sm text-yellow-500"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter email address"
              className="w-full p-3 bg-gray-800 border border-gray-700 bg-richblack-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="absolute -top-5 left-1 bg-gray-900 px-1 text-sm text-yellow-500"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter Password"
              className="w-full p-3 bg-gray-800 border border-gray-700 bg-richblack-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <span
              className="absolute top-3 right-4 text-xl cursor-pointer text-yellow-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="absolute -top-5 left-1 bg-gray-900 px-1 text-sm text-yellow-500"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              placeholder="Confirm Password"
              className="w-full p-3  bg-richblack-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <span
              className="absolute top-3 right-4 text-xl cursor-pointer text-yellow-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
            </span>
            {errors.confirmPassword && (
              <p className=" text-red-600 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-600"
          >
            Create Account
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex items-center justify-center max-w-maxContent ">
        <img
          src={instructor}
          alt="Group of learners"
          className="rounded-lg h-[70%] w-[70%] m-5"
        />
      </div>
      
        </div>
    
  );
};

export default Signup;
