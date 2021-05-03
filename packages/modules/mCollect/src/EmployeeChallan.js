import { Card, CardSubHeader, Header, LinkButton, Loader, Row, StatusTable } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { propertyCardBodyStyle } from "../../../modules/pt/src/utils";

class EmployeeChallan extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div style={{ width: "30%", fontFamily: "Times New Roman", color: "#FF0000" }}>
          <Header>CHALLAN DETAILS </Header>
        </div>
        <div style={{ ...propertyCardBodyStyle, maxHeight: "calc(100vh - 12em)", margin: "30px" }}>
          <Card>
            <CardSubHeader>{"Challan No: CH-CB-SECU-2021-004291"} </CardSubHeader>
            <StatusTable>
              <Row label={"Compensation of lieu of concessions"} text={"₹5000"} textStyle={{ whiteSpace: "pre" }} />
              <Row label={"Field Fee"} text={"₹500"} textStyle={{ whiteSpace: "pre" }} />
              <Row label={"Security Deposit"} text="₹50" />
              <Row label={"CGST"} text={`${"₹20"}` || "NA"} />
              <Row label={"SGST"} text={`${"₹20"}` || "NA"} />
              <Row label={"Round Off"} text={`${"₹0"}` || "NA"} />
              <hr />
              <Row label={<b>Total Due Amount</b>} text={<b>{"₹5090"}`</b> || "NA"} />
            </StatusTable>
            <Card>
              <CardSubHeader>{"SERVICE DETAILS"}</CardSubHeader>
              <StatusTable>
                <Row label={"UC_SERVICE_CATEGORY_LABEL"} text={"Compensation in lieu of concessions"} textStyle={{ whiteSpace: "pre" }} />
                <Row label={"UC_FROM_DATE_LABEL"} text={"1/12/2020"} textStyle={{ whiteSpace: "pre" }} />
                <Row label={"UC_TO_DATE_LABEL"} text="17/12/2020" />
                <Row label={"UC_COMMENT_LABEL"} text={`${"Sample Comments, Address"}` || "NA"} />
                <Row label={"CS_INBOX_STATUS_FILTER"} text={`${"Active"}` || "NA"} />
              </StatusTable>
              <CardSubHeader>{"CONSUMER DETAILS"}</CardSubHeader>
              <StatusTable>
                <Row label={"UC_CONS_NAME_LABEL"} text={`${"Ajit"}` || "NA"} />
                <Row label={"UC_MOBILE_NO_LABEL"} text={`${"9167926072"}` || "NA"} />
                <Row label={"UC_DOOR_NO_LABEL"} text={`${"A 16"}` || "NA"} />
                <Row label={"UC_BLDG_NAME_LABEL"} text={`${"Purva Complex"}` || "NA"} />
                <Row label={"UC_SRT_NAME_LABEL"} text={`${"Purva Westend"}` || "NA"} />
                <Row label={"UC_MOHALLA_LABEL"} text={`${"Vittal nagar, Hanuman Nagar"}` || "NA"} />
              </StatusTable>
            </Card>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeChallan;
