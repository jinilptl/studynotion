const Category = require("../models/Category");
const Section = require("../models/Section"); // Import Section model
const SubSection = require("../models/SubSection"); // Import SubSection if referenced
const Course = require("../models/Course");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createCourse = async (req, res) => {
  try {
    // Fetch data from request body
    const { courseName, courseDescription, whatYouWillLearn, price,category} =
      req.body;

    // Get the thumbnail image
    
    // const thumbnail = req.files?.thumbnailImage;

    // Validation for required fields

    // add in if !thumbnail
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category
    
      ) {
      console.log("courseName ",courseName, "courseDescription ",courseDescription, "whatYouWillLearn ",whatYouWillLearn,"price" ,price, "category",category);
      
      
      
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the instructor exists
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    console.log("Instructor Details:", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }

    // Check if the provided tag is valid

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "category details not found",
      });
    }

    // Upload the image to Cloudinary

    // const thumbnailImage = await uploadImageToCloudinary(
    //   thumbnail,
    //   process.env.FOLDER_NAME
    // );

    // Create a new course entry
    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription, // Fixed typo
      whatYouWillLearn: whatYouWillLearn,
      price: price,
      instructor: instructorDetails._id,
      
      // thumbnail: thumbnailImage.secure_url,
      category:categoryDetails._id
    });

    // Add the new course to the instructor's course list
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// exports.getAllCourses = async (req, res) => {
//   try {
//     const allCourses = await Course.find(
//       {},
//       {
//         courseName: true,
//         price: true,
//         thumbnail: true,
//         instructor: true,
//         ratingAndReviews: true,
//         studentsEnrolled: true,
//       }
//     )
//       .populate("instructor")
//       .exec();

//     return res.status(200).json({
//       success: true,
//       message: "data for all courses fetched succesfully",
//       data: allCourses,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to show all course",
//       error: error.message,
//     });
//   }
// };


//get course details

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor") // Ensure instructor is correctly referenced in the schema
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.error(error); // Consider logging this to a monitoring system in production
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all courses",
      // Avoid sending error.message directly in production
      error: "An unexpected error occurred.",
    });
  }
};



exports.getCourseDetails=async(req,res)=>{

  try {
    const {courseId}=req.body;

    const courseDetails=await Course.find({_id:courseId}).populate({
                                                              path:"instructor",
                                                                populate:{
                                                                  path:"additionalDetails"
                                                                  } 
                                                                    }
                                                                  ).populate("category")
                                                                  // .populate("ratingAndReviews")
                                                                  .populate({
                                                                    path:"courseContent",
                                                                    populate:{
                                                                      path:"subSection"
                                                                    }
                                                                  }).exec();
            
                                                                  
            //validation
            
            if(!courseDetails){
              return res.status(400).json({
                success:false,
                message:`could not find course with ${courseId}`
              })
            }

            return res.status(200).json({
              success:true,
              message:"course Details fetched succesfully ",
              data:courseDetails
            })
          
    
        }catch (error) {
          console.log(error);
          
          return res.status(500).json({
            success:false,
            message:"bahar error aa raha hain",
            error:error.message
          })
      }
  
    }



// Get a list of Courses for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user

    const instructorId= req.user.id
    console.log("instructor id is " , instructorId);
    

    // Find all courses belonging to the instructor and sort by creation date
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve courses",
      error: error.message,
    });
  }
};



// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body; // Get courseId from the request body
    const updates = req.body; // All fields to be updated
    const course = await Course.findById(courseId); // Find the course by ID

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // If a thumbnail image is provided, upload and update it
    if (req.files && req.files.thumbnailImage) {
      console.log("Thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url; // Update course thumbnail URL
    }

    // Update only the fields present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]); // Parse JSON strings for specific fields
        } else {
          course[key] = updates[key];
        }
      }
    }

    // Save the updated course
    await course.save();

    // Retrieve the updated course with populated fields
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // Return the updated course
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the course",
      error: error.message,
    });
  }
};


exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body; // Extract courseId from request body
    const userId = req.user.id; // Extract userId from authenticated user

    // Fetch the course details with all the necessary populated fields
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    // Fetch course progress for the user

    // const courseProgressCount = await CourseProgress.findOne({
    //   courseID: courseId,
    //   userId: userId,
    // });

    // console.log("courseProgressCount: ", courseProgressCount);

    // Calculate total course duration in seconds

    // let totalDurationInSeconds = 0;
    // courseDetails.courseContent.forEach((content) => {
    //   content.subSection.forEach((subSection) => {
    //     const timeDurationInSeconds = parseInt(subSection.timeDuration, 10) || 0;
    //     totalDurationInSeconds += timeDurationInSeconds;
    //   });
    // });

    // Convert seconds to a readable duration format (e.g., HH:MM:SS)
    // const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    // Return the course details along with progress information
    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        // totalDuration,
        // completedVideos: courseProgressCount?.completedVideos || 0,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching course details",
      error: error.message,
    });
  }
};



exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled; // Assuming `studentsEnrolled` is an array of student IDs
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId }, // Remove course from student's enrolled courses
      });
    }

    // Delete sections and subsections
    const courseSections = course.courseContent; // Assuming `courseContent` contains section IDs
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId); // Find the section by ID
      if (section) {
        const subSections = section.subSection; // Assuming `subSections` contains subsection IDs
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId); // Delete each subsection
        }
        await Section.findByIdAndDelete(sectionId); // Delete the section itself
      }
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

