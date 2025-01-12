import React from 'react'
import HighLightText from '../components/core/Homepage/HighLightText'
import instructor from "../assets/Images/instructor.jpg";
import AboutSection2 from '../components/core/Aboutpage/AboutSection2';
import StatsComponents from '../components/core/Aboutpage/Stats';
import LearningGrid from '../components/core/Aboutpage/LearningGrid';
import ContactUsform from '../components/core/Aboutpage/ContactUsform';


const Aboute = () => {
    return (
        <div className='text-white font-inter '>


        {/* section 1 */}
        <section className=' border-b border-slate-600'>
        <div className="min-h-screen relative ">
          {/* Top background section */}
          <div className="absolute top-0 left-0 right-0 h-[55%] bg-richblack-800 z-0" />
          
          {/* Bottom background section */}
          <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-richblack-900 z-0" />
    
          {/* Content */}
          <main className="relative z-10 container mx-auto px-4 py-16 text-center text-white">
            {/* Hero Section */}

            
            <div className="mb-10 mx-auto max-w-maxContent w-fit flex flex-col items-center">

            
              <h1 className=" mb-6 text-4xl font-semibold lg:w-[70%]">
                Driving Innovation in Online Education for a {' '}
                
                <HighLightText text={"Brighter Future"}/>
              </h1>
              <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[62%]">
                ExcellenceAcademia is at the forefront of driving innovation in online education. We&apos;re passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
              </p>
            </div>
    
            {/* Image Grid - Absolute positioned images */}
            <div className="relative h-[400px] ">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="relative h-[350px] rounded-lg overflow-hidden shadow-xl">
                    <img
                      src={instructor}
                      alt="Student studying with computer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative h-[350px] rounded-lg overflow-hidden shadow-xl">
                    <img
                      src={instructor}
                      alt="Student taking notes"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative h-[350px] rounded-lg overflow-hidden shadow-xl">
                    <img
                      src={instructor}
                      alt="Student learning at desk"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
    
            {/* Bottom Text */}
            <div className=" mx-auto text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed max-w-maxContent lg:w-[80%]">
              <p className=' opacity-95'>
                We are passionate about revolutionizing the way we learn. Our innovative platform{' '}
                <span className="text-[#5EEAD4]">combines technology</span>,{' '}
                <span className="text-[#F4A261]">expertise</span>, and community to create an{' '}
                <span className="text-[#F4A261]">unparalleled educational experience</span>.
              </p>
            </div>
          </main>
        </div>
       </section>


  {/* section 2 */}
    <section className=' mt-14 mb-16'>
        <AboutSection2/>
    </section>


      {/* section 3  */}

<section>
    <StatsComponents/>
</section>


<section className=' mt-28'>
    <LearningGrid/>
</section>

<section className=' mt-28'>
    <ContactUsform></ContactUsform>
</section>

        </div>
      )
}

export default Aboute
  
  