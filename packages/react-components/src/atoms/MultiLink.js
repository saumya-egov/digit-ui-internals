import React from "react";
import LinkButton from "./LinkButton";
import { DownloadIcon } from "./svgindex";

const MultiLink = () => {
  return (
    <div>
      <div>
        <DownloadIcon />
        <LinkButton label="CS_COMMON_DOWNLOAD" />
      </div>
    </div>
  );
};

export default MultiLink;
