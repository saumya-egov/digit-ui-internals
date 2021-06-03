import React from "react";
import { LabelFieldPair, CardLabel, TextInput, CardLabelError } from "@egovernments/digit-ui-react-components";
import { useLocation } from "react-router-dom";

const SelectEmployeePhoneNumber = ({ t, config, onSelect, formData = {}, userType, register, errors }) => {
  const { pathname: url } = useLocation();
  // console.log("find errors here", errors)
  const inputs = [
    {
        label: t("HRMS_MOBILE_NO_LABEL"),
        isMandatory: true,
        type: "text",
        name:"mobileNumber",
        populators: {
          validation: {
            required: true,
            pattern: /^[6-9]\d{9}$/,
          },
          componentInFront: <div className="employee-card-input employee-card-input--front">+91</div>,
          error: t("CORE_COMMON_MOBILE_ERROR"),
      },
    }
  ];

  function setValue(value, input) {
    onSelect(config.key, { ...formData[config.key], [input]: value });
    console.log("find value here", value, input, formData);
  }

  return (
    <div>
      {inputs?.map((input, index) => (
        <React.Fragment key={index}>
          {errors[input.name] && <CardLabelError>{t(input.error)}</CardLabelError>}
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">
              {t(input.label)}
              {input.isMandatory ? " * " : null}
            </CardLabel>
            <div className="field">
              <TextInput
                key={input.name}
                value={formData && formData[config.key] ? formData[config.key][input.name] : null}
                onChange={(e) => setValue(e.target.value, input.name)}
                disable={false}
                {...input.validation}
              />
            </div>
          </LabelFieldPair>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SelectEmployeePhoneNumber;
