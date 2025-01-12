import React from 'react'
import { FaGraduationCap } from "react-icons/fa6";
import { PiBagFill } from "react-icons/pi";
import { IoDiamondOutline } from "react-icons/io5";
import { LiaMedalSolid } from "react-icons/lia";
import TimeLine from "../../../assets/Images/TimeLine.jpg"

const timeline=[{
    Logo:<LiaMedalSolid size={50} />,
    heading:"leadership",
    description:"Fully committed to the success company"
},
{
    Logo:<FaGraduationCap size={50} />,
    heading:"leadership",
    description:"Fully committed to the success company"
},
{
    Logo:<IoDiamondOutline size={50} />,
    heading:"leadership",
    description:"Fully committed to the success company"
},
{
    Logo:<PiBagFill size={50} />,
    heading:"leadership",
    description:"Fully committed to the success company"
}]



const TimelineSection = () => {
  return (
    <div>

        <div className=' flex flex-row  items-center gap-2'>


   {/* left part  */}
        <div className=' w-[45%] flex flex-col gap-8 pl-16'>

        {timeline.map((element, index) => (
        <div className=' flex flex-row gap-6' key={index}>

            <div className=' w-[50px] h-[50px] bg-white flex items-center'>
                {element.Logo}
            </div>

            <div > 
            
            <h2 className=' font-semibold text-[18px]'>{element.heading}</h2>
            <p className='text-base'>{element.description}</p>
            </div>
        </div>
      ))}

      </div>

      {/* right part  */}
      <div className=' relative shadow-blue-200 w-[45%]'>
        <img src={TimeLine} alt='timeline '  className=' shadow-white object-cover h-fit w-[100%]'/>

        <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
  
  {/* Years of Experience */}
  <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
    <p className='text-3xl font-bold'>10</p>
    <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
  </div>
  
  {/* Type of Courses */}
  <div className='flex gap-5 items-center px-7'>
    <p className='text-3xl font-bold'>250</p>
    <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
  </div>

</div>




      </div>
      
      </div>


</div>


)
}

export default TimelineSection