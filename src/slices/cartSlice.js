import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        // If the course is already in the cart, do not modify the cart
        toast.error("Course already in cart");
        return;
      }

      // Add the course to the cart
      state.cart.push(course);
      state.totalItems += 1;
      state.total += course.price;

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("total", JSON.stringify(state.total));

      toast.success("Course added to cart");
    },

    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index >= 0) {

        // const removedCourse = state.cart[index]

        // Remove the course from the cart
        state.cart.splice(index, 1);
        state.totalItems --;
        state.total -= state.cart[index].price;

        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        localStorage.setItem("total", JSON.stringify(state.total));

        toast.success("Course removed from cart");
      } else { 
        toast.error("Course not found in cart");
      }
    },

    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      // Update localStorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");

      toast.success("Cart reset successfully");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
