import React from 'react';
import IconBtn from './IconBtn';

const ConfirmationModal = ({ modalData }) => {
  return (
    <div>
      <div>
        <p>{modalData?.text1}</p>
        <p>{modalData?.text2}</p>

        <div>
          <IconBtn
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            customClasses='text-white bg-red-900 rounded-md cursor-pointer flex items-center px-5 py-3 hover:bg-richblack-700 gap-x-2 mb-7 border border-yellow-50'
          />
          <button onClick={modalData?.btn2Handler} className='text-white bg-richblack-900 rounded-md cursor-pointer flex items-center px-5 py-3 hover:bg-richblack-700 gap-x-2 mb-7 border border-yellow-50'>
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
