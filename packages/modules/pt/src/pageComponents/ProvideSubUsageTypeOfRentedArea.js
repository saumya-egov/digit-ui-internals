import React, { useState } from "react";
import { FormStep, CardLabel, RadioButtons } from "@egovernments/digit-ui-react-components";

const ProvideSubUsageTypeOfRentedArea = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const [SubUsageTypeOfRentedArea, setSelfOccupied] = useState(formData?.ProvideSubUsageTypeOfRentedArea);
  const { data: Menu, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OwnerType");

  const data = [
    {
      i18nKey: "Retail",
    },
    {
      i18nKey: "Medical",
    },
    {
      i18nKey: "Stationary",
    },
    {
      i18nKey: "Other",
    },
  ];
  const onSkip = () => onSelect();

  function selectSelfOccupied(value) {
    setSelfOccupied(value);
  }

  function goNext() {
    let index = window.location.href.charAt(window.location.href.length - 1);
    onSelect(config.key, SubUsageTypeOfRentedArea, "", index);
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!SubUsageTypeOfRentedArea}>
      <CardLabel>{t("Types of Floor Usage")}</CardLabel>
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        options={data}
        selectedOption={SubUsageTypeOfRentedArea}
        onSelect={selectSelfOccupied}
      />
    </FormStep>
  );
};

export default ProvideSubUsageTypeOfRentedArea;
