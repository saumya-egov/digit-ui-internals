import { Card, CardSubHeader, Header, LinkButton, Loader, Row, StatusTable } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { propertyCardBodyStyle } from "../../../modules/pt/src/utils";

const EmployeeChallan = (props) => {
  // const { t } = useTranslation();
  const { challanno } = useParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const coreData = Digit.Hooks.useCoreData();
  const { isLoading, isError, error, data, ...rest } = Digit.Hooks.mcollect.useMCollectSearch({ tenantId, filters: { challanno } });
  console.log(data?.challans);
  var challanDetails = data?.challans?.filter(function (item) {
    return item.challanNo === challanno;
  })[0];
  // console.log(challanDetails)
  return (
    <React.Fragment>
      <div style={{ width: "30%", fontFamily: "calibri", color: "#FF0000" }}>
        <Header>CHALLAN DETAILS </Header>
      </div>
      <div style={{ ...propertyCardBodyStyle, maxHeight: "calc(100vh - 12em)", margin: "30px" }}>
        <Card>
          <CardSubHeader>Challan No : {challanno} </CardSubHeader>
          <StatusTable>
            <Row label={"Compensation of lieu of concessions"} text={"₹5000"} textStyle={{ whiteSpace: "pre" }} />
            <Row label={"Field Fee"} text={"₹500"} textStyle={{ whiteSpace: "pre" }} />
            <Row label={"Security Deposit"} text="₹50" />
            <Row label={"CGST"} text={`${"₹20"}` || "NA"} />
            <Row label={"SGST"} text={`${"₹20"}` || "NA"} />
            <Row label={"Round Off"} text={`${"₹0"}` || "NA"} />
            <hr />
            <Row label={<b>Total Due Amount</b>} text={challanDetails?.amount} />
          </StatusTable>
          <Card>
            <CardSubHeader>{"SERVICE DETAILS"}</CardSubHeader>
            <StatusTable>
              <Row label={"UC_SERVICE_CATEGORY_LABEL"} text={challanDetails?.businessService} textStyle={{ whiteSpace: "pre" }} />
              <Row label={"UC_FROM_DATE_LABEL"} text={challanDetails?.taxPeriodFrom} />
              <Row label={"UC_TO_DATE_LABEL"} text={challanDetails?.taxPeriodTo} />
              <Row label={"UC_COMMENT_LABEL"} text={`${"Sample Comments, Address"}` || "NA"} />
              <Row label={"CS_INBOX_STATUS_FILTER"} text={challanDetails?.applicationStatus} />
            </StatusTable>
            <CardSubHeader>{"CONSUMER DETAILS"}</CardSubHeader>
            <StatusTable>
              <Row label={"UC_CONS_NAME_LABEL"} text={challanDetails?.citizen.name} />
              <Row label={"UC_MOBILE_NO_LABEL"} text={challanDetails?.citizen.mobileNumber} />
              <Row label={"UC_DOOR_NO_LABEL"} text={challanDetails?.address.doorNo} />
              <Row label={"UC_BLDG_NAME_LABEL"} text={challanDetails?.address.buildingName} />
              <Row label={"UC_SRT_NAME_LABEL"} text={challanDetails?.address.street} />
              <Row label={"UC_MOHALLA_LABEL"} text={challanDetails?.address.district} />
            </StatusTable>
          </Card>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default EmployeeChallan;
