import React, { Fragment, useContext } from "react";
import FilterContext from "./FilterContext";

const denominations = ["Cr", "Lac", "Unit"];

const Switch = ({ onSelect }) => {
  const { value } = useContext(FilterContext);
  return (
    <>
      <div>Denomination</div>
      <div className="switch-wrapper">
        {denominations.map((label, idx) => (
          <div key={idx}>
            <input
              type="radio"
              id={label}
              className="radio-switch"
              name="unit"
              checked={label === value?.denomination}
              onClick={() => onSelect({ denomination: label })}
              onChange={e => {}}
            />
            <label htmlFor={label}>{label}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default Switch;
