import React from "react";
import { ResponsiveContainer } from "recharts";
import { Card, CardSubHeader, DownloadIcon, TextInput, CardCaption, CardLabel, Ellipsis } from "@egovernments/digit-ui-react-components";

const GenericChart = ({ header, className, caption, children, showSearch = false, showDownload = false }) => {
  return (
    <Card className={className}>
      <div className="chartHeader">
        <CardLabel style={{ fontWeight: "bold" }}>{header}</CardLabel>
        <div className="sideContent">
          {showSearch && <TextInput className="searchInput" placeholder="Search" />}
          {showDownload && <DownloadIcon styles={{ marginRight: "15px" }}/>}
          <Ellipsis />
        </div>
      </div>
      {caption && <CardCaption>{caption}</CardCaption>}
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </Card>
  )
};

export default GenericChart;