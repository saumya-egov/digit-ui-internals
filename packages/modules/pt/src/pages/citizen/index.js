import React from "react";
import { MyApplications } from "./MyApplications";
import { MyReceipts } from "./MyReceipts";
import { MyBills } from "./MyBills";
import { CreateProperty } from "./Create";

import { useRouteMatch, Switch, useLocation, Redirect } from "react-router-dom";
import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import SearchPropertyComponent from "./SearchProperty";
import SearchResultsComponent from "./SearchResults";
import ApplicationDetails from "./MyApplications/application-details";
import CheckPage from "./Create/Steps/CheckPage";
//import CreateProperty from "./CreateProperty";
//import { Proof } from "./CreateProperty/Proof";
// import Proof from "./PropertyLocation/Proof";
// import PropertyLocation from "./PropertyLocation";
import Proof from "./Create/Steps/Proof";

const App = () => {
  const { path, url, ...match } = useRouteMatch();
  return (
    <Switch>
      <AppContainer>
        <BackButton>Back</BackButton>
        <PrivateRoute path={`${path}/property/createProperty`} component={CreateProperty}></PrivateRoute>
        <PrivateRoute path={`${path}/property/search`} component={SearchPropertyComponent} />
        <PrivateRoute path={`${path}/property/search-results`} component={SearchResultsComponent} />
        <PrivateRoute path={`${path}/property/my-bills`} component={MyBills}></PrivateRoute>
        {/* <PrivateRoute path={`${path}/property/bill-details/:uniquePropertyId`} component={() => <BillDetails />}></PrivateRoute> */}
        <PrivateRoute path={`${path}/property/application/:acknowledgementIds`} component={ApplicationDetails}></PrivateRoute>
        <PrivateRoute path={`${path}/property/my-applications`} component={MyApplications}></PrivateRoute>
        {/*         <PrivateRoute path={`${path}/property/createProperty/check`} component={CheckPage}></PrivateRoute>
         */}{" "}
        {/* <PrivateRoute path={`${path}/property/test`} component={PropertyLocation}></PrivateRoute> */}
        {<PrivateRoute path={`${path}/property/proof`} component={Proof}></PrivateRoute>}
        {/* <Redirect to={`${path}/property/my-applications`}></Redirect> */}
      </AppContainer>
    </Switch>
  );
};

export default App;
