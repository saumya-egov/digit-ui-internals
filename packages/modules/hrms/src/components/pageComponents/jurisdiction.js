import React, { useEffect, useState } from "react";
import { CardLabel, LabelFieldPair, Dropdown, TextInput, LinkButton } from "@egovernments/digit-ui-react-components";

const Jurisdictions =({ t, config, onSelect, userType, formData })=>{
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const [jurisdictions, setjurisdictions] = useState(
      formData?.jurisdictions || [
        {
          key: 1,
          hierarchy: null,
          boundaryType: null,
          tenantId,
          boundary: null,
          role: null,
        },
      ]
    );


    const handleAddUnit = () => {
        setjurisdictions((prev) => [
          ...prev,
          {
            key: prev.length + 1,
            hierarchy: null,
            boundaryType: null,
            tenantId,
            boundary: null,
            role: null,
          },
        ]);
      };
    let hierarchylist = [];
    let boundaryTypeoption=[];
    let boundaryoption=[];
    const [focusIndex, setFocusIndex] = useState(-1);

    function gethierarchylistdata(floorlist) {
        return [];
      }

      function getboundaryTypedata(floorlist) {

        return [];
      }
      function getboundarydata(){
        return [];
      }

      function getroledata(){
        return [];
      }

    return (
        <div>
        {jurisdictions?.map((jurisdiction, index) => (
          <Jurisdiction
            t={t}
            key={jurisdiction.key}
            jurisdiction={jurisdiction}
            setJurisdictions={setjurisdictions}
            index={index}
            focusIndex={focusIndex}
            setFocusIndex={setFocusIndex}
            gethierarchylistdata={gethierarchylistdata}
            hierarchylist={hierarchylist}
            getboundaryTypedata={getboundaryTypedata}
            boundaryTypeoption={boundaryTypeoption}
            getboundarydata={getboundarydata}
            getroledata={getroledata}
          />
        ))}
        <LinkButton label="Add Jurisdiction" onClick={handleAddUnit} style={{ color: "orange" }}></LinkButton>
      </div>
    )
}
    function Jurisdiction({
        t,
        jurisdiction,
        setjurisdictions,
        index,
        focusIndex,
        setFocusIndex,
        gethierarchylistdata,
        hierarchylist,
        getboundaryTypedata,
        boundaryType,
        getboundarydata,
        getroledata,
        roleoption,
        boundaryTypeoption,
        boundaryoption,
      }) {
        const selectHierarchy = (value) => {
            setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, hierarchy: value } : item)));
        };

        const selectboundaryType = (value) => {
            setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, boundaryType: value } : item)));
        };

        const selectboundary = (value) => {
          console.log("%c 🐑: selectSubUsageType -> value ", "font-size:16px;background-color:#928c29;color:white;", value);
          setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, boundary: value } : item)));
        };
        const selectrole =(Value)=>{
          setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, role: value } : item)));
        }

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
                  optionKey="i18nKey"
                  t={t}
                />
              </LabelFieldPair>
              <LabelFieldPair>
                <CardLabel className="card-label-smaller">Boundary Type:</CardLabel>
                <Dropdown
                  className="form-field"
                  selected={jurisdiction?.boundaryType}
                  disable={getboundaryTypedata(boundaryTypeoption)?.length === 1}
                  option={getboundaryTypedata(boundaryTypeoption)}
                  select={selectboundaryType}
                  optionKey="i18nKey"
                  t={t}
                />
              </LabelFieldPair>
              <LabelFieldPair>
                <CardLabel className="card-label-smaller">Boundary:</CardLabel>
                <Dropdown
                  className="form-field"
                  selected={jurisdiction?.boundary}
                  disable={getboundarydata(boundaryoption)?.length === 1}
                  option={getboundarydata(boundaryoption)}
                  select={selectboundary}
                  optionKey="i18nKey"
                  t={t}
                />
              </LabelFieldPair>

              <LabelFieldPair>
                <CardLabel className="card-label-smaller">Roles:</CardLabel>

                <Dropdown
                  className="form-field"
                  selected={jurisdiction?.role}
                  disable={getroledata(roleoption)?.length === 1}
                  option={getroledata(roleoption)}
                  select={selectrole}
                  optionKey="i18nKey"
                  t={t}
                />
              </LabelFieldPair>
            </div>
          </div>
        );
      }

export default Jurisdictions;