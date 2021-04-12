import React from "react";
import { Toast } from "@egovernments/digit-ui-react-components";

function ApplicationDetailsToast({ t, showToast, closeToast }) {
  return (
    <React.Fragment>
      {showToast && (
        <Toast
          error={showToast.key === "error" ? true : false}
          label={t(showToast.key === "success" ? `ES_FSM_${showToast.action}_UPDATE_SUCCESS` : showToast.action)}
          onClose={closeToast}
        />
      )}
    </React.Fragment>
  );
}

export default ApplicationDetailsToast;
