import React from "react";
import { ReopenComplaint } from "./ReopenComplaint/index";
import SelectRating from "./Rating/SelectRating";
import { PgrRoutes, getRoute } from "../../constants/Routes";
import { useRouteMatch, Switch, useLocation } from "react-router-dom";
import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";

import { CreateComplaint } from "./Create";
import { ComplaintsList } from "./ComplaintsList";
import ComplaintDetailsPage from "./ComplaintDetails";
import Response from "./Response";

const App = () => {
  const { path, url, ...match } = useRouteMatch();
  console.log("pgr citizen", path, url, match);
  const location = useLocation();
  return (
    <AppContainer>
      {!location.pathname.includes("create-complaint/response") && <BackButton>Back</BackButton>}
      <Switch>
        <PrivateRoute path={`${path}/create-complaint`} component={CreateComplaint} />
        <PrivateRoute path={`${path}/complaints`} exact component={ComplaintsList} />
        <PrivateRoute path={`${path}/complaints/:id`} component={ComplaintDetailsPage} />
        <PrivateRoute path={`${path}/reopen`} component={() => <ReopenComplaint match={{ ...match, url, path }} parentRoute={path} />} />
        <PrivateRoute path={`${path}/rate/:id`} component={() => <SelectRating parentRoute={path} />} />
        <PrivateRoute path={`${path}/response`} component={() => <Response match={{ ...match, url, path }} />} />
      </Switch>
    </AppContainer>
  );
};

export default App;
