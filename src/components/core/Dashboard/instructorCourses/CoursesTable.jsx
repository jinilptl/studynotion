import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Instructor from "../../../../assets/Images/Instructor.jpg";
import { COURSE_STATUS } from "../../../../utils/Consatnts";
import { useDispatch, useSelector } from "react-redux";
;
import {
  fetchInstructorCourses,
  deleteCourse,
} from "../../../../services/operations/courseDetailsApi";
import { setCourse } from "../../../../slices/courseSlice";
import ConfirmationModal from "../../../common/ConfirmationModal"
import { useNavigate } from "react-router-dom";

const CoursesTable = ({ Courses, setCourses }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

//   const handleCourseDelete = async (courseId) => {
//     setLoading(true);

//     await deleteCourse({ courseId: courseId }, token);
//     const result = await fetchInstructorCourses(token);

//     if (result) {
//       dispatch(setCourse(result));
//     }
//     setConfirmationModal(null);
//     setLoading(false);
//   };


const handleCourseDelete = async (courseId) => {
    setLoading(true);
  
    // Delete course via API
    const deleteResult = await deleteCourse({ courseId: courseId }, token);
  
    if (deleteResult.success) {
      // Update local state by filtering out the deleted course
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
  
      // Optionally fetch the updated list from the server for consistency
      const result = await fetchInstructorCourses(token);
      if (result) {
        dispatch(setCourse(result)); // Update Redux store
      }
    } else {
      console.error("Failed to delete course");
    }
  
    setConfirmationModal(null);
    setLoading(false);
  };
  
  return (
    <div className=" text-white">
      <Table>
        <Thead>
          <Tr className=" flex gap-x-10 p-8 border-richblack-800">
            <Th>Courses</Th>
            <Th>Duration</Th>
            <Th>Price</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Courses.length === 0 ? (
            <Tr>
              <Td>No Courses Found</Td>
            </Tr>
          ) : (
            Courses.map((course) => (
              <Tr
                key={course._id}
                className=" flex gap-x-10 p-8 border-richblack-800"
              >
                <Td className=" flex gap-x-4">
                  <img
                    src={Instructor}
                    className=" h-[150px] w-[220px] rounded-lg object-cover"
                  />
                  <div className=" flex flex-col">
                    <p>{course.courseName}</p>
                    <p>{course.courseDescription}</p>
                    <p>Created:</p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className=" text-pink-50">DRAFTED</p>
                    ) : (
                      <p className=" text-yellow-50">PUBLISHED</p>
                    )}
                  </div>
                </Td>
                <Td>2hr 30min</Td>

                <Td>{course.price}</Td>

                <Td>
                  <button disabled={loading}
                  onClick={()=>{
                    navigate(`/dashboard/edit-course/${course._id}`)
                  }} className=" mr-4">
                    EDIT
                  </button>

                  <button
                    disabled={loading}
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:"All the data related to this course will be deleted.",
                          
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                         btn1Handler:() => handleCourseDelete(course._id),
                         btn2Handler:() => setConfirmationModal(null)
                          
                      })
                    }
                    className={`px-4 py-2 rounded ${
                      loading
                        ? "bg-richblack-500 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                  >
                    Delete
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CoursesTable;
