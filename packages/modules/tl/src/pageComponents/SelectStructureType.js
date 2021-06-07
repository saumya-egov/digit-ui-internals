import React, { useState } from "react";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";
import { FormStep, RadioOrSelect, RadioButtons } from "@egovernments/digit-ui-react-components";

const SelectStructureType = ({ t, config, onSelect, userType, formData }) => {
  const [StructureType, setStructureType] = useState(formData?.TradeDetails?.StructureType);
  const menu = [
    { i18nKey: "TL_COMMON_YES", code: "YES" },
    { i18nKey: "TL_COMMON_NO", code: "NO" },
  ];

  const onSkip = () => onSelect();

  // const propertyOwnerShipCategory = Digit.Hooks.pt.useMDMS("pb", "PropertyTax", "OwnerShipCategory", {});
  function selectStructuretype(value) {
    setStructureType(value);
  }

  function goNext() {
    sessionStorage.setItem("StructureType", StructureType.i18nKey);
    onSelect(config.key, { StructureType });
    //onSelect("usageCategoryMajor", { i18nKey: "PROPERTYTAX_BILLING_SLAB_RESIDENTIAL" });
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!StructureType}>
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        options={menu}
        selectedOption={StructureType}
        onSelect={selectStructuretype}
      />
    </FormStep>
  );
};
export default SelectStructureType;
