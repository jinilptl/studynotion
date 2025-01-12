import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderSteps from '../Addcourse/RenderSteps';
import { getFullCourseDetails } from '../../../../services/operations/courseDetailsApi';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

const EditCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course || {}); // Fallback to avoid destructure errors
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const populateCourseDetails = async () => {
      setLoading(true);
      const result = await getFullCourseDetails(courseId, token);
      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }
      setLoading(false);
    };

    populateCourseDetails();
  }, [courseId, token, dispatch]);

  return (
    <div className="text-white">
      <h1>Edit Course</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : course ? (
          <RenderSteps />
        ) : (
          <p>Course not found</p>
        )}
      </div>
    </div>
  );
};

export default EditCourse;
