import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ApplicationDetailsTemplate from "../../../../templates/ApplicationDetails";

import { useParams, useLocation } from "react-router-dom";

const AssessmentDetails = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { id: applicationNumber } = useParams();
  const location = useLocation();

  let { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.pt.useApplicationDetail(t, tenantId, applicationNumber);
  const { mutate: assessmentMutate } = Digit.Hooks.pt.usePropertyAssessment(tenantId);
  const { mutate: ptCalculationEstimateMutate } = Digit.Hooks.pt.usePtCalculationEstimate(tenantId);

  useEffect(() => {
    ptCalculationEstimateMutate({ Assessment: location?.state?.Assessment });
  }, []);

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

  applicationDetails?.applicationDetails?.shift();
  applicationDetails?.applicationDetails?.unshift({
    title: "PT_TITLE_PROPERTY_INFORMATION",
    values: [
      {
        title: "PT_TITLE_UNIQUE_PROPERTY_ID",
        value: applicationNumber,
      },
      // TODO: add below item with value fetched
      // {
      //   title: 'PT_TITLE_TOTAL_PROPERTY_DUE', value: 0
      // },
    ],
  });

  if (applicationDetails?.applicationData?.status === "ACTIVE") {
    workflowDetails = {
      ...workflowDetails,
      data: {
        ...workflowDetails?.data,
        nextActions: [
          {
            action: "ASSESS_PROPERTY",
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
      assessmentMutate={assessmentMutate}
      ptCalculationEstimateMutate={ptCalculationEstimateMutate}
    />
  );
};

export default AssessmentDetails;
