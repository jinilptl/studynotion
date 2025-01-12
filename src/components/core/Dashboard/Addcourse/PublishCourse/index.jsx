import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/Consatnts";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsApi";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses")
  };

  useEffect(() => {
    if (course.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const handleCoursePublish = async () => {
    if (
      (course.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      //no updateion in form
      //no need to make api call

      goToCourses();
      return;
    }

    //   if no updat ethe course

    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
      formData.append("status", courseStatus);

    setLoading(true);

    const result = await editCourseDetails(formData, token);
    if (result) {
      goToCourses();
    }
    setLoading(false);
  };

  const onSubmit = (data) => {
    handleCoursePublish();
  };

  return (
    <div className="text-white">
      <div className="rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700">
        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)} className=" mt-4">
          <div className="form-group">
            <label htmlFor="public" className="flex items-center">
              <input
                type="checkbox"
                id="public"
                {...register("public")}
                className="rounded h-4 w-4"
              />
              <span className="ml-3">Make this Course Public</span>
            </label>
          </div>

          <div className="button-group flex gap-4 mt-4 justify-end">
            <button
              disabled={loading}
              type="button"
              onClick={goBack}
              className="bg-richblack-600 text-white px-4 py-2 rounded hover:bg-richblack-700 disabled:opacity-50"
            >
              Back
            </button>

            <IconBtn
              type="Submit"
              disabled={loading}
              text="Save Changes"
              customClasses="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishCourse;
