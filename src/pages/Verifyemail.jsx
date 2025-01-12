import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { FaArrowLeft, FaSync } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { signUp } from "../services/operations/authAPI";
import { sendOtp } from "../services/operations/authAPI";

export default function VerifyEmail() {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signupData } = useSelector((state) => state.auth);
  
    const handleOnSubmit = (e) => {
      e.preventDefault();
      if (otp.length === 6) {
        dispatch(signUp({ ...signupData, otp, navigate }));
      } else {
        alert("Please enter the complete OTP.");
      }
    };



//   const handleResendCode = () => {
//     console.log("Resend code");
//   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020817] text-white p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold">Verify Email</h1>
          <p className="text-gray-400">
            A verification code has been sent to you. Enter the code below
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleOnSubmit} className="space-y-8">
          <div className="flex justify-center">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              isInputNum={true}
              shouldAutoFocus={true}
              inputStyle={{
                width: "3rem",
                height: "3rem",
                margin: "0 0.5rem",
                fontSize: "1.5rem",
                borderRadius: "8px",
                border: "1px solid gray",
                backgroundColor: "#1f2937",
                color: "white",
                textAlign: "center",
              }}
              focusStyle={{
                outline: "none",
                border: "2px solid yellow",
              }}
              renderInput={(props, index) => (
                <input key={index} {...props} />
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-lg"
          >
            Verify Email
          </button>
        </form>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={()=>(navigate("/signup"))}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back To Signup
          </button>

          <button
           onClick={() => dispatch(sendOtp(signupData?.email,navigate))}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FaSync className="w-4 h-4 mr-2" />
            Resend it
          </button>
        </div>
      </div>
    </div>
  );
}
