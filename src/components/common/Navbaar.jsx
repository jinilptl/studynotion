import React, { useEffect, useState } from "react";
// import logo from "../../assets/Logo/Logo-Full-Light.png";
import { MdCastForEducation } from "react-icons/md";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbaar-link";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/api";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import ProfileDetails from "../auth/ProfileDetails";

const subLinks = [
  {
    title: "python",
    link: "/catalog/python",
  },
  {
    title: "web dev",
    link: "/catalog/web-development",
  },
];

const Navbar = () => {
  // const [subLinkss,setSubLinkss]=useState([]);

  // const fetchSubLinks=async ()=>{
  //   try {
  //     const result= await apiConnector("GET",categories.CATEGORIES_API);
  //     console.log("printing sub links  result:" , result);
  //     setSubLinkss(result.data.data)

  //   } catch (error) {
  //     console.log("could not fetch catogory list ");

  //   }
  //  }

  // useEffect(()=>{
  //    fetchSubLinks()
  // },[])

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          {/* <img src={logo} alt="Logo" width={160} height={42} loading="lazy" /> */}
          <MdCastForEducation size={50} color="white" />
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className=" relative flex items-center gap-2 group">
                      <p>{link.title}</p>
                      <IoIosArrowDropdownCircle />

                      <div
                        className="invisible absolute left-[50%]
  translate-x-[-50%] translate-y-[40%]
  top-[50%]
  flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
  opacity-0 transition-all duration-200 group-hover:visible
  group-hover:opacity-100 lg:w-[300px] z-50"
                      >
                        {/* Tooltip Content */}
                        <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 bg-richblack-5"></div>
                        {subLinks.length ? (
                          subLinks.map((subLink, index) => (
                            <Link
                              key={index}
                              to={`${subLink.link}`}
                              className=" flex flex-col text-xl font-semibold pb-2 "
                            >
                              <p>{subLink.title}</p>
                            </Link>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {" "}
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* logine signup dashboard  */}
        <div className=" flex gap-x-4 items-center">
          {user && user?.accountType != "Instructor" && (
            <Link to={"/dashboard/cart"} className=" relative">
              <AiOutlineShoppingCart size={24} color="white" />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to={"/login"}>
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to={"/signup"}>
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDetails></ProfileDetails>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
