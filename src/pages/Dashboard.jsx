











import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return (
      <div className="mt-10">
        Loading ...
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] overflow-hidden">
      <Sidebar className="fixed top-0 left-0 h-[calc(100vh-3.5rem)]" />
      <div className=" ml-10 w-full h-[calc(100vh-3.5rem)] overflow-auto flex mx-auto max-w-maxContent justify-center">
        <div className="mx-auto w-11/12 max-w-maxContent py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;









// import React from "react";
// import { useSelector } from "react-redux";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/core/Dashboard/Sidebar"

// const Dashboard = () => {
//   const { loading: authLoading } = useSelector((state) => state.auth);
//   const { loading: profileLoading } = useSelector((state) => state.profile);

//   if (profileLoading || authLoading) {
//     return (
//       <div className="mt-10">
//         Loading ...
//       </div>
//     );
//   }

//   return (
//     <div className="relative flex min-h-[calc(100vh-3.5rem)]">
//       <Sidebar />
//       <div className="h-[calc(100vh-3.5rem)] overflow-auto flex mx-auto max-w-maxContent justify-center scroll-m-0">
//         <div className="mx-auto w-11/12 max-w-[1000px] py-10">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
