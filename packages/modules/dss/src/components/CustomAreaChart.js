import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend, Label } from "recharts";
import { Card, CardHeader, Loader } from "@egovernments/digit-ui-react-components";
import { startOfMonth, endOfMonth, sub, getTime, format } from "date-fns";
import FilterContext from "./FilterContext";

const getValue = (plot) => plot.value;

const renderUnits = (t, denomination) => {
  switch (denomination) {
    case "Unit":
      return "";
    case "Lac":
      return `(${t("DSS_LAC")})`;
    case "Cr":
      return `(${t("DSS_CR")})`;
  }
};

const CustomAreaChart = ({ xDataKey = "name", yDataKey = getValue, data }) => {
  const { t } = useTranslation();
  const { id } = data;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { value } = useContext(FilterContext);
  const { isLoading, data: response } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: "metric",
    tenantId,
    requestDate: { ...value?.requestDate, startDate: value?.range?.startDate?.getTime(), endDate: value?.range?.endDate?.getTime() },
    filters: value?.filters,
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

  const tickFormatter = (value) => (value && value !== "auto" ? format(new Date(value), "MMM, yy") : "");

  const renderTooltip = ({ payload, label, unit }) => {
    return (
      <div
        style={{
          margin: "0px",
          padding: "10px",
          backgroundColor: "rgb(255, 255, 255)",
          border: "1px solid rgb(204, 204, 204)",
          whiteSpace: "nowrap",
        }}
      >
        <p>{`${label !== undefined ? format(new Date(label), "MMM, yy") : ""} :${id === "fsmTotalCumulativeCollection" ? " ₹" : ""}${
          payload?.[0]?.value
        } ${id === "fsmTotalCumulativeCollection" ? value?.denomination !== "Unit" ? value?.denomination : "" : "%"}`}</p>
      </div>
    );
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "85%" }}>
      <ResponsiveContainer width="99%" height={id === "fsmTotalCumulativeCollection" ? 400 : 300}>
        <AreaChart width="100%" height="100%" data={response?.responseData?.data?.[0]?.plots} margin={{ left: 30 }}>
          <defs>
            <linearGradient id="colorUv" x1=".5" x2=".5" y2="1">
              <stop stopColor="#048BD0" stopOpacity={0.5} />
              <stop offset="1" stopColor="#048BD0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid />
          <Tooltip content={renderTooltip} />
          <XAxis dataKey={xDataKey} tick={{ fontSize: "14px", fill: "#505A5F" }} tickFormatter={tickFormatter} />
          <YAxis
            label={{
              value: `${response?.responseData?.data?.[0]?.headerName} ${renderUnits(t, value.denomination)}`,
              angle: -90,
              position: "insideLeft",
              dy: 40,
              offset: -10,
              fontSize: "14px",
              fill: "#505A5F",
            }}
            unit={id === "fsmCapacityUtilization" ? "%" : ""}
            tick={{ fontSize: "14px", fill: "#505A5F" }}
          />
          <Area type="monotone" dataKey={renderPlot} stroke="#048BD0" fill="url(#colorUv)" dot={true} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomAreaChart;
