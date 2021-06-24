import React from "react";
import { UploadFile, Dropdown } from "@egovernments/digit-ui-react-components";
import { convertEpochToDate } from "../Utils/index";

export const configEmployeeActiveApplication = ({ t, action, selectFile, uploadedFile, setUploadedFile, selectedReason, Reasons, selectReason }) => {
  return {
    label: {
      heading: `HR_ACTIVATE_EMPLOYEE_HEAD`,
      submit: `HR_ACTIVATE_EMPLOYEE_HEAD`,
    },
    form: [
      {
        body: [
          {
            label: t("HR_ACTIVATION_REASON"),
            type: "dropdown",
            isMandatory: true,
            name: "reasonForDeactivation",
            populators: <Dropdown isMandatory selected={selectedReason} optionKey="i18key" option={Reasons} select={selectReason} t={t} />,
          },
          {
            label: t("HR_ORDER_NO"),
            type: "text",
            populators: {
              name: "orderNo",
            },
          },

          {
            label: t("HR_EFFECTIVE_DATE"),
            type: "date",
            isMandatory: true,
            populators: {
              error: t("HR_EFFECTIVE_DATE_INVALID"),
              name: "effectiveFrom",
              max: convertEpochToDate(new Date().toJSON().slice(0, 10).replace(/-/g, "/")),
            },
          },
          {
            label: t("HR_APPROVAL_UPLOAD_HEAD"),
            populators: (
              <div style={{ marginBottom: "2rem" }}>
                <span>{t("TL_APPROVAL_UPLOAD_SUBHEAD")}</span>
                <UploadFile
                  accept="image/*, .pdf, .png, .jpeg"
                  onUpload={selectFile}
                  onDelete={() => {
                    setUploadedFile(null);
                  }}
                  message={uploadedFile ? `1 ${t(`HR_ACTION_FILEUPLOADED`)}` : t(`HR_ACTION_NO_FILEUPLOADED`)}
                />
              </div>
            ),
          },

          {
            label: t("HR_REMARKS"),
            type: "text",
            populators: {
              name: "remarks",
            },
          },
        ],
      },
    ],
  };
};
