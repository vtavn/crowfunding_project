import { defaultImage } from "constants/global";
import React from "react";

const CampImage = ({ image = defaultImage, className = "h-[158px]" }) => {
  return (
    <div className={`${className}`}>
      <img
        src={image}
        alt=""
        className="object-cover w-full h-full rounded-2xl"
      />
    </div>
  );
};

export default CampImage;
