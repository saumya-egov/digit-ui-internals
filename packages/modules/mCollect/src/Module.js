import { Header, HomeLink } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import EmployeeApp from "./pages/employee";

const componentsToRegister = {};

const addComponentsToRegistry = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

export const mCollectModule = ({ userType, tenants }) => {
  const moduleCode = "mCollect";
  addComponentsToRegistry();
  console.log(moduleCode, "module integrated");
  // Digit.SessionStorage.set("PT_TENANTS", tenants);

  const { path, url } = useRouteMatch();

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  } else return <CitizenApp />;
};

export const mCollectLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();
  // const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_PROPERTY", {});

  useEffect(() => {
    clearParams();
  }, []);
  return (
    <Switch>
      <Route path="/digit-ui/employee/mcollect/challan-details">
        <EmployeeChallan />
      </Route>
    </Switch>
  );
  return (
    <React.Fragment>
      <Header>{t("ACTION_TEST_PROPERTY_TAX")}</Header>
      <div className="d-grid">
        <HomeLink to={`${matchPath}/mcollect/challan-details`}>{t("MCollect_echallan")}</HomeLink>
        {/* <HomeLink to={`${matchPath}/property/my-properties`}>{t("PT_MY_PROPERTIES")}</HomeLink>
        <HomeLink to={`${matchPath}/property/my-applications`}>{t("PT_MY_APPLICATION")}</HomeLink> */}
      </div>
    </React.Fragment>
  );
};

export const mCollectComponents = {
  mCollectCard,
  mCollectModule,
  mCollectLinks,
};
