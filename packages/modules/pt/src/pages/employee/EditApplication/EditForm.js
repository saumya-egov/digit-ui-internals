import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormComposer, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { newConfig } from "../../../config/Create/config";

const EditForm = ({ applicationData }) => {
  console.log("%c 🚢: EditForm -> applicationData ", "font-size:16px;background-color:#970815;color:white;", applicationData);
  const { t } = useTranslation();
  const history = useHistory();
  const [canSubmit, setSubmitValve] = useState(false);

  const defaultValues = {
    ...applicationData,
    address: {
      pincode: applicationData.address.pincode,
      locality: {
        ...applicationData.address.locality,
        i18nkey: `${applicationData.tenantId.toUpperCase().split(".").join("_")}_REVENUE_${applicationData.address.locality.code}`,
      },
      slum: applicationData.address.slumName,
      street: applicationData.address.street,
      doorNo: applicationData.address.doorNo,
      landmark: applicationData.address.landmark,
    },
    PropertyType: applicationData?.propertyType,
    owners: { ...applicationData?.owners[0] },
  };

  const onFormValueChange = (setValue, formData) => {
    console.log("find form data here", formData);
    if (1 === "1") {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  };

  const onSubmit = (data) => {
    console.log("%c 🛒: onSubmit -> data ", "font-size:16px;background-color:#070614;color:white;", data);

    const formData = {
      ...applicationData,
    };

    history.replace("/digit-ui/employee/pt/response", {
      applicationData: formData,
      key: "update",
      action: "SUBMIT",
    });
  };

  const configs = newConfig;

  return (
    <FormComposer
      heading={t("ES_TITLE_MODIFY_DESULDGING_APPLICATION")}
      isDisabled={!canSubmit}
      label={t("ES_FSM_APPLICATION_UPDATE")}
      config={configs.map((config) => {
        return {
          ...config,
          body: config.body.filter((a) => !a.hideInEmployee),
          mode: "UPDATE",
        };
      })}
      fieldStyle={{ marginRight: 0 }}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      onFormValueChange={onFormValueChange}
    />
  );
};

export default EditForm;
