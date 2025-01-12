import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";


const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth); 
  const [enrolledCourses, setEnrolledCourses] = useState(null); // for storing enroll courses data in enrollcourses

  const getEnrolledCourses = async () => {
    try {

        const response= await getUserEnrolledCourses(token);
        console.log("response enrolled courses is ",response);

        setEnrolledCourses(response);
        
    
    } catch (error) {
      console.error("Unable to fetch enrolled courses:", error.message);
    }
  };

  useEffect(() => {
    
    getEnrolledCourses();

  }, []);

 

  return (
    <div className="text-white">
      <div>Enrolled Courses</div>

      {!enrolledCourses ? (
        <div>Loading...</div>
      ) : !enrolledCourses.length ? (
        <p>You have not enrolled in any course yet</p>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Duration</p>
            <p>Progress</p>
          </div>
          {enrolledCourses.map((course, index) => (
            <div key={index}>
              <div>
                <img src={course.thumbnail} alt="Course Thumbnail" />
                <div>
                  <p>{course.courseName}</p>
                  <p>{course.courseDescription}</p>
                </div>
              </div>
              {/* please check this in models at testing */}
              <div>{course.totalDuration}</div>  

              <div>
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
