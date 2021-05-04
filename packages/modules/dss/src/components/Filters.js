import React, { useContext, useState } from "react";
import { CardSectionHeader, Dropdown, SubmitBar, FilterIcon, RefreshIcon } from "@egovernments/digit-ui-react-components";
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

const Filters = () => {
  const { value, setValue } = useContext(FilterContext);
  const selectULB = () => {};
  const handleFilterChange = (data) => {
    setValue({ ...value, ...data });
  };
  return (
    <div className="filters-wrapper">
      {/* <CardSectionHeader style={{ display: "flex" }}>
        <FilterIcon />
        <span style={{ marginLeft: "8px", marginRight: "70px", fontWeight: 400, fontSize: "24px" }}>Filters</span>
        <RefreshIcon />
      </CardSectionHeader> */}
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
      <div className="filters-input">
        <Switch onSelect={handleFilterChange} />
      </div>
      {/* <SubmitBar label={"Apply"} /> */}
    </div>
  );
};

export default Filters;
