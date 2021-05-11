import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";

import { AppContainer, Loader } from "@egovernments/digit-ui-react-components";

export const Module = ({ deltaConfig = {}, stateCode, cityCode, moduleCode, userType }) => {
  const { path, url } = useRouteMatch();
  const store = { data: {} }; //Digit.Services.useStore({}, { deltaConfig, stateCode, cityCode, moduleCode, language });

  if (Object.keys(store).length === 0) {
    return <Loader />;
  }

  return (
    <Switch>
      <AppContainer>
        <h1>Hello world HRMS</h1>
      </AppContainer>
    </Switch>
  );
};

