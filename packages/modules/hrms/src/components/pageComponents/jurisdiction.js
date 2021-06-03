import React, { useEffect, useState } from "react";
import { CardLabel, LabelFieldPair, Dropdown, MultiSelectDropdown, TextInput, LinkButton } from "@egovernments/digit-ui-react-components";

const Jurisdictions = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [selected, setSelected] = useState([]);
  const { data: data = {}, isLoading } = Digit.Hooks.hrms.useHrmsMDMS(tenantId, "egov-hrms", "HRMSRolesandDesignation") || {};
  const [jurisdictions, setjurisdictions] = useState(
    formData?.jurisdictions || [
      {
        key: 1,
        hierarchy: null,
        boundaryType: null,
        boundary: null,
        roles: [],
      },
    ]
  );

  useEffect(() => {
    console.log(jurisdictions);
    const jurisdictionsData = jurisdictions?.map((jurisdiction) => ({
      hierarchy: jurisdiction?.hierarchy?.code,
      boundaryType: jurisdiction?.boundaryType?.label,
      boundary: jurisdiction?.boundary?.code,
      roles: jurisdiction?.roles,
      tenantId: jurisdiction?.boundary?.code,
    }));
    onSelect(config.key, jurisdictionsData);
  }, [jurisdictions]);

  const handleAddUnit = () => {
    setjurisdictions((prev) => [
      ...prev,
      {
        key: prev.length + 1,
        hierarchy: null,
        boundaryType: null,
        boundary: null,
        roles: [],
      },
    ]);
  };
  let hierarchylist = [];
  let boundaryTypeoption = [];
  const [focusIndex, setFocusIndex] = useState(-1);

  function gethierarchylistdata() {
    return data?.MdmsRes?.["egov-location"]["TenantBoundary"].map((ele) => ele.hierarchyType);
  }

  function getboundarydata() {
    return [];
  }

  function getroledata() {
    return data?.MdmsRes?.["ACCESSCONTROL-ROLES"].roles;
  }

  return (
    <div>
      {jurisdictions?.map((jurisdiction, index) => (
        <Jurisdiction
          t={t}
          key={jurisdiction.key}
          data={data}
          jurisdiction={jurisdiction}
          setjurisdictions={setjurisdictions}
          index={index}
          focusIndex={focusIndex}
          setFocusIndex={setFocusIndex}
          gethierarchylistdata={gethierarchylistdata}
          hierarchylist={hierarchylist}
          boundaryTypeoption={boundaryTypeoption}
          getboundarydata={getboundarydata}
          getroledata={getroledata}
        />
      ))}
      <LinkButton label="Add Jurisdiction" onClick={handleAddUnit} style={{ color: "orange" }}></LinkButton>
    </div>
  );
};
function Jurisdiction({ t, data, jurisdiction, setjurisdictions, gethierarchylistdata, hierarchylist, getroledata, roleoption }) {
  const [BoundaryType, selectBoundaryType] = useState([]);
  const [Boundary, selectboundary] = useState([]);
  useEffect(() => {
    selectBoundaryType(
      data?.MdmsRes?.["egov-location"]["TenantBoundary"].filter((ele) => ele.hierarchyType == jurisdiction?.hierarchy).map((item) => item.boundary)
    );
  }, [jurisdiction?.hierarchy]);

  useEffect(() => {
    console.log(data?.MdmsRes?.tenant?.tenants);
    selectboundary(data?.MdmsRes?.tenant?.tenants);
  }, [jurisdiction?.boundaryType]);

  const selectHierarchy = (value) => {
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, hierarchy: value } : item)));
  };

  const selectboundaryType = (value) => {
    console.log(value);
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, boundaryType: value } : item)));
  };

  const selectedboundary = (value) => {
    console.log(value);
    console.log("%c 🐑: selectSubUsageType -> value ", "font-size:16px;background-color:#928c29;color:white;", value);
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, boundary: value } : item)));
  };
  const selectrole = (e, data) => {
    const index = jurisdiction?.roles.indexOf(data)
    let res = null;
    if (index != -1) {
      console.log(data);
      jurisdiction?.roles.splice(index, 1)
      res = jurisdiction.roles;
    } else {
      res = [...data, ...jurisdiction?.roles]
      console.log(data);
    }

    // if (checked) selectULB(data.code);
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, roles: res } : item)));
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <div className="label-field-pair">
        <h2 className="card-label card-label-smaller" style={{ color: "#505A5F" }}>
          Jurisdiction {jurisdiction?.key}
        </h2>
      </div>
      <div style={{ border: "1px solid #E3E3E3", padding: "16px", marginTop: "8px" }}>
        <LabelFieldPair>
          <CardLabel className="card-label-smaller">Hierarchy:</CardLabel>
          <Dropdown
            className="form-field"
            selected={jurisdiction?.hierarchy}
            disable={false}
            option={gethierarchylistdata(hierarchylist) || []}
            select={selectHierarchy}
            optionKey="code"
            t={t}
          />
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel className="card-label-smaller">Boundary Type:</CardLabel>
          <Dropdown
            className="form-field"
            selected={jurisdiction?.boundaryType}
            disable={BoundaryType?.length === 0}
            option={BoundaryType}
            select={selectboundaryType}
            optionKey="label"
            t={t}
          />
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel className="card-label-smaller">Boundary:</CardLabel>
          <Dropdown
            className="form-field"
            selected={jurisdiction?.boundary}
            disable={Boundary?.length === 0}
            option={Boundary}
            select={selectedboundary}
            optionKey="name"
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel className="card-label-smaller">Roles:</CardLabel>
          <div className="form-field">
            <MultiSelectDropdown
              className="form-field"
              selected={jurisdiction?.roles}
              options={getroledata(roleoption)}
              onSelect={selectrole}
              optionsKey="name"
              t={t}
            />
          </div>
        </LabelFieldPair>
      </div>
    </div>
  );
}

export default Jurisdictions;
