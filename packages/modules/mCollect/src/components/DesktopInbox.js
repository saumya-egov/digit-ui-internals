import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Card, Loader } from "@egovernments/digit-ui-react-components";
import InboxLinks from "./inbox/InboxLink";
import ApplicationTable from "./inbox/ApplicationTable";
import SearchApplication from "./inbox/search";
import { Link } from "react-router-dom";

const DesktopInbox = ({ tableConfig, filterComponent,columns, ...props }) => {
  const { data } = props;
  const { t } = useTranslation();
  const [FilterComponent, setComp] = useState(() => Digit.ComponentRegistryService?.getComponent(filterComponent));

  // challans, workFlowData

  // const columns = React.useMemo(() => (props.isSearch ? tableConfig.searchColumns(props) : tableConfig.inboxColumns(props) || []), []);
  const GetCell = (value) => <span className="cell-text">{value}</span>;

  const GetSlaCell = (value) => {
    if (isNaN(value)) return <span className="sla-cell-success">0</span>;
    return value < 0 ? <span className="sla-cell-error">{value}</span> : <span className="sla-cell-success">{value}</span>;
  };
  
  const GetMobCell = (value) => <span className="sla-cell">{value}</span>;
  const inboxColumns = (props) => [
    {
      Header: t("ES_INBOX_UNIQUE_PROPERTY_ID"),
      Cell: ({ row }) => {
        return (
          <div>
            <span className="link">
              <Link to={`${props.parentRoute}/application-details/` + row.original?.["challanNo"]}>
                {row.original?.["challanNo"]}
              </Link>
            </span>
          </div>
        );
      },
      mobileCell: (original) => GetMobCell(original?.["challanNo"]),
    },
    {
      Header: t("ES_INBOX_OWNER"),
      Cell: ({ row }) => {
        return GetCell(`${row.original?.["name"]}`);
      },
      mobileCell: (original) => GetMobCell(original?.["name"]),
    },
    {
      Header: t("ES_INBOX_APPLICATION_TYPE"),
      Cell: ({ row }) => GetCell(`${row.original?.["businessService"]}`),
      mobileCell: (original) => GetMobCell(original?.["businessService"]),
    },
    {
      Header: t("ES_INBOX_STATUS"),
      Cell: ({ row }) => {
        const wf = row.original?.applicationStatus;
        return GetCell(t(`PT_INBOX_STATUS_${row.original?.applicationStatus}`));
      },
      mobileCell: (original) => GetMobCell(original?.workflowData?.state?.["state"]),
    }
  ];


  useEffect(() => {
    console.log(data, columns, "inside desktop inbox....");
  }, [data, columns]);

  let result;
  if (props.isLoading) {
    result = <Loader />;
  } else if (data?.length === 0) {
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
  } else if (data?.length > 0) {
    result = (
      <ApplicationTable
        t={t}
        data={data}
        columns={inboxColumns(data)}
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
          <InboxLinks parentRoute={props.parentRoute} businessService={props.businessService} />
          <div>
            {
              <FilterComponent
                defaultSearchParams={props.defaultSearchParams}
                onFilterChange={props.onFilterChange}
                searchParams={props.searchParams}
                type="desktop"
              />
            }
            {/* <Filter
              businessService={props.businessService}
              searchParams={props.searchParams}
              applications={props.data}
              onFilterChange={props.onFilterChange}
              translatePrefix={props.translatePrefix}
              type="desktop"
            /> */}
          </div>
        </div>
      )}
      <div style={{ flex: 1 }}>
        <SearchApplication
          defaultSearchParams={props.defaultSearchParams}
          onSearch={props.onSearch}
          type="desktop"
          searchFields={props.searchFields}
          isInboxPage={!props?.isSearch}
          searchParams={props.searchParams}
        />
        <div className="result" style={{ marginLeft: !props?.isSearch ? "24px" : "", flex: 1 }}>
          {result}
        </div>
      </div>
    </div>
  );
};

export default DesktopInbox;
