import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";
import TradeLicense from "../../pageComponents/TradeLicense";
import CreateTradeLicence from "./Create";

const App = () => {
  const { path, url, ...match } = useRouteMatch();
  return (
    <span className={"tl-citizen"}>
      <Switch>
        <AppContainer>
          <BackButton style={{ position: "fixed", top: "55px" }}>Back</BackButton>
          <PrivateRoute path={`${path}/tradelicence/new-application`} component={CreateTradeLicence} />
          <PrivateRoute path={`${path}/tradelicence/tl-info`} component={TradeLicense} />
        </AppContainer>
      </Switch>
    </span>
  );
};

export default App;
