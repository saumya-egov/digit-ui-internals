import React from "react";
import { useTranslation } from "react-i18next";
import ApplicationDetailsTemplate from "../../../../templates/ApplicationDetails";

import { useParams } from "react-router-dom";

const ApplicationDetails = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { id: applicationNumber } = useParams();

  const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.pt.useApplicationDetail(t, tenantId, applicationNumber);

  const {
    isLoading: updatingApplication,
    isError: updateApplicationError,
    data: updateResponse,
    error: updateError,
    mutate,
  } = Digit.Hooks.pt.useApplicationActions(tenantId);

  let workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: applicationDetails?.tenantId || tenantId,
    id: applicationDetails?.applicationData?.acknowldgementNumber,
    moduleCode: "PT",
    role: "PT_CEMP",
    // serviceData: applicationDetails,
  });

  if (applicationDetails?.applicationData?.status === "ACTIVE") {
    workflowDetails = {
      ...workflowDetails,
      data: {
        ...workflowDetails?.data,
        nextActions: [
          {
            action: "VIEW_DETAILS",
            auditDetails: null,
            roles: ["PT_CEMP"],
            tenantId: "pb",
          },
        ],
      },
    };
  }

  return (
    <ApplicationDetailsTemplate
      applicationDetails={applicationDetails}
      isLoading={isLoading}
      isDataLoading={isLoading}
      applicationData={applicationDetails?.applicationData}
      mutate={mutate}
      workflowDetails={workflowDetails}
      businessService="PT"
    />
  );
};

export default ApplicationDetails;
