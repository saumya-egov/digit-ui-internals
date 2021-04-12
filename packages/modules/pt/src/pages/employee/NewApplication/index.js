import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormComposer } from "@egovernments/digit-ui-react-components";
import { useHistory } from "react-router-dom";

const NewApplication = ({ parentUrl, heading }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const history = useHistory();
  const [canSubmit, setSubmitValve] = useState(false);
  const defaultValues = {};
  const onFormValueChange = (setValue, formData) => {};
  const onSubmit = (data) => {};
  const configs = [];

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
