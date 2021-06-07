import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, CitizenInfoLabel } from "@egovernments/digit-ui-react-components";

const SelectTradeName = ({ t, config, onSelect, value, userType, formData }) => {
  //let index = window.location.href.charAt(window.location.href.length - 1);
  let index = window.location.href.split("/").pop();
  let validation = {};
  const onSkip = () => onSelect();
  const [TradeName, setTradeName] = useState(formData.TradeDetails?.TradeName);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  //const { data: Menu, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "RentalDetails");

  /* if (Menu) {
    config.texts.cardText = Menu?.PropertyTax?.RentalDetails[0]?.code
      ? `PT_ASSESSMENT_FLOW_RENTAL_DETAIL_${Menu?.PropertyTax?.RentalDetails[0]?.code}`
      : "";
  } */

  /*  useEffect(() => {
    if (userType !== "employee" && formData?.IsThisFloorSelfOccupied?.i18nKey === "PT_YES_IT_IS_SELFOCCUPIED") {
      //selectPropertyPurpose({i18nKey : "RESIDENTAL"})
      /* let index = window.location.href.charAt(window.location.href.length - 1);
      let unit = formData.units && formData.units[index];
      onSelect(config.key, unit, true, index); 

      if (!isNaN(index)) {
        //let index = window.location.href.charAt(window.location.href.length - 1);
        let index = window.location.href.split("/").pop();
        let unit = formData.units && formData.units[index];
        onSelect(config.key, unit, true, index);
      } else {
        onSelect(config.key, {}, true, index);
      }
    }
  }); */

  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }

  const goNext = () => {
    onSelect(config.key, { TradeName });
  };
  //const onSkip = () => onSelect();

  return (
    <React.Fragment>
      <FormStep
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        //forcedError={t(unitareaerror) || t(areanotzeroerror)}
        t={t}
        //isDisabled={unitareaerror || areanotzeroerror || !RentArea || !AnnualRent}
        //showErrorBelowChildren={true}
      >
        <CardLabel>{`${t("Trade Name")}`}</CardLabel>
        <TextInput
          t={t}
          isMandatory={false}
          type={"text"}
          optionKey="i18nKey"
          name="TradeName"
          value={TradeName}
          onChange={setSelectTradeName}
          /*         {...(validation = { pattern: "^([0-9]){0,8}$", type: "number", title: t("PT_RENT_AREA_ERROR_MESSAGE") })}
           */
        />
      </FormStep>
      {<CitizenInfoLabel info={t("CS_FILE_APPLICATION_INFO_LABEL")} text={t("TL_LICENSE_ISSUE_YEAR_INFO_MSG")} />}
    </React.Fragment>
  );
};

export default SelectTradeName;
