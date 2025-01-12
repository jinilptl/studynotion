const express = require("express");
const router = express.Router();

// alll donennnnnn

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  getEnrolledCourses,
  updateDisplayPicture,
} = require("../controllers/Profile");

// const {
//   resetPasswordToken,
//   resetPassword,
// } = require("../controllers/ResetPassword");
const { auth, isStudent } = require("../middlewares/auth");

router.post("/updateProfile", auth, updateProfile); //done
router.delete("/deleteAccount",auth, deleteAccount);//not done

router.get("/getAllUserDetails", auth, getAllUserDetails); //done

// get enrooled
router.get("/getEnrolledCourses", auth, getEnrolledCourses); //not done yet 

router.post("/updateDisplayPicture", auth, updateDisplayPicture); // not done





module.exports = router;
