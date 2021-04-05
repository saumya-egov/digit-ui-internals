import React from "react";
import { useTranslation } from "react-i18next";
import { CheckBox } from "@egovernments/digit-ui-react-components";

const StatusCount = ({ status, fsmfilters, onAssignmentChange, businessService }) => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { data } = Digit.Hooks.useInboxGeneral(
    {
      tenantId,
      businessService,
      filters: {
        applicationStatus: [status],
        total: true,
        uuid: { code: "ASSIGNED_TO_ME", name: t("ES_INBOX_ASSIGNED_TO_ME") },
        sortBy: "createdTime",
        sortOrder: "DESC",
      },
    },
    null
  );

  // console.log(businessService, "in status count");

  return (
    <CheckBox
      onChange={(e) => onAssignmentChange(e, status)}
      checked={fsmfilters?.applicationStatus.filter((e) => e.name === status.name).length !== 0 ? true : false}
      label={`${t(status.name)} (${data?.[0]?.totalCount ? data?.[0]?.totalCount : 0})`}
    />
  );
};

export default StatusCount;
