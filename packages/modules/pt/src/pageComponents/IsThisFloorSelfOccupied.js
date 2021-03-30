import React, { useState } from "react";
import { FormStep, RadioOrSelect, RadioButtons } from "@egovernments/digit-ui-react-components";

const IsThisFloorSelfOccupied = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const [selfOccupied, setSelfOccupied] = useState(formData?.IsThisFloorSelfOccupied);

  const data = [
    {
      i18nKey: "Yes, It is fully Self Occupied",
    },
    {
      i18nKey: "Partially rented out",
    },
    {
      i18nKey: "Fully rented out",
    },
  ];
  const onSkip = () => onSelect();

  function selectSelfOccupied(value) {
    setSelfOccupied(value);
  }

  function goNext() {
    let index = window.location.href.charAt(window.location.href.length - 1);
    sessionStorage.setItem("IsThisFloorSelfOccupied", selfOccupied.i18nKey);
    onSelect(config.key, selfOccupied, false, index);
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!selfOccupied}>
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        options={data}
        selectedOption={selfOccupied}
        onSelect={selectSelfOccupied}
      />
    </FormStep>
  );
};

export default IsThisFloorSelfOccupied;
