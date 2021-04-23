import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormComposer } from "@egovernments/digit-ui-react-components";
import { newConfig } from "../../../config/Create/config";

const NewApplication = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const [canSubmit, setSubmitValve] = useState(false);
  const defaultValues = {};
  const onFormValueChange = (setValue, formData) => {
    console.log("%c 🌧️: onFormValueChange -> formData ", "font-size:16px;background-color:#25ab81;color:white;", formData);
    if (
      formData?.address?.city?.code &&
      formData?.address?.locality?.code &&
      formData?.PropertyType?.code &&
      formData?.ownershipCategory?.code &&
      formData?.owners?.name &&
      formData?.owners?.mobileNumber &&
      formData?.usageCategoryMajor?.code &&
      formData?.usageCategoryMinor?.subuagecode
    ) {
      if (formData?.ownershipCategory?.code !== "INDIVIDUAL.SINGLEOWNER" && formData?.owners?.altContactNumber) {
        if (formData?.PropertyType?.code !== "VACANT" && formData?.noOfFloors?.i18nKey) {
          setSubmitValve(true);
        } else if (formData?.PropertyType?.code === "VACANT" && formData?.landarea?.length > 0) {
          setSubmitValve(true);
        } else {
          setSubmitValve(false);
        }
      } else {
        setSubmitValve(false);
      }
    } else {
      setSubmitValve(false);
    }
  };

  const { mutate } = Digit.Hooks.pt.usePropertyAPI(tenantId);

  const onSubmit = (data) => {
    console.log("%c 🎯: onSubmit -> data ", "font-size:16px;background-color:#75bbab;color:white;", data);
    const formData = {
      tenantId,
      address: {
        ...data?.address,
        city: data?.address?.city?.name,
      },
      usageCategoryMajor: data?.usageCategoryMajor?.code,
      usageCategoryMinor: data?.usageCategoryMinor?.subuagecode,
      landArea: data?.landarea,
      propertyType: data?.PropertyType?.code,
      noOfFloors: data?.noOfFloors?.code,
      ownershipCategory: data?.ownershipCategory?.code,
      owners: [
        {
          ...data?.owners,
          ownerType: "NONE", // required
        },
      ],
      channel: "CFC_COUNTER", // required
      creationReason: "CREATE", // required
      source: "MUNICIPAL_RECORDS", // required
      usageCategory: data?.usageCategoryMajor?.code,
      superBuiltUpArea: data?.landarea,
      units: data?.units,
      // documents: [
      //   {
      //     documentType: "OWNER.ADDRESSPROOF.GASBILL",
      //     fileStoreId: "8bf79e21-7086-46e7-b453-102940281229",
      //     documentUid: "8bf79e21-7086-46e7-b453-102940281229",
      //   },
      //   {
      //     documentType: "OWNER.IDENTITYPROOF.DRIVING",
      //     fileStoreId: "ed947eb9-cd50-4d1e-aa53-e767ebf49ee6",
      //     documentUid: "ed947eb9-cd50-4d1e-aa53-e767ebf49ee6",
      //   },
      //   {
      //     documentType: "OWNER.REGISTRATIONPROOF.FAMILYSETTLEMENT",
      //     fileStoreId: "79634d5a-e203-4154-b541-9678cc194f54",
      //     documentUid: "79634d5a-e203-4154-b541-9678cc194f54",
      //   },
      //   {
      //     documentType: "OWNER.USAGEPROOF.ELECTRICITYBILL",
      //     fileStoreId: "2cace5f5-9249-41b1-b98a-d3a39510f4c9",
      //     documentUid: "2cace5f5-9249-41b1-b98a-d3a39510f4c9",
      //   },
      //   {
      //     documentType: "OWNER.CONSTRUCTIONPROOF.BPACERTIFICATE",
      //     fileStoreId: "a812a304-a734-46da-b03d-7290d40d0dd4",
      //     documentUid: "a812a304-a734-46da-b03d-7290d40d0dd4",
      //   },
      // ],
    };

    mutate(
      { Property: formData },
      {
        onError: (error, variables) => {
          console.log("%c 🔏: onSubmit -> error ", "font-size:16px;background-color:#b6d3e4;color:black;", error);
        },
        onSuccess: (data, variables) => {
          console.log("%c 👷‍♂️: onSubmit -> data ", "font-size:16px;background-color:#b76d44;color:white;", data);
        },
      }
    );
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
