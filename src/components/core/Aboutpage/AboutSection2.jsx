import React from "react";
import instructor from "../../../assets/Images/instructor.jpg";

const AboutSection2 = () => {
  return (
    <div className="min-h-screen bg-richblack-900 text-white flex flex-col items-center justify-center">
      {/* Main Container */}
      <div className="container mx-auto px-6 py-20 flex flex-col items-center">
        {/* Top Section - Founding Story */}
        <section className="w-full max-w-7xl">
          <div className="flex flex-col md:flex-row justify-center items-center lg:gap-36 gap-20">
            {/* Text Section */}
            <div className="md:w-1/2 space-y-6 text-center md:text-left shadow-lg shadow-blue-500/50 p-6 rounded-lg">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent mb-8">
                Our Founding Story
              </h2>
              <p className="text-gray-400">
                Our e-learning platform was born out of a shared vision and passion for
                transforming education. It all began with a group of educators, technologists,
                and lifelong learners who recognized the need for accessible, flexible, and
                high-quality learning opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-gray-400">
                As experienced educators ourselves, we witnessed firsthand the limitations
                and challenges of traditional education systems. We believed that education
                should not be confined to the walls of a classroom or restricted by
                geographical boundaries. We envisioned a platform that could bridge these
                gaps and empower individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2 flex justify-center">
              <img
                src={instructor}
                alt="Educational setting"
                className="rounded-lg w-[80%] h-auto shadow-[0_0_15px_5px_rgba(0,200,255,0.5)]"
              />
            </div>
          </div>
        </section>

        <div className="lg:h-[300px] h-[50px]"></div>

        {/* Bottom Section - Vision and Mission */}
        <section className="w-full max-w-7xl">
          <div className="flex flex-col md:flex-row justify-center items-center lg:gap-36 gap-20">
            {/* Vision Column */}
            <div className="md:w-1/2 space-y-4 text-center md:text-left shadow-lg shadow-blue-500/50 p-6 rounded-lg">
              <h2 className="text-3xl font-bold text-[#E65C00]">Our Vision</h2>
              <p className="text-gray-400">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines cutting-edge
                technology with engaging content, fostering a dynamic
                and interactive learning experience.
              </p>
            </div>

            {/* Mission Column */}
            <div className="md:w-1/2 space-y-4 text-center md:text-left shadow-lg shadow-blue-500/50 p-6 rounded-lg">
              <h2 className="text-3xl font-bold text-[#00C8FF]">Our Mission</h2>
              <p className="text-gray-400">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment
                of sharing and dialogue, and we foster this spirit of
                collaboration through forums, live sessions, and networking
                opportunities.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutSection2;
