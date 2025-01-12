import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import countryCodes from "../../../data/countrycode.json"; // Adjust the path as necessary

const ContactUsform = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const onSubmit = async (data) => {
    console.log("all the data is ", data);
    try {
      const response = { success: true };
      console.log("response is", response);
    } catch (error) {
      console.log("error", error.message);
    }
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-white p-4">
      <div className="w-full max-w-2xl mx-auto p-8 rounded-lg bg-[#1a1a1a]/80 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">Get in Touch</h1>
          <p className="text-gray-300">We'd love to hear from you, please fill out this form.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-300" htmlFor="firstName">
                First Name
              </label>
              <input
                {...register("firstName", { required: "First name is required" })}
                placeholder="First name"
                type="text"
                name="firstName"
                id="firstName"
                className="w-full bg-[#1a1a1a]/50 border-2 border-gray-600 rounded-lg text-white placeholder-gray-500 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">Please enter your first name</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300" htmlFor="lastName">
                Last Name
              </label>
              <input
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Last name"
                type="text"
                name="lastName"
                id="lastName"
                className="w-full bg-[#1a1a1a]/50 border-2 border-gray-600 rounded-lg text-white placeholder-gray-500 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">Please enter your last name</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email"
              name="email"
              id="email"
              className="w-full bg-[#1a1a1a]/50 border-2 border-gray-600 rounded-lg text-white placeholder-gray-500 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Please enter a valid email address</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300" htmlFor="phone">
              Phone Number
            </label>
            <div className="flex gap-3">
            <select
  {...register("phoneCode")}
  defaultValue="+91"
  className="w-[150px] bg-[#1a1a1a]/50 border-0 text-white p-2"
>
  {countryCodes.map((country, index) => (
    <option key={index} value={country.code}>
      {country.code} ({country.country})
    </option>
  ))}
</select>
              <input
                {...register("phone", { required: "Phone number is required" })}
                placeholder="Mobile number"
                id="phone"
                name="phone"
                className="w-full bg-[#1a1a1a]/50 border-2 border-gray-600 rounded-lg text-white placeholder-gray-500 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">Please enter your mobile number</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300" htmlFor="message">
              Any Query
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              placeholder="Your message"
              className="w-full bg-[#1a1a1a]/50 border-2 border-gray-600 rounded-lg text-white placeholder-gray-500 p-3 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">Please provide a message</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsform;
