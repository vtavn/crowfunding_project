import React from "react";

const CampMeta = ({ amount = "null", text = "null", size = "small" }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <h4
        className={`font-semibold text-text2 ${
          size === "small" ? "text-sm" : "text-xl"
        }`}
      >
        {amount}
      </h4>
      <span
        className={`text-text4 ${size === "small" ? "text-xs" : "text-base"}`}
      >
        {text}
      </span>
    </div>
  );
};

export default CampMeta;
