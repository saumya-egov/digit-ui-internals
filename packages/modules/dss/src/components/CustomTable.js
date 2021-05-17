import React, { Fragment, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { startOfMonth, endOfMonth, getTime, subYears } from "date-fns";
import { UpwardArrow, TextInput, Loader, Table } from "@egovernments/digit-ui-react-components";
import FilterContext from "./FilterContext";

const CustomTable = ({ data, onSearch }) => {
  const { id } = data;
  const { t } = useTranslation();
  const { value } = useContext(FilterContext);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const requestDate = {
    startDate: value?.range?.startDate.getTime(),
    endDate: value?.range?.endDate.getTime(),
    interval: "month",
    title: "",
  };
  const lastYearDate = {
    startDate: subYears(value?.range?.startDate, 1).getTime(),
    endDate: subYears(value?.range?.endDate, 1).getTime(),
    interval: "month",
    title: "",
  }
  const { isLoading: isRequestLoading, data: lastYearResponse } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: "metric",
    tenantId,
    requestDate: lastYearDate,
  })
  const { isLoading, data: response } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: "metric",
    tenantId,
    requestDate: value?.requestDate,
    filters: value?.filters,
  });

  const tableColumns = useMemo(
    () =>
      response?.responseData?.data?.[0]?.plots?.map((plot) => ({
        Header: plot?.name,
        accessor: plot?.name.replaceAll(".", " "),
        symbol: plot?.symbol,
        Cell: ({ value }) => {
          if (typeof value === 'object') {
            const { insight, value: rowValue } = value;
            return (
              <span>
                {rowValue}
                {` `}
                <UpwardArrow />
                {` `}
                {`${insight}%`}
              </span>
            )
          }
          return String(value);
        }
      })),
    [response]
  );

  const tableData = useMemo(
    () => {
      if (!response || !lastYearResponse) return;
      return response?.responseData?.data?.map((rows) => {
        const lyData = lastYearResponse?.responseData?.data?.find(lyRow => lyRow.headerName === rows.headerName);
        return rows.plots.reduce((acc, row, currentIndex) => {
          let value = row?.value !== null ? row?.value : row?.label || "";
          let insight = null;
          if (row.symbol === "number" && lyData !== undefined) {
            let prevData = lyData.plots[currentIndex].value;
            if (prevData === value) insight = 0;
            else insight = prevData === 0 ? 100 : Math.round(((value - prevData) / prevData) * 100);
          }
          if (typeof value === "number" && !Number.isInteger(value)) {
            value = Math.round((value + Number.EPSILON) * 100) / 100;
          }
          acc[row.name.replaceAll(".", " ")] = insight !== null ? { value, insight } : value
          return acc;
        }, {})
      })
    },
    [response, lastYearResponse]
  );

  if (isLoading || isRequestLoading || !tableColumns || !tableData) {
    return <Loader />;
  }

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <Table
        className="customTable"
        t={t}
        disableSort={false}
        autoSort={true}
        initSortId="S N "
        onSearch={onSearch}
        data={tableData}
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
