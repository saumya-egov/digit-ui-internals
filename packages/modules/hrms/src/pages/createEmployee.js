import React from "react";
import { useTranslation } from "react-i18next";
import { FormComposer } from "@egovernments/digit-ui-react-components";
const CreateEmployee = () => {

  const { t } = useTranslation();




  const onSubmit = (data) => {
  };

  const config = [
    {
      head: t("HR_PERSONAL_DETAILS_FORM_HEADER"),
      body: [
      ]
    }
  ];

  return <FormComposer heading={t("HR_COMMON_CREATE_EMPLOYEE_HEADER")} config={config} onSubmit={onSubmit} isDisabled={!canSubmit} label={t("UC_ECHALLAN")} />;
};
export default CreateEmployee;
