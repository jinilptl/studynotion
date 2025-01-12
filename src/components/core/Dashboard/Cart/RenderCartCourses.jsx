import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";


const RenderCartCourses = () => {
  const { cart,removeFromCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      {cart.map((course, index) => (
        <div key={index} className="flex justify-between items-center border-b p-4">
          <div className="flex items-start">
            <img src={course?.thumbnail} alt="Course Thumbnail" className="w-20 h-20 object-cover" />
            <div className="ml-4">
              <p className="text-lg font-semibold">{course?.courseName}</p>
              <p className="text-sm text-gray-500">{course?.category?.name}</p>
              <div className="flex items-center">
                <span className="text-yellow-500">4.8</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />
                <span className="ml-2 text-sm text-gray-500">
                  {course?.ratingAndReviews?.length || 0} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(removeFromCart(course?._id))}
              className="flex items-center gap-1 text-red-500"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="font-semibold">Rs {course?.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;
