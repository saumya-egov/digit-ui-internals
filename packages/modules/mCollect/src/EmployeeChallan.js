import { Card, CardSubHeader, Header, Row, StatusTable } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { stringReplaceAll, convertEpochToDate } from "./utils";

const EmployeeChallan = (props) => {
  const { t } = useTranslation();
  const { challanno } = useParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [challanBillDetails, setChallanBillDetails] = useState([]);
  const [totalDueAmount, setTotalDueAmount] = useState(0);
  const { isLoading, isError, error, data, ...rest } = Digit.Hooks.mcollect.useMCollectSearch({ tenantId, filters: { challanNo: challanno } });
  var challanDetails = data?.challans?.filter(function (item) {
    return item.challanNo === challanno;
  })[0];
  let billDetails = [];
  useEffect(() => {
    async function fetchMyAPI() {
      billDetails = [];
      let res = await Digit.PaymentService.searchBill(tenantId, { consumerCode: data?.challans[0]?.challanNo, service: data?.challans[0]?.businessService });
      res?.Bill[0]?.billDetails[0]?.billAccountDetails?.map(bill => {
        billDetails.push(bill);
      });
      setTotalDueAmount(res?.Bill[0]?.totalAmount);
      setChallanBillDetails(billDetails);
      console.log(res, "resresresres")
    }
    if (data?.challans && data?.challans?.length > 0) {
      fetchMyAPI();
    }
  }, [data]);

  return (
    <React.Fragment>
      <div style={{ width: "30%", fontFamily: "calibri", color: "#FF0000" }}>
        <Header>{`${t("CHALLAN_DETAILS")}`} </Header>
      </div>
      <div>
        <Card>
          <CardSubHeader>{t("UC_CHALLAN_NO")} : {challanno} </CardSubHeader>
          <hr style={{ width: "34%", border: "1px solid #D6D5D4" }} />
          <StatusTable style={{ padding: "10px 0px" }}>
            {challanBillDetails?.map(data => {
              return <Row label={t(stringReplaceAll(data?.taxHeadCode, ".", "_"))} text={`₹${data?.amount}`} textStyle={{ whiteSpace: "pre" }} />
            })}
            <hr style={{ width: "34%", border: "1px solid #D6D5D4" }} />
            <Row label={<b style={{ padding: "10px 0px" }}>{t("UC_TOTAL_DUE_AMOUT_LABEL")}</b>} text={`₹${totalDueAmount}`} />
          </StatusTable>
          <CardSubHeader>{t("UC_SERVICE_DETAILS_LABEL")}</CardSubHeader>
          <StatusTable>
            <Row label={`${t("UC_SERVICE_CATEGORY_LABEL")}:`} text={`${t(`BILLINGSERVICE_BUSINESSSERVICE_${stringReplaceAll(challanDetails?.businessService?.toUpperCase(), ".", "_")}`)}`} textStyle={{ whiteSpace: "pre" }} />
            <Row label={`${t("UC_FROM_DATE_LABEL")}:`} text={convertEpochToDate(challanDetails?.taxPeriodFrom)} />
            <Row label={`${t("UC_TO_DATE_LABEL")}:`} text={convertEpochToDate(challanDetails?.taxPeriodTo)} />
            <Row label={`${t("UC_COMMENT_LABEL")}:`} text={`${challanDetails?.description}` || "NA"} />
            <Row label={`${t("CS_INBOX_STATUS_FILTER")}:`} text={t(`UC_${challanDetails?.applicationStatus}`)} />
          </StatusTable>
          <CardSubHeader>{t("UC_CONSUMER_DETAILS_LABEL")}</CardSubHeader>
          <StatusTable>
            <Row label={`${t("UC_CONS_NAME_LABEL")}:`} text={challanDetails?.citizen.name} />
            <Row label={`${t("UC_MOBILE_NUMBER")}:`} text={challanDetails?.citizen.mobileNumber} />
            <Row label={`${t("UC_DOOR_NO_LABEL")}:`} text={challanDetails?.address.doorNo} />
            <Row label={`${t("UC_BUILDING_NAME_LABEL")}:`} text={challanDetails?.address.buildingName} />
            <Row label={`${t("UC_STREET_NAME_LABEL")}:`} text={challanDetails?.address.street} />
            <Row label={`${t("UC_MOHALLA_LABEL")}:`} text={`${t(`${stringReplaceAll((challanDetails?.address?.tenantId?.toUpperCase()), ".", "_")}_REVENUE_${challanDetails?.address?.locality?.code}`)}`} />
          </StatusTable>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default EmployeeChallan;
