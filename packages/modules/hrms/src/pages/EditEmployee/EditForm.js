import React, { useState } from "react";
import { FormComposer } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { newConfig } from "../../components/config/config";
import { convertEpochToDate } from "../../components/Utils";

const EditForm = ({ tenantId, data }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [canSubmit, setSubmitValve] = useState(false);

  const defaultValues = {
    tenantId: tenantId,
    employeeStatus: "EMPLOYED",
    employeeType: data?.code,
    SelectEmployeePhoneNumber: { mobileNumber: data?.user?.mobileNumber },
    SelectEmployeeId: { code: data?.code },
    SelectEmployeeName: { employeeName: data?.user?.name },
    SelectEmployeeEmailId: { emailId: data?.user?.emailId },
    SelectEmployeeCorrespondenceAddress: { correspondenceAddress: data?.user?.correspondenceAddress },
    SelectDateofEmployment: { dateOfAppointment: convertEpochToDate(data?.dateOfAppointment) },
    SelectEmployeeType: { code: data?.employeeType, active: true },
    SelectEmployeeGender: {
      gender: {
        code: data?.user?.gender,
        name: `COMMON_GENDER_${data?.user?.gender}`,
      },
    },

    SelectDateofBirthEmployment: { dob: convertEpochToDate(data?.user?.dob) },
    Jurisdictions: data?.jurisdictions.map((ele) => {
      return Object.assign({}, ele, {
        hierarchy: {
          code: ele.hierarchy,
          name: ele.hierarchy,
        },
        boundaryType: { label: ele.boundaryType },
        boundary: { code: ele.boundary },
        roles: data?.user?.roles.filter((item) => item.tenantId == ele.boundary),
      });
    }),
    Assignments: data?.assignments.map((ele) => {
      return Object.assign({}, ele, {
        fromDate: convertEpochToDate(ele.fromDate),
        toDate: convertEpochToDate(ele.toDate),
        designation: {
          code: ele.designation,
          i18key: "COMMON_MASTERS_DESIGNATION_" + ele.designation,
        },
        department: {
          code: ele.department,
          i18key: "COMMON_MASTERS_DEPARTMENT_" + ele.department,
        },
      });
    }),
  };

  const onFormValueChange = (setValue = true, formData) => {
    let setcheck = false;
    if (formData?.Jurisdictions?.length > 0) {
      setcheck = formData?.Jurisdictions?.reduce((acc, key) => {
        if (!(key?.boundary && key?.boundaryType && key?.hierarchy && key?.tenantId && key?.roles?.length > 0)) {
          acc = false;
        }
        return acc;
      });
    }

    let setassigncheck = false;
    for (let i = 0; i < formData?.Assignments?.length; i++) {
      let key = formData?.Assignments[i];
      if (
        !(key.department && key.designation && key.fromDate && (formData?.Assignments[i].toDate || formData?.Assignments[i]?.isCurrentAssignment))
      ) {
        setassigncheck = false;
        break;
      } else if (formData?.Assignments[i].toDate == null && formData?.Assignments[i]?.isCurrentAssignment == false) {
        setassigncheck = false;
        break;
      } else {
        setassigncheck = true;
      }
    }
    if (
      formData?.SelectDateofEmployment?.dateOfAppointment &&
      formData?.SelectEmployeeCorrespondenceAddress?.correspondenceAddress &&
      formData?.SelectEmployeeGender?.gender.code &&
      formData?.SelectEmployeeName?.employeeName &&
      formData?.SelectEmployeePhoneNumber?.mobileNumber &&
      setcheck &&
      setassigncheck
    ) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  };

  const onSubmit = (input) => {
    let roles = input?.Jurisdictions?.map((ele) => {
      return ele.roles;
    });
    roles = [].concat.apply([], roles);
    data.assignments = input?.Assignments;
    data.dateOfAppointment = new Date(input?.SelectDateofEmployment?.dateOfAppointment).getTime();
    data.code = input?.SelectEmployeeId?.code ? input?.SelectEmployeeId?.code : undefined;
    data.jurisdictions = input?.Jurisdictions;
    data.user.emailId = input?.SelectEmployeeEmailId?.emailId ? input?.SelectEmployeeEmailId?.emailId : undefined;
    data.user.gender = input?.SelectEmployeeGender?.gender.code;
    (data.user.mobileNumber = input?.SelectEmployeePhoneNumber?.mobileNumber), (data["user"]["name"] = input?.SelectEmployeeName?.employeeName);
    data.user.correspondenceAddres = input?.SelectEmployeeCorrespondenceAddress?.correspondenceAddress;
    data.user.roles = roles;
    const Employees = [data];
    history.push("/digit-ui/employee/hrms/response", { Employees, key: "UPDATE", action: "UPDATE" });
  };
  const configs = newConfig;
  return (
    <FormComposer
      heading={t("HR_COMMON_EDIT_EMPLOYEE_HEADER")}
      isDisabled={!canSubmit}
      label={t("HR_COMMON_BUTTON_SUBMIT")}
      config={configs.map((config) => {
        return {
          ...config,
          body: config.body.filter((a) => !a.hideInEmployee),
        };
      })}
      fieldStyle={{ marginRight: 0 }}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      onFormValueChange={onFormValueChange}
    />
  );
};
export default EditForm;
