import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Loader } from "@egovernments/digit-ui-react-components";

import ActionModal from "./Modal";

import { useQueryClient } from "react-query";

import { useHistory, useParams } from "react-router-dom";
import ApplicationDetailsContent from "./components/ApplicationDetailsContent";
import ApplicationDetailsToast from "./components/ApplicationDetailsToast";
import ApplicationDetailsActionBar from "./components/ApplicationDetailsActionBar";

const ApplicationDetails = (props) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId.split(".")[0];
  const { t } = useTranslation();
  const history = useHistory();
  let { id: applicationNumber } = useParams();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(null);

  const { applicationDetails, isLoading, isDataLoading, applicationData, mutate, workflowDetails } = props;

  useEffect(() => {
    if (showToast) {
      workflowDetails.revalidate();
    }
  }, [showToast]);

  function onActionSelect(action) {
    setSelectedAction(action);
    setDisplayMenu(false);
  }

  useEffect(() => {
    switch (selectedAction) {
      case "DSO_ACCEPT":
      case "ACCEPT":
      case "ASSIGN":
      case "GENERATE_DEMAND":
      case "FSM_GENERATE_DEMAND":
      case "REASSIGN":
      case "COMPLETE":
      case "COMPLETED":
      case "CANCEL":
      case "SENDBACK":
      case "DSO_REJECT":
      case "REJECT":
      case "DECLINE":
      case "REASSING":
      case "SENDBACKTOCITIZEN":
      case "VERIFY":
      case "FORWARD":
      case "APPROVE":
        return setShowModal(true);
      case "SUBMIT":
      case "FSM_SUBMIT":
        return history.push("/digit-ui/employee/fsm/modify-application/" + applicationNumber);
      case "PAY":
      case "FSM_PAY":
      case "ADDITIONAL_PAY_REQUEST":
        return history.push(`/digit-ui/employee/payment/collect/FSM.TRIP_CHARGES/${applicationNumber}`);
      default:
        console.log("default case");
        break;
    }
  }, [selectedAction]);

  const closeModal = () => {
    setSelectedAction(null);
    setShowModal(false);
  };

  const closeToast = () => {
    setShowToast(null);
  };

  const submitAction = (data) => {
    mutate(data, {
      onError: (error, variables) => {
        setShowToast({ key: "error", action: error });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({ key: "success", action: selectedAction });
        setTimeout(closeToast, 5000);
        // queryClient.invalidateQueries("FSM_CITIZEN_SEARCH");
        // const inbox = queryClient.getQueryData("FUNCTION_RESET_INBOX");
        // inbox?.revalidate();
      },
    });
    closeModal();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      {!isLoading ? (
        <React.Fragment>
          <ApplicationDetailsContent
            applicationDetails={applicationDetails}
            workflowDetails={workflowDetails}
            isDataLoading={isDataLoading}
            applicationData={applicationData}
          />
          {showModal ? (
            <ActionModal
              t={t}
              action={selectedAction}
              tenantId={tenantId}
              state={state}
              id={applicationNumber}
              applicationData={applicationDetails?.applicationData}
              closeModal={closeModal}
              submitAction={submitAction}
              actionData={workflowDetails?.data?.timeline}
              businessService={props?.businessService}
            />
          ) : null}
          <ApplicationDetailsToast t={t} showToast={showToast} closeToast={closeToast} />
          <ApplicationDetailsActionBar
            workflowDetails={workflowDetails}
            displayMenu={displayMenu}
            onActionSelect={onActionSelect}
            setDisplayMenu={setDisplayMenu}
          />
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default ApplicationDetails;
