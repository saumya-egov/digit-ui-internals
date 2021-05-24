import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormComposer } from "@egovernments/digit-ui-react-components";
import { newConfig } from "../components/config/config"
const CreateEmployee = () => {
  const [canSubmit, setSubmitValve] = useState(false);
  const { t } = useTranslation();




  const onSubmit = (data) => {
  };

  const config = newConfig;
  console.log(config)

  return <FormComposer heading={t("HR_COMMON_CREATE_EMPLOYEE_HEADER")} config={config} onSubmit={onSubmit} isDisabled={!canSubmit} label={t("UC_ECHALLAN")} />;
};
export default CreateEmployee;
