import { Header, HomeLink, Loader } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import EmployeeApp from "./pages/employee";
import MCollectCard from "./components/MCollectCard";
import InboxFilter from "./components/inbox/NewInboxFilter";
import CitizenApp from "./pages/citizen";
import { useSelector } from "react-redux";

export const MCollectModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "UC";
  const state = useSelector((state) => state);
  const language = state?.common?.selectedLanguage;
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });
  Digit.SessionStorage.set("MCollect_TENANTS", tenants);
  if (isLoading) {
    return <Loader />;
  }
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
      <Header>{t("M-Collect")}</Header>
      <div className="d-grid">
        <HomeLink to={`${matchPath}/search`}>{t("UC_SEARCH_AND_PAY")}</HomeLink>
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
