import React, { Component } from "react";
import CampAuthor from "./parts/CampAuthor";
import CampCategory from "./parts/CampCategory";
import CampDesc from "./parts/CampDesc";
import CampImage from "./parts/CampImage";
import CampMeta from "./parts/CampMeta";
import CampTitle from "./parts/CampTitle";

export class CampaignItem extends Component {
  render() {
    return (
      <div>
        <CampImage></CampImage>
        <div className="px-5 py-4">
          <CampCategory text="Education"></CampCategory>
          <CampTitle>Powerd Kít Learning Boxes</CampTitle>
          <CampDesc>
            Fun, durable and reusable boxes with eco-friendly options.
          </CampDesc>
          <div className="flex items-start justify-between mb-5 gap-x-5">
            <CampMeta amount="$2.000" text="Raised of $2.000"></CampMeta>
            <CampMeta amount="173" text="Total backers"></CampMeta>
          </div>
          <CampAuthor></CampAuthor>
        </div>
      </div>
    );
  }
}

export default CampaignItem;
