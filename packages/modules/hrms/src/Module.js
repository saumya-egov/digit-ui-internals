import React, { useEffect } from "react";
import { Switch, useRouteMatch, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PrivateRoute } from "@egovernments/digit-ui-react-components";
import Inbox from "./pages/Inbox";
import HRMSCard from "./components/hrmscard";
import CreateEmployee from "./pages/createEmployee";
import Details from "./pages/details";

export const HRMSModule = ({ userType, tenants }) => {
  const mobileView = innerWidth <= 640;
  const location = useLocation();
  const { t } = useTranslation();

  const inboxInitialState = {
    searchParams: {
      uuid: { code: "ASSIGNED_TO_ALL", name: "ES_INBOX_ASSIGNED_TO_ALL" },
      services: ["PT.CREATE"],
      applicationStatus: [],
      locality: [],
    },
  };
  const moduleCode = "HRMSmodule";
  console.log(moduleCode, "module integrated");
  Digit.SessionStorage.set("HRMS_TENANTS", tenants);

  const { path, url } = useRouteMatch();

  console.log(userType);
  if (userType === "employee") {
    return (
      <Switch>
        <React.Fragment>
          <div className="ground-container">
            <p className="breadcrumb" style={{ marginLeft: mobileView ? "2vw" : "revert" }}>
              <Link to="/digit-ui/employee" style={{ cursor: "pointer", color: "#666" }}>
                {t("HRMS")}
              </Link>{" "}
              / <span>{location.pathname === "/digit-ui/employee/hrms/inbox" ? t("HR_COMMON_HEADER") : "HRMS"}</span>
            </p>
            <PrivateRoute exact path={`${path}/`} component={() => <MCollectLinks matchPath={path} userType={userType} />} />
            <PrivateRoute
              path={`${path}/inbox`}
              component={() => (
                <Inbox
                  parentRoute={path}
                  businessService="PT"
                  filterComponent="MCOLLECT_INBOX_FILTER"
                  initialStates={inboxInitialState}
                  isInbox={true}
                />
              )}
            />
            <PrivateRoute path={`${path}/create`} component={() => <CreateEmployee />} />
          </div>
        </React.Fragment>
      </Switch>
    );
  } else return <div></div>;
};

export const HRMSLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Details />
    </React.Fragment>
  );
};

const componentsToRegister = {
  HRMSCard,
  HRMSModule,
  HRMSLinks,
  // MCOLLECT_INBOX_FILTER: (props) => <InboxFilter {...props} />,
};

export const initHRMSComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
