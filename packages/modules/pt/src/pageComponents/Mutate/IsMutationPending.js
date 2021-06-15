import React from "react";

const IsMutationPending = (props) => {
  const { t, config, onSelect, userType, formData } = props;

  return (
    <React.Fragment>
      this is is mutation pending.
      <button onClick={() => onSelect(config.key, {})}>on select</button>
    </React.Fragment>
  );
};

export default IsMutationPending;
