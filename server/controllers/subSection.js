const subSection=require("../models/SubSection");
const Section=require("../models/Section");
const {uploadImageToCloudinary}=require("../utils/imageUploader")
require("dotenv").config()

exports.createSubSection=async(req,res)=>{
    try {
        //fetch the data from body
        const{sectionId,title,timeDuration,description}=req.body

        console.log("sectionId is",sectionId);
        console.log("title is",title);
        console.log("description is",description);
        
        //extract file/video

        // const video=req.files.videoFile
        //validation

        // ||!timeDuration ||!video

        if(!sectionId||!title||!description){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
       
        //upload video to cloudenary

        // const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME)

        //create sub-section
        const subSectionDetails=await subSection.create({
            title:title,
            // timeDuration:timeDuration,
            description:description,
            // videoUrl:uploadDetails.secure_url 
        })

        //update section with this sub section ObjectId
        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},{$push:{
            subSection:subSectionDetails._id
        }},{new:true}).populate("subSection") // please look it 
        //return response
        return res.status(200).json({
            success:true,
            message:"subsection created succesfully",
            data:updatedSection
        })
    } 
        
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
          success: false,
          message: "unabled to create sub-section,please try again",
          error: error.message,
        });
      }
    }



exports.updateSubSection = async (req, res) => {
        try {
          const { sectionId, title, description,subSectionId } = req.body;
      
          // Find the subsection by ID
          const SubSection = await subSection.findById(subSectionId)
          
          if (!SubSection) {
            return res.status(404).json({
              success: false,
              message: "SubSection not found",
            });
          }
      
          // Update the title if provided
          if (title !== undefined) {
            SubSection.title = title;
          }
      
          // Update the description if provided
          if (description !== undefined) {
            SubSection.description = description;
          }
      
        //   // Handle video file if provided
        //   if (req.files && req.files.video !== undefined) {
        //     const video = req.files.video;
      
        //     // Upload video to Cloudinary
        //     const uploadDetails = await uploadImageToCloudinary(video);
      
        //     // Update the video URL in the subsection
        //     SubSection.videoUrl = uploadDetails.secure_url;
        //     SubSection.timeDuration= `${uploadDetails.duration}`
        //   }
      

          // Save the updated subsection
          await SubSection.save();

          const updatedSection = await Section.findById(sectionId).populate("subSection")
      
          return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data:updatedSection,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            success: false,
            message: "An error occurred while updating the SubSection",
          });
        }
      };
      

    
exports.deleteSubSection=async(req,res)=>{
  
    try {
        const { subSectionId, sectionId } = req.body;
      
        // Remove the sub-section reference from the parent section
        await Section.findByIdAndUpdate(
          sectionId,
          {
            $pull: {
              subSection: subSectionId,
            },
          }
        );
      
        // Delete the sub-section itself
        const subsection = await subSection.findByIdAndDelete({_id:subSectionId})
      
        // If sub-section not found, return a 404 error
        if (!subsection) {
          return res.status(404).json({
            success: false,
            message: "SubSection not found",
          });
        }
      
        const updatedSection = await Section.findById(sectionId).populate("subSection")
        // Success response
        return res.status(200).json({
          success: true,
          message: "SubSection deleted successfully",
          data:updatedSection
        });

      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "An error occurred while deleting the SubSection",
        });
      }
      
    }

    

    