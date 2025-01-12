import React, { useState } from 'react';
import { sidebarLinks } from '../../../data/dashboard-link';
import { logout } from '../../../services/operations/authAPI';
import { useSelector, useDispatch } from 'react-redux';
import SidebarLink from './SiderbarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc'; 
import ConfirmationModal from "../../common/ConfirmationModal"
import { NavLink, useLocation, matchPath } from 'react-router-dom';


const Sidebar = () => {
  const dispatch = useDispatch();
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const[confirmationModal,setConfirmationModal]=useState(null)
  const navigate=useNavigate();
  
 
  console.log("user is ",user);

  
  
 

  // Handle loading states
  if (profileLoading || authLoading) {
    return (
      <div className="mt-10">
        Loading ...
      </div>
    );
  }

  return (
    <div>
    <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 
  h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">
     
<div className=' flex flex-col'>
{
  sidebarLinks.map((link)=>{

    if(link.type&&user?.accountType!==link.type){
      return null
    }

    return(<SidebarLink key={link.id} link={link} iconName={link.icon}/>)
  })
}

</div>

<div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

<div className="flex flex-col">
  <SidebarLink
    link={{ name: "Settings", path: "dashboard/settings" }}
    iconName="VscSettingsGear"
  />

<button
  onClick={() =>
    setConfirmationModal({
      text1: "Are You Sure?",
      text2: "You will be logged out of your Account",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => dispatch(logout(navigate)),
      btn2Handler: () => setConfirmationModal(null),
    })
  }
  className={`relative px-8 py-2 text-sm font-medium `}
>
 <div className="flex items-center gap-x-2">
  <VscSignOut className="text-lg" />
  <span>Logout</span>
</div>
</button>

</div>
{confirmationModal&& <ConfirmationModal modalData={confirmationModal}/>}
    </div>
    </div>
  );
};

export default Sidebar;
