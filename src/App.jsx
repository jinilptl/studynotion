import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Navbaar from "./components/common/Navbaar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/Aboute";
import VerifyEmail from "./pages/Verifyemail";
import MyProfile from "./components/core/Dashboard/MyProfile";
import OpenRoute from "./components/auth/OpenRoute";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import Error from "./pages/Error"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/index";
import { ACCOUNT_TYPE } from "./utils/Consatnts";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/Addcourse/index";
import Settings from "./components/core/Dashboard/Settings";
import MyCourses from "./components/core/Dashboard/myCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/index";



function App() {

  
  const {user}=useSelector((state)=>state.profile);


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbaar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={
          <Signup />
        
         } />
        <Route path="login" element={
          <Login />
          
          } />
        <Route path="varify-email" element={
          <VerifyEmail />
          
         } />
        <Route path="forgot-password" element={
          <ForgotPassword />
          
          } />
        <Route path="update-password/:id" element={
          <UpdatePassword />
          
          } />
        <Route path="about" element={
         
          <About />
          } />

<Route  element={
  <PrivateRoute>
  <Dashboard/>
  </PrivateRoute>
}>
 <Route path="dashboard/my-profile" element={<MyProfile />} />
 <Route path="dashboard/settings" element={<Settings/>} />

 {
   user?.accountType===ACCOUNT_TYPE.STUDENT &&(
    <>
    <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />
    <Route path="dashboard/cart" element={<Cart/>} />
    </>
   ) 
 },
 {
   user?.accountType===ACCOUNT_TYPE.INSTRUCTOR &&(
    <>
   
    <Route path="dashboard/add-course" element={<AddCourse/>} />
    <Route path="dashboard/my-courses" element={<MyCourses/>} />
    <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>} />
  
    </>
   ) 
 }

 
 
</Route>

 <Route path="*" element={<Error/>}></Route>

       
        






      </Routes>
 
  
    </div>
  );
}

export default App;
