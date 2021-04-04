import React, { useState } from "react";
import { FormStep, CardLabel, TextInput } from "@egovernments/digit-ui-react-components";

const Area = ({ t, config, onSelect, value, userType, formData }) => {
  console.log(formData);
  let index = window.location.href.charAt(window.location.href.length - 1);
  let validation = {};
  const onSkip = () => onSelect();
  let floorarea;
  let setfloorarea;
  if (!isNaN(index)) {
    [floorarea, setfloorarea] = useState(formData.units && formData.units[index] && formData.units[index].floorarea);
  } else {
    debugger;
    [floorarea, setfloorarea] = useState(formData.landarea?.floorarea);
  }

  function setPropertyfloorarea(e) {
    setfloorarea(e.target.value);
  }

  const goNext = () => {
    if (!isNaN(index)) {
      let unit = formData.units && formData.units[index];
      //units["RentalArea"] = RentArea;
      //units["AnnualRent"] = AnnualRent;
      let floordet = { ...unit, floorarea };
      onSelect(config.key, floordet, true, index);
    } else {
      onSelect("landarea", { floorarea });
    }
  };
  //const onSkip = () => onSelect();

  function onChange(e) {
    if (e.target.value.length > 1024) {
      setError("CS_COMMON_LANDMARK_MAX_LENGTH");
    } else {
      setError(null);
      setfloorarea(e.target.value);
      if (userType === "employee") {
        const value = e?.target?.value;
        const key = e?.target?.id;
        onSelect(key, value);
      }
    }
  }

  return (
    <FormStep config={config} onChange={onChange} onSelect={goNext} onSkip={onSkip} t={t} isDisabled={!floorarea}>
      <CardLabel>{`${t("PT_FLOOR_DETAILS_PLOT_SIZE_LABEL")}*`}</CardLabel>
      <TextInput
        t={t}
        type={"number"}
        isMandatory={false}
        optionKey="i18nKey"
        name="floorarea"
        value={floorarea}
        onChange={setPropertyfloorarea}
        {...(validation = { pattern: "^([0-9]){0,8}$", type: "number", title: t("PT_PLOT_SIZE_ERROR_MESSAGE") })}
      />
    </FormStep>
  );
};

export default Area;
