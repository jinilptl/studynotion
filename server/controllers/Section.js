const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Property",
      });
    }

    const newSection = await Section.create({ sectionName:sectionName });

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,  // You can keep this as is, pushing the section _id
        },
      },
      { new: true }
    ).populate('courseContent');

    return res.status(200).json({
      success: true,
      message: "Section Created Succesfuly",
      updatedCourseDetails,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "unabled to create section,please try again",
      error: error.message,
    });
  }
};


// exports.updateSection = async (req, res) => {
//   try {
//     const { sectionName, sectionId ,courseId} = req.body;

//     if (!sectionName || !sectionId) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing Property",
//       });
//     }

//     const course=await Course.findById(courseId).populate({
//       path:"courseContent",
//       populate:{
//         path:"subSection"
//       }
//     }).exec()

//     // updatedata
//     const section = await Section.findByIdAndUpdate(
//        sectionId ,
//       {
//         sectionName:sectionName,
//       },
//       { new: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "updated section succesfully",
//       data:course
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({
//       success: false,
//       message: "unabled to update section,please try again",
//       error: error.message,
//     });
//   }
// };



// exports.deleteSection = async (req, res) => {
//   try {
//     // Get sectionId from request body
//     const { sectionId,courseId } = req.body; // try with req.params

//     // and upadte in this course 

//     // Validate sectionId
//     if (!sectionId) {
//       return res.status(400).json({
//         success: false,
//         message: "Section ID is required",
//       });
//     }

//     // Check if the section exists
//     const section = await Section.findById(sectionId);
//     if (!section) {
//       return res.status(404).json({
//         success: false,
//         message: "Section not found",
//       });
//     }

//     // Delete the section
//     await Section.findByIdAndDelete(sectionId);







    

//     // TODO: Update related documents in the Course model to remove this section (if applicable)

//     return res.status(200).json({
//       success: true,
//       message: "Section deleted successfully",
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Unable to delete section, please try again",
//       error: error.message,
//     });
//   }
// };


exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;

    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Property",
      });
    }

    // Update the section
    await Section.findByIdAndUpdate(
      sectionId,
      { sectionName: sectionName },
      { new: true }
    );

    // Fetch the updated course with populated sections
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedCourse, // Return the fully updated course
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to update section, please try again",
      error: error.message,
    });
  }
};


exports.deleteSection = async (req, res) => {
   try {
    const { sectionId, courseId } = req.body;

    // Remove the section from the course's content
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });
    
    const section = await Section.findById(sectionId);
    console.log("Section ID:", sectionId, "Course ID:", courseId);
    
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not Found",
      });
    }
    
    // Delete all sub-sections associated with the section
    await Section.deleteMany({ _id: { $in: section.subSection } });
    
    // Delete the section
    await Section.findByIdAndDelete(sectionId);
    
    // Find and return the updated course
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    
    return res.status(200).json({
      success: true,
      message: "Section and its sub-sections deleted successfully.",
      data:course,
    });
    
    
    
   }  catch (error) {
        console.log(error.message);
        return res.status(500).json({
          success: false,
          message: "Unable to delete section, please try again",
          error: error.message,
        });
      }
};
