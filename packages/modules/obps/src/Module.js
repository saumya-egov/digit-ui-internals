import React from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import { Loader, CitizenHomeCard, OBPSIcon } from "@egovernments/digit-ui-react-components";
import CitizenApp from "./pages/citizen";


const OBPSModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "OBPS";
  const { path, url } = useRouteMatch();
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  if (isLoading) {
    return <Loader />;
  }

  if (userType === "citizen") {
    return <CitizenApp path={path} stateCode={stateCode} />;
  }
}

const OBPSLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();

  const links = [
    {
      link: `${matchPath}/property/citizen-search`,
      i18nKey: t("PT_SEARCH_AND_PAY"),
    },
    {
      link: `/digit-ui/citizen/payment/my-bills/PT`,
      i18nKey: t("CS_TITLE_MY_BILLS"),
    },
    {
      link: `${matchPath}/property/new-application`,
      i18nKey: t("PT_CREATE_PROPERTY"),
    },
    {
      link: `${matchPath}/property/my-properties`,
      i18nKey: t("PT_MY_PROPERTIES"),
    },
    {
      link: `${matchPath}/property/my-applications`,
      i18nKey: t("PT_MY_APPLICATION"),
    },
    {
      link: `${matchPath}/property/property-mutation`,
      i18nKey: t("PT_PROPERTY_MUTATION"),
    },
  ];

  return <CitizenHomeCard header={t("ACTION_TEST_BUILDING_PLAN_APPROVAL")} links={links} Icon={() => <OBPSIcon />} />;
} 

const componentsToRegister = {
  OBPSModule,
  OBPSLinks
}

export const initOBPSComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};