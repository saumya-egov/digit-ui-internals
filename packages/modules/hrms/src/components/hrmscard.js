import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRightInbox, PropertyHouse } from "@egovernments/digit-ui-react-components";

const ArrowRight = ({ to }) => (
  <Link to={to}>
    <ArrowRightInbox />
  </Link>
);

const HRMSCard = () => {
  const { t } = useTranslation();
  // TODO: should be fetch
  const total = 1;

  return (
    <div className="employeeCard card-home">
      <div className="complaint-links-container">
        <div className="header">
          <span className="logo">
            <PropertyHouse />
          </span>
          <span className="text">{t("HRMS")}</span>
        </div>
        <div className="body">
          <div className="flex-fit">
            <div>
              <div>
                <span className="inbox-total">{" " + total || "-"}</span>
              </div>
              <div>
                <Link>{t("TOTAL_EMPLOYEES")}</Link>
              </div>
            </div>
            <div>
              <div>
                <span className="inbox-total">{" " + total || "-"}</span>
              </div>
              <div>
                <Link>{t("ACTIVE_EMPLOYEES")}</Link>
              </div>
            </div>
          </div>
          <span className="link">
            <Link to={`/digit-ui/employee/hrms/search`}>{t("HR_HOME_SEARCH_RESULTS_HEADING")}</Link>
          </span>
          <span className="link">
            <Link to={`/digit-ui/employee/hrms/create`}>{t("HR_COMMON_CREATE_EMPLOYEE_HEADER")}</Link>
          </span>
          <span className="link">
            <Link to={`/digit-ui/employee/hrms/reports`}>{t("HR_HOME_REPORTS_HEADING")}</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HRMSCard;
