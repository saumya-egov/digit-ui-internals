import React from "react";

const IsPropertyUnderStateAquisition = (props) => {
  const { t, config, onSelect, userType, formData } = props;

  return (
    <React.Fragment>
      this is IsPropertyUnderStateAquisition.
      <button onClick={() => onSelect(config.key, {})}>on select</button>
    </React.Fragment>
  );
};

export default IsPropertyUnderStateAquisition;
