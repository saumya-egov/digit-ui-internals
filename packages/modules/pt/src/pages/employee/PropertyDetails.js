import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ApplicationDetailsTemplate from "../../../../templates/ApplicationDetails";

import { useParams, useHistory } from "react-router-dom";
import { Header, Loader } from "@egovernments/digit-ui-react-components";
import _ from "lodash";

const PropertyDetails = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { id: applicationNumber } = useParams();
  const [showToast, setShowToast] = useState(null);
  const [appDetailsToShow, setAppDetailsToShow] = useState({});
  const history = useHistory();

  let { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.pt.useApplicationDetail(t, tenantId, applicationNumber);
  const { data: fetchBillData, isLoading: fetchBillLoading } = Digit.Hooks.useFetchBillsForBuissnessService({
    businessService: "PT",
    consumerCode: applicationNumber,
  });

  useEffect(() => {
    if (applicationDetails) {
      setAppDetailsToShow(_.cloneDeep(applicationDetails));
    }
  }, [applicationDetails]);

  let workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: applicationDetails?.tenantId || tenantId,
    id: applicationDetails?.applicationData?.acknowldgementNumber,
    moduleCode: "PT.UPDATE",
    role: "PT_CEMP",
    // serviceData: applicationDetails,
  });

  const closeToast = () => {
    setShowToast(null);
  };

  // applicationDetails?.applicationDetails?.shift();

  if (appDetailsToShow?.applicationDetails?.[0]?.values?.[1].title !== "PT_TOTAL_DUES") {
    appDetailsToShow?.applicationDetails?.unshift({
      values: [
        {
          title: "PT_PROPERTY_PTUID",
          value: applicationNumber,
        },
        {
          title: "PT_TOTAL_DUES",
          value: fetchBillData?.Bill[0]?.totalAmount ? `₹ ${fetchBillData?.Bill[0]?.totalAmount}` : "N/A",
        },
      ],
    });
  }

  if (applicationDetails?.applicationData?.status === "ACTIVE") {
    workflowDetails = {
      ...workflowDetails,
      data: {
        ...workflowDetails?.data,
        actionState: {
          nextActions: [
            {
              action: "ASSESS_PROPERTY",
              showFinancialYearsModal: true,
              customFunctionToExecute: (data) => {
                delete data.customFunctionToExecute;
                history.push({ pathname: `/digit-ui/employee/pt/assessment-details/${applicationNumber}`, state: { ...data } });
              },
              tenantId: "pb",
            },
            {
              action: !fetchBillData?.Bill[0]?.totalAmount ? "MUTATE_PROPERTY" : "PT_TOTALDUES_PAY",
              redirectionUrl: {
                pathname: !fetchBillData?.Bill[0]?.totalAmount
                  ? `/digit-ui/employee/pt/property-mutate-docs-required/${applicationNumber}`
                  : `/digit-ui/employee/payment/collect/PT/${applicationNumber}`,
                // state: { workflow: { action: "OPEN", moduleName: "PT", businessService } },
                state: null,
              },
              tenantId: "pb",
            },
          ],
        },
      },
    };
  }

  if (fetchBillLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header>{t("PT_PROPERTY_INFORMATION")}</Header>
      <ApplicationDetailsTemplate
        applicationDetails={appDetailsToShow}
        isLoading={isLoading}
        isDataLoading={isLoading}
        applicationData={appDetailsToShow?.applicationData}
        mutate={null}
        workflowDetails={workflowDetails}
        businessService="PT"
        showToast={showToast}
        setShowToast={setShowToast}
        closeToast={closeToast}
        timelineStatusPrefix={"ES_PT_COMMON_STATUS_"}
      />
    </div>
  );
};

export default PropertyDetails;
