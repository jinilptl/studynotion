import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourse,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsApi";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/Consatnts";
import RequirementField from "./RequirementField";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { setStep, setCourse } from "../../../../../slices/courseSlice";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse} = useSelector(
    (state) => state.course
  );
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  // Fetch course categories
  useEffect(() => {
    const getCategory = async () => {
      setLoading(true);
      const Categories = await fetchCourseCategories();

      if (Array.isArray(Categories) && Categories.length > 0) {
        setCourseCategories(Categories);
      } else {
        console.error("No categories found or invalid response:", Categories);
      }
      setLoading(false);
    };

    getCategory();

    // Populate form values if editing
    if (editCourse) {
      setValue("courseTitle", course.courseName || "");
      setValue("courseShortDesc", course.courseDescription || "");
      setValue("coursePrice", course.price || 0);
      setValue("courseBenefits", course.whatYouWillLearn || "");
      setValue("courseRequirements", course.instructions || []);
      setValue("courseCategory", course.category);
    }
  }, [editCourse, setValue, course]);

  // Check if the form is updated
  const isFormUpdated = () => {
    const currentValues = getValues();

    if (!course) {
      return false;
    }

    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      (currentValues.courseCategory?._id || "") !== (course.category?._id || "") ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      JSON.stringify(currentValues.courseRequirements || []) !==
        JSON.stringify(course.instructions || [])
    );
  };

  // Handle form submission
  const handleOnSubmit = async (data) => {
    console.log("Form Data Submitted:", data);

    if(isFormUpdated()){
      if (editCourse) {
        const currentValues = getValues();
        const formData = new FormData();
      
        // Append course ID
        formData.append("courseId", course._id);
      
        // Compare current values with course data and append only updated fields
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
      
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
      
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
      
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
      
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        
        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", data.courseRequirements);
        }

        setLoading(true)
        const result = await editCourseDetails(formData, token);
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made so far")
      }
      return;
    }

    // Handle create course submission
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await createCourse(formData, token);
    setLoading(false);

    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="rounded-md border bg-gray-800 p-6 space-y-8 shadow-md"
    >
      {/* Course Title */}
      <div className="space-y-2">
        <label className="text-white font-semibold">
          Course Title<sup className="text-red-500">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: "Course Title is required" })}
          className="w-full p-3 rounded-md border bg-richblack-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.courseTitle && <span className="text-red-500 text-sm">{errors.courseTitle.message}</span>}
      </div>

      {/* Course Short Description */}
      <div className="space-y-2">
        <label className="text-white font-semibold">
          Course Short Description<sup className="text-red-500">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", {
            required: "Course Description is required",
          })}
          className="w-full p-3 rounded-md border bg-richblack-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.courseShortDesc && (
          <span className="text-red-500 text-sm">{errors.courseShortDesc.message}</span>
        )}
      </div>

      {/* Course Price */}
      <div className="space-y-2">
        <label className="text-white font-semibold">
          Course Price<sup className="text-red-500">*</sup>
        </label>
        <div className="relative">
          <HiOutlineCurrencyRupee className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            id="coursePrice"
            type="number"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: "Course Price is required",
              valueAsNumber: true,
            })}
            className="w-full pl-10 p-3 rounded-md border bg-richblack-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {errors.coursePrice && <span className="text-red-500 text-sm">{errors.coursePrice.message}</span>}
      </div>

      {/* Course Category */}
      <div className="space-y-2">
        <label htmlFor="courseCategory" className="text-white font-semibold">
          Course Category<sup className="text-red-500">*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className="w-full p-3 rounded-md border bg-gray-900 text-richblack-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>Choose a Category</option>
          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="text-red-500 text-sm">Course Category is required</span>
        )}
      </div>

      {/* Benefits of the Course */}
      <div className="space-y-2">
        <label className="text-white font-semibold">
          Benefits of the Course<sup className="text-red-500">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter Benefits of the Course"
          {...register("courseBenefits", {
            required: "Benefits of the course are required",
          })}
          className="w-full p-3 rounded-md border bg-richblack-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.courseBenefits && (
          <span className="text-red-500 text-sm">{errors.courseBenefits.message}</span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="flex items-center gap-x-2 bg-gray-600 px-4 py-2 rounded-md text-white hover:bg-gray-700 focus:outline-none"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex items-center gap-x-2 bg-indigo-600 px-4 py-2 rounded-md text-white bg-richblack-300 hover:bg-richblack-700 focus:outline-none"
        >
          {loading ? (
            <span className="animate-spin">Loading...</span>
          ) : (
            <span>{loading ? "Saving..." : editCourse ? "Save Changes" : "Next"}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default CourseInformationForm;






// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createCourse,
//   editCourseDetails,
//   fetchCourseCategories,
// } from "../../../../../services/operations/courseDetailsApi";
// import toast from "react-hot-toast";
// import { COURSE_STATUS } from "../../../../../utils/Consatnts";
// import RequirementField from "./RequirementField";
// import { HiOutlineCurrencyRupee } from "react-icons/hi";
// import { setStep, setCourse } from "../../../../../slices/courseSlice";

// const CourseInformationForm = () => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   const dispatch = useDispatch();
//   const { course, editCourse} = useSelector(
//     (state) => state.course
//   );
//   const { token } = useSelector((state) => state.auth);

//   const [loading, setLoading] = useState(false);
//   const [courseCategories, setCourseCategories] = useState([]);

//   // Fetch course categories
//   useEffect(() => {
//     const getCategory = async () => {
//       setLoading(true);
//       const Categories = await fetchCourseCategories();

//       if (Array.isArray(Categories) && Categories.length > 0) {
//         setCourseCategories(Categories);
//       } else {
//         console.error("No categories found or invalid response:", Categories);
//       }
//       setLoading(false);
//     };

//     getCategory();

//     // Populate form values if editing
//     if (editCourse) {
//       setValue("courseTitle", course.courseName || "");
//       setValue("courseShortDesc", course.courseDescription || "");
//       setValue("coursePrice", course.price || 0);
//       setValue("courseBenefits", course.whatYouWillLearn || "");
//       setValue("courseRequirements", course.instructions || []);
//       setValue("courseCategory", course.category);
//     }
//   }, [editCourse, setValue, course]);

//   // Check if the form is updated
//   // Check if the form is updated
// const isFormUpdated = () => {
//   const currentValues = getValues();

//   // Return false if `course` is null or undefined
//   if (!course) {
//     return false;
//   }

//   // Compare form values with `course`
//   return (
//     currentValues.courseTitle !== course.courseName ||
//     currentValues.courseShortDesc !== course.courseDescription ||
//     currentValues.coursePrice !== course.price ||
//     (currentValues.courseCategory?._id || "") !== (course.category?._id || "") ||
//     currentValues.courseBenefits !== course.whatYouWillLearn ||
//     JSON.stringify(currentValues.courseRequirements || []) !==
//       JSON.stringify(course.instructions || [])
//   );
// };


//   // Handle form submission
//   const handleOnSubmit = async (data) => {
//     console.log("Form Data Submitted:", data);

//     if(isFormUpdated()){

//       if (editCourse) {
//         const currentValues = getValues();
//         const formData = new FormData();
      
//         // Append course ID
//         formData.append("courseId", course._id);
      
//         // Compare current values with course data and append only updated fields
//         if (currentValues.courseTitle !== course.courseName) {
//           formData.append("courseName", data.courseTitle);
//         }
      
//         if (currentValues.courseShortDesc !== course.courseDescription) {
//           formData.append("courseDescription", data.courseShortDesc);
//         }
      
//         if (currentValues.coursePrice !== course.price) {
//           formData.append("price", data.coursePrice);
//         }
      
//         if (currentValues.courseBenefits !== course.whatYouWillLearn) {
//           formData.append("whatYouWillLearn", data.courseBenefits);
//         }
      
//         if (currentValues.courseCategory._id !== course.category._id) {
//           formData.append("category", data.courseCategory);
//         }
        
//         if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
//           formData.append("instructions", data.courseRequirements);
//         }

//         setLoading(true)
//         const result= await editCourse(formData,token)
//         setLoading(false)
//         if (result) {
//           dispatch(setStep(2))
//           dispatch(setCourse(result))
          
//         }
       
//       }else{
//         toast.error("No changes made so far")
//       }
//       return
//     }
    



//     // Handle create course submission
//     const formData = new FormData();
//     formData.append("courseName", data.courseTitle);
//     formData.append("courseDescription", data.courseShortDesc);
//     formData.append("price", data.coursePrice);
//     formData.append("whatYouWillLearn", data.courseBenefits);
//     formData.append("category", data.courseCategory);
//     // formData.append(
//     //   "instructions",
//     //   JSON.stringify(data.courseRequirements || [])
//     // );
//     formData.append("status", COURSE_STATUS.DRAFT);

//     setLoading(true);
//     const result = await createCourse(formData, token);
//     setLoading(false);

//     if (result) {
//       dispatch(setStep(2));
//      dispatch(setCourse(result));
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(handleOnSubmit)}
//       className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
//     >
//       {/* Course Title */}
//       <div>
//         <label>
//           Course Title<sup>*</sup>
//         </label>
//         <input
//           id="courseTitle"
//           placeholder="Enter Course Title"
//           {...register("courseTitle", { required: "Course Title is required" })}
//           className="w-full text-richblack-900"
//         />
//         {errors.courseTitle && <span>{errors.courseTitle.message}</span>}
//       </div>

//       {/* Course Short Description */}
//       <div>
//         <label>
//           Course Short Description<sup>*</sup>
//         </label>
//         <textarea
//           id="courseShortDesc"
//           placeholder="Enter Description"
//           {...register("courseShortDesc", {
//             required: "Course Description is required",
//           })}
//           className="min-h-[140px] w-full text-richblack-900"
//         />
//         {errors.courseShortDesc && (
//           <span>{errors.courseShortDesc.message}</span>
//         )}
//       </div>

//       {/* Course Price */}
//       <div>
//         <label>
//           Course Price<sup>*</sup>
//         </label>
//         <div className="relative">
//           <HiOutlineCurrencyRupee className="absolute top-1/2 left-2 transform -translate-y-1/2 text-richblack-400" />
//           <input
//             id="coursePrice"
//             type="number"
//             placeholder="Enter Course Price"
//             {...register("coursePrice", {
//               required: "Course Price is required",
//               valueAsNumber: true,
//             })}
//             className="w-full pl-8 text-richblack-900"
//           />
//         </div>
//         {errors.coursePrice && <span>{errors.coursePrice.message}</span>}
//       </div>

//       {/* course category  */}

//       <div>
//   <label htmlFor="courseCategory">
//     Course Category<sup>*</sup>
//   </label>
//   <select
//     id="courseCategory"
//     defaultValue=""
//     {...register("courseCategory", { required: true })}
//     className="w-full border border-richblack-700 text-richblack-900 p-2 rounded-md"
//   >
//     <option value="" disabled>
//       Choose a Category
//     </option>
 

//     {!loading &&
//       courseCategories.map((category, index) => (
//         <option key={index}    value={category?._id}>    
//           {category?.name}
//         </option>
//       ))}
//   </select>

//   {errors.courseCategory && (
//     <span className="text-red-500 text-sm">
//       Course Category is required
//     </span>
//   )}
// </div>


//       {/* Benefits of the Course */}
//       <div>
//         <label>
//           Benefits of the Course<sup>*</sup>
//         </label>
//         <textarea
//           id="courseBenefits"
//           placeholder="Enter Benefits of the Course"
//           {...register("courseBenefits", {
//             required: "Benefits of the course are required",
//           })}
//           className="min-h-[130px] w-full text-richblack-900"
//         />
//         {errors.courseBenefits && (
//           <span>{errors.courseBenefits.message}</span>
//         )}
//       </div>

// {/* all the error coming in this part */}

//       {/* Course Requirements */}
//       {/* <RequirementField
//         name="courseRequirements"
//         label="Requirements/Instructions"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       /> */}

//       {/* Buttons */}
//       <div className="flex items-center gap-4">
//         {editCourse && (
//           <button
//             type="button"
//             onClick={() => dispatch(setStep(2))}
//             className="flex items-center gap-x-2 bg-richblack-300 px-4 py-2 rounded"
//           >
//             Continue Without Saving
//           </button>
//         )}

//         <button
//           type="submit"
//           className="w-full justify-center bg-red-300"
//           disabled={loading}
//         >
//           {loading ? "Saving..." : editCourse ? "Save Changes" : "Next"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CourseInformationForm;
