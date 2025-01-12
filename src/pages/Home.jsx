import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighLightText from "../components/core/Homepage/HighLightText";
import CTAbutton from "../components/core/Homepage/Button";
// import Banner from '../assets/video/Banner'
import instructor from "../assets/Images/instructor.jpg";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import TimelineSection from "../components/core/Homepage/TimelineSection";
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection";
import InstructorSection from "../components/core/Homepage/InstructorSection";


const Home = () => {
  return (
    <div>
      {/* section 1  */}
      <div className=" relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent ">
        <Link to={"/signup"}>
          <div className=" group mt-16 p-1 max-auto rounded-full bg-richblack-800 font-bold transition-all duration-200 hover:scale-95 w-fit text-richblack-200">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className=" text-center text-4xl font-semibold mt-7">
          Empower Your Future With
          <HighLightText text={"Coding Skills"} />
        </div>

        <div className=" mt-4 w-[70%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className=" flex flex-row gap-7 mt-8">
          <CTAbutton active={true} linkto={"/signup"}>
            Learn more
          </CTAbutton>

          <CTAbutton active={false} linkto={"/signup"}>
            Book a Demo
          </CTAbutton>
        </div>

        {/* please after use this video  */}
        {/* <div className=' shadow-blue-200'>
        <video
        muted
        loop
        autoPlay
        >
            <source src={Banner} type='video/mp4'/>
        </video>
       </div> */}

        <div className=" w-[70%] h-[70%] mx-3 my-12 flex justify-center">
          <img
            src={instructor}
            alt="image is here"
            className="w-[100%] h-[500px]"
          ></img>
        </div>

        {/* code section 1  */}
        <div>
          <CodeBlocks
            position={`lg:flex-row`}
            heading={
              <div className=" text-4xl font-semibold">
                Unlock Your
                <HighLightText text={"Coding Potential"} />
                <span> </span>With our Online Courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            }
            ctabtn1={{
              active: true,
              linkto: "/signup",
              btnText: "try it Yourself",
            }}
            ctabtn2={{
              active: false,
              linkto: "/login",
              btnText: "Learn More",
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n <head>\n <meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Study notion</title>\n</head>\n<body>\n<h1>Wlcome to Study notion</h1>\n<h1>Greeting from Jinil Patel</h1>\n</body>\n</html>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* code section 2  */}
        <div>
          <CodeBlocks
            position={`lg:flex-row-reverse`}
            heading={
              <div className=" text-4xl font-semibold">
                Start
                <HighLightText text={"Coding in Seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              active: true,
              linkto: "/signup",
              btnText: "Continue lesson",
            }}
            ctabtn2={{
              active: false,
              linkto: "/login",
              btnText: "Learn More",
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n <head>\n <meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Study notion</title>\n</head>\n<body>\n<h1>Wlcome to Study notion</h1>\n<h1>Greeting from Jinil Patel</h1>\n</body>\n</html>`}
            codeColor={"text-caribbeangreen-300"}
          />
        </div>
      </div>

      {/* section 2  */}

      <div className=" bg-pure-greys-5 text-richblack-700">
        {/* please add grid bg  */}
        <div className=" homepage_bg h-[310px]  ">
          <div className=" w-11/12 max-w-maxContent flex flex-col items-center justify-between mx-auto gap-5">
            {/* Spacer for height */}
            <div className="h-[150px]"></div>

            {/* Buttons Section */}
            <div className="flex flex-row gap-7 text-white">
              {/* CTA Button 1 */}
              <CTAbutton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAbutton>

              {/* Add more buttons if needed */}
              {/* Example for a second button */}
              <CTAbutton active={false} linkto={"/signup"}>
                Learn More
              </CTAbutton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          {/* Main Content Section */}
          <div className="flex flex-row gap-5 mb-10 mt-[95px]">
            {/* Left Section */}
            <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for a
              <HighLightText text={"Job that is in demand"} />
            </div>

            {/* Right Section */}
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern StudyNotion dictates its own terms. Today, to be a
                competitive specialist requires more than professional skills.
              </div>

              <CTAbutton active={true} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAbutton>
            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </div>



      {/* section 3  */}

      {/* Section 3 */}
<div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
  
  {/* Instructor Section */}
  <InstructorSection/>

  <h2 className=" text-center text-4xl font-semibold mt-10"> review from other Learners</h2>

  {/* review slider  */}
  
</div>


      {/* section 4  */}

      
    </div>
  );
};

export default Home;
