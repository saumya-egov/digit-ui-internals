import React from "react";
import { Link } from "react-router-dom";

const GetCell = (value) => <span className="cell-text">{value}</span>;

const GetSlaCell = (value) => {
  if (isNaN(value)) return <span className="sla-cell-success">0</span>;
  return value < 0 ? <span className="sla-cell-error">{value}</span> : <span className="sla-cell-success">{value}</span>;
};

export const TableConfig = (t) => ({
  FSM: {
    searchColumns: [{}],
    inboxColumns: (props) => [
      {
        Header: t("ES_INBOX_APPLICATION_NO"),
        accessor: "searchData.applicationNo",
        disableSortBy: true,
        Cell: ({ row, value }) => {
          console.log(row.original, "row data here");
          return (
            <div>
              <span className="link">
                <Link to={`${props.parentRoute}/${"application-details"}/`}>{value}</Link>
              </span>
            </div>
          );
        },
      },
      {
        Header: t("ES_INBOX_SLA_DAYS_REMAINING"),
        accessor: "workflowData.businesssServiceSla",
        disableSortBy: true,
        Cell: ({ row, value }) => {
          console.log(row.original, "row data here");
          return GetSlaCell(value);
        },
      },
    ],
  },
  PT: {
    searchColumns: [
      {
        Header: t("ES_INBOX_UNIQUE_PROPERTY_ID"),
        accessor: "propertyId",
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link">
                <Link to={`${props.parentRoute}/application-details/` + row.original["propertyId"]}>{row.original["propertyId"]}</Link>
              </span>
            </div>
          );
        },
      },
      {
        Header: t("ES_INBOX_OWNER_NAME"),
        disableSortBy: true,
        // accessor: (row) => GetCell(row.citizen?.name || ""),
        accessor: (row) => GetCell(row["owner"]),
      },
      {
        Header: t("ES_INBOX_LOCALITY"),
        // accessor: (row) => GetCell(t(Digit.Utils.locale.getRevenueLocalityCode(row.address.locality.code, row.tenantId))),
        accessor: (row) => GetCell(row["locality"]),
        disableSortBy: true,
      },
      {
        Header: t("ES_SEARCH_PROPERTY_STATUS"),
        // accessor: (row) => {
        //   return GetCell(t(`CS_COMMON_FSM_${row.applicationStatus}`));
        // },
        accessor: (row) => {
          return GetCell(row["propertyStatus"]);
        },
        disableSortBy: true,
      },
      {
        Header: t("ES_SEARCH_TAX_DUE"),
        // accessor: (row) => {
        //   return GetCell(t(`CS_COMMON_FSM_${row.applicationStatus}`));
        // },
        accessor: (row) => {
          return GetCell(row["taxDue"]);
        },
        disableSortBy: true,
      },
      {
        Header: t("ES_SEARCH_ACTION"),
        // accessor: (row) => {
        //   return GetCell(t(`CS_COMMON_FSM_${row.applicationStatus}`));
        // },
        accessor: (row) => {
          return GetCell(row["action"]);
        },
        disableSortBy: true,
      },
    ],
    inboxColumns: [
      {
        Header: t("CS_FILE_DESLUDGING_APPLICATION_NO"),
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link">
                <Link to={`${props.parentRoute}/application-details/` + row.original["applicationNo"]}>{row.original["applicationNo"]}</Link>
              </span>
            </div>
          );
        },
      },
      {
        Header: t("ES_INBOX_UNIQUE_PROPERTY_ID"),
        accessor: "propertyId",
        Cell: ({ row }) => {
          return GetCell(`${row.original["propertyId"]}`);
        },
      },
      {
        Header: t("ES_INBOX_OWNER"),
        Cell: ({ row }) => {
          return GetCell(`${row.original["owner"]}`);
        },
      },
      {
        Header: t("ES_INBOX_APPLICATION_TYPE"),
        Cell: ({ row }) => GetCell(`${row.original["applicationType"]}`),
      },
      {
        Header: t("ES_INBOX_STATUS"),
        Cell: ({ row }) => {
          return GetCell(`${row.original["status"]}`);
        },
      },
      {
        Header: t("ES_INBOX_SLA_DAYS_REMAINING"),
        Cell: ({ row }) => {
          return GetSlaCell(row.original["sla"]);
        },
      },
    ],
  },
});
