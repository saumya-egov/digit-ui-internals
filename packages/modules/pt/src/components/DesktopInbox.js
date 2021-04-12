import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, Loader } from "@egovernments/digit-ui-react-components";
import PTLink from "./inbox/PTLink";
import ApplicationTable from "./inbox/ApplicationTable";
import Filter from "./inbox/Filter";
import SearchApplication from "./inbox/search";

const DesktopInbox = (props) => {
  const { t } = useTranslation();
  const GetCell = (value) => <span className="cell-text">{value}</span>;

  const GetSlaCell = (value) => {
    if (isNaN(value)) return <span className="sla-cell-success">0</span>;
    return value < 0 ? <span className="sla-cell-error">{value}</span> : <span className="sla-cell-success">{value}</span>;
  };

  const columns = React.useMemo(() => {
    if (props.isSearch) {
      return [
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
      ];
    }
    switch (props.userRole) {
      default:
        return [
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
        ];
    }
  }, []);

  let result;
  if (props.isLoading) {
    result = <Loader />;
  } else if ((props.isSearch && !props.shouldSearch) || props?.data?.length === 0) {
    result = (
      <Card style={{ marginTop: 20 }}>
        {/* TODO Change localization key */}
        {t("CS_MYAPPLICATIONS_NO_APPLICATION")
          .split("\\n")
          .map((text, index) => (
            <p key={index} style={{ textAlign: "center" }}>
              {text}
            </p>
          ))}
      </Card>
    );
  } else if (props?.data?.length > 0) {
    result = (
      <ApplicationTable
        t={t}
        data={props.data}
        columns={columns}
        getCellProps={(cellInfo) => {
          return {
            style: {
              minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
              padding: "20px 18px",
              fontSize: "16px",
            },
          };
        }}
        onPageSizeChange={props.onPageSizeChange}
        currentPage={props.currentPage}
        onNextPage={props.onNextPage}
        onPrevPage={props.onPrevPage}
        pageSizeLimit={props.pageSizeLimit}
        onSort={props.onSort}
        disableSort={props.disableSort}
        onPageSizeChange={props.onPageSizeChange}
        sortParams={props.sortParams}
        totalRecords={props.totalRecords}
      />
    );
  }

  return (
    <div className="inbox-container">
      {!props.isSearch && (
        <div className="filters-container">
          <PTLink parentRoute={props.parentRoute} />
          <div>
            <Filter searchParams={props.searchParams} applications={props.data} onFilterChange={props.onFilterChange} type="desktop" />
          </div>
        </div>
      )}
      <div style={{ flex: 1 }}>
        <SearchApplication onSearch={props.onSearch} type="desktop" searchFields={props.searchFields} isInboxPage={!props?.isSearch} />
        <div className="result" style={{ marginLeft: !props?.isSearch ? "24px" : "", flex: 1 }}>
          {result}
        </div>
      </div>
    </div>
  );
};

export default DesktopInbox;
