const express=require("express");
const router=express.Router();

const{auth,isStudent,isAdmin, isInstructor}=require("../middlewares/auth")

const{createCourse,getAllCourses,getCourseDetails,editCourse,deleteCourse,getInstructorCourses,getFullCourseDetails}=require("../controllers/Course")
const{createSection,updateSection,deleteSection}=require("../controllers/Section");
const{createSubSection,deleteSubSection,updateSubSection}=require("../controllers/subSection");

// done 
const{createCategory,categoryPageDetails,showAllCategory}=require("../controllers/Category");
const{createRating,getAllRating,getAverageRating}=require("../controllers/RatingAndReview");


// course only created by insturctor
router.post("/createCourse",auth,isInstructor,createCourse); //done
router.post("/editCourse",auth,isInstructor,editCourse); 

//add a section to course
router.post("/addSection",auth,isInstructor,createSection); //done

// update section 
router.post("/updateSection",auth,isInstructor,updateSection);//done

// delete section 
router.post("/deleteSection",auth,isInstructor,deleteSection);//done


// edit subsection 
router.post("/updateSubSection",auth,isInstructor,updateSubSection);

// delete subsection 
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);

// add subsection to a section 
router.post("/createSubSection",auth,isInstructor,createSubSection);//done

// delete courses 

router.delete("/deleteCourse",auth,isInstructor,deleteCourse);//done

// get 
router.get("/getAllCourses",getAllCourses);
router.get("/getCourseDetails",getCourseDetails); //done
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses); //done
router.post("/getFullCourseDetails",auth,isInstructor,getFullCourseDetails); //done



// category
router.post("/createCategory",auth,isAdmin,createCategory)//done
router.get("/showAllCategories",showAllCategory)
router.post("/getcategoryPageDetails",categoryPageDetails)




// rating and reviews 
router.post("/createRating",auth,isStudent,createRating)
router.post("/getAverageRating",getAverageRating);
router.post("/getReviews",getAllRating);


module.exports=router;