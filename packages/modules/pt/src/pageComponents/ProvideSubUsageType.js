import React, { useState, useEffect } from "react";
import { FormStep, RadioOrSelect, RadioButtons, CardLabel } from "@egovernments/digit-ui-react-components";

const ProvideSubUsageType = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const [SubUsageType, setSelfOccupied] = useState(formData?.ProvideSubUsageType);

  useEffect(() => {
    if (userType !== "employee" && formData?.usageCategoryMajor?.i18nKey === "PROPERTYTAX_BILLING_SLAB_RESIDENTIAL") {
      //selectPropertyPurpose({i18nKey : "RESIDENTAL"})
      let index = window.location.href.charAt(window.location.href.length - 1);
      onSelect(config.key, { i18nKey: "PROPERTYTAX_BILLING_SLAB_RESIDENTIAL" }, true, index);
    }
  }, [formData?.usageCategoryMajor?.i18nKey]);

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
    onSelect(config.key, SubUsageType, "", index);
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!SubUsageType}>
      <CardLabel>{t("Types of Floor Usage")}</CardLabel>
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        options={data}
        selectedOption={SubUsageType}
        onSelect={selectSelfOccupied}
      />
    </FormStep>
  );
};

export default ProvideSubUsageType;
