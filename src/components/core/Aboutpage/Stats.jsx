import React from 'react'

const stats = [
    {
      value: "5K",
      label: "Active Students"
    },
    {
      value: "10+",
      label: "Mentors"
    },
    {
      value: "200+",
      label: "Courses"
    },
    {
      value: "50+",
      label: "Awards"
    }
  ];

const StatsComponents = () => {
    return (
        <div className="w-full bg-richblack-400 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </span>
                  <span className="text-gray-400 text-sm md:text-base">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}

export default StatsComponents





  
  

  