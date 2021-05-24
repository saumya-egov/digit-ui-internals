import React, { useEffect, useState } from "react";
import { CardLabel, LabelFieldPair, Dropdown, TextInput, LinkButton, DatePicker } from "@egovernments/digit-ui-react-components";

const Assignments =({ t, config, onSelect, userType, formData })=>{
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const [assignments, setassignments] = useState(
      formData?.assignments || [
        {
          key: 1,
          AssignedFromDate: null,
          AssignedToDate: null,
          CurrentlyAssignedHere: true,
          department: null,
          headOfDepartment: null,
          CurrentlyAssignedHere:true
        },
      ]
    );


    const handleAddUnit = () => {
        setassignments((prev) => [
          ...prev,
          {
            key: prev.length + 1,
            AssignedFromDate: null,
            AssignedToDate: null,
            CurrentlyAssignedHere: true,
            department: null,
            headOfDepartment: "",
            CurrentlyAssignedHere:true
          },
        ]);
      };
    let department = [];
    const [focusIndex, setFocusIndex] = useState(-1);

    function getdepartmentdata(floorlist) {
        return [];
      }

    return (
        <div>
        {assignments?.map((assignment, index) => (
          <Assignment
            t={t}
            key={assignment.key}
            assignment={assignment}
            setassignments={setassignments}
            index={index}
            focusIndex={focusIndex}
            setFocusIndex={setFocusIndex}
            getdepartmentdata={getdepartmentdata}
            department={department}
          />
        ))}
        <LinkButton label="Add Assignment" onClick={handleAddUnit} style={{ color: "orange" }}></LinkButton>
      </div>
    )
}
    function Assignment({
        t,
        assignment,
        setassignments,
        index,
        focusIndex,
        setFocusIndex,
        getdepartmentdata,
        department,
      }) {
        const selectDepartment = (value) => {
            setassignments((pre) => pre.map((item) => (item.key === assignment.key ? { ...item, department: value } : item)));
        };


        return (
          <div style={{ marginBottom: "16px" }}>
            <div className="label-field-pair">
              <h2 className="card-label card-label-smaller" style={{ color: "#505A5F" }}>
              Assignment {assignment?.key}
              </h2>
            </div>
            <div style={{ border: "1px solid #E3E3E3", padding: "16px", marginTop: "8px" }}>
            <LabelFieldPair>
          <CardLabel className="card-label-smaller">Assigned from Date: </CardLabel>
          <div className="field">
            <DatePicker
              type="date"
              name="AssignedFromDate"
              onChange={(e) => {
                setassignments((pre) => pre.map((item) => (item.key === assignment.key ? { ...item, headOfDepartment: e.target.value } : item)));
                setFocusIndex(index);
              }}
              value={assignment?.headOfDepartment}
              autoFocus={focusIndex === index}
            />
          </div>
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel className="card-label-smaller">Assigned to Date: </CardLabel>
          <div className="field">
            <DatePicker
              type="date"
              name="AssignedToDate"
              onChange={(e) => {
                setassignments((pre) => pre.map((item) => (item.key === assignment.key ? { ...item, headOfDepartment: e.target.value } : item)));
                setFocusIndex(index);
              }}
              value={assignment?.headOfDepartment}
              autoFocus={focusIndex === index}
            />
          </div>
        </LabelFieldPair>
        <LabelFieldPair>
                <CardLabel className="card-label-smaller">Department:</CardLabel>
                <Dropdown
                  className="form-field"
                  selected={assignment?.department}
                  disable={false}
                  option={getdepartmentdata(department) || []}
                  select={selectDepartment}
                  optionKey="i18nKey"
                  t={t}
                />
              </LabelFieldPair>


            <LabelFieldPair>
          <CardLabel className="card-label-smaller">Head of Department: </CardLabel>
          <div className="field">
            <TextInput
              type="text"
              name="unit-area"
              onChange={(e) => {
                setassignments((pre) => pre.map((item) => (item.key === assignment.key ? { ...item, headOfDepartment: e.target.value } : item)));
                setFocusIndex(index);
              }}
              value={assignment?.headOfDepartment}
              autoFocus={focusIndex === index}
            />
          </div>
        </LabelFieldPair>



            </div>
          </div>
        );
      }

export default Assignments;