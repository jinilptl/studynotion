

import React from 'react';
import RenderSteps from './RenderSteps'; 
import { BsLightning } from "react-icons/bs";

export default function AddCourse() {
  return (
    <div className="flex gap-6 relative">
      {/* Step Section */}
      <div className="flex-1 bg-gray-800 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-semibold mb-8">Add Course</h1>
        <div>
          <RenderSteps />
        </div>
      </div>

      {/* Tips Section */}
      <div className="w-1/3 bg-white p-6 rounded-lg h-fit">
        <div className="flex items-center gap-2 mb-4">
          <BsLightning className="text-yellow-500" />
          <h2 className="font-medium text-lg">Course Upload Tips</h2>
        </div>
        <ul className="space-y-4 text-sm text-gray-300">
          <li>• Set the Course Price option or make it free.</li>
          <li>• Standard size for the course thumbnail is 1024×576.</li>
          <li>• Video section controls the course overview video.</li>
          <li>• Course Builder is where you create & organize a course.</li>
          <li>• Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
          <li>• Information from the Additional Data section shows up on the course single page.</li>
          <li>• Make Announcements to notify any important notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  );
}
