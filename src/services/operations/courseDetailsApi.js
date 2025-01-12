import { toast } from "react-hot-toast";

import { updateCompletedLectures } from "../../slices/viewCourseSlice";

import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../api";

const {

    // testing done 

  COURSE_DETAILS_API, 
  CREATE_COURSE_API, 
  CREATE_SECTION_API, 
  CREATE_SUBSECTION_API, 
  UPDATE_SECTION_API, 
  DELETE_SECTION_API, 
  COURSE_CATEGORIES_API,

  // only testing not done
  UPDATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_COURSES_API,
  CREATE_RATING_API,
  

//   no write controllers 

  EDIT_COURSE_API, //done
  GET_ALL_INSTRUCTOR_COURSES_API, //done
  DELETE_COURSE_API, //done 

  GET_FULL_COURSE_DETAILS_AUTHENTICATED, // not done yet
  LECTURE_COMPLETION_API, // not done yet

} = courseEndpoints;




// done 
export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...");
    let result = null;
  
    try {
      // Making the API call
      const response = await apiConnector("POST", COURSE_DETAILS_API, { courseId });
  
      console.log("COURSE DETAILS API RESPONSE:", response);
  
      // Check if the response indicates success
      if (!response?.data?.success) {
        throw new Error(response.data.message || "Failed to fetch course details");
      }
  
      // Assigning the result
      result = response?.data?.data;
    } catch (error) {
      console.log("COURSE DETAILS API ERROR:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      toast.dismiss(toastId);
    }
  
    return result;
  };


  export const fetchCourseCategories = async () => {
    let result = [];
  
    try {
      // Making the API call
      const response = await apiConnector("GET", COURSE_CATEGORIES_API);
  
      console.log("COURSE_CATEGORIES_API RESPONSE:", response);
  
      // Check if the response indicates success
      if (!response?.data?.success) {
        throw new Error(response.data.message || "Failed to fetch course categories");

        
      }
  
      // Assigning the result
      result = response?.data?.allcategory;

      // console.log(  "category result is ", result);
      
    } catch (error) {
      console.log("COURSE_CATEGORIES_API ERROR:", error);
      toast.error(error.message || "An error occurred while fetching course categories");
    }
  
    return result;
  };



export const getFullCourseDetails = async (courseId,token) => {
    let result = [];
  
    try {
      // Making the API call
      const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId},{
        Authorization: `Bearer ${token}`,
      });
  
      console.log("COURSE_CATEGORIES_API RESPONSE:", response);
  
      // Check if the response indicates success
      if (!response?.data?.success) {
        throw new Error(response.data.message || "Failed to fetch course categories");

        
      }
  
      // Assigning the result
      result = response?.data?.data;

      // console.log(  "category result is ", result);
      
    } catch (error) {
      console.log("COURSE_CATEGORIES_API ERROR:", error);
      toast.error(error.message || "An error occurred while fetching course categories");
    }
  
    return result;
  };


//   done 

  export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
  
    try {
      // Making the API call
      const response = await apiConnector("POST", DELETE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      });
  
      console.log("DELETE SECTION API RESPONSE:", response);
  
      // Check if the response indicates success
      if (!response?.data?.success) {
        throw new Error("Could not delete section");
      }
  
      // Success handling
      result = response?.data?.data;
      toast.success("Section deleted successfully");
    } catch (error) {
      console.log("DELETE SECTION API ERROR:", error);
      toast.error(error?.message || "An error occurred while deleting the section");
    } finally {
      // Always dismiss the toast
      toast.dismiss(toastId);
    }
  
    return result;
  };

//   done 

  export const createCourse = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
  
    try {
      // Making the API call
      const response = await apiConnector("POST", CREATE_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
  
      // console.log("CREATE_COURSE_API RESPONSE:", response);
  
      // Check if the response indicates success
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to create course");
      }
  
      // Success handling
      toast.success("Course details added successfully");
      result = response?.data?.data;
    } catch (error) {
      console.log("CREATE_COURSE_API ERROR:", error);
      toast.error(error?.message || "An error occurred while creating the course");
    } finally {
      // Always dismiss the toast
      toast.dismiss(toastId);
    }
  
    return result;
  };

  //   done 
  export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
  
    try {
      // Making the API call
      const response = await apiConnector("POST", CREATE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      });
  
      console.log("CREATE_SECTION_API RESPONSE:", response);
  
      // Check if the response indicates success
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to create section");
      }
  
      // Success handling
      toast.success("Section created successfully");
      result = response?.data?.updatedCourseDetails;
      // console.log("in the api result",result);
      
    } catch (error) {
      console.log("CREATE_SECTION_API ERROR:", error);
      toast.error(error?.message || "An error occurred while creating the section");
    } finally {
      // Always dismiss the toast
      toast.dismiss(toastId);
    }
  
    return result;
  };

  // done 

  export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
  
    try {
      // Making the API request to create the subsection
      const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      });
  
      console.log("CREATE SUBSECTION API RESPONSE:", response);
  
      // Check if the response indicates success
      if (!response?.data?.success) {
        throw new Error("Could not create subsection");
      }
  
      // Assign the data from the response to result if successful
      result = response?.data?.data
      ;
      console.log("creating subsection in api formate result,",result);
      
      toast.success("Subsection created successfully!");
    } catch (error) {
      console.log("CREATE SUBSECTION API ERROR:", error);
      toast.error(error?.message || "An error occurred while creating the subsection");
    } finally {
      // Dismissing the loading toast, no matter the result
      toast.dismiss(toastId);
    }
  
    return result;
  };
  
//   done 

  export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
  
    try {
      // Making the API call
      const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      });
  
      console.log("UPDATE SECTION API RESPONSE:", response);
  
      // Check if the response indicates success
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Could not update section");
      }
  
      // Success handling
      toast.success("Course section updated successfully");

      result = response?.data?.data;
      console.log("update subsection result",result);
      
    } catch (error) {
      console.log("UPDATE SECTION API ERROR:", error);
      toast.error(error?.message || "An error occurred while updating the section");
    } finally {
      // Always dismiss the toast
      toast.dismiss(toastId);
    }
  
    return result;
  };
  
  
  export const updateSubsection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
  
    try {
      // Making the API call
      const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      });
  
      console.log("UPDATE SUBSECTION API RESPONSE:", response);
  
      // Check if the response indicates success
      if (!response?.data?.success) {
        throw new Error("Could not update subsection");
      }
  
      // Success handling
      result = response?.data?.data;
      toast.success("Subsection updated successfully");
    } catch (error) {
      console.log("UPDATE SUBSECTION API ERROR:", error);
      toast.error(error?.message || "An error occurred while updating the subsection");
    } finally {
      // Always dismiss the toast
      toast.dismiss(toastId);
    }
  
    return result;
  };
  

  export const deleteSubsection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
  
    try {
      // Making the API call
      const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      });
  
      console.log("DELETE SUB-SECTION API RESPONSE:", response);
  
      // Check if the response indicates success
      if (!response?.data?.success) {
        throw new Error("Could not delete subsection");
      }
  
      // Success handling
      result = response?.data?.data;
      toast.success("Subsection deleted successfully");
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR:", error);
      toast.error(error?.message || "An error occurred while deleting the subsection");
    } finally {
      // Always dismiss the toast
      toast.dismiss(toastId);
    }
  
    return result;
  };
  


             // only testing not done handlere 


// only testing not done

export const getAllCourses = async () => {
    const toastId = toast.loading("Loading ...");
    let result = [];
    try {
      const response = await apiConnector("GET", GET_ALL_COURSES_API);
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories");
      }
      result = response?.data?.data;
    } catch (error) {
      console.log("GET_ALL_COURSE_API API ERROR:", error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
    return result;
  };
   



  // backent not wrriten code 

  // no code wriiten in th ebackend 

  export const fetchInstructorCourses = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...");
  
    try {
      // Making the API call to fetch instructor's courses
      const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, {}, {
        Authorization: `Bearer ${token}`,
      });
  
      console.log("FETCH INSTRUCTOR COURSES API RESPONSE:", response);
  
      // Check if the response indicates success
      if (!response?.data?.success) {
        throw new Error("Could not fetch instructor's courses");
      }
  
      // Success handling
      result = response?.data?.data ;
      console.log("fetch api result is",result);
      
      toast.success("Instructor's courses fetched successfully");
    } catch (error) {
      console.log("FETCH INSTRUCTOR COURSES API ERROR:", error);
      toast.error(error?.message || "An error occurred while fetching the instructor's courses");
    } finally {
      // Always dismiss the toast
      toast.dismiss(toastId);
    }
  
    return result;
  };
  

    // no code wriiten in th ebackend 

  export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
  
    try {
      // Making the API call
      const response = await apiConnector("POST", EDIT_COURSE_API, data, {
        "Content-Type":"multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
  
      console.log("EDIT_COURSE_API RESPONSE:", response);
  
      // Check if the response indicates success
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to edit course details");
      }
  
      // Success handling
      toast.success("Course details updated successfully");
      result = response?.data?.data;
    } catch (error) {
      console.log("EDIT_COURSE_API ERROR:", error);
      toast.error(error?.message || "An error occurred while updating the course details");
    } finally {
      // Always dismiss the toast
      toast.dismiss(toastId);
    }
  
    return result;
  };
  

  export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Deleting course...");
    try {
      const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
        Authorization: `Bearer ${token}`,
      });
  
      console.log("DELETE COURSE API RESPONSE:", response);
  
      if (!response?.data?.success) {
        throw new Error("Could not delete course");
      }
  
      toast.success("Course deleted successfully");
      return response.data; // Return response if needed
    } catch (error) {
      console.error("DELETE COURSE API ERROR:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
      throw error; // Propagate error if needed for further handling
    } finally {
      toast.dismiss(toastId); // Ensure toast is dismissed
    }
  };




  

  





  


