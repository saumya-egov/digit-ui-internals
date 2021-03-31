import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput } from "@egovernments/digit-ui-react-components";

const RentalDetails = ({ t, config, onSelect, value, userType, formData }) => {
  let index = window.location.href.charAt(window.location.href.length - 1);
  const onSkip = () => onSelect();
  const [UnOccupiedArea, setUnOccupiedArea] = useState(formData.units && formData.units[index] && formData.units[index].UnOccupiedArea);

  useEffect(() => {
    let index = window.location.href.charAt(window.location.href.length - 1);
    if (userType !== "employee" && formData?.IsAnyPartOfThisFloorUnOccupied?.i18nKey === "No") {
      //selectPropertyPurpose({i18nKey : "RESIDENTAL"})
      onSelect(config.key, {}, true, index);
    }
  });

  function setPropertyUnOccupiedArea(e) {
    setUnOccupiedArea(e.target.value);
  }

  const goNext = () => {
    let unit = formData.units && formData.units[index];
    //units["RentalArea"] = RentArea;
    //units["AnnualRent"] = AnnualRent;
    let floordet = { ...unit, UnOccupiedArea };
    onSelect(config.key, floordet, false, index);
  };

  function onChange(e) {
    if (e.target.value.length > 1024) {
      setError("CS_COMMON_LANDMARK_MAX_LENGTH");
    } else {
      setError(null);
      setUnOccupiedArea(e.target.value);
      if (userType === "employee") {
        const value = e?.target?.value;
        const key = e?.target?.id;
        onSelect(key, value);
      }
    }
  }

  return (
    <FormStep config={config} onChange={onChange} onSelect={goNext} onSkip={onSkip} t={t} isDisabled={!UnOccupiedArea}>
      <CardLabel>{`${t("PT_FLOOR_DETAILS_RENTED_AREA_LABEL")}*`}</CardLabel>
      <TextInput t={t} isMandatory={false} optionKey="i18nKey" name="RentArea" value={UnOccupiedArea} onChange={setPropertyUnOccupiedArea} />
    </FormStep>
  );
};

export default RentalDetails;
