import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice"
import { setToken } from "../../slices/authSlice"
import { clearUser, setUser} from "../../slices/profileSlice"
import { resetCart } from "../../slices/cartSlice"
import { apiConnector } from "../apiconnector";
import { endpoints } from "../api";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSWORD_API,
    RESETPASSTOKEN_API,
} = endpoints


// send otp 

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, { email });
      if (!response.data.success) throw new Error(response.data.message);
      toast.success("OTP Sent Successfully");
      navigate("/varify-email");
    } catch (error) {
      toast.error("Could Not Send OTP");
      // toast.error(error.response?.data?.message || "Could Not Send OTP");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// signup 

export const signUp = ({ firstName, lastName, email, password, confirmPassword, accountType, otp, navigate }) => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          accountType,
          otp,
        });
        if (!response.data.success) throw new Error(response.data.message);
        
        toast.success("Signup successful!");
        navigate("/login");
      } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
        
        
      } finally {
        dispatch(setLoading(false));
      }
    };
  };




export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading ...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, { email, password });
      // console.log("LOGIN API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Notify success
      toast.success("Login Successful");

      // Set token and save to localStorage
      const token = response?.data?.token;
      // console.log("token is ",token);
      
      dispatch(setToken(token));
      localStorage.setItem("token", JSON.stringify(token));

      // Process and save user details
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      const userData = { ...response.data.user, image: userImage };

      dispatch(setUser(userData)); // Assuming this stores user data
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect user after login
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("LOGIN API ERROR:", error);
      toast.error("Login Failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


// logout

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null)); // Clear the token
      dispatch(setUser(null)); // Clear the user data
      dispatch(clearUser())
      dispatch(resetCart()); // Reset the cart
      localStorage.removeItem("token"); // Remove token from local storage
      localStorage.removeItem("user"); // Remove user data from local storage
      toast.success("Logged Out"); // Show success toast
      navigate("/"); // Redirect to home page
    };
  }



// send token on email for update password 
export function getPasswordResetToken(email,SetEmailSent){
    return async(dispach)=>{
        dispach(setLoading(true));
        try {
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{email});

            console.log("RESET PASSWORD TOKEN RESPONSE...",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent  ");
            SetEmailSent(true)
            
        } catch (error) {
            
            console.log("Reset Password token Error");
            
        }
        dispach(setLoading(false))
    }
}


// reset password 

export function resetPassword(password, confirmPassword, token){
    return async(dispach)=>{
        dispach(setLoading(true));
        try {
            const response = await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});

            console.log("RESET PASSWORDRESPONSE...",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("PASSWORD RESET SUCCESFULLY ");
           
            
        } catch (error) {
            
            console.log("UNABLE TO RESET PASSWORD ");
            
        }
        dispach(setLoading(false))
    }
}

