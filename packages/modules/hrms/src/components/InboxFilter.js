import React, { useEffect, useState } from "react";
import { ActionBar, CloseSvg, RadioButtons, Dropdown } from "@egovernments/digit-ui-react-components";
import { ApplyFilterBar } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const Filter = ({ searchParams, onFilterChange, onSearch, removeParam, ...props }) => {
  // const tenantId = );
  const { t } = useTranslation();
  const tenantIds = Digit.SessionStorage.get("HRMS_TENANTS");

  const [tenantId, settenantId] = useState(() => {
    console.log(searchParams?.tenantId != undefined ? { code: searchParams?.tenantId } : { code: Digit.ULBService.getCurrentTenantId() })
    return tenantIds.filter(ele=> ele.code == (searchParams?.tenantId != undefined ? { code: searchParams?.tenantId } : { code: Digit.ULBService.getCurrentTenantId() })?.code)[0]
  });
  const [departments, setDepartments] = useState(() => {
    return { departments: null };
  });

  const [roles, setRoles] = useState(() => {
    return { roles: null };
  });
  const [isActive, setIsactive] = useState(() => {
    return { isActive: true }
  })

  const { isLoading: hookLoading, isError, error, data, ...rest } = Digit.Hooks.hrms.useHrmsMDMS(
    tenantId ? tenantId.code : searchParams?.tenantId
  );

  useEffect(() => {
    if (tenantId.code) {
      onFilterChange({ tenantId: tenantId.code })
    }
  }, [tenantId]);

  useEffect(() => {
    if (departments) {
      onFilterChange({ designations: departments.code })
    }
  }, [departments])

  useEffect(() => {
    if (roles) {
      onFilterChange({ roles: roles.code })
    }
  }, [roles])

  useEffect(() => {
    if (isActive) {
      onFilterChange({ isActive: isActive.code })
    }

  }, [isActive])
  const clearAll = () => {
    console.log(tenantId)
    onFilterChange({ delete: Object.keys(searchParams) });
    settenantId(tenantIds.filter((ele=>ele.code==Digit.ULBService.getCurrentTenantId()))[0]);
    setDepartments(null);
    setRoles(null);
    props?.onClose?.();
  };
  return (
    <React.Fragment>
      <div className="filter">
        <div className="filter-card">
          <div className="heading">
            <div className="filter-label">{t("ES_COMMON_FILTER_BY")}:</div>
            <div className="clearAll" onClick={clearAll}>
              {t("ES_COMMON_CLEAR_ALL")}
            </div>
            {props.type === "desktop" && (
              <span className="clear-search" onClick={clearAll}>
                {t("ES_COMMON_CLEAR_ALL")}
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
              <RadioButtons
                onSelect={setIsactive}
                selected={isActive}
                selectedOption={isActive}
                optionsKey="name"
                options={[
                  { code: true, name: t("HR_ACTIVATE_EMPLOYEE_LABEL") },
                  { code: false, name: t("HR_DEACTIVATE_EMPLOYEE_LABEL") },
                ]}
              />
              <div></div>
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
