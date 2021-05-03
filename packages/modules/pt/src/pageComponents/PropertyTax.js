import { Card, CardHeader, CardSubHeader, CardText, SubmitBar } from "@egovernments/digit-ui-react-components";
import React from "react";
import { cardBodyStyle, stringReplaceAll } from "../utils";
//import { map } from "lodash-es";

const PropertyTax = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];

  const { data: Documentsob = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Documents");
  const docs = Documentsob?.PropertyTax?.Documents;

  function onSave() {}

  function goNext() {
    onSelect();
  }
  return (
    <React.Fragment>
      <Card>
        <CardHeader>{t("PT_DOC_REQ_SCREEN_HEADER")}</CardHeader>
        <div style={{ ...cardBodyStyle, maxHeight: "calc(100vh - 15em)" }}>
          <CardText>{t("PT_DOC_REQ_SCREEN_SUB_HEADER")}</CardText>
          <CardText>{t("PT_DOC_REQ_SCREEN_TEXT")}</CardText>
          <CardText>{t("PT_DOC_REQ_SCREEN_SUB_TEXT")}</CardText>
          <CardSubHeader>{t("PT_DOC_REQ_SCREEN_LABEL")}</CardSubHeader>
          <CardText>{t("PT_DOC_REQ_SCREEN_LABEL_TEXT")}</CardText>
          <div>
            {Array.isArray(docs)
              ? docs.map(({ code, dropdownData }, index) => (
                  <div key={index}>
                    <CardSubHeader>
                      {index + 1}. {t("PROPERTYTAX_" + stringReplaceAll(code, ".", "_") + "_HEADING")}
                    </CardSubHeader>
                    {dropdownData.map((dropdownData) => (
                      <CardText>{t("PROPERTYTAX_" + stringReplaceAll(dropdownData?.code, ".", "_") + "_LABEL")}</CardText>
                    ))}
                  </div>
                ))
              : console.log("error")}
          </div>
          <span>
            <SubmitBar label="Next" onSubmit={onSelect} />
          </span>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default PropertyTax;
