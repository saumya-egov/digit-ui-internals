import React from "react";
import { ErrorSvg } from "./svgindex";

const InfoBanner = ({ label, text }) => {
  return (
    <div className="info-banner-wrap">
      <div>
        <ErrorSvg />
        <h2>{label}</h2>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default InfoBanner;
