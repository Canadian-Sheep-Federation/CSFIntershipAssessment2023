import React, {Fragment} from "react";
import "./ShowInfo.css";

export const ShowInfo = ({ data }) => {
  return (
    <div className="show-info-container">
      {/* Show Poster Image*/}
      <div className="show-img-container">
        <img src={data.show.image.medium} alt="show poster"></img>
      </div>
      {/* Show Information Data */}
      <div className="show-details-container">
        <h1 className="show-details-title">Title: {data.show.name}</h1>
        <h2 className="show-details-premiered">Premiered: {data.show.premiered}</h2>
        <h2 className="show-details-type">Type: {data.show.type}</h2>
        <h2 className="show-details-rating">Rating: {data.show.rating.average}</h2>
      </div>
    </div>
  );
};
