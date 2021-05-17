import React, { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { startOfMonth, endOfMonth, getTime } from "date-fns";
import { Loader, ResponseComposer } from "@egovernments/digit-ui-react-components";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import FilterContext from "./FilterContext";

const barColors = ["#048BD0", "#FBC02D", "#ECC478"];

const CustomHorizontalBarChart = ({ data }) => {
  const { id } = data;
  const { t } = useTranslation();
  const { value } = useContext(FilterContext);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { isLoading, data: response } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: "metric",
    tenantId,
    requestDate: value?.requestDate,
    filters: value?.filters,
  });

  const constructChartData = (data) => {
    let result = {};
    for (let i = 0; i < data?.length; i++) {
      const row = data[i];
      for (let j = 0; j < row.plots.length; j++) {
        const plot = row.plots[j];
        result[plot.name] = { ...result[plot.name], [row.headerName]: plot.value };
      }
    }
    return Object.keys(result).map((key) => {
      return {
        name: key,
        ...result[key],
      };
    });
  };

  const chartData = useMemo(() => constructChartData(response?.responseData?.data), [response]);

  const renderLegend = (value) => <span style={{ fontSize: "14px", color: "#505A5F" }}>{value}</span>;

  if (isLoading) {
    return <Loader />;
  }

  const bars = response?.responseData?.data?.map((bar) => bar?.headerName);

  return (
    <ResponsiveContainer width="99%" height={300}>
      <BarChart
        width="100%"
        height="100%"
        // layout="vertical"
        data={chartData}
        barGap={14}
        barSize={15}
      >
        <CartesianGrid />
        <YAxis tick={{ fontSize: "14px", fill: "#505A5F" }} />
        <XAxis dataKey="name" type="category" tick={{ fontSize: "14px", fill: "#505A5F" }} />
        {bars.map((bar, id) => (
          <Bar key={id} dataKey={bar} fill={barColors[id]} />
        ))}
        <Legend formatter={renderLegend} iconType="circle" />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomHorizontalBarChart;
