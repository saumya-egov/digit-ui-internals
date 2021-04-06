import React, { Fragment } from "react";
import config from "../chartconfig.json";
import CustomAreaChart from "../components/CustomAreaChart";
import CustomBarChart from "../components/CustomBarChart";
import CustomPieChart from "../components/CustomPieChart";
import GenericChart from "../components/GenericChart";
import MetricChart from "../components/MetricChart";

const DashBoard = () => {
  const {} = Digit.Hooks.dss.useMDMS("pg", "dss-dashboard", "DssDashboard")
  return (
    <>
      <GenericChart header="Total Cummulative Collection (in lac)">
        <CustomAreaChart />
      </GenericChart>
      <GenericChart header="Top 3 Performing ULBs" caption="(SLA Compliance)">
        <CustomBarChart />
      </GenericChart>
      <GenericChart header="Bottom 3 Performing ULBs" caption="(SLA Compliance)">
        <CustomBarChart fillColor="#D4351C" />
      </GenericChart>
      <GenericChart header="Revenue by Usage Type">
        <CustomPieChart />
      </GenericChart>
      <MetricChart />
    </>
  );
};

export default DashBoard