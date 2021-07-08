import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@egovernments/digit-ui-react-components";

import DesktopInbox from "../../pageComponents/inbox/DesktopInbox";
// import MobileInbox from "../../components/MobileInbox";

const Inbox = ({
  parentRoute,
  businessService = "TL"
}) => {

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();

  const isMobile = window.Digit.Utils.browser.isMobile();

  // let paginationParams = isMobile
  //   ? { limit: 100, offset: 0, sortOrder: sortParams?.[0]?.desc ? "DESC" : "ASC" }
  //   : { limit: pageSize, offset: pageOffset, sortOrder: sortParams?.[0]?.desc ? "DESC" : "ASC" };

  const [ filters, setFilters, clearFilter ] = Digit.Hooks.useSessionStorage(`${businessService}.${tenantId}`, {
    offset: 0,
    limit: 10,
    applicationType: "NEW"
  })

  const { inbox: inboxData, wf: wfData, isLoading: dataLoading } = Digit.Hooks.tl.useInbox({
    tenantId,
    filters,
    config:{}
  })

    if (isMobile) {
      return (
    <h5>Open In Desktop</h5>)
    } else {
      return <h1>INBOX</h1>
      // <DesktopInbox
      //           businessService={businessService}
      //           data={inboxData}
      //           tableConfig={rest?.tableConfig}
      //           isLoading={hookLoading}
      //           defaultSearchParams={initialStates.searchParams}
      //           isSearch={!isInbox}
      //           onFilterChange={handleFilterChange}
      //           searchFields={getSearchFields()}
      //           onSearch={handleFilterChange}
      //           onSort={handleSort}
      //           onNextPage={fetchNextPage}
      //           onPrevPage={fetchPrevPage}
      //           currentPage={Math.floor(pageOffset / pageSize)}
      //           pageSizeLimit={pageSize}
      //           disableSort={false}
      //           onPageSizeChange={handlePageSizeChange}
      //           parentRoute={parentRoute}
      //           searchParams={searchParams}
      //           sortParams={sortParams}
      //           totalRecords={Number(data?.[0]?.totalCount)}
      //           filterComponent={filterComponent}
      //         />
    }
};

export default Inbox;
