import React, { useState, useEffect } from "react";
import FSMActionModal from "./FSMActionModal";
import GenericActionModal from "./GenericActionModal";

const ActionModal = (props) => {
  if (props?.businessService.includes("PT")) {
    return <GenericActionModal {...props} />;
  }

  return <FSMActionModal {...props} />;
};

export default ActionModal;
