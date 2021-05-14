import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { CardSectionHeader, Dropdown, SubmitBar, FilterIcon, RefreshIcon, CloseSvg, Header } from "@egovernments/digit-ui-react-components";
import Switch from "./Switch";
import DateRange from "./DateRange";
import FilterContext from "./FilterContext";

const ULBS = [
  {
    name: "All",
  },
  {
    name: "ULB A",
  },
  {
    name: "ULB B",
  },
  {
    name: "ULB C",
  },
];

const Filters = ({ isOpen, closeFilters }) => {
  const { value, setValue } = useContext(FilterContext);
  const { t } = useTranslation();
  const selectULB = () => {};
  const handleFilterChange = (data) => {
    setValue({ ...value, ...data });
  };
  const handleClear = () => {
    setValue({
      denomination: "Unit",
      range: Digit.Utils.dss.getInitialRange()
    })
  }
  return (
    <div className={`filters-wrapper ${isOpen ? 'filters-modal' : ''}`}>
      <span className="filter-close" onClick={() => closeFilters()}><CloseSvg /></span>
      {isOpen &&
        <div className="filter-header">
          <FilterIcon />
          <p>{t(`DSS_FILTERS`)}</p>
          <span onClick={handleClear}><RefreshIcon /></span>
        </div>
      }
      <div className="filters-input">
        <DateRange onFilterChange={handleFilterChange} values={value?.range} />
      </div>
      <div className="filters-input">
        <div>DDRs</div>
        <Dropdown option={ULBS} optionKey="name" select={selectULB} />
      </div>
      <div className="filters-input">
        <div>ULBs</div>
        <Dropdown option={ULBS} optionKey="name" select={selectULB} />
      </div>
      <div className="filters-input" style={{ flexBasis: "16%" }}>
        <Switch onSelect={handleFilterChange} />
        {/* <p className="clearText" onClick={handleClear}>{t(`DSS_FILTER_CLEAR`)}</p> */}
      </div>
    </div>
  );
};

export default Filters;
