import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Loader } from "@egovernments/digit-ui-react-components";

export const PDFSvg = ({ width = 24, height = 24, style }) => (
  <svg style={style} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="gray">
    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
  </svg>
);

import ActionModal from "./Modal";

import { useQueryClient } from "react-query";

import { useHistory, useParams } from "react-router-dom";
import ApplicationDetailsContent from "../../../components/application-details/ApplicationDetailsContent";
import ApplicationDetailsToast from "../../../components/application-details/ApplicationDetailsToast";
import ApplicationDetailsActionBar from "../../../components/application-details/ApplicationDetailsActionBar";

const ApplicationDetails = (props) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId.split(".")[0];
  const { t } = useTranslation();
  const history = useHistory();
  const queryClient = useQueryClient();
  let { id: applicationNumber } = useParams();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(null);

  // const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.fsm.useApplicationDetail(t, tenantId, applicationNumber);
  // TODO: applicationDetails should be fetch
  const applicationDetails = [
    {
      title: "ES_TITLE_APPLICATION_DETAILS",
      values: [
        { title: "CS_FILE_DESLUDGING_APPLICATION_NO", value: applicationNumber },
        { title: "ES_APPLICATION_CHANNEL", value: "Online" },
      ],
    },
    {
      title: "ES_APPLICATION_DETAILS_PROPERTY_ADDRESS",
      values: [
        { title: "ES_APPLICATION_DETAILS_LOCATION_PINCODE", value: "600001" },
        { title: "ES_APPLICATION_DETAILS_LOCATION_CITY", value: "City A" },
        {
          title: "ES_APPLICATION_DETAILS_LOCATION_LOCALITY",
          value: "Anand Nagar Extension",
        },
        { title: "ES_APPLICATION_DETAILS_LOCATION_STREET_NAME", value: "Gandhi Street" },
        { title: "ES_APPLICATION_DETAILS_LOCATION_BUILDING_NUMBER", value: "25/A" },
      ],
    },
    {
      title: "ES_APPLICATION_DETAILS_PROPERTY_ASSESSMENT_DETAILS",
      values: [
        { title: "ES_APPLICATION_DETAILS_PROPERTY_USAGE_TYPE", value: "Residential" },
        { title: "ES_APPLICATION_DETAILS_PROPERTY_TYPE", value: "Independent Building" },
        { title: "ES_APPLICATION_DETAILS_PROPERTY_PLOT_SIZE", value: "1000" },
        { title: "ES_APPLICATION_DETAILS_PROPERTY_NO_OF_FLOORS", value: "2" },
      ],
      additionalDetails: {
        floors: [
          {
            title: "Ground Floor",
            values: [
              {
                title: "Unit 1",
                values: [
                  {
                    title: "ES_APPLICATION_DETAILS_UNIT_USAGE_TYPE",
                    value: "Residentail",
                  },
                  {
                    title: "ES_APPLICATION_DETAILS_UNIT_OCCUPANCY_TYPE",
                    value: "Self Occupied",
                  },
                  {
                    title: "ES_APPLICATION_DETAILS_UNIT_BUILD_UP_AREA",
                    value: "1000 sq.ft",
                  },
                ],
              },
              {
                title: "Unit 2",
                values: [
                  {
                    title: "ES_APPLICATION_DETAILS_UNIT_USAGE_TYPE",
                    value: "Residentail",
                  },
                  {
                    title: "ES_APPLICATION_DETAILS_UNIT_OCCUPANCY_TYPE",
                    value: "Self Occupied",
                  },
                  {
                    title: "ES_APPLICATION_DETAILS_UNIT_BUILD_UP_AREA",
                    value: "1000 sq.ft",
                  },
                ],
              },
            ],
          },
          {
            title: "First Floor",
            values: [
              {
                title: "Unit 1",
                values: [
                  {
                    title: "ES_APPLICATION_DETAILS_UNIT_USAGE_TYPE",
                    value: "Residentail",
                  },
                  {
                    title: "ES_APPLICATION_DETAILS_UNIT_OCCUPANCY_TYPE",
                    value: "Self Occupied",
                  },
                  {
                    title: "ES_APPLICATION_DETAILS_UNIT_BUILD_UP_AREA",
                    value: "1000 sq.ft",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      title: "ES_APPLICATION_DETAILS_PROPERTY_OWNERSHIP_DETAILS",
      values: [
        { title: "ES_APPLICATION_DETAILS_OWNER_NAME", value: "Antriksh" },
        { title: "ES_APPLICATION_DETAILS_GENDER", value: "Male" },
        { title: "ES_APPLICATION_DETAILS_MOBILE_NUMBER", value: "XXXXXXXXXX" },
        { title: "ES_APPLICATION_DETAILS_SPECIAL_CATEGORY", value: "None" },
        { title: "ES_APPLICATION_DETAILS_GUARDIAN_NAME", value: "Antriksh" },
        { title: "ES_APPLICATION_DETAILS_OWNERSHIP_TYPE", value: "Single Owner" },
        { title: "ES_APPLICATION_DETAILS_EMAIL", value: "None" },
        { title: "ES_APPLICATION_DETAILS_CORRESPONDENCE_ADDRESS", value: "ABCD" },
      ],
      additionalDetails: {
        documents: [
          {
            title: "Documents",
            values: [
              {
                title: "Address Proof",
              },
              {
                title: "Address Proof",
              },
              {
                title: "Address Proof",
              },
              {
                title: "Address Proof",
              },
            ],
          },
        ],
      },
    },
  ];

  const isLoading = false;
  const { isLoading: isDataLoading, isSuccess, data: applicationData } = Digit.Hooks.fsm.useSearch(
    tenantId,
    // TODO: applicationNos should not be hard coded, it should be applicationNumber
    { applicationNos: "107-FSM-2021-02-25-063531" },
    { staleTime: Infinity }
  );

  const {
    isLoading: updatingApplication,
    isError: updateApplicationError,
    data: updateResponse,
    error: updateError,
    mutate,
  } = Digit.Hooks.fsm.useApplicationActions(tenantId);

  const workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: applicationDetails?.tenantId || tenantId,
    // id: applicationNumber,
    // TODO: id should not be hard coded, it should be applicationNumber
    id: "107-FSM-2021-02-25-063531",
    // TODO: Module code should be PT
    moduleCode: "FSM",
    // TODO: Role should be PT EMPLOYEE
    role: "FSM_EMPLOYEE",
    serviceData: applicationDetails,
  });

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
      default:
        console.log("%c 💀: ApplicationDetails -> default case ", "font-size:16px;background-color:#d23983;color:white;");
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
              closeModal={closeModal}
              submitAction={submitAction}
              actionData={workflowDetails?.data?.timeline}
            />
          ) : null}
          <ApplicationDetailsToast showToast={showToast} closeToast={closeToast} />
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
