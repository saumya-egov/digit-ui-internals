import React from "react";
import { useTranslation } from "react-i18next";
import { CheckBox } from "@egovernments/digit-ui-react-components";

const ServiceCategoryCount = ({ status, searchParams, onAssignmentChange, businessServices }) => {
  const { t } = useTranslation();
  return (
    <CheckBox
      onChange={(e) => onAssignmentChange(e, status)}
      checked={(() => {
        //IIFE
        return searchParams?.applicationStatus.some((e) => e.code === status.code);
      })()}
      label={`${t(status.name)}`}
      props={{ workflowStyle: "mcollect-workflow-style" }}
    />
  );
};

export default ServiceCategoryCount;
