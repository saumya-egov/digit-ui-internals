import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ApplicationDetailsTemplate from "../../../../templates/ApplicationDetails";

import { useParams } from "react-router-dom";
import { Header } from "@egovernments/digit-ui-react-components";

const ApplicationDetails = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { id: applicationNumber } = useParams();
  const [showToast, setShowToast] = useState(null);
  // const [callUpdateService, setCallUpdateValve] = useState(false);
  const [businessService, setBusinessService] = useState("NewTL"); //DIRECTRENEWAL

  const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.tl.useApplicationDetail(t, tenantId, applicationNumber);

  const {
    isLoading: updatingApplication,
    isError: updateApplicationError,
    data: updateResponse,
    error: updateError,
    mutate,
  } = Digit.Hooks.tl.useApplicationActions(tenantId);

  let workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: applicationDetails?.tenantId || tenantId,
    id: applicationDetails?.applicationData?.applicationNumber,
    moduleCode: businessService,
    role: "TL_CEMP",
  });

  console.log(applicationDetails, updateResponse, workflowDetails, "applicationDetailsapplicationDetailsapplicationDetails")

  const closeToast = () => {
    setShowToast(null);
  };

  useEffect(() => {
    if (workflowDetails?.data?.applicationBusinessService) {
      setBusinessService(workflowDetails?.data?.applicationBusinessService);
    }
  }, [workflowDetails.data]);

  if (workflowDetails?.data?.actionState?.nextActions?.length > 0) {
    workflowDetails.data.actionState.nextActions = workflowDetails?.data?.actionState?.nextActions?.filter(data => data.action !== "ADHOC")
  }

  return (
    <div>
      <Header>{t("TL_COMMON_TR_DETAILS")}</Header>
      <ApplicationDetailsTemplate
        applicationDetails={applicationDetails}
        isLoading={isLoading}
        isDataLoading={isLoading}
        applicationData={applicationDetails?.applicationData}
        mutate={mutate}
        workflowDetails={workflowDetails}
        businessService={businessService}
        moduleCode="TL"
        showToast={showToast}
        setShowToast={setShowToast}
        closeToast={closeToast}
        timelineStatusPrefix={"WF_NEWTL_"}
      />
    </div>
  );
};

export default ApplicationDetails;
