import React, { useEffect, useState } from "react";
import { FormStep, TextInput, CardLabel, RadioButtons, LabelFieldPair } from "@egovernments/digit-ui-react-components";
import { cardBodyStyle } from "../utils";

const SelectOwnerDetails = ({ t, config, onSelect, userType, formData }) => {
  let index = window.location.href.charAt(window.location.href.length - 1);
  let validation = {};
  const [name, setName] = useState(formData.owners && formData.owners[index] && formData.owners[index].name);
  const [email, setEmail] = useState((formData.owners && formData.owners[index] && formData.owners[index].email) || "");
  const [gender, setGender] = useState(formData.owners && formData.owners[index] && formData.owners[index].gender);
  const [mobileNumber, setMobileNumber] = useState(formData.owners && formData.owners[index] && formData.owners[index].mobileNumber);
  const [fatherOrHusbandName, setFatherOrHusbandName] = useState(
    formData.owners && formData.owners[index] && formData.owners[index].fatherOrHusbandName
  );
  const [relationship, setRelationship] = useState(formData.owners && formData.owners[index] && formData.owners[index].relationship);

  function setOwnerName(e) {
    setName(e.target.value);
  }
  function setOwnerEmail(e) {
    setEmail(e.target.value);
  }
  function setGenderName(value) {
    setGender(value);
  }
  function setMobileNo(e) {
    setMobileNumber(e.target.value);
  }
  function setGuardiansName(e) {
    setFatherOrHusbandName(e.target.value);
  }
  function setGuardianName(value) {
    setRelationship(value);
  }

  const goNext = () => {
    let owner = formData.owners && formData.owners[index];
    let ownerStep = { ...owner, name, gender, mobileNumber, fatherOrHusbandName, relationship, email };
    onSelect(config.key, ownerStep, false, index);
  };

  const onSkip = () => onSelect();

  const options = [
    { value: "Female", code: "PT_FORM3_FEMALE", value: "FEMALE", code: "FEMALE" },
    { value: "Male", code: "PT_FORM3_MALE", value: "MALE", code: "MALE" },
    { value: "Transgender", code: "PT_COMMON_GENDER_TRANSGENDER", value: "TRANSGENDER", code: "TRANSGENDER" },
  ];

  const GuardianOptions = [
    { name: "Father", code: "FATHER", i18nKey: "PT_RELATION_FATHER" },
    { name: "Husband", code: "HUSBAND", i18nKey: "PT_RELATION_HUSBAND" },
  ];

  useEffect(() => {
    if (userType === "employee") {
      goNext();
    }
  }, [name, gender, mobileNumber, fatherOrHusbandName, relationship]);

  if (userType === "employee") {
    return (
      <div>
        <LabelFieldPair>
          <CardLabel>{`${t("PT_FORM3_MOBILE_NUMBER")}*`}</CardLabel>
          <div className="field">
            <TextInput
              type={"text"}
              t={t}
              isMandatory={false}
              optionKey="i18nKey"
              name="mobileNumber"
              value={mobileNumber}
              onChange={setMobileNo}
              {...(validation = {
                isRequired: true,
                pattern: "[6-9]{1}[0-9]{9}",
                type: "tel",
                title: t("CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID"),
              })}
            />
          </div>
        </LabelFieldPair>
        {/* <LabelFieldPair>
          <CardLabel>{`${t("PT_OWNER_NAME")}*`}</CardLabel>
          <div className="field">
            <TextInput
              t={t}
              type={"text"}
              isMandatory={false}
              optionKey="i18nKey"
              name="name"
              value={name}
              onChange={setOwnerName}
              {...(validation = {
                isRequired: true,
                pattern: "^[a-zA-Z-.`' ]*$",
                type: "tel",
                title: t("PT_NAME_ERROR_MESSAGE"),
              })}
            />
          </div>
        </LabelFieldPair> */}
        <LabelFieldPair>
          <CardLabel>{`${t("PT_FORM3_GUARDIAN_NAME")}*`}</CardLabel>
          <div className="field">
            <TextInput
              t={t}
              type={"text"}
              isMandatory={false}
              optionKey="i18nKey"
              name="fatherOrHusbandName"
              value={fatherOrHusbandName}
              onChange={setGuardiansName}
              {...(validation = {
                isRequired: true,
                pattern: "^[a-zA-Z-.`' ]*$",
                type: "tel",
                title: t("PT_NAME_ERROR_MESSAGE"),
              })}
            />
          </div>
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel>{`${t("PT_FORM3_RELATIONSHIP")}*`}</CardLabel>
          <div className="field">
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
            />
          </div>
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel>{`${t("PT_FORM3_GENDER")}*`}</CardLabel>
          <div className="field">
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
            />
          </div>
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel>{`${t("PT_OWNER_EMAIL")}*`}</CardLabel>
          <div className="field">
            <TextInput
              t={t}
              type={"email"}
              isMandatory={false}
              optionKey="i18nKey"
              name="email"
              value={email}
              onChange={setOwnerEmail}
              {...(validation = {
                isRequired: true,
                pattern: "^[a-zA-Z-.`' ]*$",
                type: "tel",
                title: t("PT_EMAIL_ERROR_MESSAGE"),
              })}
            />
          </div>
        </LabelFieldPair>
      </div>
    );
  }

  return (
    <FormStep
      config={config}
      onSelect={goNext}
      onSkip={onSkip}
      t={t}
      isDisabled={!name || !mobileNumber || !gender || !relationship || !fatherOrHusbandName}
    >
      <div style={cardBodyStyle}>
        <CardLabel>{`${t("PT_OWNER_NAME")}*`}</CardLabel>
        <TextInput
          t={t}
          type={"text"}
          isMandatory={false}
          optionKey="i18nKey"
          name="name"
          value={name}
          onChange={setOwnerName}
          {...(validation = {
            isRequired: true,
            pattern: "^[a-zA-Z-.`' ]*$",
            type: "tel",
            title: t("PT_NAME_ERROR_MESSAGE"),
          })}
        />
        <CardLabel>{`${t("PT_FORM3_GENDER")}*`}</CardLabel>
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
        />
        <CardLabel>{`${t("PT_FORM3_MOBILE_NUMBER")}*`}</CardLabel>
        <TextInput
          type={"text"}
          t={t}
          isMandatory={false}
          optionKey="i18nKey"
          name="mobileNumber"
          value={mobileNumber}
          onChange={setMobileNo}
          {...(validation = {
            isRequired: true,
            pattern: "[6-9]{1}[0-9]{9}",
            type: "tel",
            title: t("CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID"),
          })}
        />
        <CardLabel>{`${t("PT_FORM3_GUARDIAN_NAME")}*`}</CardLabel>
        <TextInput
          t={t}
          type={"text"}
          isMandatory={false}
          optionKey="i18nKey"
          name="fatherOrHusbandName"
          value={fatherOrHusbandName}
          onChange={setGuardiansName}
          {...(validation = {
            isRequired: true,
            pattern: "^[a-zA-Z-.`' ]*$",
            type: "tel",
            title: t("PT_NAME_ERROR_MESSAGE"),
          })}
        />
        <CardLabel>{`${t("PT_FORM3_RELATIONSHIP")}*`}</CardLabel>
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
        />
      </div>
    </FormStep>
  );
};

export default SelectOwnerDetails;
