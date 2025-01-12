import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function Settings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">Edit Profile</h1>

      {/* Profile Picture Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-semibold">
            <img src={user.image} className="rounded-full" alt="Profile" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Change Profile Picture</p>
            <div className="flex gap-2">
              <button className="bg-richblack-700 hover:bg-richblack-600 text-white px-4 py-2 rounded text-sm border border-gray-600 shadow">
                Select
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded text-sm flex items-center border border-yellow-600 shadow">
                <FiUpload className="h-4 w-4 mr-2" />
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm text-gray-400">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                defaultValue="jinil"
                className="w-full bg-richblack-700 rounded p-3 text-white border border-gray-600 shadow"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm text-gray-400">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                defaultValue="patel"
                className="w-full bg-richblack-700 rounded p-3 text-white border border-gray-600 shadow"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dob" className="block text-sm text-gray-400">
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                className="w-full bg-richblack-700 rounded p-3 text-white border border-gray-600 shadow"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm text-gray-400">
                Gender
              </label>
              <select
                id="gender"
                defaultValue="male"
                className="w-full bg-richblack-700 rounded p-3 text-white border border-gray-600 shadow"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="contact" className="block text-sm text-gray-400">
              Contact Number
            </label>
            <input
              id="contact"
              type="tel"
              placeholder="Enter Contact Number"
              className="w-full bg-richblack-700 rounded p-3 text-white border border-gray-600 shadow"
            />
          </div>
          <div>
            <label htmlFor="about" className="block text-sm text-gray-400">
              About
            </label>
            <textarea
              id="about"
              placeholder="Enter Bio Details"
              className="w-full bg-richblack-700 rounded p-3 text-white border border-gray-600 shadow"
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button className="bg-richblack-700 hover:bg-gray-600 text-white px-4 py-2 rounded border border-gray-600 shadow">
              Cancel
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded border border-yellow-600 shadow">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Password</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm text-gray-400"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter Current Password"
                  className="w-full bg-richblack-700 rounded p-3 text-white border border-gray-600 shadow"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-sm text-gray-400"
                  onClick={() =>
                    setShowCurrentPassword((prev) => !prev)
                  }
                >
                  {showCurrentPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm text-gray-400"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  className="w-full bg-richblack-700 rounded p-3 text-white border border-gray-600 shadow"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-sm text-gray-400"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button className="bg-richblack-700 hover:bg-gray-600 text-white px-4 py-2 rounded border border-gray-600 shadow">
              Cancel
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded border border-yellow-600 shadow">
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="bg-red-900 rounded-lg p-6 border border-red-700 shadow-lg">
        <h2 className="text-lg font-semibold text-richblack-900">Delete Account</h2>
        <p className="text-sm text-gray-400 my-4 text-richblack-900">
          Deleting your account is permanent and will remove all associated
          content, including paid courses.
        </p>
        <button className="bg-red-800 hover:bg-red-700 text-white w-full py-2 rounded shadow">
          I want to delete my account
        </button>
      </div>
    </div>
  );
}
