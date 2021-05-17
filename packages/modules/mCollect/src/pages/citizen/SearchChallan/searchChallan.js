import React, { useState, useEffect } from "react";
import { FormComposer, CardLabelDesc, Loader } from "@egovernments/digit-ui-react-components";
import { FormStep, CardLabel, RadioButtons, RadioOrSelect } from "@egovernments/digit-ui-react-components";
import { TextInput, LabelFieldPair, Dropdown } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchChallan = ({ config: propsConfig, formData }) => {
  const { t } = useTranslation();
  let validation = {};
  const history = useHistory();
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const [mobileNumber, setMobileNumber] = useState(formData?.mobileNumber || "");
  const [challanNo, setchallanNumber] = useState(formData?.challanNo || "");
  const [Servicecateogry, setServicecateogry] = useState(formData?.ServiceCategory || "");
  // moduleCode, type, config = {}, payload = []

  const onChallanSearch = async (data) => {
    history.push(`/digit-ui/citizen/mcollect/search-results`);
    /* if (!data.mobileNumber && !data.propertyId && !data.oldPropertyId) {
      return alert("Provide at least one parameter");
    } else {
      history.push(
        `/digit-ui/citizen/pt/property/search-results?mobileNumber=${data.mobileNumber}&propertyIds=${data.propertyId}&oldPropertyIds=${data.oldPropertyId}`
      );
    } */
  };

  function setMobileNo(e) {
    setMobileNumber(e.target.value);
  }

  function setchallanNo(e) {
    setchallanNumber(e.target.value);
  }

  function setServicecateogryvalue(value) {
    setServicecateogry(value);
  }

  return (
    <div style={{ marginTop: "16px" }}>
      {/* <FormComposer
        onSubmit={onChallanSearch}
        noBoxShadow
        inline
        submitInForm
        config={config}
        label={propsConfig.texts.submitButtonLabel}
        heading={propsConfig.texts.header}
        text={propsConfig.texts.text}
        cardStyle={{ margin: "auto" }}
        headingStyle={{ fontSize: "32px", marginBottom: "16px" }}
      > */}
      <FormStep
        config={propsConfig}
        label={propsConfig.texts.submitButtonLabel}
        heading={propsConfig.texts.header}
        text={propsConfig.texts.text}
        cardStyle={{ margin: "auto" }}
        headingStyle={{ fontSize: "32px", marginBottom: "16px" }}
        onSelect={onChallanSearch}
        componentInFront={<div className="employee-card-input employee-card-input--front">+91</div>}
        //onSkip={onSkip}
        t={t}
      >
        <CardLabel>{`${t("MCOLLECT_MOBILE_NO_LABEL")}`}</CardLabel>
        <TextInput
          type={"mobileNumber"}
          t={t}
          isMandatory={false}
          optionKey="i18nKey"
          name="mobileNumber"
          value={mobileNumber}
          onChange={setMobileNo}
          {...(validation = {
            isRequired: true,
            pattern: "[6-9]{1}[0-9]{9}",
            type: "tel",
            title: t("CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID"),
          })}
        />
        <CardLabel>{`${t("MCOLLECT_CHALLAN_NO_LABEL")}`}</CardLabel>
        <TextInput
          t={t}
          type={"any"}
          isMandatory={false}
          optionKey="i18nKey"
          name="ChallanNo"
          value={challanNo}
          onChange={setchallanNo}
          {...(validation = {
            isRequired: true,
            //pattern: "^[a-zA-Z-.`' ]*$",
            type: "any",
            title: t("wrong Challan No."),
          })}
        />
        <CardLabel>{`${t("ABG_SERVICE_CATEGORY_LABEL")}`}</CardLabel>
        <RadioOrSelect
          t={t}
          optionsKey="i18nKey"
          name="ServiceCategory"
          options={["option_1", "option 2", "option 3", "option 4", "option 5", "option 6", "option 7"]}
          value={Servicecateogry}
          selectedOption={Servicecateogry}
          onSelect={setServicecateogryvalue}
          //labelKey="PT_RELATION"
        />
      </FormStep>
    </div>
  );
};

SearchChallan.propTypes = {
  loginParams: PropTypes.any,
};

SearchChallan.defaultProps = {
  loginParams: null,
};

export default SearchChallan;
