const express=require("express");
const app=express();


const userRoute=require("./routes/User")
const profileRoute=require("./routes/Profile")
// const paymentsRoute=require("./routes/Payments")
const courseRoute=require("./routes/Course")

const database=require("./config/database");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect}=require("./config/cloudianary")
const fileUpload=require("express-fileupload");
require("dotenv").config();

const PORT=process.env.PORT||4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app. use(
cors ({
origin:"http://localhost:3000",
credentials:true,
})
)

app.use(
fileUpload ({
useTempFiles:true,
tempFileDir:"/tmp",

})
)

cloudinaryConnect();

// rotes

app.use("/api/v1/auth",userRoute)
app.use("/api/v1/profile",profileRoute)
app.use("/api/v1/course",courseRoute)
// app.use("/api/v1/payment",paymentsRoute)

//default route

app.get("/",(req,res)=>{
    return res.json({
        succes:true,
        message:"your server is up to date running "
    })
});

app.listen(PORT,()=>{
    console.log("app is running now");
    
})



