export const configPTRejectApplication = ({ t, action }) => {
  return {
    label: {
      heading: `ES_FSM_ACTION_TITLE_${action}`,
      submit: `CS_COMMON_${action}`,
      cancel: "CS_COMMON_CANCEL",
    },
    form: [
      {
        body: [
          {
            label: t("ES_FSM_ACTION_COMMENTS"),
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
