import React, { useEffect, useState } from "react";
import { FormStep, TextInput, CardLabel, RadioButtons, LabelFieldPair, Dropdown, RadioOrSelect } from "@egovernments/digit-ui-react-components";
import { cardBodyStyle } from "../utils";
import { useLocation } from "react-router-dom";

const SelectAccessoriesDetails = ({ t, config, onSelect, userType, formData }) => {
  let index = window.location.href.charAt(window.location.href.length - 1);
  let validation = {};
  const [Accessory, setAccessory] = useState(formData?.TadeDetails?.accessories?.Accessory || "");
  const [AccessoryCount, setAccessoryCount] = useState(formData?.TadeDetails?.accessories?.AccessoryCount || "");
  const [UnitOfMeasure, setUnitOfMeasure] = useState(formData?.TadeDetails?.accessories?.UnitOfMeasure || "");
  const [UomValue, setUomValue] = useState(formData?.TadeDetails?.accessories?.UomValue || "");
  const [fields, setFeilds] = useState([{ accessory: "", accessorycount: "", unit: null, uom: null }]);

  const isUpdateProperty = formData?.isUpdateProperty || false;
  let isEditProperty = formData?.isEditProperty || false;
  const { pathname: url } = useLocation();
  const editScreen = url.includes("/modify-application/");

  function handleAdd() {
    const values = [...fields];
    values.push({ accessory: "", accessorycount: "", unit: null, uom: null });
    setFeilds(values);
  }

  function selectAccessory(i, value) {
    let acc = [...fields];
    acc[i].accessory = value;
    setAccessory(value);
    setFeilds(acc);
  }
  function selectAccessoryCount(i, e) {
    let acc = [...fields];
    acc[i].accessorycount = e.target.value;
    setAccessoryCount(e.target.value);
    setFeilds(acc);
  }
  function selectUnitOfMeasure(i, e) {
    let acc = [...fields];
    acc[i].unit = e.target.value;
    setUnitOfMeasure(e.target.value);
    setFeilds(acc);
  }
  function selectUomValue(i, e) {
    let acc = [...fields];
    acc[i].uom = e.target.value;
    setUomValue(e.target.value);
    setFeilds(acc);
  }

  const goNext = () => {
    let data = formData.TradeDetails.Units;
    let formdata;

    formdata = { ...data, accessories: fields };
    // debugger;
    onSelect(config.key, formdata);
    // unitsdata = { Accessory, AccessoryCount, UnitOfMeasure, UomValue };
    // console.log(unitsdata);
    // debugger;
    // onSelect(config.key, unitsdata);
  };

  const onSkip = () => onSelect();
  // As Ticket RAIN-2619 other option in gender and gaurdian will be enhance , dont uncomment it
  const options = [
    { i18nKey: "TRADELICENSE_ACCESSORIESCATEGORY_ACC_1", code: "ACC.1" },
    { i18nKey: "TRADELICENSE_ACCESSORIESCATEGORY_ACC_2", code: "ACC.2" },
    { i18nKey: "TRADELICENSE_ACCESSORIESCATEGORY_ACC_3", code: "ACC.3" },
    { i18nKey: "TRADELICENSE_ACCESSORIESCATEGORY_ACC_4", code: "ACC.4" },
    { i18nKey: "TRADELICENSE_ACCESSORIESCATEGORY_ACC_5", code: "ACC.5" },
  ];

  return (
    <FormStep
      config={config}
      onSelect={goNext}
      onSkip={onSkip}
      t={t}
      //isDisabled={!name || !mobileNumber || !gender }
    >
      {fields.map((field, index) => {
        return (
          <div key={`${field}-${index}`}>
            <hr color="#d6d5d4" className="break-line"></hr>
            <CardLabel>{`${t("TL_ACCESSORY_LABEL")}`}</CardLabel>
            <RadioOrSelect
              t={t}
              optionKey="i18nKey"
              isMandatory={config.isMandatory}
              //options={[{ i18nKey: "a" }, { i18nKey: "a" }, { i18nKey: "a" }, { i18nKey: "a" }, { i18nKey: "a" }, { i18nKey: "a" }]}
              options={options}
              selectedOption={field.accessory}
              onSelect={(e) => selectAccessory(index, e)}
            />
            <CardLabel>{`${t("TL_ACCESSORY_COUNT_LABEL")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              isMandatory={false}
              optionKey="i18nKey"
              name="AccessoryCount"
              value={field.accessorycount}
              onChange={(e) => selectAccessoryCount(index, e)}
              //disable={isUpdateProperty || isEditProperty}
              /* {...(validation = {
            isRequired: true,
            pattern: "^[a-zA-Z-.`' ]*$",
            type: "text",
            title: t("PT_NAME_ERROR_MESSAGE"),
          })} */
            />
            <CardLabel>{`${t("TL_UNIT_OF_MEASURE_LABEL")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              isMandatory={false}
              optionKey="i18nKey"
              name="UnitOfMeasure"
              value={field.unit}
              onChange={(e) => selectUnitOfMeasure(index, e)}
              //disable={isUpdateProperty || isEditProperty}
              /* {...(validation = {
            isRequired: true,
            pattern: "^[a-zA-Z-.`' ]*$",
            type: "text",
            title: t("PT_NAME_ERROR_MESSAGE"),
          })} */
            />
            <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              isMandatory={false}
              optionKey="i18nKey"
              name="UomValue"
              value={field.uom}
              onChange={(e) => selectUomValue(index, e)}
              //disable={isUpdateProperty || isEditProperty}
              /* {...(validation = {
            isRequired: true,
            pattern: "^[a-zA-Z-.`' ]*$",
            type: "text",
            title: t("PT_NAME_ERROR_MESSAGE"),
          })} */
            />
          </div>
        );
      })}
      <hr color="#d6d5d4" className="break-line"></hr>
      <div style={{ justifyContent: "center", display: "flex", paddingBottom: "15px", color: "#FF8C00" }}>
        <button type="button" onClick={() => handleAdd()}>
          Add More Trade Accessories
        </button>
      </div>
    </FormStep>
  );
};

export default SelectAccessoriesDetails;
