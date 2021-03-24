import React from "react";
import { useTranslation } from "react-i18next";
import { CardSubHeader } from "@egovernments/digit-ui-react-components";
import { PDFSvg } from "../../pages/employee/ApplicationDetails/index";

function PropertyDocuments({ documents }) {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: "19px" }}>
      {documents?.map((document) => (
        <React.Fragment>
          <CardSubHeader style={{ marginBottom: "8px", color: "#505A5F", fontSize: "24px" }}>{t(document?.title)}</CardSubHeader>
          <div style={{ display: "flex" }}>
            {document?.values?.map((value) => (
              <div style={{ minWidth: "160px" }}>
                <PDFSvg width={140} height={140} style={{ background: "#f6f6f6", padding: "8px" }} />
                <p style={{ marginTop: "8px" }}>{value?.title}</p>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default PropertyDocuments;
