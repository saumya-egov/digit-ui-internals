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

  const isUpdateProperty = formData?.isUpdateProperty || false;
  let isEditProperty = formData?.isEditProperty || false;
  const { pathname: url } = useLocation();
  const editScreen = url.includes("/modify-application/");

  function selectAccessory(value) {
    setAccessory(value);
  }
  function selectAccessoryCount(e) {
    setAccessoryCount(e.target.value);
  }
  function selectUnitOfMeasure(e) {
    setUnitOfMeasure(e.target.value);
  }
  function selectUomValue(e) {
    setUomValue(e.target.value);
  }

  const goNext = () => {
    let units = formData.TradeDetails.Units;
    let unitsdata;

    unitsdata = { Accessory, AccessoryCount, UnitOfMeasure, UomValue };
    console.log(unitsdata);
    debugger;
    onSelect(config.key, unitsdata);
  };

  const onSkip = () => onSelect();
  // As Ticket RAIN-2619 other option in gender and gaurdian will be enhance , dont uncomment it
  const options = [
    { name: "Goods", value: "GOODS", code: "GOODS" },
    { name: "Services", value: "SERVICES", code: "SERVICES" },
    // { name: "Other", value: "OTHER", code: "OTHER" },
  ];

  const GuardianOptions = [
    { name: "HUSBAND", code: "HUSBAND", i18nKey: "PT_RELATION_HUSBAND" },
    { name: "Father", code: "FATHER", i18nKey: "PT_RELATION_FATHER" },
    // { name: "Husband/Wife", code: "HUSBANDWIFE", i18nKey: "PT_RELATION_HUSBANDWIFE" },
    // { name: "Other", code: "OTHER", i18nKey: "PT_RELATION_OTHER" },
  ];

  /* useEffect(() => {
    if (userType === "employee") {
      goNext();
    }
  }, [name, gender, mobileNumber, fatherOrHusbandName, relationship]);

  if (userType === "employee") {
    return (
      <div>
        <LabelFieldPair>
          <CardLabel style={editScreen ? { color: "#B1B4B6" } : {}}>{`${t("PT_FORM3_MOBILE_NUMBER")}`}</CardLabel>
          <div className="field">
            <TextInput
              type={"text"}
              t={t}
              isMandatory={false}
              name="mobileNumber"
              value={mobileNumber}
              onChange={setMobileNo}
              {...(validation = {
                isRequired: true,
                pattern: "[6-9]{1}[0-9]{9}",
                type: "tel",
                title: t("CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID"),
              })}
              disable={editScreen}
            />
          </div>
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel style={editScreen ? { color: "#B1B4B6" } : {}}>{`${t("PT_OWNER_NAME")}`}</CardLabel>
          <div className="field">
            <TextInput
              t={t}
              type={"text"}
              isMandatory={false}
              name="name"
              value={name}
              onChange={setOwnerName}
              {...(validation = {
                isRequired: true,
                pattern: "^[a-zA-Z-.`' ]*$",
                type: "tel",
                title: t("PT_NAME_ERROR_MESSAGE"),
              })}
              disable={editScreen}
            />
          </div>
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel style={editScreen ? { color: "#B1B4B6" } : {}}>{`${t("PT_FORM3_GUARDIAN_NAME")}`}</CardLabel>
          <div className="field">
            <TextInput
              t={t}
              type={"text"}
              isMandatory={false}
              name="fatherOrHusbandName"
              value={fatherOrHusbandName}
              onChange={setGuardiansName}
              {...(validation = {
                pattern: "^[a-zA-Z-.`' ]*$",
                type: "tel",
                title: t("PT_NAME_ERROR_MESSAGE"),
              })}
              disable={editScreen}
            />
          </div>
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel style={editScreen ? { color: "#B1B4B6" } : {}}>{`${t("PT_FORM3_RELATIONSHIP")}`}</CardLabel>
          <Dropdown
            className="form-field"
            selected={relationship?.length === 1 ? relationship[0] : relationship}
            disable={relationship?.length === 1 || editScreen}
            option={GuardianOptions}
            select={setGuardianName}
            optionKey="i18nKey"
            t={t}
            name="relationship"
          />
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel style={editScreen ? { color: "#B1B4B6" } : {}}>{`${t("PT_FORM3_GENDER")}`}</CardLabel>
          <Dropdown
            className="form-field"
            selected={gender?.length === 1 ? gender[0] : gender}
            disable={gender?.length === 1 || editScreen}
            option={options}
            select={setGenderName}
            optionKey="code"
            t={t}
            name="gender"
          />
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel style={editScreen ? { color: "#B1B4B6" } : {}}>{`${t("PT_OWNER_EMAIL")}`}</CardLabel>
          <div className="field">
            <TextInput
              t={t}
              type={"email"}
              isMandatory={false}
              optionKey="i18nKey"
              name="email"
              value={email}
              onChange={setOwnerEmail}
              disable={editScreen}
            />
          </div>
        </LabelFieldPair>
      </div>
    );
  } */

  return (
    <FormStep
      config={config}
      onSelect={goNext}
      onSkip={onSkip}
      t={t}
      //isDisabled={!name || !mobileNumber || !gender }
    >
      <div style={cardBodyStyle}>
        <CardLabel>{`${t("TL_ACCESSORY_LABEL")}`}</CardLabel>
        <RadioOrSelect
          t={t}
          optionKey="i18nKey"
          isMandatory={config.isMandatory}
          options={[{ i18nKey: "a" }, { i18nKey: "a" }, { i18nKey: "a" }, { i18nKey: "a" }, { i18nKey: "a" }, { i18nKey: "a" }]}
          selectedOption={Accessory}
          onSelect={selectAccessory}
        />
        <CardLabel>{`${t("TL_ACCESSORY_COUNT_LABEL")}`}</CardLabel>
        <TextInput
          t={t}
          type={"text"}
          isMandatory={false}
          optionKey="i18nKey"
          name="AccessoryCount"
          value={AccessoryCount}
          onChange={selectAccessoryCount}
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
          value={UnitOfMeasure}
          onChange={selectUnitOfMeasure}
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
          value={UomValue}
          onChange={selectUomValue}
          //disable={isUpdateProperty || isEditProperty}
          /* {...(validation = {
            isRequired: true,
            pattern: "^[a-zA-Z-.`' ]*$",
            type: "text",
            title: t("PT_NAME_ERROR_MESSAGE"),
          })} */
        />
        {/* <CardLabel>{`${t("PT_FORM3_GENDER")}`}</CardLabel>
        <RadioButtons
          t={t}
          options={options}
          optionsKey="code"
          name="gender"
          value={gender}
          selectedOption={gender}
          onSelect={setGenderName}
          isDependent={true}
          labelKey="PT_COMMON_GENDER"
          disabled={isUpdateProperty || isEditProperty}
        />
        <CardLabel>{`${t("PT_FORM3_MOBILE_NUMBER")}`}</CardLabel>
        <TextInput
          type={"text"}
          t={t}
          isMandatory={false}
          optionKey="i18nKey"
          name="mobileNumber"
          value={mobileNumber}
          onChange={setMobileNo}
          disable={isUpdateProperty || isEditProperty}
          {...(validation = {
            isRequired: true,
            pattern: "[6-9]{1}[0-9]{9}",
            type: "tel",
            title: t("CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID"),
          })}
        /> */}
        {/*   <CardLabel>{`${t("PT_FORM3_GUARDIAN_NAME")}`}</CardLabel>
        <TextInput
          t={t}
          type={"text"}
          isMandatory={false}
          optionKey="i18nKey"
          name="fatherOrHusbandName"
          value={fatherOrHusbandName}
          onChange={setGuardiansName}
          disable={isUpdateProperty || isEditProperty}
          {...(validation = {
            isRequired: true,
            pattern: "^[a-zA-Z-.`' ]*$",
            type: "text",
            title: t("PT_NAME_ERROR_MESSAGE"),
          })}
        />
        <CardLabel>{`${t("PT_FORM3_RELATIONSHIP")}`}</CardLabel>
        <RadioButtons
          t={t}
          optionsKey="i18nKey"
          name="relationship"
          options={GuardianOptions}
          value={relationship}
          selectedOption={relationship}
          onSelect={setGuardianName}
          isDependent={true}
          labelKey="PT_RELATION"
          disabled={isUpdateProperty || isEditProperty}
        /> */}
      </div>
    </FormStep>
  );
};

export default SelectAccessoriesDetails;
