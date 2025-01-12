const JWT = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth middlware


exports.auth = async (req, res, next) => {
  try {
    // Extract token from cookies, body, or headers
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // Verify the token
    try {
      const decode = JWT.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token is", decode);
      req.user = decode; // Store decoded user data in the request object
    } catch (err) {
      // Token verification issue
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};


// is student 

exports.isStudent=(req,res,next)=>{
    try {
        if(req.user.accountType!== "Student"){
            return res.status(401).json({
                success: false,
                message: "this is protected routed for students only",
              })
            }
            next();
        }
        
     catch (error) {
        return res.status(500).json({
            success: false,
            message: "user cannot be varified(in students), please try again",
          });
        }
    
}


// isInstructore

exports.isInstructor=(req,res,next)=>{
    try {
        if(req.user.accountType!== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "this is protected routed for Instructor only",
              })
            }
            next();
        }
        
     catch (error) {
        return res.status(500).json({
            success: false,
            message: "user cannot be varified (in Instructor), please try again",
          });
        }
    
}

// isAdmin

exports.isAdmin=(req,res,next)=>{
    try {
        if(req.user.accountType!== "Admin"){
            return res.status(401).json({
                success: false,
                message: "this is protected routed for Admin only",
              })
            }
            next();
        }
        
     catch (error) {
        return res.status(500).json({
            success: false,
            message: "user cannot be varified (in Admin), please try again",
          });
        }
    
}
