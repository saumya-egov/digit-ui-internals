import React, { useState } from "react";
import { TypeSelectCard, RadioButtons, FormStep, CitizenInfoLabel } from "@egovernments/digit-ui-react-components";

const PropertyFloorsDetails = ({ t, config, onSelect, formData }) => {
  const [FloorDetails, setFloorDetails] = useState(formData?.noOfFloors);

  const menu = [
    {
      //i18nKey: "Ground Floor Only",
      i18nKey: "PT_GROUND_FLOOR_OPTION",
    },
    {
      //i18nKey: "Ground +1",
      i18nKey: "PT_GROUND_PLUS_ONE_OPTION",
    },
    {
      //i18nKey: "Ground +2",
      i18nKey: "PT_GROUND_PLUS_TWO_OPTION",
    },
  ];

  const onSkip = () => onSelect();

  function selectFloorDetails(value) {
    setFloorDetails(value);
  }

  function goNext() {
    onSelect(config.key, FloorDetails);
  }

  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!FloorDetails} isMultipleAllow={true}>
        <RadioButtons
          t={t}
          optionsKey="i18nKey"
          isMandatory={config.isMandatory}
          options={menu}
          selectedOption={FloorDetails}
          onSelect={selectFloorDetails}
        />
      </FormStep>
      {FloorDetails && <CitizenInfoLabel info={t("CS_FILE_APPLICATION_INFO_LABEL")} text={t("PT_FLOOR_NUMBER_INFO_MSG", FloorDetails)} />}
    </React.Fragment>
  );
};

export default PropertyFloorsDetails;
