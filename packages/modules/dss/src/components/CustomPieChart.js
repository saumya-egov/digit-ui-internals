import { Card } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const data = [{
  "headerName": "DSS_PT_COLLECTION_BY_USAGE_TYPE",
  "headerValue": 6.5472716E7,
  "headerSymbol": "amount",
  "insight": null,
  "plots": [{
    "label": null,
    "name": "Residential",
    "value": 1.2734823E7,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Commercial",
    "value": 5.2730168E7,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Industrial",
    "value": 3.2730168E7,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Institutional",
    "value": 4.2730168E7,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Mixed",
    "value": 0.0,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Other Non-Residential",
    "value": 0.0,
    "strValue": null,
    "symbol": "amount"
  }]
}]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomPieChart = ({
  dataKey = 'value'
}) => {
  return (
    <PieChart width={730} height={250}>
      <Pie data={data?.[0]?.plots} dataKey={dataKey} innerRadius={60} outerRadius={80} fill="#8884d8" label={true} labelLine={false}>
        {data?.[0]?.plots.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="vertical" align="right" iconType="circle" />
    </PieChart>
  )
}

export default CustomPieChart;