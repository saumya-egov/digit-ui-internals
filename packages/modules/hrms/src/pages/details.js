import { Card, CardSubHeader, Header, LinkButton, Loader, Row, StatusTable } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { DiagnosticCategory } from "typescript";

const Details = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const codes = Digit.HRMSService.employeedetails({ tenantId, codes });
  return (
    <React.Fragment>
      <div style={{ width: "30%", fontFamily: "calibri", color: "#FF0000" }}>
        <Header>DETAILS</Header>
      </div>
      <div style={{ maxHeight: "calc(100vh - 12em)", margin: "30px" }}>
        <Card>
          <CardSubHeader>{t("HR_PERSONAL_DETAILS_FORM_HEADER")} </CardSubHeader>
          <StatusTable>
            <Row label={t("HR_NAME_LABEL")} text={"Robert De Niro"} textStyle={{ whiteSpace: "pre" }} />
            <Row label={t("HR_MOB_NO_LABEL")} text={"9988776799"} textStyle={{ whiteSpace: "pre" }} />
            <Row label={t("HR_GENDER_LABEL")} text={"Male"} />
            <Row label={t("HR_EMAIL_LABEL")} text={"rd78goodfellow@gmail.com"} />
            <Row label={t("HR_CORRESPONDENCE_ADDRESS_LABEL")} text={"House No. 1289, Capital Street,Jalandar"} />
          </StatusTable>
          <CardSubHeader>{t("Employee Details")}</CardSubHeader>
          <StatusTable>
            <Row label={t("HR_EMPLOYMENT_TYPE_LABEL")} text={"Contract"} textStyle={{ whiteSpace: "pre" }} />
            <Row label={t("HR_APPOINTMENT_DATE_LABEL")} text={"23/02/2020"} textStyle={{ whiteSpace: "pre" }} />
            <Row label={t("HR_EMPLOYEE_ID_LABEL")} text={"EMP_23572"} />
          </StatusTable>
          <CardSubHeader>{t("HR_JURIS_DET_HEADER")}</CardSubHeader>
          <StatusTable>
            <Row label={t("HR_HIERARCHY_LABEL")} text={"Admin"} textStyle={{ whiteSpace: "pre" }} />
            <Row label={t("HR_BOUNDARY_TYPE_LABEL")} text={"City"} textStyle={{ whiteSpace: "pre" }} />
            <Row label={t("HR_BOUNDARY_LABEL")} text={"Amritsar"} />
            <Row label={t("HR_ROLE_LABEL")} text={"Counter Employee"} />
          </StatusTable>
          <CardSubHeader>{t("HR_ASSIGN_DET_HEADER")}</CardSubHeader>
          <StatusTable>
            <Row label={t("HR_ASMT_FROM_DATE_LABEL")} text={"14/02/2020"} textStyle={{ whiteSpace: "pre" }} />
            <Row label={t("HR_ASMT_TO_DATE_LABEL")} text={"Currently Working Here"} textStyle={{ whiteSpace: "pre" }} />
            <Row label={t("HR_DEPT_LABEL")} text={"Tax Branch"} />
            <Row label={t("HR_HOD_SWITCH_LABEL")} text={"NA"} />
          </StatusTable>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Details;
