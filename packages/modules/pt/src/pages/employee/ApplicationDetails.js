import React from "react";
import { useTranslation } from "react-i18next";
import ApplicationDetailsTemplate from "../../../../templates/ApplicationDetails";

import { useParams } from "react-router-dom";

const ApplicationDetails = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  let { id: propertyNumber } = useParams();

  const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.pt.useApplicationDetail(t, tenantId, propertyNumber);
  console.log("%c 🈹: ApplicationDetails -> applicationDetails ", "font-size:16px;background-color:#f9d019;color:black;", applicationDetails);

  // const { isLoading: isDataLoading, isSuccess, data: applicationData } = Digit.Hooks.fsm.useSearch(
  //   tenantId,
  //   // TODO: applicationNos should not be hard coded, it should be applicationNumber
  //   { applicationNos: "107-FSM-2021-02-25-063531" },
  //   { staleTime: Infinity }
  // );

  const isDataLoading = false;
  const applicationData = [];

  const {
    isLoading: updatingApplication,
    isError: updateApplicationError,
    data: updateResponse,
    error: updateError,
    mutate,
  } = Digit.Hooks.fsm.useApplicationActions(tenantId);

  // const workflowDetails = Digit.Hooks.useWorkflowDetails({
  //   tenantId: applicationDetails?.tenantId || tenantId,
  //   // id: applicationNumber,
  //   // TODO: id should not be hard coded, it should be applicationNumber
  //   id: "107-FSM-2021-02-25-063531",
  //   // TODO: Module code should be PT
  //   moduleCode: "FSM",
  //   // TODO: Role should be PT EMPLOYEE
  //   role: "FSM_EMPLOYEE",
  //   serviceData: applicationDetails,
  // });

  const workflowDetails = [];

  return (
    <ApplicationDetailsTemplate
      applicationDetails={applicationDetails}
      isLoading={isLoading}
      isDataLoading={isDataLoading}
      applicationData={applicationData}
      mutate={mutate}
      workflowDetails={workflowDetails}
    />
  );
};

export default ApplicationDetails;
