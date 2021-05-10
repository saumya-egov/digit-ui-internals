import React, { useContext, useState } from "react";
import { CardSectionHeader, Dropdown, SubmitBar, FilterIcon, RefreshIcon } from "@egovernments/digit-ui-react-components";
import Switch from "./Switch";
import DateRange from "./DateRange";
import FilterContext from "./FilterContext";

const Filters = ({ t, ulbTenants }) => {
  const { value, setValue } = useContext(FilterContext);
  const selectULB = (data) => {
    setValue({ ...value, filters: { tenantId: [data.code] } });
  };
  const handleFilterChange = (data) => {
    setValue({ ...value, ...data });
  };
  return (
    <div className="filters-wrapper">
      <div className="filters-input">
        <DateRange onFilterChange={handleFilterChange} values={value?.range} />
      </div>
      <div className="filters-input">
        <div>{t("ES_DSS_DDR")}</div>
        <Dropdown option={ulbTenants} optionKey="ddrKey" select={selectULB} />
      </div>
      <div className="filters-input">
        <div>{t("ES_DSS_ULB")}</div>
        <Dropdown option={ulbTenants} optionKey="ulbKey" select={selectULB} />
      </div>
      <div className="filters-input" style={{ flexBasis: "16%" }}>
        <Switch onSelect={handleFilterChange} />
      </div>
      {/* <SubmitBar label={"Apply"} /> */}
    </div>
  );
};

export default Filters;
