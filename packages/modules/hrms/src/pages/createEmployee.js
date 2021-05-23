import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FormComposer } from "@egovernments/digit-ui-react-components";
import { Dropdown, DatePicker, RadioButtons } from "@egovernments/digit-ui-react-components";
const CreateEmployee = ({ parentUrl }) => {

  const { t } = useTranslation();
  const [canSubmit, setSubmitValve] = useState(true);
  const [gender, setGenderName] = useState('')
  const [selectedEmployeeType, selectEmployeeType] = useState(null)
  const [date, setmDate]=useState(new Date());
  const tenantId =  Digit.ULBService.getCurrentTenantId()
  const { isLoading: hookLoading, isError, error, data, ...rest } = Digit.Hooks.hrms.useHrmsMDMS(
    tenantId
  );

  useEffect(()=>{
    console.log(selectedEmployeeType)
  },[selectedEmployeeType])

  const options = [
    {
      code: "MALE",
      name: "COMMON_GENDER_MALE"
    },
    {
      code: "FEMALE",
      name: "COMMON_GENDER_FEMALE"
    },
    {
      code: "TRANSGENDER",
      name: "COMMON_GENDER_TRANSGENDER"
    }
  ]
  console.log(data?.MdmsRes?.["egov-hrms"]?.EmployeeType)

  const onSubmit = (data) => {
  };

  const config = [
    {
      head: t("HR_PERSONAL_DETAILS_FORM_HEADER"),
      body: [
        {
          label: t("HR_NAME_LABEL"),
          isMandatory: true,
          type: "text",
          populators: {
            name: "name",
            validation: {
              required: true,
              pattern: /^[A-Za-z]/,
            },
            error: t("CS_ADDCOMPLAINT_NAME_ERROR"),
          },
        },
        {
          label: t("HR_MOB_NO_LABEL"),
          isMandatory: true,
          type: "text",
          populators: {
            name: "name",
            validation: {
              required: true,
              pattern: /^[A-Za-z]/,
            },
            error: t("CS_ADDCOMPLAINT_NAME_ERROR"),
          },
        },
        {
          label: t("HR_GUARDIAN_NAME_LABEL"),
          isMandatory: true,
          type: "text",
          populators: {
            name: "name",
            validation: {
              required: true,
              pattern: /^[A-Za-z]/,
            },
            error: t("CS_ADDCOMPLAINT_NAME_ERROR"),
          },
        },
        {
          label: t("HR_GENDER_LABEL"),
          type: "radio",
          name: "Gender",
          isMandatory: true,
          populators: <RadioButtons
            t={t}
            options={options}
            optionsKey="code"
            name="gender"
            value={gender}
            selectedOption={gender}
            onSelect={setGenderName}
            isDependent={true}
            labelKey="HR_GENDER_LABEL"
          />,
        },
        {
          label: t("HR_EMAIL_LABEL"),
          isMandatory: true,
          type: "text",
          populators: {
            name: "name",
            validation: {
              required: true,
              pattern: /^[A-Za-z]/,
            },
            error: t("CS_ADDCOMPLAINT_NAME_ERROR"),
          },
        },
        {
          label: t("HR_CORRESPONDENCE_ADDRESS_LABEL"),
          isMandatory: true,
          type: "text",
          populators: {
            name: "name",
            validation: {
              required: true,
              pattern: /^[A-Za-z]/,
            },
            error: t("CS_ADDCOMPLAINT_NAME_ERROR"),
          },
        },
      ],
    },
    {
      head: t("HR_PROFESSIONAL_DETAILS_FORM_HEADER"),
      body: [
        {
          label: t("HR_EMPLOYMENT_TYPE_LABEL"),
          type: "dropdown",
          isMandatory: true,
          name: "EmployeeType",
          populators: (
            <Dropdown isMandatory   optionKey="code" selected={selectedEmployeeType} id="code" option={data?.MdmsRes?.["egov-hrms"]?.EmployeeType} select={selectEmployeeType} t={t} />
          ),
        },
        {
          label: t("HR_APPOINTMENT_DATE_LABEL"),
          type: "date",
          name: "fromDate",
          isMandatory: true,
          populators: <DatePicker date={date} onChange={setmDate} />,
        },
        {
          label: t("HR_EMPLOYEE_ID_LABEL"),
          isMandatory: true,
          type: "text",
          populators: {
            name: "name",
            validation: {
              required: true,
              pattern: /^[A-Za-z]/,
            },
            error: t("CS_ADDCOMPLAINT_NAME_ERROR"),
          },
        },
        {
          type: "component",
          component: "Jurisdictions",
          key: "jurisdictions",
          withoutLabel: true,
        },
      ]
    }
  ];

  return <FormComposer heading={t("HR_COMMON_CREATE_EMPLOYEE_HEADER")} config={config} onSubmit={onSubmit} isDisabled={!canSubmit} label={t("UC_ECHALLAN")} />;
};
export default CreateEmployee;
