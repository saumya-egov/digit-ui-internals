import React, { useEffect, useState } from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import StatusCount from "./StatusCount";

const Status = ({ onAssignmentChange, fsmfilters, translatePrefix = "CS_COMMON_FSM_", businessService = "FSM" }) => {
  const { t } = useTranslation();

  const [moreStatus, showMoreStatus] = useState(false);

  const { data: statusData, isLoading } = Digit.Hooks.useApplicationStatusGeneral({ businessService, translatePrefix }, {});

  const { userRoleOptions, otherRoleOptions } = statusData || {};

  useEffect(() => {
    console.log(statusData, ">>>>>>>>>status data");
  }, [statusData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="status-container">
      <div className="filter-label">{t("ES_INBOX_STATUS")}</div>
      {userRoleOptions?.map((option, index) => (
        <StatusCount key={index} onAssignmentChange={onAssignmentChange} status={option} fsmfilters={fsmfilters} />
      ))}
      {moreStatus &&
        otherRoleOptions?.map((option, index) => (
          <StatusCount key={index} onAssignmentChange={onAssignmentChange} status={option} fsmfilters={fsmfilters} />
        ))}
      <div className="filter-button" onClick={() => showMoreStatus(!moreStatus)}>
        {" "}
        {moreStatus ? t("ES_COMMON_LESS") : t("ES_COMMON_MORE")}{" "}
      </div>
    </div>
  );
};

export default Status;
