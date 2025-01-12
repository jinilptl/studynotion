import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { MdAddCircleOutline } from "react-icons/md";
import { BiAddToQueue, BiRightArrow } from "react-icons/bi";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import NestedView from "./NestedView";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsApi";
import { toast } from "react-hot-toast";

const CourseBuilderForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const [Loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  // const onSubmit = async (data) => {

  //   setLoading(true);
  //   let result;

  //   if (editSectionName) {
  //     // We are editing the section name
  //     result = await updateSection(
  //       {
  //         sectionName: data.sectionName,
  //         sectionId: editSectionName,
  //         courseId: course._id,
  //       },
  //       token
  //     );
  //   } else {
  //     // We are Creating the section name

  //     result = await createSection(
  //       {
  //         sectionName: data.sectionName,
  //         courseId: course._id,
  //       },
  //       token
  //     );

  //     // console.log("result is",result);
      
  //   }
    
    
  //   // Update values
  //   if (result) {
  //     dispatch(setCourse(result));
  //     setEditSectionName(null);
  //     setValue("sectionName", "");
    
      
  //   }

  //   // Set loading to false
  //   setLoading(false);
    
  // };


  const onSubmit = async (data) => {
    setLoading(true);
    let result;
  
    if (editSectionName) {
      // Editing the section name
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      // Creating a new section
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }
  
    if (result) {
      // Update the course state with the latest backend response
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", ""); // Clear the input field
      console.log("Updated course:", result); // Verify updated course
    }
  
    setLoading(false);
  };
  
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName","")
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one Section");
      return;
    }

    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add at least one lecture in each section");
      return;
    }

    // If everything is good
    dispatch(setStep(3));
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    } else {
      setEditSectionName(sectionId);
      setValue("sectionName", sectionName);
    }
    
  };
  
  

  return (
    <div className="text-white mt-5">
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className=" mt-4">
        <div>
          <label htmlFor="sectionName" className=" mb-1 inline-block ml-2">
            Section name <sup>*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className="w-full rounded-lg p-3 text-richblack-900 "
          />
          {errors.sectionName && <span>Section Name is required</span>}
        </div>

        <div className="mt-5 flex w-full">
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses="text-white bg-richblack-900 rounded-md cursor-pointer flex items-center px-5 py-3 hover:bg-richblack-700 gap-x-2 mb-7 border border-yellow-50"
          >
            <MdAddCircleOutline className="text-yellow w-50" size={20} />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline ml-10"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>




      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      




      <div className="flex justify-end gap-x-3 mt-6">
        <button
          onClick={goBack}
          className="rounded-md cursor-pointer flex items-cente bg-pure-greys-900 px-5 py-3 hover:bg-pure-greys-600"
        >
          Back
        </button>
        <IconBtn
          text="Next"
          onClick={goToNext}
          customClasses="bg-yellow-600 rounded-md cursor-pointer flex items-center px-5 py-3 hover:bg-yellow-300 gap-x-2"
        >
          <BiRightArrow />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
