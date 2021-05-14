import { Banner, Card, CardText, LinkButton, ActionBar, Row, StatusTable, SubmitBar } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as func from "./Utils/getQueryParams";

const MCollectAcknowledgement = () => {
  const location = useLocation();
  const [params, setParams] = useState({});
  useEffect(() => {
    // console.log(location.pathname); // result: '/secondpage'
    setParams(func.getQueryStringParams(location.search)); // result: '?query=abc'
    // console.log(location); // result: 'some_value'
  }, [location]);
  const { t } = useTranslation();
  function proceedToPayment() {}

  return (
    <Card>
      <Banner message={t("UC_BILL_GENERATED_SUCCESS_MESSAGE")} applicationNumber={params.billNumber} info={t("UC_BILL_NO_LABEL")} successful={true} />
      <CardText>{t("UC_BILL_GENERATION_MESSAGE_SUB")}</CardText>

      <ActionBar
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "baseline",
        }}
      >
        <Link to={`/digit-ui/employee`} style={{ marginRight: "1rem" }}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
        <SubmitBar label={t("UC_BUTTON_PAY")} onClick={proceedToPayment} />
      </ActionBar>
    </Card>
  );
};
export default MCollectAcknowledgement;
