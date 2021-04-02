import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, Loader } from "@egovernments/digit-ui-react-components";
import PTLink from "./inbox/PTLink";
import ApplicationTable from "./inbox/ApplicationTable";
import Filter from "./inbox/Filter";
import SearchApplication from "./inbox/search";

const DesktopInbox = ({ tableConfig, ...props }) => {
  const { data } = props;
  const { t } = useTranslation();

  const columns = React.useMemo(() => tableConfig.inboxColumns(props) || [], []);

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
