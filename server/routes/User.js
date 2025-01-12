const express=require("express");
const router=express.Router();

// alll done 

const{login,signUp,sendOtp,changePassword}=require("../controllers/Auth");



const{resetPasswordToken,resetPassword}=require("../controllers/ResetPassword");

const{auth}=require("../middlewares/auth");


// routes for logine signup and authentication

// routes for login 
router.post("/login",login) //done

// routes for signup
router.post("/signUp",signUp); //done


//Route for the sending otp to the user's email
router.post("/sendOtp",sendOtp);//done


// change password 
router.post("/changePassword",changePassword); // not done only


router.post("/reset-password-token", resetPasswordToken);//done
router.post("/reset-password", resetPassword);//done

module.exports=router;



