import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AppContainer } from "@egovernments/digit-ui-react-components";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { loginConfig } from "./config";
import LoginComponent, { NewComponent } from "./login";

const EmployeeLogin = () => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();

  const loginParams = useMemo(() =>
    loginConfig.map(
      (step) => {
        const texts = {};
        for (const key in step.texts) {
          texts[key] = t(step.texts[key]);
        }
        return { ...step, texts };
      },
      [loginConfig]
    )
  );

  console.log({ loginParams });
  return (
    <Switch>
      <AppContainer style ={{margin : "0", padding : "0"}}>
        <Route path={`${path}`} exact>
          <LoginComponent config={loginParams[0]} t={t} />
        </Route>
        <NewComponent />
      </AppContainer>
    </Switch>
  );
};

export default EmployeeLogin;
