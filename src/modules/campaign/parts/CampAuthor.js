import { defaultImage } from "constants/global";
import React from "react";

const CampAuthor = ({ image = defaultImage, author = "underfined" }) => {
  return (
    <div className="flex items-center gap-x-3">
      <img src={image} className="w-8 h-8 rounded-full" alt="" />
      <p className="text-xs text-text3">
        By <span className="font-semibold text-text2">{author}</span>
      </p>
    </div>
  );
};

export default CampAuthor;
