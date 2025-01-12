const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt=require("bcrypt")
const crypto=require("crypto")

exports.resetPasswordToken = async (req, res) => {
  try {
    //get email  from  req body
    const email = req.body.email;

    // email validationn
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "your email is not registred",
      });
    }

    //generate token
    const token = crypto.randomUUID();
    //update user  by adding token and expires
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    // create url

    const url = `http://localhost:3000/update-password/${token}`;

    // send mail

    await mailSender(
      email,
      "password reset link",
      `password reset link ${url}`
    );

    return res.status(200).json({
      success: true,
      message: "mail sent successfully , please check and reset password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong while reset password",
    });
  }
};



// resetPassword

exports.resetPassword= async(req,res)=>{
    try {
        //data fetch
        const {password,confirmPassword,token}=req.body;
        //validation
        if(password!==confirmPassword){
            return res.json({
                success: false,
                message: "password not matching",
              });
        }
//get userdetails from db using token

const userDetails=await User.findOne({token:token});

// if no entry of userDetails
if(!userDetails){
    return res.json({
        success: false,
        message: "token is invalid",
      });
}
//token time checke
if(userDetails.resetPasswordExpires<Date.now()){
    return res.json({
        success: false,
        message: "Token is expired,please regenerate your token"
      });
    }

    // hash password 
    const hashedPassword=await bcrypt.hash(password,10);

    // password update
    const updatePassword= await User.findOneAndUpdate({token:token},{
        password:hashedPassword
    },{new:true})

    // return response 

    return res.status(200).json({
        success:true,
        message:'Password reset Succesfull'
    })


    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:'something went wrong while reset password'
        })
    
    }
}