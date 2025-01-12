import React, { useState, useEffect } from "react";

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0 || `${label} is required`,
    });
   
  }, []);

//   useEffect(()=>{
//     setValue(name, requirementList); // Sync the list with the form state
//   },[requirementList])

  const handleAddRequirement = () => {
    if (requirement.trim() !== "") {
      setRequirementList([...requirementList, requirement.trim()]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };

  return (
    <div>
      <label htmlFor={name}>
        {label}
        <sup>*</sup>
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full px-2 py-1 border rounded-md text-richblack-900"
          placeholder={`Add ${label}`}
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="px-3 py-1 bg-blue-500 text-white rounded-md"
        >
          Add
        </button>
      </div>
      {requirementList.length > 0 && (
        <ul className="mt-2 space-y-1">
          {requirementList.map((req, index) => (
            <li
              key={index}
              className="flex items-center justify-between text-gray-700 bg-gray-100 px-2 py-1 rounded-md"
            >
              <span>{req}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-red-500 hover:underline text-xs"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};

export default RequirementField


