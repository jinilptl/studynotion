import React from 'react';

const IconBtn = ({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses = "",
  type = "button",
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`btn ${outline ? "btn-outline" : "btn-solid"} ${customClasses}`}
    >
      {children ? (
        <>
          {children}
          <span>{text}</span>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
