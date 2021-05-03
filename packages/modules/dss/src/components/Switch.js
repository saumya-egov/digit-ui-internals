import React, { Fragment } from "react";

const denominations = ["Cr", "Lac", "Unit"];

const Switch = ({
  onSelect
}) => {
  return (
    <>
      <div>Denomination</div>
      <div className="switch-wrapper">
        {denominations.map((label, idx) => (
          <div>
            <input type="radio" id={label} className="radio-switch" name="unit" onClick={() => onSelect({ denomination: label })} />
            <label for={label}>{label}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default Switch;
