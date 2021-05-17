import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Card, DownloadIcon, TextInput, CardCaption, CardLabel, EllipsisMenu, SearchIconSvg } from "@egovernments/digit-ui-react-components";
import FilterContext from "./FilterContext";

const SearchImg = () => {
  return <SearchIconSvg className="signature-img" />;
};

const GenericChart = ({ header, className, caption, children, showSearch = false, showDownload = false, onChange }) => {
  const { t } = useTranslation();

  const { value } = useContext(FilterContext);

  return (
    <Card className={`chart-item ${className}`}>
      <div className="chartHeader">
        <CardLabel style={{ fontWeight: "bold" }}>{`${t(header)}`}</CardLabel>
        <div className="sideContent">
          {showSearch && <TextInput className="searchInput" placeholder="Search" signature={true} signatureImg={<SearchImg />} onChange={onChange} />}
          {showDownload && <DownloadIcon className="mrlg" />}
          <EllipsisMenu
            menuItems={[
              {
                code: "pdf",
                i18nKey: "ES_COMMON_DOWNLOAD_PDF",
              },
              {
                code: "image",
                i18nKey: "ES_COMMON_DOWNLOAD_IMAGE",
              },
            ]}
            displayKey="i18nKey"
            onSelect={(data) => console.log(data)}
          />
        </div>
      </div>
      {caption && <CardCaption>{caption}</CardCaption>}
      {children}
    </Card>
  );
};

export default GenericChart;
