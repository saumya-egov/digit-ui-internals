import React, { Fragment, useContext } from "react";
import { Card, CardSubHeader } from "@egovernments/digit-ui-react-components";
import { startOfMonth, endOfMonth, getTime } from "date-fns";
import FilterContext from "./FilterContext";

const MetricData = ({ data }) => {
  const { value } = useContext(FilterContext);
  return (
    <div>
      <p className="heading-m" style={{ textAlign: "right", paddingTop: "0px" }}>
        {Digit.Utils.dss.formatter(data?.headerValue, data.headerSymbol, value?.denomination, true)}
      </p>
      {data.insight && (
        <div>
          <p className={`${data.insight.colorCode}`}>{data.insight.value}</p>
        </div>
      )}
    </div>
  );
};

const MetricChartRow = ({ data }) => {
  const { id, chartType } = data;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { value } = useContext(FilterContext);
  const requestDate = {
    startDate: value?.range?.startDate,
    endDate: value?.range?.endDate,
    interval: "month",
    title: "",
  };
  const { isLoading, data: response } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: chartType,
    tenantId,
    requestDate,
  });

  if (isLoading) {
    return false;
  }

  return (
    <div className="row">
      <div>{data.name}</div>
      <MetricData data={response?.responseData?.data?.[0]} />
      {/* <div>{`${displaySymbol(response.headerSymbol)} ${response.headerValue}`}</div> */}
    </div>
  );
};

const MetricChart = ({ data }) => {
  const { charts } = data;

  return (
    <>
      {charts.map((chart, index) => (
        <MetricChartRow data={chart} />
      ))}
    </>
  );
};

export default MetricChart;
