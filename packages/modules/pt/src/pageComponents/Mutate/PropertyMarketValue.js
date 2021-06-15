import React from "react";

const PropertyMarketValue = (props) => {
  const { t, config, onSelect, userType, formData } = props;

  return (
    <React.Fragment>
      this is PropertyMarketValue.
      <button onClick={() => onSelect(config.key, {})}>on select</button>
    </React.Fragment>
  );
};

export default PropertyMarketValue;
