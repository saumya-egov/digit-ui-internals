import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { Header } from "@egovernments/digit-ui-react-components";

import DesktopInbox from "../../components/DesktopInbox";
import MobileInbox from "../../components/MobileInbox";

const Inbox = ({ parentRoute, isSearch = false, isInbox = false }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const userInfo = Digit.UserService.getUser();
  const userRoles = userInfo.info.roles;

  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [shouldSearch, setShouldSearch] = useState(false);
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortParams, setSortParams] = useState([{ id: "createdTime", desc: false }]);
  const [searchParams, setSearchParams] = useState(() => {
    return isInbox
      ? {
          applicationStatus: [],
          locality: [],
          uuid: { code: "ASSIGNED_TO_ALL", name: t("ES_INBOX_ASSIGNED_TO_ALL") },
        }
      : {};
  });

  let isMobile = window.Digit.Utils.browser.isMobile();
  let paginationParms = isMobile
    ? { limit: 100, offset: 0, sortBy: sortParams?.[0]?.id, sortOrder: sortParams?.[0]?.desc ? "DESC" : "ASC" }
    : { limit: pageSize, offset: pageOffset, sortBy: sortParams?.[0]?.id, sortOrder: sortParams?.[0]?.desc ? "DESC" : "ASC" };

  // const { data: applications, isLoading, isIdle, refetch, revalidate } = Digit.Hooks.fsm.useInbox(
  //   tenantId,
  //   {
  //     ...searchParams,
  //     ...paginationParms,
  //     fromDate: searchParams?.fromDate ? new Date(searchParams?.fromDate).getTime() : undefined,
  //     toDate: searchParams?.toDate ? new Date(searchParams?.toDate).getTime() : undefined,
  //   },
  //   null,
  //   {
  //     enabled: isInbox,
  //   }
  // );
  const applications = [
    {
      applicationNo: "PB-PT-2021-03-24-015015",
      propertyId: "AM2345DE",
      owner: "Sankar",
      applicationType: "New Property",
      status: "Pending DV",
      sla: 12,
      locality: "Ajit Nagar",
      propertyStatus: "New Property",
      taxDue: "Pending DV",
      action: "Collect Tax",
    },
  ];
  const isLoading = false;
  const isIdle = false;

  // const {
  //   isLoading: isSearchLoading,
  //   isIdle: isSearchIdle,
  //   isError: isSearchError,
  //   data: { data, totalCount } = {},
  //   error,
  // } = Digit.Hooks.fsm.useSearchAll(
  //   tenantId,
  //   {
  //     limit: pageSize,
  //     offset: pageOffset,
  //     ...searchParams,
  //     fromDate: searchParams?.fromDate ? new Date(searchParams?.fromDate).getTime() : undefined,
  //     toDate: searchParams?.toDate ? new Date(searchParams?.toDate).getTime() : undefined,
  //   },
  //   null,
  //   { enabled: shouldSearch && isSearch }
  // );
  const data = [
    {
      applicationNo: "PB-PT-2021-03-24-015015",
      propertyId: "AM2345DE",
      owner: "Sankar",
      applicationType: "New Property",
      status: "Pending DV",
      sla: 12,
      locality: "Ajit Nagar",
      propertyStatus: "New Property",
      taxDue: "Pending DV",
      action: "Collect Tax",
    },
  ];
  const isSearchLoading = false;
  const totalCount = 1;

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
    let _new = { ...searchParams };
    if (keys_to_delete) keys_to_delete.forEach((key) => delete _new[key]);
    setSearchParams({ ..._new, ...filterParam });
  };

  const handleSort = useCallback((args) => {
    if (args.length === 0) return;
    setSortParams(args);
    // const [sortBy] = args;
    // setSortParams({ key: sortBy.id, sortOrder: sortBy.desc ? "DESC" : "ASC" });
  }, []);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const onSearch = (params = {}) => {
    if (isSearch) {
      if (Object.keys(params).length === 0) {
        setShouldSearch(false);
        queryClient.resetQueries("FSM_CITIZEN_SEARCH");
      } else {
        setShouldSearch(true);
      }
      setSearchParams({ ...params });
    } else {
      setSearchParams(({ applicationStatus, locality, uuid }) => ({ applicationStatus, locality, uuid, ...params }));
    }
  };

  const removeParam = (params = {}) => {
    const _search = { ...searchParams };
    Object.keys(params).forEach((key) => delete _search[key]);
    setSearchParams(_search);
  };

  const getSearchFields = (userRoles) => {
    if (isSearch) {
      return [
        {
          label: t("ES_INBOX_UNIQUE_PROPERTY_ID"),
          name: "applicationNos",
        },
        {
          label: t("ES_SEARCH_EXISTING_PROPERTY_ID"),
          name: "mobileNumber",
          maxlength: 10,
          pattern: "[6-9][0-9]{9}",
          title: t("ES_SEARCH_APPLICATION_MOBILE_INVALID"),
        },
        {
          label: t("ES_SEARCH_APPLICATION_MOBILE_NO"),
          name: "mobileNumber",
          maxlength: 10,
        },
      ];
    }
    return [
      {
        label: t("ES_SEARCH_APPLICATION_APPLICATION_NO"),
        name: "applicationNos",
      },
      {
        label: t("ES_INBOX_UNIQUE_PROPERTY_ID"),
        name: "propertyId",
      },
      {
        label: t("ES_SEARCH_APPLICATION_MOBILE_NO"),
        name: "mobileNumber",
        maxlength: 10,
      },
    ];
  };

  if (applications?.length !== null) {
    if (isMobile) {
      return (
        <MobileInbox
          data={isInbox ? applications : data}
          isLoading={isInbox ? isLoading || isIdle : isSearchLoading}
          isSearch={isSearch}
          searchFields={getSearchFields(userRoles)}
          onFilterChange={handleFilterChange}
          onSearch={onSearch}
          onSort={handleSort}
          parentRoute={parentRoute}
          searchParams={searchParams}
          sortParams={sortParams}
          removeParam={removeParam}
          linkPrefix={`${parentRoute}/application-details/`}
        />
      );
    } else {
      return (
        <div>
          {!isSearch && <Header>{t("ES_COMMON_INBOX")}</Header>}
          <DesktopInbox
            data={isInbox ? applications : data}
            isLoading={isInbox ? isLoading || isIdle : isSearchLoading}
            isSearch={isSearch}
            shouldSearch={shouldSearch}
            onFilterChange={handleFilterChange}
            searchFields={getSearchFields(userRoles)}
            onSearch={onSearch}
            onSort={handleSort}
            onNextPage={fetchNextPage}
            onPrevPage={fetchPrevPage}
            currentPage={Math.floor(pageOffset / pageSize)}
            pageSizeLimit={pageSize}
            disableSort={false}
            searchParams={searchParams}
            onPageSizeChange={handlePageSizeChange}
            parentRoute={parentRoute}
            searchParams={searchParams}
            sortParams={sortParams}
            totalRecords={isInbox ? Number(applications?.[0]?.totalCount) : totalCount}
          />
        </div>
      );
    }
  }
};

export default Inbox;
