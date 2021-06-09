import React from "react";
import { Loader } from "../atoms/Loader";
import Dropdown from "../atoms/Dropdown";
import { useTranslation } from "react-i18next";

const Localities = ({ selectLocality, tenantId, boundaryType, keepNull, selected }) => {
  // console.log("find localities here", tenantId)
  const { t } = useTranslation();

  const { data: tenantlocalties, isLoading } = Digit.Hooks.useBoundaryLocalities(tenantId, boundaryType, {}, t);
  // console.log("find data here", tenantlocalties);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Dropdown option={tenantlocalties} keepNull={keepNull === false ? false : true} selected={selected} select={selectLocality} optionKey="i18nkey" />
  );
  //  <h1>ABCD</h1>
};

export default Localities;
