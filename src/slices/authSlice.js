import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage with error handling
const initialState = {
  signupData: (() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  })(),
  loading: false,
  token: (() => {
    try {
      const storedToken = localStorage.getItem("token");
      return storedToken && storedToken !== "undefined" && storedToken !== "null"
        ? JSON.parse(storedToken)
        : null;
    } catch (error) {
      console.error("Error parsing token from localStorage:", error);
      return null;
    }
  })()
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;

      // Save user data to localStorage
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("token");
      }
    },
    logout(state) {
      state.token = null;
      state.signupData = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setSignupData, setLoading, setToken, logout } = authSlice.actions;

export default authSlice.reducer;











// import { createSlice } from "@reduxjs/toolkit";



// const initialState = {
//   signupData: null,
//   loading: false,
//   token: (() => {
//     try {
//       const storedToken = localStorage.getItem("token");
//       // Only parse if the stored value exists and is not "undefined" or "null"
//       return storedToken && storedToken !== "undefined" && storedToken !== "null" 
//         ? JSON.parse(storedToken) 
//         : null;
//     } catch (error) {
//       console.error("Error parsing token from localStorage:", error);
//       return null;
//     }
//   })(),
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialState,
//   reducers: {
//     setSignupData(state, action) {
//       state.signupData = action.payload;
//     },
//     setLoading(state, action) {
//       state.loading = action.payload;
//     },
//     setToken(state, action) {
//       state.token = action.payload;
//       // Save token to localStorage when set
//       if (action.payload) {
//         localStorage.setItem("token", JSON.stringify(action.payload));
//       } else {
//         localStorage.removeItem("token");
//       }
//     },
//   },
// });

// export const { setToken, setLoading, setSignupData } = authSlice.actions;

// export default authSlice.reducer;











// import { createSlice } from "@reduxjs/toolkit";

// const initialState={
//     signupData: null,
//     loading:false,
//     token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null
// };

// const authSlice=createSlice({
//     name:"auth",
//     initialState:initialState,
//     reducers:{
//         setSignupData(state,value){
//             state.signupData=value.payload
//         },
//         setLoading(state,value){
//             state.loading=value.payload
//         },
//         setToken(state,value){
//             state.token=value.payload
//         }
//     }
// })

// export const {setToken,setLoading,setSignupData}=authSlice.actions;

// export default authSlice.reducer;