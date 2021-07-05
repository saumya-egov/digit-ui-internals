import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRightInbox, PropertyHouse } from "@egovernments/digit-ui-react-components";

const ArrowRight = ({ to }) => (
  <Link to={to}>
    <ArrowRightInbox />
  </Link>
);

const PTCard = () => {
  const { t } = useTranslation();
  // TODO: should be fetch
  const [total, setTotal] = useState("-");
  const { data, isFetching, isSuccess } = Digit.Hooks.useNewInboxGeneral({
    tenantId: Digit.ULBService.getCurrentTenantId(),
    ModuleCode: "PT",
    filters: { limit: 10, offset: 0, services: ["PT.CREATE"] },
    config: {
      select: (data) => {
        return data?.totalCount || "-";
      },
      enabled: Digit.Utils.ptAccess(),
    },
  });

  useEffect(() => {
    if (!isFetching && isSuccess) setTotal(data);
  }, [isFetching]);

  if (!Digit.Utils.ptAccess()) {
    return null;
  }

  return (
    <div className="employeeCard card-home">
      <div className="complaint-links-container">
        <div className="header">
          <span className="logo">
            <PropertyHouse />
          </span>
          <span className="text">{t("ES_TITLE_PROPERTY_TAX")}</span>
        </div>
        <div className="body">
          <span className="link">
            <Link to={`/digit-ui/employee/pt/inbox`}>{t("ES_TITLE_INBOX")}</Link>
            <span className="inbox-total">{" " + total || "-"}</span>
            {<ArrowRight to={`/digit-ui/employee/pt/inbox`} />}
          </span>
          <span className="link">
            <Link to={`/digit-ui/employee/pt/new-application`}>{t("ES_TITLE_NEW_REGISTRATION")}</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PTCard;
