import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { newConfig } from "../../../config/config";
//import CheckPage from "./CheckPage";
//import PTAcknowledgement from "./PTAcknowledgement";

const CreateTradeLicence = ({ parentRoute }) => {
  console.log("inside create");
  debugger;
  const queryClient = useQueryClient();
  const match = useRouteMatch();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const history = useHistory();
  let config = [];
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_TRADE", {});

  const goNext = (skipStep, index, isAddMultiple, key) => {
    let currentPath = pathname.split("/").pop(),
      lastchar = currentPath.charAt(currentPath.length - 1),
      isMultiple = false,
      nextPage;
    if (Number(parseInt(currentPath)) || currentPath == "0" || currentPath == "-1") {
      if (currentPath == "-1" || currentPath == "-2") {
        currentPath = pathname.slice(0, -3);
        currentPath = currentPath.split("/").pop();
        isMultiple = true;
      } else {
        currentPath = pathname.slice(0, -2);
        currentPath = currentPath.split("/").pop();
        isMultiple = true;
      }
    } else {
      isMultiple = false;
    }
    if (!isNaN(lastchar)) {
      isMultiple = true;
    }
    let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
    if (typeof nextStep == "object" && nextStep != null) {
      debugger;
      if (nextStep[sessionStorage.getItem("isAccessories")]) {
        nextStep = `${nextStep[sessionStorage.getItem("isAccessories")]}`;
        debugger;
      } else if (nextStep[sessionStorage.getItem("StructureType")]) {
        nextStep = `${nextStep[sessionStorage.getItem("StructureType")]}`;
        debugger;
      }
    }
    let redirectWithHistory = history.push;
    if (skipStep) {
      redirectWithHistory = history.replace;
    }
    if (isAddMultiple) {
      nextStep = key;
    }
    if (nextStep === null) {
      return redirectWithHistory(`${match.path}/check`);
    }
    /* if (!isNaN(nextStep.split("/").pop())) {
      nextPage = `${match.path}/${nextStep}`;
    } else { */
    nextPage = isMultiple ? `${match.path}/${nextStep}/${index}` : `${match.path}/${nextStep}`;
    //}

    redirectWithHistory(nextPage);
  };

  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };

  function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
    /* if (key === "owners") {
      let owners = params.owners || [];
      owners[index] = data;
      setParams({ ...params, ...{ [key]: [...owners] } });
    } else {
      setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
    } */
    setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
    goNext(skipStep, index, isAddMultiple, key);
  }

  const handleSkip = () => {};
  const handleMultiple = () => {};

  const onSuccess = () => {
    clearParams();
    queryClient.invalidateQueries("PT_CREATE_TRADE");
  };
  newConfig.forEach((obj) => {
    config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  });
  config.indexRoute = "info";

  return (
    <Switch>
      {config.map((routeObj, index) => {
        const { component, texts, inputs, key } = routeObj;
        const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
        return (
          <Route path={`${match.path}/${routeObj.route}`} key={index}>
            <Component config={{ texts, inputs, key }} onSelect={handleSelect} onSkip={handleSkip} t={t} formData={params} onAdd={handleMultiple} />
          </Route>
        );
      })}
      {/* <Route path={`${match.path}/check`}>
        <CheckPage onSubmit={createProperty} value={params} />
      </Route>
      <Route path={`${match.path}/acknowledgement`}>
        <PTAcknowledgement data={params} onSuccess={onSuccess} />
      </Route> */}
      <Route>
        <Redirect to={`${match.path}/${config.indexRoute}`} />
      </Route>
    </Switch>
  );
};

export default CreateTradeLicence;
