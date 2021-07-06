import React from "react";
import { Dropdown, UploadFile } from "@egovernments/digit-ui-react-components";

export const configTLApproverApplication = ({
  t,
  action,
  approvers,
  selectedApprover,
  setSelectedApprover,
  selectFile,
  uploadedFile,
  setUploadedFile,
  assigneeLabel,
  businessService,
}) => {
   let checkCondtions = true;
   if (action?.action == "SENDBACKTOCITIZEN") checkCondtions = false;
   if (action.isTerminateState) checkCondtions = false;

  return {
    label: {
      heading: `WF_${action?.action}_APPLICATION`,
      submit: `WF_${businessService?.toUpperCase()}_${action?.action}`,
      cancel: "ES_PT_COMMON_CANCEL",
    },
    form: [
      {
        body: [
          {
            label: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_LABEL"),
            placeholder: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_PLACEHOLDER"),
            isMandatory: checkCondtions,
            type: "dropdown",
            populators: !checkCondtions ? null : (
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
            label: t("WF_COMMON_COMMENTS"),
            type: "textarea",
            populators: {
              name: "comments",
            },
          },
          {
            label: t("ES_PT_UPLOAD_FILE"),
            populators:  (
              <UploadFile
                // accept=".jpg"
                onUpload={selectFile}
                onDelete={() => {
                  setUploadedFile(null);
                }}
                message={uploadedFile ? `1 ${t(`ES_PT_ACTION_FILEUPLOADED`)}` : t(`ES_PT_ACTION_NO_FILEUPLOADED`)}
              />
            )
          },
        //   {
        //     label: action.docUploadRequired ? t("ES_PT_UPLOAD_FILE") : null,
        //     populators: action.docUploadRequired ? (
        //       <UploadFile
        //         // accept=".jpg"
        //         onUpload={selectFile}
        //         onDelete={() => {
        //           setUploadedFile(null);
        //         }}
        //         message={uploadedFile ? `1 ${t(`ES_PT_ACTION_FILEUPLOADED`)}` : t(`ES_PT_ACTION_NO_FILEUPLOADED`)}
        //       />
        //     ) : null,
        //   },
        ],
      },
    ],
  };
};
