import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Card, DownloadIcon, TextInput, CardCaption, CardLabel, EllipsisMenu, SearchIconSvg } from "@egovernments/digit-ui-react-components";
import { useReactToPrint } from "react-to-print";

const SearchImg = () => {
  return <SearchIconSvg className="signature-img" />;
};

const GenericChart = ({ header, className, caption, children, showSearch = false, showDownload = false, onChange }) => {
  const { t } = useTranslation();

  const chart = useRef();

  const handlePrint = useReactToPrint({
    content: () => chart.current,
  });

  function download(data) {
    setTimeout(() => {
      if (data.code === "pdf") handlePrint();
      if (data.code === "image") Digit.Download.Image(chart, t(header));
    }, 500);
  }

  return (
    <Card className={`chart-item ${className}`} ReactRef={chart}>
      <div className="chartHeader">
        <CardLabel style={{ fontWeight: "bold" }}>{`${t(header)}`}</CardLabel>
        <div className="sideContent">
          {showSearch && <TextInput className="searchInput" placeholder="Search" signature={true} signatureImg={<SearchImg />} onChange={onChange} />}
          {showDownload && <DownloadIcon className="mrlg" onClick={handlePrint} />}
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
            onSelect={(data) => download(data)}
          />
        </div>
      </div>
      {caption && <CardCaption>{caption}</CardCaption>}
      {children}
    </Card>
  );
};

export default GenericChart;
