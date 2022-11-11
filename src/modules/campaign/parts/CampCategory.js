import IconFolder from "components/icons/IconFolder";
import React from "react";
import { Link } from "react-router-dom";

const CampCategory = ({ text = "underfined", className = "text-xs " }) => {
  return (
    <Link
      to="/"
      className={`flex items-baseline font-medium gap-x-3 text-text3 mb-4 ${className}`}
    >
      <IconFolder></IconFolder>
      <span>{text}</span>
    </Link>
  );
};

export default CampCategory;
