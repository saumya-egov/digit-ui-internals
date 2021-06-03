import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormComposer } from "@egovernments/digit-ui-react-components";
import { newConfig } from "../components/config/config"
import { useHistory } from "react-router-dom";

const CreateEmployee = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [canSubmit, setSubmitValve] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();


  const onFormValueChange = (setValue, formData) => {
    console.log(formData?.Assignments)

    if (
      formData?.SelectDateofEmployment?.dateOfAppointment &&
      formData?.SelectEmployeeCorrespondenceAddress?.correspondenceAddress &&
      formData?.SelectEmployeeEmailId?.emailId &&
      formData?.SelectEmployeeGender?.gender.code &&
      formData?.SelectEmployeeId?.code &&
      formData?.SelectEmployeeName?.employeeName &&
      formData?.SelectEmployeePhoneNumber?.mobileNumber &&
      formData?.SelectEmployeeType?.code
    ) {
      setSubmitValve(true);
      console.log(formData)
    }
  }

  const onSubmit = (data) => {
    console.log(data)
    let roles = data.Jurisdictions.map(ele => {
       ele.roles["tenantId"] = ele.boundary
       return ele.roles
      })
    roles = [].concat.apply([], roles);
    let Employees = [{
      tenantId: tenantId,
      employeeStatus: "EMPLOYED",
      assignments: data?.Assignments,
      code: data?.SelectEmployeeId?.code,
      dateOfAppointment: new Date(data?.SelectDateofEmployment?.dateOfAppointment).getTime(),
      employeeType: data?.SelectEmployeeType?.code,
      jurisdictions: data?.Jurisdictions,
      user: {
        mobileNumber: data?.SelectEmployeePhoneNumber?.mobileNumber,
        name: data?.SelectEmployeeName?.employeeName,
        correspondenceAddres: data?.SelectEmployeeCorrespondenceAddress?.correspondenceAddress,
        emailId: data?.SelectEmployeeEmailId?.emailId,
        gender: data?.SelectEmployeeGender?.gender.code,
        dob: new Date(data?.SelectDateofBirthEmployment?.dob).getTime(),
        roles: roles,
        tenantId:tenantId
      },
      serviceHistory: [],
       education: [],
        tests: []
    }]
    history.push("/digit-ui/employee/hrms/response", { Employees });

    console.log(Employees)
  };

  const config = newConfig;
  console.log(config)

  return <FormComposer heading={t("HR_COMMON_CREATE_EMPLOYEE_HEADER")} config={config} onSubmit={onSubmit} onFormValueChange={onFormValueChange} isDisabled={!canSubmit} label={t("HRMS_SUBMIT")} />;
};
export default CreateEmployee;
