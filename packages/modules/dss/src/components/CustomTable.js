import React, { Fragment, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { startOfMonth, endOfMonth, getTime } from "date-fns";
import { UpwardArrow, TextInput, Loader, Table } from "@egovernments/digit-ui-react-components";
import FilterContext from "./FilterContext";

const CustomTable = ({ data }) => {
  const { id } = data;
  const { t } = useTranslation();
  const { value } = useContext(FilterContext);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const requestDate = {
    startDate: value?.range?.startDate,
    endDate: value?.range?.endDate,
    interval: "month",
    title: "",
  };
  const { isLoading, data: response } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: "metric",
    tenantId,
    requestDate,
  });

  const tableColumns = useMemo(
    () =>
      response?.responseData?.data?.[0]?.plots?.map((plot) => ({
        Header: plot?.name,
        accessor: plot?.name,
        symbol: plot?.symbol,
        // Cell: (row) => row.original[plot?.name]
      })),
    [response]
  );

  const tableData = useMemo(
    () =>
      response?.responseData?.data?.map((rows) =>
        rows.plots.reduce((acc, row) => {
          acc[row?.name] = row?.value !== null ? row?.value : row?.label || "";
          return acc;
        }, {})
      ),
    [response]
  );

  if (isLoading || !tableColumns || !tableData) {
    return <Loader />;
  }

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <Table
        className="customTable"
        t={t}
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
