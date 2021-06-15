import React from "react";

const RegistrationDocument = (props) => {
  const { t, config, onSelect, userType, formData } = props;

  return (
    <React.Fragment>
      this is RegistrationDocument.
      <button onClick={() => onSelect(config.key, {})}>on select</button>
    </React.Fragment>
  );
};

export default RegistrationDocument;
