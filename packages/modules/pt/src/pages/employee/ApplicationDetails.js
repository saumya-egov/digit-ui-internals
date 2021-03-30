import React from "react";
import { useTranslation } from "react-i18next";
import ApplicationDetailsTemplate from "../../../../templates/ApplicationDetails";

import { useParams } from "react-router-dom";

const ApplicationDetails = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  let { id: applicationNumber } = useParams();

  // const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.fsm.useApplicationDetail(t, tenantId, applicationNumber);
  const {
    // isLoading,
    isError,
    data: applicationDetails,
    error,
  } = Digit.Hooks.pt.usePropertyDetail(t, tenantId, applicationNumber);
  // console.log("%c 👨‍👦: ApplicationDetails -> data ", "font-size:16px;background-color:#89a5a2;color:white;", data);

  // TODO: applicationDetails should be fetch
  // const applicationDetails = [
  //   {
  //     title: "ES_TITLE_APPLICATION_DETAILS",
  //     values: [
  //       { title: "CS_FILE_DESLUDGING_APPLICATION_NO", value: applicationNumber },
  //       { title: "ES_APPLICATION_CHANNEL", value: "Online" },
  //     ],
  //   },
  //   {
  //     title: "ES_APPLICATION_DETAILS_PROPERTY_ADDRESS",
  //     values: [
  //       { title: "ES_APPLICATION_DETAILS_LOCATION_PINCODE", value: "600001" },
  //       { title: "ES_APPLICATION_DETAILS_LOCATION_CITY", value: "City A" },
  //       {
  //         title: "ES_APPLICATION_DETAILS_LOCATION_LOCALITY",
  //         value: "Anand Nagar Extension",
  //       },
  //       { title: "ES_APPLICATION_DETAILS_LOCATION_STREET_NAME", value: "Gandhi Street" },
  //       { title: "ES_APPLICATION_DETAILS_LOCATION_BUILDING_NUMBER", value: "25/A" },
  //     ],
  //   },
  //   {
  //     title: "ES_APPLICATION_DETAILS_PROPERTY_ASSESSMENT_DETAILS",
  //     values: [
  //       { title: "ES_APPLICATION_DETAILS_PROPERTY_USAGE_TYPE", value: "Residential" },
  //       { title: "ES_APPLICATION_DETAILS_PROPERTY_TYPE", value: "Independent Building" },
  //       { title: "ES_APPLICATION_DETAILS_PROPERTY_PLOT_SIZE", value: "1000" },
  //       { title: "ES_APPLICATION_DETAILS_PROPERTY_NO_OF_FLOORS", value: "2" },
  //     ],
  //     additionalDetails: {
  //       floors: [
  //         {
  //           title: "Ground Floor",
  //           values: [
  //             {
  //               title: "Unit 1",
  //               values: [
  //                 {
  //                   title: "ES_APPLICATION_DETAILS_UNIT_USAGE_TYPE",
  //                   value: "Residentail",
  //                 },
  //                 {
  //                   title: "ES_APPLICATION_DETAILS_UNIT_OCCUPANCY_TYPE",
  //                   value: "Self Occupied",
  //                 },
  //                 {
  //                   title: "ES_APPLICATION_DETAILS_UNIT_BUILD_UP_AREA",
  //                   value: "1000 sq.ft",
  //                 },
  //               ],
  //             },
  //             {
  //               title: "Unit 2",
  //               values: [
  //                 {
  //                   title: "ES_APPLICATION_DETAILS_UNIT_USAGE_TYPE",
  //                   value: "Residentail",
  //                 },
  //                 {
  //                   title: "ES_APPLICATION_DETAILS_UNIT_OCCUPANCY_TYPE",
  //                   value: "Self Occupied",
  //                 },
  //                 {
  //                   title: "ES_APPLICATION_DETAILS_UNIT_BUILD_UP_AREA",
  //                   value: "1000 sq.ft",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           title: "First Floor",
  //           values: [
  //             {
  //               title: "Unit 1",
  //               values: [
  //                 {
  //                   title: "ES_APPLICATION_DETAILS_UNIT_USAGE_TYPE",
  //                   value: "Residentail",
  //                 },
  //                 {
  //                   title: "ES_APPLICATION_DETAILS_UNIT_OCCUPANCY_TYPE",
  //                   value: "Self Occupied",
  //                 },
  //                 {
  //                   title: "ES_APPLICATION_DETAILS_UNIT_BUILD_UP_AREA",
  //                   value: "1000 sq.ft",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     title: "ES_APPLICATION_DETAILS_PROPERTY_OWNERSHIP_DETAILS",
  //     values: [
  //       { title: "ES_APPLICATION_DETAILS_OWNER_NAME", value: "Antriksh" },
  //       { title: "ES_APPLICATION_DETAILS_GENDER", value: "Male" },
  //       { title: "ES_APPLICATION_DETAILS_MOBILE_NUMBER", value: "XXXXXXXXXX" },
  //       { title: "ES_APPLICATION_DETAILS_SPECIAL_CATEGORY", value: "None" },
  //       { title: "ES_APPLICATION_DETAILS_GUARDIAN_NAME", value: "Antriksh" },
  //       { title: "ES_APPLICATION_DETAILS_OWNERSHIP_TYPE", value: "Single Owner" },
  //       { title: "ES_APPLICATION_DETAILS_EMAIL", value: "None" },
  //       { title: "ES_APPLICATION_DETAILS_CORRESPONDENCE_ADDRESS", value: "ABCD" },
  //     ],
  //     additionalDetails: {
  //       documents: [
  //         {
  //           title: "Documents",
  //           values: [
  //             {
  //               title: "Address Proof",
  //             },
  //             {
  //               title: "Address Proof",
  //             },
  //             {
  //               title: "Address Proof",
  //             },
  //             {
  //               title: "Address Proof",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   },
  // ];

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
