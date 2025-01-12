const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = {
  // CATEGORIES_API: `${BASE_URL}/course/showAllCategories`,
  CATEGORIES_API: `${BASE_URL}/course/showAllCategory`,
};

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
};

export const courseEndpoints = {
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails", //done
  CREATE_COURSE_API: BASE_URL + "/course/createCourse", //done
  CREATE_SECTION_API: BASE_URL + "/course/addSection", //done
  CREATE_SUBSECTION_API: BASE_URL + "/course/createSubSection", //done
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection", // done
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection", //done
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",  // done 

  GET_ALL_COURSES_API: BASE_URL + "/course/getAllCourses", // not done yet
  
  EDIT_COURSE_API: BASE_URL + "/course/editCourse", // not done yet

  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection", // not done yet
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses", // not done yet
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection", //not done yet
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse", 

  GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails", // not done yet
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress", // not done yet
  CREATE_RATING_API: BASE_URL + "/course/createRating", // not donr yet
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
};

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
};

// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};
