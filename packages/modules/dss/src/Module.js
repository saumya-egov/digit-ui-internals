import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import { useRouteMatch } from "react-router";
import { BackButton, Loader, PrivateRoute, BreadCrumb } from "@egovernments/digit-ui-react-components";
import DashBoard from "./pages";
import { Route, Switch, useRouteMatch, useLocation } from "react-router-dom";
import Overview from "./pages/Overview";
import DSSCard from "./components/DSSCard";

const DssBreadCrumb = ({ location }) => {
  const { t } = useTranslation();
  const crumbs = [
    {
      path: "/digit-ui/employee",
      content: t("ES_COMMON_HOME"),
      show: true,
    },
    {
      path: "/digit-ui/employee/dss/dashboard",
      content: t("ES_COMMON_DSS"),
      show: true,
    },
  ];

  return <BreadCrumb crumbs={crumbs} />
}

const Routes = ({ path }) => {
  const location = useLocation();
  return (
    <div className="chart-wrapper">
      <DssBreadCrumb location={location} />
      <Switch>
        <PrivateRoute path={`${path}/dashboard`} component={DashBoard} />
      </Switch>
    </div>
  );
};

const DSSModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "DSS";
  // const { path, url } = useRouteMatch();
  const state = useSelector((state) => state);
  const { path, url } = useRouteMatch();
  const language = state?.common?.selectedLanguage;
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  if (isLoading) {
    return <Loader />;
  }

  Digit.SessionStorage.set("DSS_TENANTS", tenants);

  if (userType !== "citizen") {
    return <Routes path={path} />;
  }
};

const componentsToRegister = {
  DSSModule,
  DSSCard,
};

export const initDSSComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
