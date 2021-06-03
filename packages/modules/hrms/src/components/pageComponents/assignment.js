import React, { useEffect, useState } from "react";
import { CardLabel, LabelFieldPair, Dropdown, TextInput, LinkButton, DatePicker, CheckBox } from "@egovernments/digit-ui-react-components";
import { values } from "lodash";
const Assignments = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { data: data = {}, isLoading } = Digit.Hooks.hrms.useHrmsMDMS(tenantId, "egov-hrms", "HRMSRolesandDesignation") || {};
  const [assignments, setassignments] = useState(
    formData?.assignments || [
      {
        key: 1,
        fromDate: null,
        toDate: null,
        isCurrentAssignment: false,
        department: null,
        designation: null,
        reportingTo: "",
      },
    ]
  );


  const handleAddUnit = () => {
    setassignments((prev) => [
      ...prev,
      {
        key: prev.length + 1,
        fromDate: null,
        toDate: null,
        isCurrentAssignment: false,
        department: null,
        designation: null,
        reportingTo: "",
      },
    ]);
  };


  useEffect(() => {
    const assignmentssData = assignments?.map((assignment) => ({
      fromDate: new Date(assignment?.fromDate).getTime(),
      toDate: null,
      isCurrentAssignment: assignment?.isCurrentAssignment,
      department: assignment?.department?.code,
      designation: assignment?.designation?.code,
      reportingTo: assignment?.reportingTo,
      isHOD: assignment?.isHOD
    }));
    onSelect(config.key, assignmentssData);
  }, [assignments]);

  let department = [];
  let designation = []
  const [focusIndex, setFocusIndex] = useState(-1);

  function getdepartmentdata() {
    return data?.MdmsRes?.["common-masters"]?.Department

  }
  function getdesignationdata() {
    return data?.MdmsRes?.["common-masters"]?.Designation

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
          designation={designation}
          getdesignationdata={getdesignationdata}
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
  designation,
  getdesignationdata
}) {

  const selectDepartment = (value) => {
    setassignments((pre) => pre.map((item) => (item.key === assignment.key ? { ...item, department: value } : item)));
  };
  const selectDesignation = (value) => {
    setassignments((pre) => pre.map((item) => (item.key === assignment.key ? { ...item, designation: value } : item)));
  };

  const onAssignmentChange = (value)=>{
    setassignments((pre) => pre.map((item) => (item.key === assignment.key ? { ...item, isCurrentAssignment: value } : item)));
    if(value){
      setassignments((pre) => pre.map((item) => (item.key === assignment.key ? { ...item, toDate: null } : item)));
    }
  }
const onIsHODchange = (value)=> {
  console.log(value)
  setassignments((pre) => pre.map((item) => (item.key === assignment.key ? { ...item, isHOD: value } : item)));

}
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
              name="fromDate"
              onChange={(e) => {
                setassignments((pre) => pre.map((item) => (item.key === assignment.key ? { ...item, fromDate: e } : item)));
                setFocusIndex(index);
              }}
              date={assignment?.fromDate}
              autoFocus={focusIndex === index}
            />
          </div>
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel className="card-label-smaller">Assigned to Date: </CardLabel>
          <div className="field">
            <DatePicker
              type="date"
              name="toDate"
              disabled={assignment?.isCurrentAssignment}
              onChange={(e) => {
                setassignments((pre) => pre.map((item) => (item.key === assignment.key ? { ...item, toDate: e } : item)));
                setFocusIndex(index);
              }}
              date={assignment?.toDate}
              autoFocus={focusIndex === index}
            />
          </div>
        </LabelFieldPair>

        <LabelFieldPair>
        <CardLabel className="card-label-smaller">.</CardLabel>
          <div className="field">
          <CheckBox
      onChange={(e) => onAssignmentChange(e.target.checked)}
      checked={assignment?.isCurrentAssignment}
      label={"Currently Assigned Here"}
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
            optionKey="code"
            t={t}
          />
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel className="card-label-smaller">Designation:</CardLabel>
          <Dropdown
            className="form-field"
            selected={assignment?.designation}
            disable={false}
            option={getdesignationdata(designation) || []}
            select={selectDesignation}
            optionKey="code"
            t={t}
          />
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel className="card-label-smaller">Head of Department: </CardLabel>
          <div className="field">
            <TextInput
              type="text"
              name="reportingTo"
              onChange={(e) => {
                setassignments((pre) => pre.map((item) => (item.key === assignment.key ? { ...item, reportingTo: e.target.value } : item)));
                setFocusIndex(index);
              }}
              value={assignment?.reportingTo}
              autoFocus={focusIndex === index}
            />
          </div>
        </LabelFieldPair>
        <LabelFieldPair>
        <CardLabel className="card-label-smaller">.</CardLabel>
          <div className="field">
          <CheckBox
      onChange={(e) => onIsHODchange(e.target.checked)}
      checked={assignment?.isHOD}
      label={"Currently Assigned Here"}
    />
          </div>
        </LabelFieldPair>
      </div>
    </div>
  );
}

export default Assignments;