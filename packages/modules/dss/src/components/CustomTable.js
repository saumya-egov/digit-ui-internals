import React, { Fragment, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { startOfMonth, endOfMonth, getTime, subYears } from "date-fns";
import { UpwardArrow, TextInput, Loader, Table, RemoveableTag, Rating, DownwardArrow } from "@egovernments/digit-ui-react-components";
import FilterContext from "./FilterContext";

const CustomTable = ({ data, onSearch }) => {
  const { id } = data;
  const [chartKey, setChartKey] = useState(id);
  const { t } = useTranslation();
  const { value, setValue } = useContext(FilterContext);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const lastYearDate = {
    startDate: subYears(value?.range?.startDate, 1).getTime(),
    endDate: subYears(value?.range?.endDate, 1).getTime(),
    interval: "month",
    title: "",
  };
  const { isLoading: isRequestLoading, data: lastYearResponse } = Digit.Hooks.dss.useGetChart({
    key: chartKey,
    type: "metric",
    tenantId,
    requestDate: lastYearDate,
    filters: value?.filters,
  });
  const { isLoading, data: response } = Digit.Hooks.dss.useGetChart({
    key: chartKey,
    type: "metric",
    tenantId,
    requestDate: { ...value?.requestDate, startDate: value?.range?.startDate?.getTime(), endDate: value?.range?.endDate?.getTime() },
    filters: value?.filters,
  });

  const renderHeader = (plot) => {
    const units = ["Total Waste Dumped", "Total Waste Collected"];
    if (id === "fsmVehicleLogReportByDDR" && units.includes(plot?.name)) {
      return `${plot?.name} (${t("DSS_KL")})`;
    }
    return plot?.name;
  };

  const getDrilldownCharts = () => {
    if (response?.responseData?.drillDownChartId && response?.responseData?.drillDownChartId !== "none") {
      setChartKey(response?.responseData?.drillDownChartId);
    }
  };

  const tableColumns = useMemo(
    () =>
      response?.responseData?.data?.[0]?.plots?.map((plot) => ({
        Header: renderHeader(plot),
        accessor: plot?.name.replaceAll(".", " "),
        symbol: plot?.symbol,
        Cell: (args) => {
          console.log(args, "args");
          const { value, column } = args;
          if (typeof value === "object") {
            const { insight, value: rowValue } = value;
            return (
              <span>
                {rowValue}
                {` `}
                {insight >= 0 ? <UpwardArrow /> : <DownwardArrow /> }
                {` `}
                {`${Math.abs(insight)}%`}
              </span>
            );
          }
          if (response?.responseData?.filter?.[0]?.column === column.Header) {
            return (
              <span style={{ color: "#F47738", cursor: "pointer" }} onClick={() => getDrilldownCharts(value)}>
                {t(value)}
              </span>
            );
          }
          if (column.Header.toLowerCase() === "citizen average rating") {
            return (
              <Rating currentRating={Math.round(value)} styles={{ width: "unset", justifyContent: "center" }} starStyles={{ width: "25px" }} />
            )
          }
          return String(value);
        },
      })),
    [response]
  );

  const tableData = useMemo(() => {
    if (!response || !lastYearResponse) return;
    return response?.responseData?.data?.map((rows) => {
      const lyData = lastYearResponse?.responseData?.data?.find((lyRow) => lyRow?.headerName === rows?.headerName);
      return rows?.plots?.reduce((acc, row, currentIndex) => {
        let value = row?.value !== null ? row?.value : row?.label || "";
        let insight = null;
        if (row.symbol === "number" && row.name !== "Citizen Average Rating" && lyData !== undefined) {
          let prevData = lyData.plots[currentIndex].value;
          if (prevData === value) insight = 0;
          else insight = prevData === 0 ? 100 : Math.round(((value - prevData) / prevData) * 100);
        }
        if (typeof value === "number" && !Number.isInteger(value)) {
          value = Math.round((value + Number.EPSILON) * 100) / 100;
        }
        acc[row.name.replaceAll(".", " ")] = insight !== null ? { value, insight } : value;
        return acc;
      }, {});
    });
  }, [response, lastYearResponse]);

  const removeULB = (id) => {
    setValue({ ...value, filters: { ...value?.filters, tenantId: [...value?.filters?.tenantId].filter((tenant, index) => index !== id) } });
  };

  if (isLoading || isRequestLoading || !tableColumns || !tableData) {
    return <Loader />;
  }

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      {value?.filters?.tenantId.length > 0 && (
        <div className="tag-container">
          <span style={{ marginTop: "20px" }}>{t("DSS_FILTERS_APPLIED")}: </span>
          {value?.filters?.tenantId?.map((filter, id) => (
            <RemoveableTag key={id} text={t(filter)} onClick={() => removeULB(id)} />
          ))}
        </div>
      )}
      <Table
        className="customTable"
        t={t}
        disableSort={false}
        autoSort={true}
        initSortId="S N "
        onSearch={onSearch}
        data={tableData}
        totalRecords={tableData?.length}
        columns={tableColumns}
        getCellProps={(cellInfo) => {
          return {
            style: {},
          };
        }}
      />
    </div>
  );
};

export default CustomTable;
