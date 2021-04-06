import React from "react";
import { AreaChart, Area, CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardHeader } from "@egovernments/digit-ui-react-components";

const data = [{
  "headerName": "Collections",
  "headerValue": 3.69819682E8,
  "headerSymbol": "amount",
  "insight": null,
  "plots": [{
    "label": null,
    "name": "May-2020",
    "value": 189474.0,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Jun-2020",
    "value": 6478937.0,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Jul-2020",
    "value": 6574132.0,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Aug-2020",
    "value": 6575132.0,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Sep-2020",
    "value": 6585500.0,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Oct-2020",
    "value": 5.3059442E7,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Nov-2020",
    "value": 5.3098721E7,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Dec-2020",
    "value": 5.3113305E7,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Jan-2021",
    "value": 5.3180851E7,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Feb-2021",
    "value": 6.5455856E7,
    "strValue": null,
    "symbol": "amount"
  }, {
    "label": null,
    "name": "Mar-2021",
    "value": 6.5508332E7,
    "strValue": null,
    "symbol": "amount"
  }]
}]

const getValue = (plot) => plot.value / 100000;

const CustomAreaChart = ({
  xDataKey = 'name',
  yDataKey = getValue,
}) => {
  return (
    <AreaChart width={730} height={250} data={data?.[0]?.plots}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FF0000" stopOpacity={1}/>
          <stop offset="95%" stopColor="#F89462" stopOpacity={1}/>
        </linearGradient>
      </defs>
      <CartesianGrid />
      <Tooltip />
      <XAxis dataKey={xDataKey} />
      <YAxis dataKey={yDataKey} />
      <Legend verticalAlign='bottom' />
      <Area type="monotone" dataKey={yDataKey} stroke="#8884d8" fill="url(#colorUv)" dot={true} />
    </AreaChart>
  )
};

export default CustomAreaChart;