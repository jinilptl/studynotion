import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoChevronDown } from 'react-icons/io5'; // Import arrow icon
import { logout } from '../../services/operations/authAPI'; // Import the logout function
import { Link, useNavigate } from 'react-router-dom'; // For navigation

const ProfileDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const image = user?.image;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout(navigate)); // Call the logout function and pass navigate
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 rounded-full focus:outline-none"
      >
        {/* Profile Image */}
        <img
          src={image}
          alt="User Profile"
          className="rounded-full h-10 w-10 object-cover"
        />
        {/* Down Arrow */}
        <IoChevronDown className="text-white text-lg" />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-28 shadow-lg bg-white rounded-md z-50">
        <Link to={"dashboard/my-profile"}>
          <div className="px-4 py-2 text-sm h-auto text-gray-700 font-medium border-b hover:bg-richblack-700 hover:text-white">
            Dashboard
          </div>
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
