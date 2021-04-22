import React, { useEffect, useState } from "react";
import { FormStep, RadioButtons, CardLabel, LabelFieldPair, Dropdown, TextInput, LinkButton } from "@egovernments/digit-ui-react-components";

const Units = ({ t, config, onSelect, userType, formData }) => {
  // const [BuildingType, setBuildingType] = useState(formData?. Units);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  // const { data: Menu = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "PTPropertyType") || {};

  const onSkip = () => onSelect();

  // const propertyOwnerShipCategory = Digit.Hooks.pt.useMDMS("pb", "PropertyTax", "OwnerShipCategory", {});
  // function selectBuildingType(value) {
  //   setBuildingType(value);
  // }

  function goNext() {
    // onSelect(config.key, BuildingType);
  }

  useEffect(() => {
    goNext();
  }, []);

  const Unit = () => {
    return (
      <div>
        <div className="label-field-pair">
          <h2 className="card-label card-label-smaller" style={{ color: "#505A5F" }}>
            Unit 1
          </h2>
        </div>
        <div style={{ border: "1px solid #E3E3E3", padding: "16px", marginTop: "8px" }}>
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">Floor Number:</CardLabel>
            <Dropdown className="form-field" selected={null} disable={false} option={[]} select={() => {}} optionKey="i18nKey" t={t} />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">Unit Sub Usage:</CardLabel>
            <Dropdown className="form-field" selected={null} disable={false} option={[]} select={() => {}} optionKey="i18nKey" t={t} />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">Unit Occupancy Type:</CardLabel>
            <Dropdown className="form-field" selected={null} disable={false} option={[]} select={() => {}} optionKey="i18nKey" t={t} />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">Unit Build Up Area</CardLabel>
            <div className="field">
              <TextInput name="unit-area" onChange={() => {}} value={null} />
            </div>
          </LabelFieldPair>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Unit />
      <LinkButton label="Add Unit" onClick={() => {}} style={{ color: "orange" }}></LinkButton>
    </div>
  );
};
export default Units;
