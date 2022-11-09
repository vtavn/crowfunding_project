import React from "react";
import PropTypes from "prop-types";

const Button = ({
  type = "button",
  children,
  className = "",
  isLoading = false,
  ...rest
}) => {
  const child = !!isLoading ? (
    <div className="w-10 h-10 border-4 border-white rounded-full border-t-transparent border-b-transparent animate-spin "></div>
  ) : (
    children
  );

  return (
    <button
      type={type}
      className={`flex justify-center p-4 text-base font-semibold rounded-xl ${
        !!isLoading ? "opacity-50 pointer-events-none" : ""
      } text-white min-h-[56px] ${className}`}
      {...rest}
    >
      {child}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Button;
