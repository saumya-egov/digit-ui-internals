import React from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import StatusCount from "./StatusCount";

const Status = ({ onAssignmentChange, fsmfilters }) => {
  const { t } = useTranslation();
  const { data: applicationsWithCount, isLoading } = Digit.Hooks.fsm.useApplicationStatus();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="status-container">
      <div className="filter-label">{t("ES_INBOX_STATUS")}</div>
      {applicationsWithCount?.map((option, index) => (
        <StatusCount key={index} onAssignmentChange={onAssignmentChange} status={option} fsmfilters={fsmfilters} />
      ))}
    </div>
  );
};

export default Status;
