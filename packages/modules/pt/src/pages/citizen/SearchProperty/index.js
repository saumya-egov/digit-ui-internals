import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AppContainer } from "@egovernments/digit-ui-react-components";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { config } from "./config";
import SearchPropertyComponent from "./searchProperty";

const SearchProperty = () => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();

  const params = useMemo(() =>
    config.map(
      (step) => {
        const texts = {};
        for (const key in step.texts) {
          texts[key] = t(step.texts[key]);
        }
        return { ...step, texts };
      },
      [config]
    )
  );

  console.log({ params });
  return (
    <Switch>
      <AppContainer>
        <Route path={`${path}`} exact>
          <SearchPropertyComponent config={params[0]} t={t} />
        </Route>
      </AppContainer>
    </Switch>
  );
};

export default SearchProperty;
