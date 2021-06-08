import React, { useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

const createOwnerDetails = () => ({
  name: "",
  mobileNumber: "",
  fatherOrHusbandName: "",
  emailId: "",
  permanentAddress: "",
  relationship: "",
  ownerType: "",
  gender: "",
  isCorrespondenceAddress: false,
  key: Date.now(),
});

const OwnerCitizen = ({ ...props }) => {
  const [owners, setOwners] = Digit.Hooks.useSessionStorage("PT_MUTATE_MULTIPLE_OWNERS", [createOwnerDetails()]);
  const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });

  const { path, url } = useRouteMatch();

  const addNewOwner = () => {
    const newOwner = createOwnerDetails();
    setOwners((prev) => [...prev, newOwner]);
  };

  const removeOwner = (owner) => {
    setOwners((prev) => prev.filter((o) => o.key != owner.key));
  };

  const commonProps = { addNewOwner, removeOwner, setOwners, owners };

  return (
    <React.Fragment>
      <p>this is multi owner page</p>
      <Switch>
        {owners.map((owner, index) => {
          return <Route key={owner.key} path={`${path}/${owner.key}`} component={() => <OwnerSteps owner={owner} {...commonProps} />} />;
        })}
      </Switch>
      <Redirect to={`${path}/${owners[0].key}`} />
    </React.Fragment>
  );
};

const OwnerSteps = ({ owner, addNewOwner, removeOwner, setOwners, owners, ...props }) => {
  return <React.Fragment>{owner.key}</React.Fragment>;
};

export default OwnerCitizen;
