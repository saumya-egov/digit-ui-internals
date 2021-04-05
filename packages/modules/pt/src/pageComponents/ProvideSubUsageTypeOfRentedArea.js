import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, RadioButtons } from "@egovernments/digit-ui-react-components";

const ProvideSubUsageTypeOfRentedArea = ({ t, config, onSelect, userType, formData }) => {
  let index = window.location.href.charAt(window.location.href.length - 1);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  //const [SubUsageTypeOfRentedArea, setSelfOccupied] = useState(formData?.ProvideSubUsageTypeOfRentedArea);
  let SubUsageTypeOfRentedArea, setSelfOccupied;
  if (!isNaN(index)) {
    [SubUsageTypeOfRentedArea, setSelfOccupied] = useState(
      (formData.units && formData.units[index] && formData.units[index].SubUsageTypeOfRentedArea) || ""
    );
  } else {
    [SubUsageTypeOfRentedArea, setSelfOccupied] = useState(formData.Subusagetypeofrentedarea?.SubUsageTypeOfRentedArea || "");
  }
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
    let index = window.location.href.charAt(window.location.href.length - 1);
    if (userType !== "employee" && formData?.usageCategoryMajor?.i18nKey == "PROPERTYTAX_BILLING_SLAB_OTHERS") {
      //selectPropertyPurpose({i18nKey : "RESIDENTAL"})
      //let index = window.location.href.charAt(window.location.href.length - 1);
      //onSelect(config.key, { i18nKey: "COMMON_PROPSUBUSGTYPE_NONRESIDENTIAL_OTHERS_CREMATION/BURIAL" }, true, index);
      if (!isNaN(index)) {
        let index = window.location.href.charAt(window.location.href.length - 1);
        let unit = formData.units && formData.units[index];
        onSelect(config.key, unit, true, index);
      } else {
        onSelect(config.key, { i18nKey: "COMMON_PROPSUBUSGTYPE_NONRESIDENTIAL_OTHERS_CREMATION/BURIAL" }, true, index);
      }
    }
  }, [!isNaN(index) ? formData?.units[index]?.SubUsageTypeOfRentedArea?.i18nKey : formData?.SubUsageTypeOfRentedArea?.i18nKey]);

  useEffect(() => {
    if (userType !== "employee" && formData?.usageCategoryMajor?.i18nKey === "PROPERTYTAX_BILLING_SLAB_RESIDENTIAL") {
      //selectPropertyPurpose({i18nKey : "RESIDENTAL"})
      let index = window.location.href.charAt(window.location.href.length - 1);
      //onSelect(config.key, { i18nKey: "PROPERTYTAX_BILLING_SLAB_RESIDENTIAL" }, true, index);
      if (!isNaN(index)) {
        let index = window.location.href.charAt(window.location.href.length - 1);
        let unit = formData.units && formData.units[index];
        onSelect(config.key, unit, true, index);
      } else {
        onSelect(config.key, { i18nKey: "PROPERTYTAX_BILLING_SLAB_RESIDENTIAL" }, true, index);
      }
    }
  });

  useEffect(() => {
    if (userType !== "employee" && formData?.IsThisFloorSelfOccupied?.i18nKey === "Yes, It is fully Self Occupied") {
      //selectPropertyPurpose({i18nKey : "RESIDENTAL"})
      if (!isNaN(index)) {
        let index = window.location.href.charAt(window.location.href.length - 1);
        let unit = formData.units && formData.units[index];
        onSelect(config.key, unit, true, index);
      } else {
        onSelect(config.key, {}, true, index);
      }
    }
  });

  /* const data = [
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
  ]; */
  const onSkip = () => onSelect();

  function selectSelfOccupied(value) {
    setSelfOccupied(value);
  }

  function goNext() {
    if (!isNaN(index)) {
      let unit = formData.units && formData.units[index];
      let floordet = { ...unit, SubUsageTypeOfRentedArea };
      //let index = window.location.href.charAt(window.location.href.length - 1);
      onSelect(config.key, floordet, "", index);
    } else {
      onSelect("Subusagetypeofrentedarea", { SubUsageTypeOfRentedArea });
    }
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!SubUsageTypeOfRentedArea}>
      <CardLabel>{t("Types of Floor Usage")}</CardLabel>
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        //options={data}
        options={getSubUsagedata(subusageoption) || {}}
        selectedOption={SubUsageTypeOfRentedArea}
        onSelect={selectSelfOccupied}
      />
    </FormStep>
  );
};

export default ProvideSubUsageTypeOfRentedArea;
