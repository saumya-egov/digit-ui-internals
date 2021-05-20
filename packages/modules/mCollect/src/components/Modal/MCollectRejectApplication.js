import React from "react";

export const configMCollectRejectApplication = ({ t, action }) => {
  return {
    label: {
      heading: `ES_PT_ACTION_TITLE_${action}`,
      submit: `ES_PT_COMMON_${action}`,
      cancel: "ES_PT_COMMON_CANCEL",
    },
    form: [
      {
        body: [
          {
            label: t("ES_PT_ACTION_COMMENTS"),
            type: "textarea",
            populators: {
              name: "comments",
            },
          }
        ],
      },
    ],
  };
};
