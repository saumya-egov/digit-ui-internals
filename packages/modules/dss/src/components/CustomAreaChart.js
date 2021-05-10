import React, { useContext } from "react";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend, Label } from "recharts";
import { Card, CardHeader, Loader } from "@egovernments/digit-ui-react-components";
import { startOfMonth, endOfMonth, sub, getTime } from "date-fns";
import FilterContext from "./FilterContext";

const getValue = (plot) => plot.value;

const CustomAreaChart = ({ xDataKey = "name", yDataKey = getValue, data }) => {
  const { id } = data;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { value } = useContext(FilterContext);
  const requestDate = {
    startDate: value?.range?.startDate.getTime(),
    endDate: value?.range?.endDate.getTime(),
    interval: "month",
    title: "",
  };
  const { isLoading, data: response } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: "metric",
    tenantId,
    requestDate,
  });

  const renderPlot = (plot) => {
    const { denomination } = value;
    switch (denomination) {
      case "Unit":
        return plot?.value;
      case "Lac":
        return Number((plot.value / 100000).toFixed(2));
      case "Cr":
        return Number((plot.value / 10000000).toFixed(2));
    }
  };

  const renderLegend = (value) => <span>{value}</span>;

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "85%" }}>
      <ResponsiveContainer width="99%" height={300}>
        <AreaChart width="100%" height="100%" data={response?.responseData?.data?.[0]?.plots} margin={{ left: 30 }}>
          <defs>
            <linearGradient id="colorUv" x1='.5' x2='.5' y2='1'>
              <stop stopColor="#048BD0" stopOpacity={0.5} />
              <stop offset="1" stopColor="#048BD0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid />
          <Tooltip />
          <XAxis dataKey={xDataKey} />
          <YAxis label={{ value: response?.responseData?.data?.[0]?.headerName, angle: -90, position: "left", offset: 15  }} />
          <Area type="monotone" dataKey={renderPlot} stroke="#048BD0" fill="url(#colorUv)" dot={true} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomAreaChart;
