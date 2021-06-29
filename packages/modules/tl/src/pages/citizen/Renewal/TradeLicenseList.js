import { Card, KeyNote, SubmitBar } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import {convertEpochToDate} from "../../../utils/index";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const TradeLicenseList = ({ application }) => {
  sessionStorage.setItem("isDirectRenewal",true);
    const history = useHistory();
    console.log(Array.isArray(application?.tradeLicenseDetail?.owners));
    const owners = application?.tradeLicenseDetail?.owners;
  const { t } = useTranslation();

  const onsubmit = () => {
    sessionStorage.setItem("tl-trade", JSON.stringify(application));
    history.push(`/digit-ui/citizen/tl/tradelicence/edit-application/action-edit/${application.applicationNumber}`);
  }
  return (
    <Card>
      <KeyNote keyValue={t("TL_LOCALIZATION_TRADE_NAME")} note={application.tradeName} />
        <KeyNote keyValue={t("TL_LOCALIZATION_OWNER_NAME")} note={owners.map((owners,index) => (
            <div key="index">{index == owners.length - 1 ? owners?.name + "," : owners.name}</div>
        ))}/>
      <KeyNote keyValue={t("TL_LOCALIZATION_LICENSE_STATUS")} note={application.status === "APPROVED"?t("TL_ACTIVE_STATUS_MSG")+" "+convertEpochToDate(application.validTo):t("TL_EXPIRED_STATUS_MSG")+convertEpochToDate(application.validTo)+" "+t("TL_EXPIRED_STATUS_MSG_1")} />
      {/* <KeyNote keyValue={t("PT_COMMON_TABLE_COL_APP_TYPE")} note={(application?.creationReason && t(`PT.${application.creationReason}`)) || "NA"} /> */}
      {/* <KeyNote keyValue={t("PT_COMMON_TABLE_COL_STATUS_LABEL")} note={t(`PT_COMMON_${application?.status}`)} /> */}
      {/* <Link to={`/digit-ui/citizen/pt/property/application/${application?.acknowldgementNumber}`}> */}
        <SubmitBar label={t("TL_RENEW_LABEL")} onSubmit={onsubmit} />
      {/* </Link> */}
    </Card>
  );
};

export default TradeLicenseList;