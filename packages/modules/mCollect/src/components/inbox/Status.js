import React, { useState } from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import StatusCount from "./StatusCount";

const Status = ({ onAssignmentChange, searchParams, businessServices }) => {
  const { t } = useTranslation();

  const translateState = (state) => {
    return `${state.code || "ACTIVE"}`;
  };

  const applicationStatus = [
    {
      "code": "PAID",
      "active": true
    },
    {
      "code": "CANCELLED",
      "active": true
    },
    {
      "code": "ACTIVE",
      "active": true
    }
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="status-container">
      <div className="filter-label" style={{ fontWeight: "normal" }}>
        {t("ES_INBOX_STATUS")}
      </div>
      {applicationStatus?.map((option, index) => {
        return (
          <StatusCount
            key={index}
            onAssignmentChange={onAssignmentChange}
            status={{ name: translateState(option), code: option.code }}
            searchParams={searchParams}
          />
        )
      })}
    </div>
  );
};

export default Status;
