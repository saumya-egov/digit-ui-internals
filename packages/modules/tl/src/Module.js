import { Header, CitizenHomeCard, RupeeIcon, HomeLink } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import TradeLicense from "../src/pageComponents/TradeLicense";
import TLSelectGeolocation from "../src/pageComponents/TLSelectGeolocation";
import TLSelectAddress from "./pageComponents/TLSelectAddress";
import TLSelectPincode from "./pageComponents/TLSelectPincode";
import Proof from "./pageComponents/Proof";
import SelectOwnerShipDetails from "./pageComponents/SelectOwnerShipDetails";
import SelectOwnerDetails from "./pageComponents/SelectOwnerDetails";
import SelectOwnerAddress from "./pageComponents/SelectOwnerAddress";
import SelectProofIdentity from "./pageComponents/SelectProofIdentity";
import SelectOwnershipProof from "./pageComponents/SelectOwnershipProof";
import SelectTradeName from "./pageComponents/SelectTradeName";
import SelectStructureType from "./pageComponents/SelectStructureType";
import SelectVehicleType from "./pageComponents/SelectVehicleType";
import SelectBuildingType from "./pageComponents/SelectBuildingType";
import SelectCommencementDate from "./pageComponents/SelectCommencementDate";
import SelectTradeUnits from "./pageComponents/SelectTradeUnits";
import SelectAccessories from "./pageComponents/SelectAccessories";
import SelectAccessoriesDetails from "./pageComponents/SelectAccessoriesDetails";

import CitizenApp from "./pages/citizen";

//import EmployeeApp from "./pages/employee";

/* const componentsToRegister = {
  TradeLicense,
}; */

/* const addComponentsToRegistry = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
}; */

export const TLModule = ({ stateCode, userType, tenants }) => {
  console.log("inside module");
  debugger;
  const { path, url } = useRouteMatch();

  const moduleCode = "TL";
  const state = useSelector((state) => state);
  const language = state?.common?.selectedLanguage;
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  //addComponentsToRegistry();
  Digit.SessionStorage.set("TL_TENANTS", tenants);

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  } else return <CitizenApp />;
};

export const TLLinks = ({ matchPath, userType }) => {
  console.log("inside links");
  debugger;
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_TRADE", {});

  useEffect(() => {
    clearParams();
  }, []);

  const links = [
    {
      link: `${matchPath}/tradelicence/new-application`,
      i18nKey: t("TL_CREATE_TRADE"),
    },
  ];

  return <CitizenHomeCard header={t("ACTION_TEST_TRADE_LICENSE")} links={links} Icon={RupeeIcon} />;

  /* return (
    <React.Fragment>
      <Header>{t("TL")}</Header>
      <div className="d-grid">
      <HomeLink to={`${matchPath}/tradelicence/new-application`}>{t("PT_CREATE_TRADE")}</HomeLink>
        <HomeLink to={`${matchPath}/property/new-application`}>{t("PT_CREATE_PROPERTY")}</HomeLink>
        <HomeLink to={`${matchPath}/property/my-properties`}>{t("PT_MY_PROPERTIES")}</HomeLink>
        <HomeLink to={`${matchPath}/property/my-applications`}>{t("PT_MY_APPLICATION")}</HomeLink> 
      </div>
    </React.Fragment>
  ); */
};

/* export const TLComponents = {
  TLModule,
  TLLinks,
}; */
const componentsToRegister = {
  TLModule,
  TLLinks,
  TradeLicense,
  SelectTradeName,
  SelectStructureType,
  SelectVehicleType,
  SelectBuildingType,
  SelectCommencementDate,
  SelectTradeUnits,
  SelectAccessories,
  SelectAccessoriesDetails,
  TLSelectGeolocation,
  TLSelectAddress,
  TLSelectPincode,
  Proof,
  SelectOwnerShipDetails,
  SelectOwnerDetails,
  SelectOwnerAddress,
  SelectProofIdentity,
  SelectOwnershipProof,
};

export const initTLComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    console.log(key);
    console.log(value);
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
