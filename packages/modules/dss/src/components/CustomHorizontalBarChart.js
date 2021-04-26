import React from "react";
import { useTranslation } from "react-i18next";
import { startOfMonth, endOfMonth, getTime } from "date-fns";
import { Loader, ResponseComposer } from "@egovernments/digit-ui-react-components";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const barColors = ["#61A0FF", "#F47738", "#ECC478"]

const CustomHorizontalBarChart = ({
  data
}) => {
  const { id } = data;
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const requestDate = {
    startDate: getTime(startOfMonth(new Date())),
    endDate: getTime(endOfMonth(new Date())),
    interval: "month",
    title: "",
  };
  const { isLoading, data: response } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: "metric",
    tenantId,
    requestDate,
  });

  if (isLoading) {
    return (
      <Loader />
    )
  }

  const bars = response?.responseData?.data?.[0]?.plots?.map(plot => plot?.name);

  const chartData = response?.responseData?.data?.map(rows => {
    return rows?.plots?.reduce((acc, row) => {
      acc[row?.name] = row?.value;
      return acc;
    }, { name: 'Jagan Enterprises' })
  })
  return (
    <ResponsiveContainer width="99%" height={200}>
      <BarChart
        width="100%"
        height="100%"
        layout="vertical"
        data={chartData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis dataKey="name" type="category" />
        <XAxis type="number" />
        {bars.map((bar, id) => (
          <Bar dataKey={bar} fill={barColors[id]} />
        ))}
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomHorizontalBarChart;
