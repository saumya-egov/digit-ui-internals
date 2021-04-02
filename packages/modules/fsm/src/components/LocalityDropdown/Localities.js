import React from "react";
import { Dropdown, Loader } from "@egovernments/digit-ui-react-components";

const Localities = ({ selectLocality, tenantId }) => {
  // console.log("find localities here", tenantId)
  const { data: tenantlocalties, isLoading } = Digit.Hooks.useBoundaryLocalities(tenantId, "revenue");
  // console.log("find data here", tenantlocalties)
  if (isLoading) {
    return <Loader />;
  }

  return <Dropdown option={tenantlocalties} keepNull={true} selected={null} select={selectLocality} optionKey={"name"} />;
  //  <h1>ABCD</h1>
};

export default Localities;
