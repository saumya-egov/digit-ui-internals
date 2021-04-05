import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput } from "@egovernments/digit-ui-react-components";

const RentalDetails = ({ t, config, onSelect, value, userType, formData }) => {
  let index = window.location.href.charAt(window.location.href.length - 1);
  const onSkip = () => onSelect();
  let UnOccupiedArea, setUnOccupiedArea;
  if (!isNaN(index)) {
    [UnOccupiedArea, setUnOccupiedArea] = useState(formData.units && formData.units[index] && formData.units[index].UnOccupiedArea);
  } else {
    [UnOccupiedArea, setUnOccupiedArea] = useState(formData?.UnOccupiedArea?.UnOccupiedArea);
  }

  useEffect(() => {
    let index = window.location.href.charAt(window.location.href.length - 1);
    if (userType !== "employee" && formData?.IsAnyPartOfThisFloorUnOccupied?.i18nKey === "No") {
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

  let validation = {};
  function setPropertyUnOccupiedArea(e) {
    setUnOccupiedArea(e.target.value);
  }

  const goNext = () => {
    if (!isNaN(index)) {
      let unit = formData.units && formData.units[index];
      //units["RentalArea"] = RentArea;
      //units["AnnualRent"] = AnnualRent;
      let floordet = { ...unit, UnOccupiedArea };
      onSelect(config.key, floordet, false, index);
    } else {
      onSelect("UnOccupiedArea", { UnOccupiedArea });
    }
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
      <TextInput
        t={t}
        isMandatory={false}
        type={"number"}
        optionKey="i18nKey"
        name="RentArea"
        value={UnOccupiedArea}
        onChange={setPropertyUnOccupiedArea}
        {...(validation = { pattern: "^([0-9]){0,8}$", type: "number", title: t("PT_BUILT_AREA_ERROR_MESSAGE") })}
      />
    </FormStep>
  );
};

export default RentalDetails;
