import React from 'react'
import HighLightText from './HighLightText'
import Compare_with_others from "../../../assets/Images/Compare_with_others.jpg"
import Know_your_progress from "../../../assets/Images/Know_your_progress.jpg"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.jpg"
import CTAbutton from "../Homepage/Button"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
  <div className='flex flex-col gap-5 items-center'>
    
    {/* Heading Section */}
    <div className='text-4xl font-semibold text-center'>
      Your Swiss Knife for
      <HighLightText text={" learning any language"}/>
    </div>

    {/* Description Section */}
    <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
      Using spin making learning multiple languages easy. With 20+ languages, realistic voice-over,
      progress tracking, custom schedule, and more.
    </div>


    <div className='flex flex-row items-center justify-center mt-5'>
  
  {/* First Image */}
  <img 
    src={Know_your_progress} 
    alt="Know Your Progress" 
    className='object-contain -mr-32 w-[30%]' 
  />
  
  {/* Second Image */}
  <img 
    src={Compare_with_others} 
    alt="Compare With Others" 
    className='object-contain w-[30%]' 
  />
  
  {/* Third Image */}
  <img 
    src={Plan_your_lessons} 
    alt="Plan Your Lesson" 
    className='object-contain -ml-36 w-[30%]' 
  />
  
</div>

<div className="w-fit">
    <CTAbutton active={true} linkto={"/signup"}>
        learn more
    </CTAbutton>
</div>


  </div>
</div>

  )
}

export default LearningLanguageSection