import React, { useState, useEffect } from "react";
import { FormStep, RadioOrSelect, RadioButtons, CardLabel } from "@egovernments/digit-ui-react-components";

const ProvideSubUsageType = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const [SubUsageType, setSelfOccupied] = useState(formData?.ProvideSubUsageType);
  const { data: Menu = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "UsageCategory") || {};

  let subusageoption = [];
  subusageoption = Menu?.PropertyTax?.UsageCategory || [];

  let i;
  let data = [];

  function getSubUsagedata(subusageoption) {
    for (i = 0; i < subusageoption.length; i++) {
      if (
        Array.isArray(subusageoption) &&
        subusageoption.length > 0 &&
        subusageoption[i].code.split(".")[1] == formData?.usageCategoryMajor.i18nKey.split("_")[3] &&
        subusageoption[i].code.split(".").length == 4
      ) {
        data.push({
          i18nKey:
            "COMMON_PROPSUBUSGTYPE_NONRESIDENTIAL_" +
            subusageoption[i].code.split(".")[1] +
            "_" +
            subusageoption[i].code.split(".")[subusageoption[i].code.split(".").length - 1],
        });
      }
    }
    return data;
  }

  useEffect(() => {
    if (userType !== "employee" && formData?.usageCategoryMajor?.i18nKey == "PROPERTYTAX_BILLING_SLAB_OTHERS") {
      //selectPropertyPurpose({i18nKey : "RESIDENTAL"})
      let index = window.location.href.charAt(window.location.href.length - 1);
      onSelect(config.key, { i18nKey: "COMMON_PROPSUBUSGTYPE_NONRESIDENTIAL_OTHERS_CREMATION/BURIAL" }, true, index);
    }
  }, [formData?.ProvideSubUsageType?.i18nKey]);

  useEffect(() => {
    if (userType !== "employee" && formData?.usageCategoryMajor?.i18nKey === "PROPERTYTAX_BILLING_SLAB_RESIDENTIAL") {
      //selectPropertyPurpose({i18nKey : "RESIDENTAL"})
      let index = window.location.href.charAt(window.location.href.length - 1);
      onSelect(config.key, { i18nKey: "PROPERTYTAX_BILLING_SLAB_RESIDENTIAL" }, true, index);
    }
  }, [formData?.usageCategoryMajor?.i18nKey]);

  /*  data = [
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
  ];  */
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
        //options={data}
        options={getSubUsagedata(subusageoption) || {}}
        selectedOption={SubUsageType}
        onSelect={selectSelfOccupied}
      />
    </FormStep>
  );
};

export default ProvideSubUsageType;
