import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { newConfig } from "../../../config/Create/config";
import CheckPage from "./CheckPage";
import PTAcknowledgement from "./PTAcknowledgement";

const CreateProperty = ({ parentRoute }) => {
  const queryClient = useQueryClient();
  const match = useRouteMatch();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const history = useHistory();
  let config = [];
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_PROPERTY", {});

  const goNext = (skipStep, index, isAddMultiple, key) => {
    debugger;
    let currentPath = pathname.split("/").pop(),
      lastchar = currentPath.charAt(currentPath.length - 1),
      isMultiple = false,
      nextPage;
    console.log(key);
    if (Number(parseInt(currentPath)) || currentPath == "0") {
      debugger;
      currentPath = pathname.slice(0, -2);
      currentPath = currentPath.split("/").pop();
      isMultiple = true;
      console.log(currentPath);
    } else {
      isMultiple = false;
    }
    if (lastchar == "0") {
      isMultiple = true;
    }
    let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
    if (typeof nextStep == "object" && nextStep != null && isMultiple != false) {
      debugger;
      console.log(nextStep);
      if (nextStep[sessionStorage.getItem("ownershipCategory")]) {
        nextStep = `${nextStep[sessionStorage.getItem("ownershipCategory")]}/${index}`;
      } else if (nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]) {
        console.log("inside condn else if");
        console.log(sessionStorage.getItem("noOofBasements"));
        nextStep = `${nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]}/${index}`;
      } else {
        console.log("inside condn else");
        console.log(sessionStorage.getItem("noOofBasements"));
        nextStep = `${nextStep[sessionStorage.getItem("noOofBasements")]}/${index}`;
        //nextStep = `${"floordetails"}/${index}`;
      }
      console.log("after condn");
      console.log(nextStep);
    }
    if (typeof nextStep == "object" && nextStep != null && isMultiple == false) {
      debugger;
      console.log("inside propertytype");
      if (nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]) {
        console.log("inside condn else if");
        console.log(sessionStorage.getItem("noOofBasements"));
        nextStep = `${nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]}`;
      } else {
        nextStep = `${nextStep[sessionStorage.getItem("PropertyType")]}`;
      }
    }
    /* if (nextStep === "is-this-floor-self-occupied") {
      isMultiple = false;
    } */
    let redirectWithHistory = history.push;
    if (skipStep) {
      redirectWithHistory = history.replace;
    }
    if (isAddMultiple) {
      nextStep = key;
    }
    if (nextStep === null) {
      console.log(match.path);
      //console.log(nextStep.length() - 1);
      return redirectWithHistory(`${match.path}/check`);
    }
    if (nextStep.split("/").pop() == "0") {
      nextPage = `${match.path}/${nextStep}`;
    } else {
      nextPage = isMultiple && nextStep !== "map" ? `${match.path}/${nextStep}/${index}` : `${match.path}/${nextStep}`;
    }
    debugger;
    console.log(nextPage);
    redirectWithHistory(nextPage);
  };

  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };

  function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
    if (key === "owners") {
      let owners = params.owners || [];
      owners[index] = data;
      setParams({ ...params, ...{ [key]: [...owners] } });
    } else if (key === "units") {
      let units = params.units || [];
      units[index] = data;
      setParams({ ...params, units });
    } else {
      setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
    }
    goNext(skipStep, index, isAddMultiple, key);
  }

  const handleSkip = () => {};
  const handleMultiple = () => {};

  const onSuccess = () => {
    clearParams();
    queryClient.invalidateQueries("PT_CREATE_PROPERTY");
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
      <Route path={`${match.path}/check`}>
        <CheckPage onSubmit={createProperty} value={params} />
      </Route>
      <Route path={`${match.path}/acknowledgement`}>
        <PTAcknowledgement data={params} onSuccess={onSuccess} />
      </Route>
      <Route>
        <Redirect to={`${match.path}/${config.indexRoute}`} />
      </Route>
    </Switch>
  );
};

export default CreateProperty;
