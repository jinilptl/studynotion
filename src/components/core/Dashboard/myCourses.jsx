 import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsApi';
import IconBtn from '../../common/IconBtn';
import { IoIosAddCircle } from "react-icons/io";
import CoursesTable from './instructorCourses/CoursesTable';

 
 const MyCourses = () => {

    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const [Courses,setCourses]=useState([]);

    useEffect(()=>{
        const fetchCourses= async ()=>{
            const result = await fetchInstructorCourses(token);
            console.log("inside result is",result);
            
            if (result) {
                console.log("courses is before result",Courses);
                setCourses(result);
                console.log("courses is after result",Courses);
                
            }
        }
        fetchCourses();
    },[])

    return (
        <div className=" text-white">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">My Courses</h1>
            
            <IconBtn
              text="Add Course"
              onClick={() => navigate('/dashboard/add-course')}
             children={<IoIosAddCircle/>}
             customClasses=' flex items-center gap-x-2 bg-yellow-500 p-4 rounded-lg hover:bg-yellow-700'

            />
          </div>

          {Courses&&<CoursesTable Courses={Courses} setCourses={setCourses} />}
          </div>
    )
 }
 
 export default MyCourses