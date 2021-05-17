import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";
import SearchChallanComponent from "./SearchChallan";
import SearchResultsComponent from "./SearchResults";
//import BillInfo from "./SearchResults/BillInfo";

const App = () => {
  const { path, url, ...match } = useRouteMatch();
  return (
    <span className={"mcollect-citizen"}>
      <Switch>
        <AppContainer>
          <BackButton style={{ position: "fixed", top: "55px" }}>Back</BackButton>
          <PrivateRoute path={`${path}/search`} component={SearchChallanComponent} />
          <PrivateRoute path={`${path}/search-results`} component={SearchResultsComponent} />
          {/* <Redirect to={`/`}></Redirect> */}
        </AppContainer>
      </Switch>
    </span>
  );
};

export default App;
