import { Card, CardSubHeader, Header, LinkButton, Loader, Row, StatusTable } from "@egovernments/digit-ui-react-components";
import { values } from "lodash-es";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { propertyCardBodyStyle } from "../../../modules/pt/src/utils";

function billSearch(tenantId, challanno, businessService) {
  console.log(businessService + "This one");

  var res = null;
  var pr = Digit.PaymentService.searchBill(tenantId, { consumerCode: challanno, service: businessService });

  return pr;
}

const EmployeeChallan = (props) => {
  // const { t } = useTranslation();
  const { challanno } = useParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const coreData = Digit.Hooks.useCoreData();
  const { isLoading, isError, error, data, ...rest } = Digit.Hooks.mcollect.useMCollectSearch({ tenantId, filters: { challanno } });
  /*console.log(data?.challans);*/
  const challanDetails = data?.challans?.filter(function (item) {
    return item.challanNo === challanno;
  })[0];

  var res = null;
  if (challanDetails) res = billSearch(tenantId, challanno, challanDetails?.businessService);

  console.log(res);

  var billDetails = null;

  res.then((values) => {
    if (values?.Bill) billDetails = values?.Bill[0];
  });

  return (
    <React.Fragment>
      <div style={{ width: "30%", fontFamily: "calibri", color: "#FF0000" }}>
        <Header>CHALLAN DETAILS </Header>
      </div>
      <div style={{ ...propertyCardBodyStyle, maxHeight: "calc(100vh - 12em)", margin: "30px" }}>
        <Card>
          <CardSubHeader>Challan No : {challanno} </CardSubHeader>
          <StatusTable>
            <Row label={"Tenant id"} text={"₹5000"} text={billDetails?.tenantId} />
            <Row label={"Bill Detail id"} text={"₹500"} text={billDetails?.billAccountdeatils.billDetailId} />
            <Row label={"Demand Detail id"} text={billDetails?.billAccountdeatils.demandDetailId} />
            <Row label={"Tax Head code"} text={billDetails?.billAccountdeatils.taxHeadCode} />
            <Row label={"Adjusted amount"} text={billDetails?.billAccountdeatils.adjustedAmount} />
            <Row label={"Order"} text={billDetails?.billAccountdeatils.order} />
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
