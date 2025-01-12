import React, { useState } from "react";
import { FiEdit, FiExternalLink } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const {user}= useSelector((state)=>state.profile)
  const navigate=useNavigate()
  
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState("Write Something About Yourself");

  const [isEditingDetails, setIsEditingDetails] = useState(false);

  
  const handleAboutEdit = () => {
    setIsEditingAbout(!isEditingAbout);
  };

  const handleDetailsEdit = () => {
    // navigate("/settings")
  };
  const handlefirstclick = () => {
    // navigate("/settings")
  };  

  const handleDetailChange = (field, value) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-transparent text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-center mb-8">My Profile</h1>

        {/* Profile Header Card */}
        <div className="bg-[#141820] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#4285f4] rounded-full flex items-center justify-center text-xl font-medium">
                <img src={user.image} className="rounded-full"/>
              </div>
              <div>
                <h2 className="text-xl font-medium">{user.firstName}</h2>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
            <button
            onClick={handlefirstclick}
              className="bg-[#ffd233] hover:bg-[#ffd233]/90 text-black px-4 py-2 rounded flex items-center"
            >
              Edit <FiExternalLink className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-[#141820] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">About</h3>
            <button
              onClick={handleAboutEdit}
              className="bg-[#ffd233] hover:bg-[#ffd233]/90 text-black px-4 py-2 rounded flex items-center"
            >
              {isEditingAbout ? "Save" : "Edit"} <FiEdit className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div>
            {isEditingAbout ? (
              <textarea
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                className="w-full bg-[#1c1f26] rounded p-3 text-white"
              />
            ) : (
              <p className="text-gray-400">{aboutText}</p>
            )}
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="bg-[#141820] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Personal Details</h3>
            <button
              onClick={handleDetailsEdit}
              className="bg-[#ffd233] hover:bg-[#ffd233]/90 text-black px-4 py-2 rounded flex items-center"
            >
              {isEditingDetails ? "Save" : "Edit"} <FiEdit className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p>lastName</p>
            <p>{user?.lastName}</p>
          </div>

          <div>
            <p>phoneNumber</p>
            <p>{user.additionalDetails.contactNumber}</p>
          </div>

          <div>
            <p>Date of birth</p>
            <p>{user.additionalDetails.DateOfBirth}</p>
          </div>

          <div>
            <p>Gender</p>
            <p>{user.additionalDetails.gender}</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
