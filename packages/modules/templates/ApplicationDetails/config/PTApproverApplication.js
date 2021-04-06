import React from "react";
import { Dropdown } from "@egovernments/digit-ui-react-components";

export const configPTApproverApplication = ({ t, action, approvers, selectedApprover, setSelectedApprover }) => {
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
                option={approvers}
                autoComplete="off"
                optionKey="name"
                id="fieldInspector"
                select={setSelectedApprover}
                selected={selectedApprover}
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
