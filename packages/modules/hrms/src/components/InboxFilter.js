import React, { useEffect, useState } from "react";
import { ActionBar, CloseSvg, RadioButtons, Dropdown, SubmitBar } from "@egovernments/digit-ui-react-components";
import { ApplyFilterBar } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const Filter = ({ searchParams, onFilterChange, onSearch, removeParam, ...props }) => {
  // const tenantId = );

  const [_searchParams, setSearchParams] = useState(() => searchParams);
  const { t } = useTranslation();
  const tenantIds = Digit.SessionStorage.get("HRMS_TENANTS");

  const [tenantId, settenantId] = useState(() => {
    return tenantIds.filter(
      (ele) =>
        ele.code == (searchParams?.tenantId != undefined ? { code: searchParams?.tenantId } : { code: Digit.ULBService.getCurrentTenantId() })?.code
    )[0];
  });
  const { isLoading, isError, errors, data: data, ...rest } = Digit.Hooks.hrms.useHrmsMDMS(
    tenantId ? tenantId.code : searchParams?.tenantId,
    "egov-hrms",
    "HRMSRolesandDesignation"
  );
  const [departments, setDepartments] = useState(() => {
    return { departments: null };
  });

  const [roles, setRoles] = useState(() => {
    return { roles: null };
  });
  const [isActive, setIsactive] = useState(() => {
    return { isActive: true };
  });

  useEffect(() => {
    if (tenantId.code) {
      setSearchParams({ tenantId: tenantId.code });
    }
  }, [tenantId]);

  useEffect(() => {
    if (departments) {
      setSearchParams({ designations: departments.code });
    }
  }, [departments]);

  useEffect(() => {
    if (roles) {
      setSearchParams({ roles: roles.code });
    }
  }, [roles]);

  useEffect(() => {
    if (isActive) {
      setSearchParams({ isActive: isActive.code });
    }
  }, [isActive]);
  const clearAll = () => {
    onFilterChange({ delete: Object.keys(searchParams) });
    settenantId(tenantIds.filter((ele) => ele.code == Digit.ULBService.getCurrentTenantId())[0]);
    setDepartments(null);
    setRoles(null);
    setIsactive(null);
    props?.onClose?.();
  };
  return (
    <React.Fragment>
      <div className="filter">
        <div className="filter-card">
          <div className="heading">
            <div className="filter-label" style={{ display: "flex", alignItems: "center" }}>
              <span>
                <svg width="17" height="17" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.66666 2.48016C3.35999 5.9335 8.33333 12.3335 8.33333 12.3335V20.3335C8.33333 21.0668 8.93333 21.6668 9.66666 21.6668H12.3333C13.0667 21.6668 13.6667 21.0668 13.6667 20.3335V12.3335C13.6667 12.3335 18.6267 5.9335 21.32 2.48016C22 1.60016 21.3733 0.333496 20.2667 0.333496H1.71999C0.613327 0.333496 -0.01334 1.60016 0.66666 2.48016Z"
                    fill="#505A5F"
                  />
                </svg>
              </span>
              <span>{t("HR_COMMON_FILTER")}:</span>{" "}
            </div>
            <div className="clearAll" onClick={clearAll}>
              {t("HR_COMMON_CLEAR_ALL")}
            </div>
            {props.type === "desktop" && (
              <span className="clear-search" onClick={clearAll} style={{ border: "1px solid #e0e0e0", padding: "6px" }}>
                <svg width="17" height="17" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 5V8L12 4L8 0V3C3.58 3 0 6.58 0 11C0 12.57 0.46 14.03 1.24 15.26L2.7 13.8C2.25 12.97 2 12.01 2 11C2 7.69 4.69 5 8 5ZM14.76 6.74L13.3 8.2C13.74 9.04 14 9.99 14 11C14 14.31 11.31 17 8 17V14L4 18L8 22V19C12.42 19 16 15.42 16 11C16 9.43 15.54 7.97 14.76 6.74Z"
                    fill="#505A5F"
                  />
                </svg>
                {/* {t("ES_COMMON_CLEAR_ALL")} */}
              </span>
            )}
            {props.type === "mobile" && (
              <span onClick={props.onClose}>
                <CloseSvg />
              </span>
            )}
          </div>
          <div>
            <div>
              <div className="filter-label">{t("HR_ULB_LABEL")}</div>
              <Dropdown option={tenantIds} selected={tenantId} select={settenantId} optionKey={"name"} />
            </div>
            <div>
              <div className="filter-label">{t("HR_COMMON_TABLE_COL_DEPT")}</div>
              <Dropdown option={data?.MdmsRes["common-masters"]?.Designation} selected={departments} select={setDepartments} optionKey={"name"} />
            </div>
            <div>
              <div className="filter-label">{t("HR_COMMON_TABLE_COL_ROLE")}</div>
              <Dropdown option={data?.MdmsRes["ACCESSCONTROL-ROLES"]?.roles || null} selected={roles} select={setRoles} optionKey={"name"} />
            </div>
            <div>
              <div className="filter-label">{t("HR_EMP_STATUS_LABEL")}</div>
              <RadioButtons
                onSelect={setIsactive}
                selected={isActive}
                selectedOption={isActive}
                optionsKey="name"
                options={[
                  { code: true, name: t("HR_ACTIVATE_EMPLOYEE_HEAD") },
                  { code: false, name: t("HR_DEACTIVATE_EMPLOYEE_HEAD") },
                ]}
              />
              <div>
                <SubmitBar
                  // disabled={_.isEqual(_searchParams, searchParams)}
                  onSubmit={() => onFilterChange(_searchParams)}
                  label={t("HR_COMMON_APPLY")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.type === "mobile" && (
        <ActionBar>
          <ApplyFilterBar
            submit={false}
            labelLink={t("ES_COMMON_CLEAR_ALL")}
            buttonLink={t("ES_COMMON_FILTER")}
            onClear={clearAll}
            onSubmit={() => {
              onSearch();
            }}
            style={{ flex: 1 }}
          />
        </ActionBar>
      )}
    </React.Fragment>
  );
};

export default Filter;
