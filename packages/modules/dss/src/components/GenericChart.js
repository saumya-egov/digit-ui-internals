import React from "react";
import { ResponsiveContainer } from "recharts";
import { Card, CardSubHeader, CardCaption } from "@egovernments/digit-ui-react-components";

const GenericChart = ({ header, caption, children }) => {
  return (
    <Card>
      <CardSubHeader>{header}</CardSubHeader>
      {caption && <CardCaption>{caption}</CardCaption>}
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </Card>
  )
};

export default GenericChart;