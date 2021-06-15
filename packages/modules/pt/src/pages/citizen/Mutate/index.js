import React, { useEffect } from "react";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { newConfigMutate } from "../../../config/Mutate/config";

import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";

const MutationCitizen = (props) => {
  const { t } = useTranslation();
  //   const queryClient = useQueryClient();
  const match = useRouteMatch();
  const { pathname } = useLocation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_MUTATE_PROPERTY", {});
  const history = useHistory();

  const selectParams = (key, data) => {
    setParams((prev) => ({ ...prev, [key]: data }));
  };
  //   const { control, formState, watch } = useForm();
  let config = [];

  useEffect(() => {
    console.log(params, "useEffect in stepper");
  }, [params]);

  newConfigMutate.forEach((obj) => {
    config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  });

  function handleSelect(key, data, skipStep, index, isAddMultiple = false, configObj) {
    let pathArray = pathname.split("/");
    let currentPath = pathArray.pop();
    if (configObj?.nesting) {
      for (let i = 0; i < configObj?.nesting - 1; i++) {
        currentPath = pathArray.pop();
      }
    }

    let activeRouteObj = config.filter((e) => e.route === currentPath)[0];
    selectParams(key, data);
    let { queryParams } = configObj || {};
    let queryString = queryParams
      ? `?${Object.keys(queryParams)
          .map((_key) => `${_key}=${queryParams[_key]}`)
          .join("&")}`
      : "";

    console.log(params, currentPath, "inside mutation form");
    if (!activeRouteObj.nextStep) {
      console.log(activeRouteObj, "inside owners details");
    } else if (typeof activeRouteObj.nextStep === "string") history.push(`${pathArray.join("/")}/${activeRouteObj.nextStep}${queryString}`);
    else if (typeof activeRouteObj.nextStep === "object") {
      let nextStep = activeRouteObj.nextStep[configObj?.routeKey];
      history.push(`${pathArray.join("/")}/${nextStep}${queryString}`);
    }
  }

  const handleSkip = () => {};

  config.indexRoute = "search-property";

  return (
    <React.Fragment>
      <Switch>
        {config.map((routeObj, index) => {
          const { component } = routeObj;
          const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
          return (
            <Route path={`${match.path}/${routeObj.route}`} key={index}>
              <Component config={routeObj} onSelect={handleSelect} onSkip={handleSkip} t={t} formData={params} />
            </Route>
          );
        })}
        <Route>
          <Redirect to={`${match.path}/${config.indexRoute}`} />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default MutationCitizen;
