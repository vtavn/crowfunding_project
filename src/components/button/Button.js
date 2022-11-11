import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
  let defaultBtnClass =
    "flex justify-center p-4 text-base font-semibold rounded-xl";

  switch (rest.kind) {
    case "primary":
      defaultBtnClass = defaultBtnClass + " bg-primary text-white";
      break;
    case "secondary":
      defaultBtnClass = defaultBtnClass + " bg-secondary text-white";
      break;
    case "ghost":
      defaultBtnClass =
        defaultBtnClass + " bg-secondary bg-opacity-20 text-secondary";
      break;

    default:
      break;
  }
  if (rest.href)
    return (
      <Link to={rest.href} className={`${defaultBtnClass} ${className}`}>
        {child}
      </Link>
    );

  return (
    <button
      type={type}
      className={` ${defaultBtnClass} ${
        !!isLoading ? "opacity-50 pointer-events-none" : ""
      } ${className}`}
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
  kind: PropTypes.oneOf(["primary", "secondary", "ghost"]),
  href: PropTypes.string,
};

export default Button;
