import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { startOfMonth, endOfMonth, getTime } from "date-fns";
import { ResponsiveContainer, Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { Card, Loader } from "@egovernments/digit-ui-react-components";
import FilterContext from "./FilterContext";

const COLORS = ["#FBC02D", "#048BD0", "#8E29BF", "#EA8A3B", "#0BABDE", "#FFBB28", "#FF8042"];

const CustomPieChart = ({ dataKey = "value", data }) => {
  const { id } = data;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const { value } = useContext(FilterContext);
  const { isLoading, data: response } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: "metric",
    tenantId,
    requestDate: value?.requestDate,
    filters: value?.filters,
  });

  const renderLegend = (value) => <span style={{ fontSize: "14px", color: "#505A5F" }}>{t(`PROPERTYTYPE_MASTERS_${value}`)}</span>;

  const renderCustomLabel = (args) => {
    const { value, endAngle, startAngle, x, cx, y, cy, percent, name } = args;
    const diffAngle = endAngle - startAngle;
    if (diffAngle < 7) {
      return null;
    }
    return (
      <text x={x} cx={cx} y={y} cy={cy} percent={percent} name={name} fill="#505A5F" alignmentBaseline="middle" className="recharts-pie-label-text" fontSize="14px">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <ResponsiveContainer width="99%" height={340}>
      <PieChart margin={{ bottom: 15 }}>
        <Pie
          data={response?.responseData?.data?.[0]?.plots}
          dataKey={dataKey}
          cy={100}
          innerRadius={50}
          outerRadius={70}
          margin={{ bottom: 10 }}
          fill="#8884d8"
          label={renderCustomLabel}
          labelLine={false}
        >
          {response?.responseData?.data?.[0]?.plots.map((entry, index) => (
            <Cell key={`cell-`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [value, t(name)]} />
        <Legend layout="horizontal" align="bottom" iconType="circle" formatter={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
