import { Header, CitizenHomeCard, RupeeIcon } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import Area from "./pageComponents/Area";
import GroundFloorDetails from "./pageComponents/GroundFloorDetails";
import IsAnyPartOfThisFloorUnOccupied from "./pageComponents/IsAnyPartOfThisFloorUnOccupied";
import IsResidential from "./pageComponents/IsResidential";
import IsThisFloorSelfOccupied from "./pageComponents/IsThisFloorSelfOccupied";
import Proof from "./pageComponents/Proof";
import PropertyBasementDetails from "./pageComponents/PropertyBasementDetails";
import PropertyFloorDetails from "./pageComponents/PropertyFloorDetails";
import PropertyTax from "./pageComponents/PropertyTax";
import PropertyType from "./pageComponents/PropertyType";
import PropertyUsageType from "./pageComponents/PropertyUsageType";
import ProvideSubUsageType from "./pageComponents/ProvideSubUsageType";
import ProvideSubUsageTypeOfRentedArea from "./pageComponents/ProvideSubUsageTypeOfRentedArea";
import PTWFApplicationTimeline from "./pageComponents/PTWFApplicationTimeline";
import PTSelectAddress from "./pageComponents/PTSelectAddress";
import PTSelectGeolocation from "./pageComponents/PTSelectGeolocation";
import PTSelectPincode from "./pageComponents/PTSelectPincode";
import RentalDetails from "./pageComponents/RentalDetails";
import SelectInistitutionOwnerDetails from "./pageComponents/SelectInistitutionOwnerDetails";
import SelectOwnerAddress from "./pageComponents/SelectOwnerAddress";
import SelectOwnerDetails from "./pageComponents/SelectOwnerDetails";
import SelectOwnerShipDetails from "./pageComponents/SelectOwnerShipDetails";
import SelectProofIdentity from "./pageComponents/SelectProofIdentity";
import SelectSpecialOwnerCategoryType from "./pageComponents/SelectSpecialOwnerCategoryType";
import SelectSpecialProofIdentity from "./pageComponents/SelectSpecialProofIdentity";
import Units from "./pageComponents/Units";
import SelectAltContactNumber from "./pageComponents/SelectAltContactNumber";
import SelectDocuments from "./pageComponents/SelectDocuments";
import UnOccupiedArea from "./pageComponents/UnOccupiedArea";
import PTEmployeeOwnershipDetails from "./pageComponents/OwnerDetailsEmployee";
import CitizenApp from "./pages/citizen";
import SearchPropertyCitizen from "./pages/citizen/SearchProperty/searchProperty";
import SearchResultCitizen from "./pages/citizen/SearchResults";

import PropertyInformation from "./pages/citizen/MyProperties/propertyInformation";
import PTWFCaption from "./pageComponents/PTWFCaption";
import PTWFReason from "./pageComponents/PTWFReason";
import ProvideFloorNo from "./pageComponents/ProvideFloorNo";
import propertyOwnerHistory from "./pages/citizen/MyProperties/propertyOwnerHistory";
import TransferDetails from "./pages/citizen/MyProperties/propertyOwnerHistory";
import TransfererDetails from "./pageComponents/Mutate/TransfererDetails";
import OwnerMutate from "./pageComponents/Mutate/Owner";

import EmployeeApp from "./pages/employee";
import PTCard from "./components/PTCard";
import InboxFilter from "./components/inbox/NewInboxFilter";
import EmptyResultInbox from "./components/empty-result";

const componentsToRegister = {
  PropertyTax,
  PTSelectPincode,
  PTSelectAddress,
  Proof,
  SelectOwnerShipDetails,
  SelectOwnerDetails,
  SelectSpecialOwnerCategoryType,
  SelectOwnerAddress,
  SelectInistitutionOwnerDetails,
  SelectProofIdentity,
  SelectSpecialProofIdentity,
  PTSelectGeolocation,
  PTWFApplicationTimeline,
  PTWFCaption,
  PTWFReason,
  IsThisFloorSelfOccupied,
  ProvideSubUsageType,
  RentalDetails,
  ProvideSubUsageTypeOfRentedArea,
  IsAnyPartOfThisFloorUnOccupied,
  UnOccupiedArea,
  Area,
  IsResidential,
  PropertyType,
  PropertyUsageType,
  GroundFloorDetails,
  PropertyFloorDetails,
  PropertyBasementDetails,
  PropertyInformation,
  ProvideFloorNo,
  propertyOwnerHistory,
  TransferDetails,
  Units,
  SelectAltContactNumber,
  SelectDocuments,
  PTEmployeeOwnershipDetails,
  SearchPropertyCitizen,
  SearchResultCitizen,
  TransfererDetails,
  OwnerMutate,
};

const addComponentsToRegistry = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

export const PTModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();

  const moduleCode = "PT";
  const state = useSelector((state) => state);
  const language = state?.common?.selectedLanguage;
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  addComponentsToRegistry();

  Digit.SessionStorage.set("PT_TENANTS", tenants);

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  } else return <CitizenApp />;
};

export const PTLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_PROPERTY", {});

  useEffect(() => {
    clearParams();
  }, []);

  const links = [
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
  ];

  return <CitizenHomeCard header={t("ACTION_TEST_PROPERTY_TAX")} links={links} Icon={RupeeIcon} />;
};

export const PTComponents = {
  PTCard,
  PTModule,
  PTLinks,
  PT_INBOX_FILTER: (props) => <InboxFilter {...props} />,
  EmptyResultInbox,
};
