import React, { useState } from "react";
const CreateEmployee = ({ parentUrl }) => {
  const [canSubmit, setSubmitValve] = useState(true);

  const onSubmit = (data) => {};

  const config = [
    {
      head: t("CONSUMERDETAILS"),
      body: [
        {
          label: t("UC_CONS_NAME_LABEL"),
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
  ];

  return <FormComposer heading={t("UC_COMMON_HEADER")} config={config} onSubmit={onSubmit} isDisabled={!canSubmit} label={t("UC_ECHALLAN")} />;
};
export default CreateEmployee;
