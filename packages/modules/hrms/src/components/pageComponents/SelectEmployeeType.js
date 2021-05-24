import React, { useState } from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { Dropdown, LabelFieldPair, CardLabel } from "@egovernments/digit-ui-react-components";
import { useLocation } from "react-router-dom";

const SelectEmployeeType = ({ t, config, onSelect, formData = {}, userType }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const { pathname: url } = useLocation();
  const editScreen = url.includes("/modify-application/");
  const { data: EmployeeTypes = {}, isLoading } = Digit.Hooks.pt.usePropertyMDMS(tenantId, "PropertyTax", "PTPropertyType") || {};
  const [employeeType, setemployeeType] = useState(formData?.employeeType);

  function SelectEmployeeType(value) {
    //   console.log(value)
    setemployeeType(value);
    onSelect(config.key, value);
  }
  const inputs = [
    {
      label: "HR_EMPLOYMENT_TYPE_LABEL",
      type: "text",
      name: "EmployeeType",
      validation: {},
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

    return inputs?.map((input, index) => {
      return (
        <LabelFieldPair key={index}>
          <CardLabel className="card-label-smaller">{t(input.label)}</CardLabel>
          <Dropdown
            className="form-field"
            selected={employeeType}
            option={EmployeeTypes}
            select={SelectEmployeeType}
            optionKey="i18nKey"
            t={t}
          />
        </LabelFieldPair>
      );
    });

};

export default SelectEmployeeType;
