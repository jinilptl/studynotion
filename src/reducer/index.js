import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../src/slices/authSlice"
import profileReducer from "../../src/slices/profileSlice"
import cartReducer from "../../src/slices/cartSlice"
import viewCourseReducer from "../../src/slices/viewCourseSlice"
import courseReducer from "../../src/slices/courseSlice"

const rootReducer = combineReducers({
    auth : authReducer,
    profile : profileReducer,
    cart : cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer
})

export default rootReducer