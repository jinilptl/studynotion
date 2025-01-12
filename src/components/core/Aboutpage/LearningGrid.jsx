import React from 'react';
import CTAbutton from "../../../components/core/Homepage/Button";

// Define the LearningGridArray with proper formatting
const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible learning.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring certifications recognized globally.",
  },
  {
    order: 4,
    heading: "Automation-Driven Learning",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring automation-driven learning.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring job-ready programs.",
  },
];

const HighlightText = ({ text }) => (
  <span className="text-yellow-500 font-bold">{text}</span>
);

const LearningGrid = () => {
  return (
    <div className="grid mx-auto grid-cols-1 lg:grid-cols-4 gap-6 mb-10 max-w-maxContent">
      {LearningGridArray.map((card, index) => (
        <div
          key={index}
          className={`p-6 transform transition-transform duration-500 hover:scale-105 shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] ${
            index === 0 ? "lg:col-span-2 lg:h-[300px] bg-transparent" : ""
          } ${
            card.order % 2 === 1
              ? "bg-richblack-700 lg:h-[300px] rounded-lg"
              : "bg-richblack-800 lg:h-[300px] rounded-lg"
          } ${card.order === 3 ? "lg:col-start-2" : ""}`}
        >
          {card.order < 0 ? (
            <div className="flex flex-col gap-4 p-6">
              <h1 className="text-richblack-5 text-2xl font-bold">
                {card.heading}{" "}
                <HighlightText text={card.highlightText} />
              </h1>
              <p className="text-richblack-300 font-medium">
                {card.description}
              </p>
              {card.BtnText && card.BtnLink && (
                <div className="w-fit mt-4">
                  <CTAbutton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAbutton>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-6">
              <h1 className="text-richblack-5 text-lg font-bold">
                {card.heading}
              </h1>
              <p className="text-richblack-300 font-medium">
                {card.description}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningGrid;
