import { Header, HomeLink } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import EmployeeApp from "./pages/employee";
import MCollectCard from "./components/MCollectCard";
import InboxFilter from "./components/inbox/NewInboxFilter";

export const MCollectModule = ({ userType, tenants }) => {
  const moduleCode = "mCollect";
  // addComponentsToRegistry();
  console.log(moduleCode, "module integrated");

  // Digit.SessionStorage.set("PT_TENANTS", tenants);

  const { path, url } = useRouteMatch();

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  } else return <CitizenApp />;
};

export const MCollectLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_PROPERTY112", {});

  useEffect(() => {
    clearParams();
  }, []);

  return (
    <React.Fragment>
      <Header>{t("ACTION_TEST_PROPERTY_TAX")}</Header>
      <div className="d-grid">
        <HomeLink to={`${matchPath}/property/new-application`}>{t("PT_CREATE_PROPERTY")}</HomeLink>
        <HomeLink to={`${matchPath}/property/my-properties`}>{t("PT_MY_PROPERTIES")}</HomeLink>
        <HomeLink to={`${matchPath}/property/my-applications`}>{t("PT_MY_APPLICATION")}</HomeLink>
      </div>
    </React.Fragment>
  );
};

const componentsToRegister = {
  MCollectCard,
  MCollectModule,
  MCollectLinks,
  MCOLLECT_INBOX_FILTER: (props) => <InboxFilter {...props} />,
};

export const initMCollectComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
