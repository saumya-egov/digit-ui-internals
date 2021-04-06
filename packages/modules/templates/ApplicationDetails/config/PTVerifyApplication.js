import React from "react";
import { Dropdown } from "@egovernments/digit-ui-react-components";

export const configPTVerifyApplication = ({ t, action, fieldInspectors, selectedFieldInspector, setSelectedFieldInspector }) => {
  return {
    label: {
      heading: `ES_PT_ACTION_TITLE_${action}`,
      submit: `CS_COMMON_${action}`,
      cancel: "CS_COMMON_CANCEL",
    },
    form: [
      {
        body: [
          {
            label: t("ES_PT_FIELD_INSPECTORS"),
            isMandatory: true,
            type: "dropdown",
            populators: (
              <Dropdown
                option={fieldInspectors}
                autoComplete="off"
                optionKey="name"
                id="fieldInspector"
                select={setSelectedFieldInspector}
                selected={selectedFieldInspector}
              />
            ),
          },
          {
            label: t("ES_PT_ACTION_COMMENTS"),
            type: "textarea",
            populators: {
              name: "comments",
            },
          },
        ],
      },
    ],
  };
};
