// const {instance}=require("../config/razorpay");
// const Course=require("../models/Course");
// const User=require("../models/User");
// const mailSender=require("../utils/mailSender");
// const {courseEnrollmentEmail}=require("../mail/template/courseEnrollmentEmail");
// const { default: mongoose } = require("mongoose");

// const { json } = require("express");

// exports.capturePayment=async (req,res)=>{
//     //get courseId and UserId

//     const {course_id}=req.body;
//     const UserId=req.user.id;

//     //validation courseID
//     if(!course_id){
//         return res.json({
//             success:false,
//             message:"please provide valid courseID"
//         })
//     }

//     //valide course Details

//     let courseDetails;

//     try {
//         courseDetails=await Course.findById(course_id);

//         // validate 
//         if(!courseDetails){
//             return res.json({
//                 success:false,
//                 message:"could not find the course"
//             })
//         }
//         //user already pay for the same course 

//         const uid = new mongoose.Types.ObjectId(UserId);
// ;//we conver userid type into objectid because of in studentsenrools filed store userId as a object id and in this controlled UserId type is string 
//         if(courseDetails.studentsEnrolled.includes(uid)){
//             return res.json({
//                 success:false,
//                 message:"student is already enrolled"
//             })
//         }

//     } catch (error) {
//         console.error(error);
        
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }

//     //order create

//     const amount=courseDetails.price;
//     const currency="INR";

//     const options={
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             UserId
//         }
//     }

//     try {
//         //initiate the payment  using razorpay

//         const paymentResponse= await instance.orders.create(options);
//         console.log("paymentResponse is ",paymentResponse);
//         return res.status(200).json({
//             success:true,
//             courseName:courseDetails.courseName,
//             courseDescription:courseDetails.courseDescription,
//             thumbnail:courseDetails.thumbnail,
//             orderID:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount

//         })
        
//     } catch (error) {
//         console.log(error);
        
//         return res.status(500).json({
            
//             success:false,
//             message:"could not initiate order"
//         })
//     }
// }


// //varify signature of razorepay and  server 

// exports.varifySignature = async(req,res)=>{

//     const webhookSecret="12345678";

//     const signature= req.headers["x-razorpay-signature"];

//     const shasum =crypto.createHmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest("hex");

//     if(signature===digest){
//         console.log("Payment is Authorized");

//         const {courseId,userId}=req.body.payload.payment.entity.notes;

//         try {
//             //fullfill the action

//             // find the course and enroll the students 
//             const enrolledCourse= await Course.findOneAndUpdate({_id:courseId},{$push:{
//                 studentsEnrolled:userId
//             }},{new:true})

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found"
//                 })
//             }

//             console.log("enrolledCourse ",enrolledCourse);

//             // find student and aaded the course to the list 

//             const enrolledStudent=await User.findOneAndUpdate({_id:userId},{$push:{
//                 courses:courseId
//             }},{new:true})

//             console.log("enrolledStudent ",enrolledStudent);

//             // mail send kardo ab 

//             const mailResponse=await mailSender(enrolledStudent.email,
//                 "congratulation from edtech by jinil patel",
//                 "congratulation , you are onboarded into new CodeHelp Course"
//             )
//             console.log("mailResponse ",mailResponse);

//             return res.status(200).json({
//                 success:true,
//                 message:"signature varified and course added"
//             })
            
            
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message
//             })
            
//         }
        
//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:"signature not matched, invalid request"
//         })
//     }
// };