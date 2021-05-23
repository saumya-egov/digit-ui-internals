import React from "react";
import { Switch, useRouteMatch, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PrivateRoute } from "@egovernments/digit-ui-react-components";
import Inbox from "./pages/Inbox";
import HRMSCard from "./components/hrmscard";
import CreateEmployee from "./pages/createEmployee";
import Jurisdictions from "../src/components/jurisdiction";
import InboxFilter from "./components/InboxFilter";

export const HRMSModule = ({ userType, tenants }) => {
  const mobileView = innerWidth <= 640;
  const location = useLocation();
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const inboxInitialState = {
    searchParams: {
      tenantId: tenantId,
    }
  };
  const moduleCode = "HRMSmodule";
  Digit.SessionStorage.set("HRMS_TENANTS", tenants);

  const { path, url } = useRouteMatch();

  if (userType === "employee") {
    return (<Switch>
      <React.Fragment>
        <div className="ground-container">
          <p className="breadcrumb" style={{ marginLeft: mobileView ? "2vw" : "revert" }}>
            <Link to="/digit-ui/employee" style={{ cursor: "pointer", color: "#666" }}>
              {t("HRMS")}
            </Link>{" "}
            / <span>{location.pathname === "/digit-ui/employee/hrms/inbox" ? t("HR_COMMON_HEADER") : "HRMS"}</span>
          </p>
          <PrivateRoute
            path={`${path}/inbox`}
            component={() => (
              <Inbox
                parentRoute={path}
                businessService="hrms"
                filterComponent="HRMS_INBOX_FILTER"
                initialStates={inboxInitialState}
                isInbox={true}
              />
            )}
          />
          <PrivateRoute path={`${path}/create`} component={() => <CreateEmployee />} />
        </div>
      </React.Fragment>
    </Switch>);
  } else return <div></div>;
};


const componentsToRegister = {
  HRMSCard,
  Jurisdictions,
  HRMSModule,
  HRMS_INBOX_FILTER: (props) => <InboxFilter {...props} />,
};

export const initHRMSComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
