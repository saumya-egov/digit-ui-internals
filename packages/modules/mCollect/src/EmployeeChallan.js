import { Card, CardSubHeader, Header, LinkButton, Loader, Row, StatusTable } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { propertyCardBodyStyle } from "../../../modules/pt/src/utils";

const EmployeeChallan = (props) => {
  const { t } = useTranslation();
  const { challanno } = useParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const coreData = Digit.Hooks.useCoreData();
  const challans = challan || {};
  const { isLoading, isError, error, data, ...rest } = Digit.Hooks.mcollect.useMCollectSearch({ tenantId, filters: { challanno } });
  const challan = data?.Properties[0];
  const totaldueamount = compensation + fieldfee + securitydeposit + cgst + sgst + roundoff;
  let units = [];
  units = challan?.units;
  let owners = [];
  owners = challan?.owners;
  let docs = [];
  docs = challan?.documents;

  return (
    <React.Fragment>
      <div style={{ width: "30%", fontFamily: "calibri", color: "#FF0000" }}>
        <Header>CHALLAN DETAILS </Header>
      </div>
      <div style={{ ...propertyCardBodyStyle, maxHeight: "calc(100vh - 12em)", margin: "30px" }}>
        <Card>
          <CardSubHeader>Challan No : {challanno} </CardSubHeader>
          <StatusTable>
            <Row label={"Compensation of lieu of concessions"} text={`${t(challans?.citizen?.compensation)}` || "NA"} />
            <Row label={"Field Fee"} text={"₹500"} text={`${t(challans?.citizen?.fieldfee)}` || "NA"} />
            <Row label={"Security Deposit"} text={`${t(challans?.citizen?.securitydeposit)}` || "NA"} />
            <Row label={"CGST"} text={`${t(challans?.citizen?.cgst)}` || "NA"} />
            <Row label={"SGST"} text={`${t(challans?.citizen?.sgst)}` || "NA"} />
            <Row label={"Round Off"} text={`${t(challans?.citizen?.roundoff)}` || "NA"} />
            <hr />
            <Row label={<b>Total Due Amount</b>} text={`${t(totaldueamount)}` || "NA"} />
          </StatusTable>
          <Card>
            <CardSubHeader>{"SERVICE DETAILS"}</CardSubHeader>
            <StatusTable>
              <Row label={"UC_SERVICE_CATEGORY_LABEL"} text={`${t(challans?.citizen?.businessService)}` || "NA"} />
              <Row label={"UC_FROM_DATE_LABEL"} text={`${t(challans?.citizen?.taxPeriodFrom)}` || "NA"} />
              <Row label={"UC_TO_DATE_LABEL"} text={`${t(challans?.citizen?.taxPeriodTo)}` || "NA"} />
              <Row label={"UC_COMMENT_LABEL"} text={`${"Sample Comments, Address"}` || "NA"} />
              <Row label={"CS_INBOX_STATUS_FILTER"} text={`${"Active"}` || "NA"} />
            </StatusTable>
            <CardSubHeader>{"CONSUMER DETAILS"}</CardSubHeader>
            <StatusTable>
              <Row label={"UC_CONS_NAME_LABEL"} text={`${t(challans?.citizen?.name)}` || "NA"} />
              <Row label={"UC_MOBILE_NO_LABEL"} text={`${t(challans?.citizen?.mobileNumber)}` || "NA"} />
              <Row label={"UC_DOOR_NO_LABEL"} text={`${t(challans?.citizen?.address?.doorNo)}` || "NA"} />
              <Row label={"UC_BLDG_NAME_LABEL"} text={`${t(challans?.citizen?.address?.buildingName)}` || "NA"} />
              <Row label={"UC_SRT_NAME_LABEL"} text={`${t(challans?.citizen?.address?.street)}` || "NA"} />
              <Row label={"UC_MOHALLA_LABEL"} text={`${t(challans?.citizen?.address?.district)}` || "NA"} />
            </StatusTable>
          </Card>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default EmployeeChallan;
