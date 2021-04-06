import React from "react";
import { UploadFile } from "@egovernments/digit-ui-react-components";

export const configPTRejectApplication = ({ t, action, selectFile, uploadedFile, setUploadedFile }) => {
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
            label: t("ES_PT_ACTION_COMMENTS"),
            type: "textarea",
            populators: {
              name: "comments",
            },
          },
          {
            label: t("ES_PT_UPLOAD_FILE"),
            populators: (
              <UploadFile
                // accept=".jpg"
                onUpload={selectFile}
                onDelete={() => {
                  setUploadedFile(null);
                }}
                message={uploadedFile ? `1 ${t(`CS_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`)}
              />
            ),
          },
        ],
      },
    ],
  };
};
