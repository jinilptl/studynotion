const Profile = require("../models/Profile");
const User = require("../models/User");


exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;

    const id = req.user.id;

    if (!contactNumber || !gender) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    // find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    // update profile

    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;
    profileDetails.about = about;
    await profileDetails.save();

    return res.status(200).json({
      success: true,
      message: "profile Updated succesfully",
      profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    // delete profile

    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    // delete user
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "profile and User deleted  succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "data fetched succesfully",
      userDetails
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//

exports.updateDisplayPicture = async (req, res) => {};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user details and populate the "courses" field
    const userDetails = await User.findOne({ _id: userId })
      .populate("courses")
      .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

