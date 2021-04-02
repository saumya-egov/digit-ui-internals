import React from "react";
import { Loader } from "../atoms/Loader";
import Dropdown from "../atoms/Dropdown";

const Localities = ({ selectLocality, tenantId, boundaryType }) => {
  // console.log("find localities here", tenantId)
  const { data: tenantlocalties, isLoading } = Digit.Hooks.useBoundaryLocalities(tenantId, boundaryType);
  // console.log("find data here", tenantlocalties)
  if (isLoading) {
    return <Loader />;
  }

  return <Dropdown option={tenantlocalties} keepNull={true} selected={null} select={selectLocality} optionKey={"name"} />;
  //  <h1>ABCD</h1>
};

export default Localities;
