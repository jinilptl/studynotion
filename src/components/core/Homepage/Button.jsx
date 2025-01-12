// import React from 'react'
// import { Link } from 'react-router-dom'

// const Button = ({children,linkto,active}) => {
//   return (
//     <Link to={linkto} className={`text-center text-[13px] px-6 py-3 rounded-md font-bold ${active?" bg-yellow-50 text-black" :" bg-richblack-800"}
//      hover:scale-95 transition-all duration-200`}>
//         {children}
//     </Link>
//   )
// }

// export default Button

import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, linkto, active}) => {
  return (
    <Link 
      to={linkto} 
      className={`text-center text-[13px] px-6 py-3 rounded-md font-bold ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"} 
      hover:scale-95 transition-all duration-200 flex items-center justify-center`} // Add flex here
    >
      {children}
    </Link>
  )
}

export default Button
