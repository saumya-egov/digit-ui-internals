import React from "react";

const Comments = (props) => {
  const { t, config, onSelect, userType, formData } = props;

  return (
    <React.Fragment>
      this is Comments.
      <button onClick={() => onSelect(config.key, {})}>on select</button>
    </React.Fragment>
  );
};

export default Comments;
