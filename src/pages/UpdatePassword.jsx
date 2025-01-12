import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { resetPassword } from "../services/operations/authAPI";
import { FaArrowLeft } from "react-icons/fa6";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1); // Extract token from URL
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">
              Choose New Password
            </h1>
            <p className=" text-richblack-600">
              Almost done. Enter your new password and you're all set.
            </p>
          </div>

          <form onSubmit={handleOnSubmit} className="space-y-4">
            {/* New Password */}
            <div className="space-y-1">
              <label className="block text-sm text-richblack-600">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 bg-[#1C2331] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-600 hover:text-richblack-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible fontSize={24}  />
                  ) : (
                    <AiFillEye fontSize={24} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="block text-sm text-richblack-600">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm new password"
                  className="w-full px-3 py-2 bg-[#1C2331] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-600 hover:text-richblack-500"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible fontSize={24} />
                  ) : (
                    <AiFillEye fontSize={24} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-md transition-colors"
            >
              Reset Password
            </button>
          </form>

          {/* Back to Login */}
          <Link
            to="/login"
            className="flex items-center text-sm text-richblack-600 hover:text-richblack-500 transition-colors"
          >
            <FaArrowLeft className="h-4 w-4 mr-2" />
            Back To Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
