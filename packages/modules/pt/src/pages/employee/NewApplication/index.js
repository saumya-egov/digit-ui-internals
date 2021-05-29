import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormComposer, Toast } from "@egovernments/digit-ui-react-components";
import { newConfig } from "../../../config/Create/config";
import { useHistory } from "react-router-dom";

const NewApplication = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const [canSubmit, setSubmitValve] = useState(false);
  const defaultValues = {};
  const history = useHistory();

  const onFormValueChange = (setValue, formData, formState) => {
    console.log(formData, formState.errors, "in new application");
    setSubmitValve(!Object.keys(formState.errors).length);
  };

  const onSubmit = (data) => {
    const formData = {
      tenantId,
      address: {
        ...data?.address,
        city: data?.address?.city?.name,
        locality: { code: data?.address?.locality?.code, area: data?.address?.locality?.area },
      },
      usageCategory: data?.usageCategoryMajor.code,
      usageCategoryMajor: data?.usageCategoryMajor?.code.split(".")[0],
      usageCategoryMinor: data?.usageCategoryMajor?.code.split(".")[1] || null,
      landArea: data?.landarea,
      propertyType: data?.PropertyType?.code,
      noOfFloors: Number(data?.noOfFloors),
      ownershipCategory: data?.ownershipCategory?.code,
      owners: data?.owners.map((owner) => {
        const _owner = {
          ...owner,
          gender: owner?.gender.code,
          relationship: owner?.relationship.code,
          ownerType: owner?.ownerType?.code,
          permanentAddress: data?.address?.locality?.name,
        };
        if (_owner.ownerType !== "NONE") {
          const { documentType, documentUid } = owner?.documents;
          _owner.documents = [{ documentUid: documentUid, documentType: documentType.code, fileStoreId: documentUid }];
        } else delete _owner.documents;
        return _owner;
      }),

      channel: "CFC_COUNTER", // required
      creationReason: "CREATE", // required
      source: "MUNICIPAL_RECORDS", // required
      superBuiltUpArea: data?.landarea,
      units: data?.units[0]?.usageCategory ? data?.units : [],
      documents: data?.documents?.documents,
      applicationStatus: "CREATE",
    };

    history.push("/digit-ui/employee/pt/response", { Property: formData });
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
