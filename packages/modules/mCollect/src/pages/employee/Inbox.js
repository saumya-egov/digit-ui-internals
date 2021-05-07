import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@egovernments/digit-ui-react-components";

import DesktopInbox from "../../components/DesktopInbox";
import MobileInbox from "../../components/MobileInbox";

const Inbox = ({
  parentRoute,
  businessService = "PT",
  initialStates = {},
  filterComponent,
  isInbox,
  rawWfHandler,
  rawSearchHandler,
  combineResponse,
  wfConfig,
  searchConfig,
  middlewaresWf,
  middlewareSearch,
}) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const { t } = useTranslation();
  const [pageOffset, setPageOffset] = useState(initialStates.pageOffset || 0);
  const [pageSize, setPageSize] = useState(initialStates.pageSize || 10);
  const [sortParams, setSortParams] = useState(initialStates.sortParams || [{ id: "createdTime", desc: false }]);

  const [searchParams, setSearchParams] = useState(() => {
    return initialStates.searchParams || {};
  });

  let isMobile = window.Digit.Utils.browser.isMobile();
  let paginationParams = isMobile
    ? { limit: 100, offset: 0, sortOrder: sortParams?.[0]?.desc ? "DESC" : "ASC" }
    : { limit: pageSize, offset: pageOffset, sortOrder: sortParams?.[0]?.desc ? "DESC" : "ASC" };
  // const { isLoading: hookLoading, searchResponseKey, data, ...rest } = Digit.Hooks.useInboxGeneral({
  //   tenantId,
  //   businessService,
  //   isInbox,
  //   filters: { ...searchParams, ...paginationParams, sortParams },
  //   rawWfHandler,
  //   rawSearchHandler,
  //   combineResponse,
  //   wfConfig,
  //   searchConfig,
  //   middlewaresWf,
  //   middlewareSearch,
  // });
  const { isLoading: hookLoading, isError, error, data, ...rest } = Digit.Hooks.mcollect.useMCollectSearch({tenantId, filters: { ...searchParams, ...paginationParams } });

  console.log(data, "qlwhoiwqheoihwqiehwqoiheoihwqeoi");

  let formedData = [];
  data?.challans?.map(data => {
    formedData.push({
      challanNo: data.challanNo,
      name: data.citizen.name,
      applicationStatus: data.applicationStatus,
      businessService: data.businessService
    })
  })

  useEffect(() => {
    console.log("data from the hook", hookLoading, rest, data);
  }, [hookLoading, rest]);

  useEffect(() => {
    setPageOffset(0);
  }, [searchParams]);

  const fetchNextPage = () => {
    setPageOffset((prevState) => prevState + pageSize);
  };

  const fetchPrevPage = () => {
    setPageOffset((prevState) => prevState - pageSize);
  };

  const handleFilterChange = (filterParam) => {
    let keys_to_delete = filterParam.delete;
    console.log(keys_to_delete);
    let _new = { ...searchParams, ...filterParam };
    // if (keys_to_delete) keys_to_delete.forEach((key) => delete _new[key]);
    // delete filterParam.delete;
    if (keys_to_delete) keys_to_delete.forEach((key) => delete _new[key]);
    delete _new.delete;
    delete filterParam.delete;
    setSearchParams({ ..._new });
  };

  const handleSort = useCallback((args) => {
    if (args.length === 0) return;
    setSortParams(args);
  }, []);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const getSearchFields = () => {
      return [
        {
          label: t("UC_CHALLAN_NO_LABEL"),
          name: "challanNo",
        },
        {
          label: t("ES_SEARCH_APPLICATION_MOBILE_NO"),
          name: "mobileNumber",
          maxlength: 10,
          pattern: "[6-9][0-9]{9}",
          title: t("ES_SEARCH_APPLICATION_MOBILE_INVALID"),
        }
      ];
  };

  if (rest?.data?.length !== null) {
    if (isMobile) {
      return (
        <MobileInbox
          data={data}
          isLoading={hookLoading}
          isSearch={!isInbox}
          searchFields={getSearchFields()}
          onFilterChange={handleFilterChange}
          onSearch={handleFilterChange}
          onSort={handleSort}
          parentRoute={parentRoute}
          searchParams={searchParams}
          sortParams={sortParams}
          linkPrefix={`${parentRoute}/application-details/`}
          tableConfig={rest?.tableConfig}
          filterComponent={filterComponent}
        />
        // <div></div>
      );
    } else {
      return (
        <div>
          {isInbox && <Header>{t("ES_COMMON_INBOX")}</Header>}
          <DesktopInbox
            businessService={businessService}
            data={formedData}
            tableConfig={rest?.tableConfig}
            isLoading={hookLoading}
            defaultSearchParams={initialStates.searchParams}
            isSearch={!isInbox}
            onFilterChange={handleFilterChange}
            searchFields={getSearchFields()}
            onSearch={handleFilterChange}
            onSort={handleSort}
            onNextPage={fetchNextPage}
            onPrevPage={fetchPrevPage}
            currentPage={Math.floor(pageOffset / pageSize)}
            pageSizeLimit={pageSize}
            disableSort={false}
            onPageSizeChange={handlePageSizeChange}
            parentRoute={parentRoute}
            searchParams={searchParams}
            sortParams={sortParams}
            totalRecords={Number(data?.[0]?.totalCount)}
            filterComponent={filterComponent}
          />
        </div>
      );
    }
  }
};

export default Inbox;
