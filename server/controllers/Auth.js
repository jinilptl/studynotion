const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile=require("../models/Profile")
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();

// send otp

exports.sendOtp = async (req, res) => {
  try {
    //fetch email from body
    const { email } = req.body;

    //check if user already exits
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: true,
        Message: "user already registred",
      });
    }

    //otp generation
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    console.log("OTP generated", otp);

    //check unique otp
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    //create an entry for OTP

    const otpBody = await OTP.create(otpPayload);
    console.log("otpBody is ", otpBody);

    //   return res successful

    res.status(200).json({
      success: true,
      message: "OTP send Suceesfully",
      otp,
    });
  } catch (error) {
    console.log("otp generation catch error", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// signup code 

// exports.signUp = async (req, res) => {
//   try {
//     // Data fetch from request body
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       confirmPassword,
//       accountType,
//       contactNumber,
//       otp,
//     } = req.body;

//     // Trim and normalize email to avoid issues with whitespace or case sensitivity
//     const trimmedEmail = email?.trim().toLowerCase();

//     // Validate required fields
//     if (!firstName || !lastName || !trimmedEmail || !password || !confirmPassword || !otp) {
//       return res.status(403).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Validate password and confirmPassword
//     if (password !== confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "Password and confirm password do not match",
//       });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email: trimmedEmail });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already registered",
//       });
//     }

//     // Find the most recent OTP stored for the user
//     const recentOtp = await OTP.findOne({ email: trimmedEmail }).sort({ createdAt: -1 });

//     if (!recentOtp) {
//       console.log(`No OTP found for email: ${trimmedEmail}`); // Debug log
//       return res.status(400).json({
//         success: false,
//         message: "OTP not found or expired",
//       });
//     }

//     // Check if the provided OTP matches the stored OTP
//     if (otp !== recentOtp.otp) {
//       console.log(`Invalid OTP for email: ${trimmedEmail}, Expected: ${recentOtp.otp}, Received: ${otp}`); // Debug log
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Add additional details
//     const profileDetails = await Profile.create({
//       gender: null,
//       dateofBirth: null,
//       about: null,
//       contactNumber: null,
//     });

//     // Create the user
//     const user = await User.create({
//       firstName,
//       lastName,
//       email: trimmedEmail,
//       contactNumber,
//       password: hashedPassword,
//       accountType,
//       additionalDetails: profileDetails._id,
//       image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
//     });

//     // Successful response
//     return res.status(200).json({
//       success: true,
//       message: "Your user has been registered successfully",
//       user,
//     });
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Your user cannot be registered. Please try again",
//     });
//   }
// };


exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    const trimmedEmail = email?.trim().toLowerCase();

    if (!firstName || !lastName || !trimmedEmail || !password || !confirmPassword || !otp) {
      return res.status(403).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email: trimmedEmail });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already registered" });
    }

    const recentOtp = await OTP.findOne({ email: trimmedEmail }).sort({ createdAt: -1 });

    if (!recentOtp) {
      console.log(`No OTP found for email: ${trimmedEmail}`);
      return res.status(400).json({ success: false, message: "OTP not found or expired" });
    }

    if (otp !== recentOtp.otp) {
      console.log(`Invalid OTP: Expected ${recentOtp.otp}, Received ${otp}`);
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateofBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email: trimmedEmail,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "Your user has been registered successfully",
      user,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "An error occurred. Please try again" });
  }
};


// login

exports.login = async (req, res) => {
  try {
    //get data from req ki body
    const { email, password } = req.body;

    // validate the data

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "all fields are required",
      });
    }

    //user check exits or not
    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registred ,please signup first ",
      });
    }

    // generate jwt with match password

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user.id,
        accountType: user.accountType,
      };

      const token = JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });

      (user.token = token), (user.password = undefined);

      // create cookie and send response

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        user,
        token,
        message: "logged in succesfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "password is incorreect",
      });
    }
    
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "login failure,please try again",
    });
  }
};


//change password hw 

exports.changePassword=async(req,res)=>{
  
}