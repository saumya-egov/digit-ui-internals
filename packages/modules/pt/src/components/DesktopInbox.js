import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Card, Loader } from "@egovernments/digit-ui-react-components";
import InboxLinks from "./inbox/InboxLink";
import ApplicationTable from "./inbox/ApplicationTable";
import SearchApplication from "./inbox/search";

const DesktopInbox = ({ tableConfig, filterComponent, ...props }) => {
  const { data } = props;
  const { t } = useTranslation();
  const [FilterComponent, setComp] = useState(() => Digit.ComponentRegistryService?.getComponent(filterComponent));
  const [EmptyInboxComp, setEmptyInboxComp] = useState(() => {
    const com = Digit.ComponentRegistryService?.getComponent(props.EmptyResultInboxComp);
    // console.log("here is the empty component", com, props.EmptyResultInboxComp);
    return com;
  });

  // searchData, workFlowData

  const columns = React.useMemo(() => (props.isSearch ? tableConfig.searchColumns(props) : tableConfig.inboxColumns(props) || []), []);

  useEffect(() => {
    console.log(data, columns, "inside inbox....");
  }, [data, columns]);

  let result;
  if (props.isLoading) {
    result = <Loader />;
  } else if (!data || data?.length === 0) {
    result = (EmptyInboxComp && <EmptyInboxComp data={data} />) || (
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
