import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@egovernments/digit-ui-react-components";

import DesktopInbox from "../../components/DesktopInbox";
import MobileInbox from "../../components/MobileInbox";

const Inbox = ({ parentRoute }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  console.log("current TenantId in ", tenantId);
  const userInfo = Digit.UserService.getUser();
  const userRoles = userInfo.info.roles;

  const { t } = useTranslation();
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortParams, setSortParams] = useState({ key: "createdTime", sortOrder: "DESC" });
  const [searchParams, setSearchParams] = useState({
    applicationStatus: [],
    locality: [],
    uuid: { code: "ASSIGNED_TO_ME", name: t("ES_INBOX_ASSIGNED_TO_ME") },
  });

  let isMobile = window.Digit.Utils.browser.isMobile();
  let paginationParms = isMobile
    ? { limit: 100, offset: 0, sortBy: sortParams?.key, sortOrder: sortParams.sortOrder }
    : { limit: pageSize, offset: pageOffset, sortBy: sortParams?.key, sortOrder: sortParams.sortOrder };
  const { data: applications, isLoading, isIdle, refetch, revalidate } = Digit.Hooks.fsm.useInbox(tenantId, {
    ...searchParams,
    ...paginationParms,
  });
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
    console.log(args);
    if (args.length === 0) return;
    const [sortBy] = args;
    setSortParams({ key: sortBy.id, sortOrder: sortBy.desc ? "DESC" : "ASC" });
  }, []);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const onSearch = (params = {}) => {
    console.log("----", { ...searchParams, ...params });
    setSearchParams({ ...searchParams, ...params });
  };

  const removeParam = (params = {}) => {
    const _search = { ...searchParams };
    Object.keys(params).forEach((key) => delete _search[key]);
    setSearchParams(_search);
  };

  useEffect(() => {
    console.log("=========>>>>>>", sortParams);
  }, [sortParams]);

  const getSearchFields = (userRoles) => {
    if (userRoles.find((role) => role.code === "FSM_EMP_FSTPO")) {
      return [
        {
          label: t("ES_FSTP_OPERATOR_VEHICLE_NO"),
          name: "vehicleNo",
        },
        {
          label: t("ES_FSTP_DSO_NAME"),
          name: "name",
        },
      ];
    } else {
      return [
        {
          label: t("ES_SEARCH_APPLICATION_APPLICATION_NO"),
          name: "applicationNos",
        },
        {
          label: t("ES_SEARCH_APPLICATION_MOBILE_NO"),
          name: "mobileNumber",
        },
      ];
    }
  };

  if (applications?.length !== null) {
    if (isMobile) {
      return (
        <MobileInbox
          data={applications}
          isLoading={isLoading || isIdle}
          searchFields={getSearchFields(userRoles)}
          onFilterChange={handleFilterChange}
          onSearch={onSearch}
          onSort={handleSort}
          searchParams={searchParams}
          sortParams={sortParams}
          removeParam={removeParam}
          linkPrefix={"/digit-ui/employee/fsm/application-details/"}
        />
      );
    } else {
      return (
        <div>
          <Header>{t("ES_COMMON_INBOX")}</Header>
          <DesktopInbox
            data={applications}
            isLoading={isLoading || isIdle}
            onFilterChange={handleFilterChange}
            searchFields={getSearchFields(userRoles)}
            onSearch={onSearch}
            onSort={handleSort}
            onNextPage={fetchNextPage}
            onPrevPage={fetchPrevPage}
            currentPage={Math.floor(pageOffset / pageSize)}
            pageSizeLimit={pageSize}
            disableSort={false}
            onPageSizeChange={handlePageSizeChange}
            parentRoute={parentRoute}
            searchParams={searchParams}
          />
        </div>
      );
    }
  }
};

export default Inbox;
