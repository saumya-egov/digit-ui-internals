import React, { Fragment } from "react";
import CustomAreaChart from "./CustomAreaChart";
import CustomBarChart from "./CustomBarChart";
import CustomPieChart from "./CustomPieChart";
import CustomTable from "./CustomTable";
import GenericChart from "./GenericChart";
import MetricChart from "./MetricChart";

let index = 1;

const Layout = ({ rowData }) => {
  const renderChart = (chart) => {
    switch(chart.vizType) {
      case "metric-collection":
        return (
          <GenericChart header={chart.name} className="metricsTable">
            <MetricChart />
          </GenericChart>
        );
      case "chart":
        return (
          <GenericChart header={chart.name}>
            <CustomAreaChart />
          </GenericChart>
        );
      case "performing-metric":
        return (
          <GenericChart header={chart.name}>
            <CustomBarChart fillColor={(index++) % 2 ? "#00703C" : "#D4351C"} />
          </GenericChart>
        );
      case "pie":
        return (
          <GenericChart header={chart.name}>
            <CustomPieChart />
          </GenericChart>
        );
      case "table":
        return (
          <GenericChart header={chart.name} showSearch={true} showDownload={true}>
            <CustomTable />
          </GenericChart>
        )
    }
  }
  return (
    <div>
      {rowData.vizArray.map((chart, key) => (
        renderChart(chart)
      ))}
    </div>
  )
};

export default Layout;