import React, { useState, useEffect } from "react";
import { FormStep, Dropdown, Loader, CardLabel } from "@egovernments/digit-ui-react-components";

const SelectPitType = ({ t, config, onSelect, value }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [sanitationMenu, setSanitationMenu] = useState([]);
  const [pitType, setPitType] = useState(null);
  const sanitationTypeData = Digit.Hooks.fsm.useMDMS(tenantId, "FSM", "SanitationType");

  useEffect(() => {
    if (!sanitationTypeData.isLoading) {
      const data = sanitationTypeData.data?.map((type) => ({ ...type, i18nKey: `ES_APPLICATION_DETAILS_SANITATION_TYPE_${type.code}` }));

      setSanitationMenu(data);
    }
  }, [sanitationTypeData]);

  const selectPitType = (value) => {
    setPitType({ pitType: value });
  };

  const onSkip = () => {
    onSelect();
  };

  if (sanitationTypeData.isLoading) {
    return <Loader />;
  }

  return (
    <FormStep config={config} onSelect={(data) => onSelect(data)} onSkip={onSkip} t={t}>
      <CardLabel>{t("CS_FILE_COMPLAINT_PIT_TYPE_LABEL")}</CardLabel>
      <Dropdown isMandatory option={sanitationMenu} optionKey="i18nKey" select={selectPitType} />
    </FormStep>
  );
};

export default SelectPitType;
