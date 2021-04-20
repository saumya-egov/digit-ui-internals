import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormComposer } from "@egovernments/digit-ui-react-components";
import { useHistory } from "react-router-dom";
import { newConfig } from "../../../config/Create/config";

const NewApplication = ({ parentUrl, heading }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const history = useHistory();
  const [canSubmit, setSubmitValve] = useState(false);
  const defaultValues = {};
  const onFormValueChange = (setValue, formData) => {
    console.log("%c 🌧️: onFormValueChange -> formData ", "font-size:16px;background-color:#25ab81;color:white;", formData);
    if (
      formData?.address?.city?.code &&
      formData?.address?.locality?.code &&
      formData?.usageCategoryMajor?.code &&
      formData?.usageCategoryMinor?.subuagecode &&
      formData?.PropertyType?.code &&
      formData?.units &&
      formData?.noOfFloors?.i18nKey &&
      formData?.owners?.code
    ) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  };

  const onSubmit = (data) => {
    console.log("%c 🎯: onSubmit -> data ", "font-size:16px;background-color:#75bbab;color:white;", data);
  };
  const configs = newConfig;

  return (
    <FormComposer
      heading={t("ES_TITLE_NEW_PROPERTY_APPLICATION")}
      isDisabled={!canSubmit}
      label={t("ES_COMMON_APPLICATION_SUBMIT")}
      config={configs.map((config) => {
        return {
          ...config,
          body: config.body.filter((a) => !a.hideInEmployee),
        };
      })}
      fieldStyle={{ marginRight: 0 }}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      onFormValueChange={onFormValueChange}
    />
  );
};

export default NewApplication;
