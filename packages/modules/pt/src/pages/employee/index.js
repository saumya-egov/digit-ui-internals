import React from "react";
import { PTLinks } from "../../Module";
import Inbox from "./Inbox";
import { Switch, useLocation, Link } from "react-router-dom";
import { PrivateRoute } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import NewApplication from "./NewApplication";
import ApplicationDetails from "./ApplicationDetails";
import PropertyDetails from "./PropertyDetails";
import AssessmentDetails from "./AssessmentDetails";

const EmployeeApp = ({ path, url, userType }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const mobileView = innerWidth <= 640;
  return (
    <Switch>
      <React.Fragment>
        <div className="ground-container">
          <p className="breadcrumb" style={{ marginLeft: mobileView ? "2vw" : "revert" }}>
            <Link to="/digit-ui/employee" style={{ cursor: "pointer", color: "#666" }}>
              {t("ES_COMMON_HOME")}
            </Link>{" "}
            / <span>{location.pathname === "/digit-ui/employee/pt/inbox" ? t("ES_TITLE_INBOX") : "PT"}</span>
          </p>
          <PrivateRoute exact path={`${path}/`} component={() => <PTLinks matchPath={path} userType={userType} />} />
          <PrivateRoute path={`${path}/inbox`} component={() => <Inbox parentRoute={path} isInbox={true} />} />
          <PrivateRoute path={`${path}/new-application`} component={() => <NewApplication parentUrl={url} />} />
          <PrivateRoute path={`${path}/application-details/:id`} component={() => <ApplicationDetails parentRoute={path} />} />
          <PrivateRoute path={`${path}/property-details/:id`} component={() => <PropertyDetails parentRoute={path} />} />
          <PrivateRoute path={`${path}/assessment-details/:id`} component={() => <AssessmentDetails parentRoute={path} />} />
          {/* <PrivateRoute path={`${path}/modify-application/:id`} component={() => <EditApplication />} /> */}
          {/* <PrivateRoute path={`${path}/application-details/:id`} component={() => <EmployeeApplicationDetails parentRoute={path} />} /> */}
          {/* <PrivateRoute path={`${path}/response`} component={(props) => <Response {...props} parentRoute={path} />} /> */}
          <PrivateRoute path={`${path}/search`} component={() => <Inbox parentRoute={path} isSearch={true} />} />
        </div>
      </React.Fragment>
    </Switch>
  );
};

export default EmployeeApp;
