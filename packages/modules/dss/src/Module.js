import React from "react";
import { useSelector } from "react-redux";
// import { useRouteMatch } from "react-router";
import { Loader } from "@egovernments/digit-ui-react-components";

const DSSModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "DSS";
  // const { path, url } = useRouteMatch();
  const state = useSelector((state) => state);
  const language = state?.common?.selectedLanguage;
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  if (isLoading) {
    return <Loader />;
  }

  console.log("dss", userType, state, store);
  Digit.SessionStorage.set("DSS_TENANTS", tenants);

  if (userType === "citizen") {
    return <p>Module not found</p>;
  } else {
    return <p>DSS Module</p>;
  }
};

const componentsToRegister = {
  DSSModule,
};

export const initDSSComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
