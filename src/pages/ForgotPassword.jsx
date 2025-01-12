// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getPasswordResetToken } from '../services/operations/authAPI';

// const ForgotPassword = () => {
  
//      const [emailSent,SetEmailSent]=useState(false);
//      const [email,SetEmail]=useState("");
//      const dispatch=useDispatch()

//      const{loading}=useSelector((state)=>state.auth)

// const handleOnSubmit =(e)=>{
//   e.preventDefault();
//   dispatch(getPasswordResetToken(email,SetEmailSent))
// }

//   return (
//    <div className=' text-white flex justify-center items-center'>
//      {
//         loading ? (<div> Loading....</div>):(
//             <div>
//          <h1>
//             {
//                 !emailSent ? "Reset your Password" : "Check Your Email"
//             }
//          </h1>

//          <p>
//             {
//                 !emailSent ? "Have no fear. We will email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`

//             }
//          </p>

//          <form onSubmit={handleOnSubmit}>
//                {
//                 !emailSent&& (
//                     <label>
//                         <p>Email Address:</p>

//                         <input
//                          required
//                          type='email'
//                          name='email'
//                          value={email}
//                          onChange={(e)=>{SetEmail(e.target.value)}}
//                          placeholder=' Enter Your Email Address'


//                         />
//                     </label>
//                 )
//                }
          
//           <button type='submit'>
//             {
//                 !emailSent ? "Reset Password":"Resend Email"
//             }
//           </button>
//          </form>

//               <div>
//                 <Link to={"/login"}>
//                     <p>back to login</p>
//                 </Link>
//               </div>


//             </div>
//         )
//      }






//    </div>
//   )
// }

// export default ForgotPassword



import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="flex items-center justify-center bg-transparent text-white p-4 mt-28">
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {!emailSent ? "Reset your password" : "Check Your Email"}
            </h1>
            <p className="text-[#8b949e] text-sm">
              {!emailSent
                ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
                : `We have sent the reset email to ${email}.`}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="space-y-4">
            {!emailSent && (
              <div className="space-y-2">
                <label className="text-sm">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  required
                  className="w-full bg-[#1c2028] border-0 text-white placeholder:text-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#f8d848] hover:bg-[#f8d848]/90 text-black font-medium py-3 rounded-lg transition"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          {/* Back to Login */}
          <div className="flex items-center space-x-2 text-sm">
            <Link
              to="/login"
              className="text-[#8b949e] hover:text-white transition-colors"
            >
              Back to login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;

