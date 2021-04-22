import React, { useEffect, useState } from "react";
import { FormStep, RadioButtons, CardLabel, LabelFieldPair, Dropdown, TextInput, LinkButton } from "@egovernments/digit-ui-react-components";

const Units = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [units, setUnits] = useState([
    {
      key: 1,
      floorNo: null,
      occupancyType: null,
      tenantId,
      usageCategory: null,
      arv: null,
    },
  ]);
  console.log("%c ♌: Units -> units ", "font-size:16px;background-color:#705b68;color:white;", units);
  const [BuildingType, setBuildingType] = useState(formData?.Units);
  const stateId = tenantId.split(".")[0];
  const { data: Menu = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "PTPropertyType") || {};
  const [focusIndex, setFocusIndex] = useState(-1);

  const onSkip = () => onSelect();

  // const propertyOwnerShipCategory = Digit.Hooks.pt.useMDMS("pb", "PropertyTax", "OwnerShipCategory", {});
  function selectBuildingType(value) {
    setBuildingType(value);
  }

  function goNext() {
    // onSelect(config.key, BuildingType);
  }

  const handleAddUnit = () => {
    setUnits((prev) => [
      ...prev,
      {
        key: prev.length + 1,
        floorNo: null,
        occupancyType: null,
        tenantId,
        usageCategory: null,
        arv: null,
      },
    ]);
  };

  useEffect(() => {
    goNext();
  }, []);

  const data = [{ i18nKey: "a" }, { i18nKey: "b" }];

  const Unit = ({ unit, setUnits, index, focusIndex, setFocusIndex }) => {
    return (
      <div>
        <div className="label-field-pair">
          <h2 className="card-label card-label-smaller" style={{ color: "#505A5F" }}>
            Unit {unit?.key}
          </h2>
        </div>
        <div style={{ border: "1px solid #E3E3E3", padding: "16px", marginTop: "8px" }}>
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">Floor Number:</CardLabel>
            <Dropdown
              className="form-field"
              selected={unit?.floorNo}
              disable={false}
              option={data}
              select={(value) => {
                setUnits((pre) => pre.map((item) => (item.key === unit.key ? { ...item, floorNo: value } : item)));
              }}
              optionKey="i18nKey"
              t={t}
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">Unit Sub Usage:</CardLabel>
            <Dropdown
              className="form-field"
              selected={unit?.occupancyType}
              disable={false}
              option={data}
              select={(value) => {
                setUnits((pre) => pre.map((item) => (item.key === unit.key ? { ...item, occupancyType: value } : item)));
              }}
              optionKey="i18nKey"
              t={t}
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">Unit Occupancy Type:</CardLabel>
            <Dropdown
              className="form-field"
              selected={unit?.usageCategory}
              disable={false}
              option={data}
              select={(value) => {
                setUnits((pre) => pre.map((item) => (item.key === unit.key ? { ...item, usageCategory: value } : item)));
              }}
              optionKey="i18nKey"
              t={t}
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">Unit Build Up Area</CardLabel>
            <div className="field">
              <TextInput
                type="text"
                name="unit-area"
                onChange={(e) => {
                  setUnits((pre) => pre.map((item) => (item.key === unit.key ? { ...item, arv: e.target.value } : item)));
                  setFocusIndex(index);
                }}
                value={unit?.arv}
                autoFocus={focusIndex === index}
              />
            </div>
          </LabelFieldPair>
        </div>
      </div>
    );
  };

  return (
    <div>
      {units?.map((unit, index) => (
        <Unit key={unit.key} unit={unit} setUnits={setUnits} index={index} focusIndex={focusIndex} setFocusIndex={setFocusIndex} />
      ))}
      <LinkButton label="Add Unit" onClick={handleAddUnit} style={{ color: "orange" }}></LinkButton>
    </div>
  );
};
export default Units;
