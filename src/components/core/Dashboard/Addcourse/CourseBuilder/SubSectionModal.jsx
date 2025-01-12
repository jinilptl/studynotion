import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubsection,
} from "../../../../../services/operations/courseDetailsApi";
import { setCourse } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { RxCross1 } from "react-icons/rx";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData?.title);
      setValue("lectureDesc", modalData?.description);
      setValue("lectureVideo", modalData?.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    // if (currentValues.lectureVideo !== modalData.videoUrl) {
    //   formData.append("video", currentValues.lectureVideo);
    // }

    //  edit subsection api
    setLoading(true);
    const result = await updateSubsection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );

      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) {
      return;
    }

    if (edit) {
      if (!isFormUpdated) {
        toast.error("no changes made for the form");
      } else {
        handleEditSubSection();
      }
      return;
    }

    // for add

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    // formData.append("video",data.lectureVideo)

    setLoading(true);

    // api call
    const result = await createSubSection(formData, token);
    console.log(
      "subsection modal inside result is for addding subsection  ",
      result
    );

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );

      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  };

  return (
    <div>
      <div>
        <div>
          <p>
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          /> */}

          <div>
            <div>
              <label>Lecture Title</label>
              <input
                id="lectureTitle"
                placeholder="Enter Lecture Title"
                {...register("lectureTitle", { required: true })}
                className="w-full rounded-lg p-3 text-richblack-900 "
              />
              {errors.lectureTitle && (
                <span className="text-red-500">Lecture Title is required</span>
              )}
            </div>

            <div>
              <label>Lecture Description</label>
              <textarea
                id="lectureDesc"
                placeholder="Enter Lecture Description"
                {...register("lectureDesc", { required: true })}
                className="w-full rounded-lg p-3 text-richblack-900 min-h-[130px]"
              />
              {errors.lectureDesc && (
                <span className="text-red-500">
                  Lecture Description is required
                </span>
              )}
            </div>
          </div>

          {!view && (
            <div>
              <IconBtn
                type="submit"
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                outline={true}
                customClasses="text-white bg-richblack-900 rounded-md cursor-pointer flex items-center px-5 py-3 hover:bg-richblack-700 gap-x-2 mb-7 border border-yellow-50"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
