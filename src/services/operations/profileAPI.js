import toast from "react-hot-toast";
// import { setLoading } from "../../slices/authSlice"
// import { setToken } from "../../slices/authSlice"
// import { setUser} from "../../slices/profileSlice"
// import { resetCart } from "../../slices/cartSlice"
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../api";


const {
    GET_USER_ENROLLED_COURSES_API,
    GET_USER_DETAILS_API
}=profileEndpoints


export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...");
    let result = [];
  
    try {
      const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
        Authorization: `Bearer ${token}`,
      });
  
      // Log the API response for debugging purposes
      console.log("GET_USER_ENROLLED_COURSES_API API RESPONSE", response);
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      result = response.data.data;
      console.log("result is ",result);
      
    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR", error);
      toast.error("Could Not Get Enrolled Courses");
    } finally {
      toast.dismiss(toastId);
    }
  
    return result;
  }