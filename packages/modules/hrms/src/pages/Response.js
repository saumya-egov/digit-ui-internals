
import React, { useEffect } from "react";
import { Card, Banner, CardText, SubmitBar, Loader, LinkButton } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";


const GetMessage = (type, action, isSuccess, isEmployee, t) => {
  return t(`${isEmployee ? "E" : "C"}S_EMPLOYEE_RESPONSE_${action ? action : "CREATE"}_${type}${isSuccess ? "" : "_ERROR"}`);
};

const GetActionMessage = (action, isSuccess, isEmployee, t) => {
  return GetMessage("ACTION", action, isSuccess, isEmployee, t);
};

const GetLabel = (action, isSuccess, isEmployee, t) => {
  return GetMessage("LABEL", action, isSuccess, isEmployee, t);
};

const DisplayText = (action, isSuccess, isEmployee, t) => {
  return GetMessage("DISPLAY", action, isSuccess, isEmployee, t);
};

const BannerPicker = (props) => {
  return (
    <Banner
      message={GetActionMessage( props.action, props.isSuccess, props.isEmployee, props.t)}
      applicationNumber={props.data?.Employees[0].id}
      info={GetLabel(props.action, props.isSuccess, props.isEmployee, props.t)}
      successful={props.isSuccess}
    />
  );
};

const Response = (props) => {
  const { t } = useTranslation();

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const { state } = props.location;
console.log(state)
  const mutation = state.key === "update" ? Digit.Hooks.hrms.useHRMSUpdate(tenantId) : Digit.Hooks.hrms.useHRMSCreate(tenantId);
  const coreData = Digit.Hooks.useCoreData();

  useEffect(() => {
    const onSuccess = () => {
    //   queryClient.clear();
    };
    if (state.key === "update") {
      // console.log("find state here", state.applicationData, state.action)
      mutation.mutate(
        {
          Employees: state.Employees
        },
        {
          onSuccess,
        }
      );
    } else {
      // console.log("find state here", state);
      mutation.mutate(state, {
        onSuccess,
      });
    }
  }, []);

  const displayText = (action) => {
    // console.log("find new application action here", action)
    // console.log("find mutation error here", mutation)
    if (mutation.isSuccess) {
      switch (action) {
        case "SUBMIT_FEEDBACK":
          return t("CS_SUBMIT_FEEDBACK_RESPONSE");
        case "SUBMIT":
          return t("CS_SUBMIT_APPLICATION_RESPONSE");
        case undefined:
          return t("CS_FILE_PROPERTY_RESPONSE");
        default:
          return t("CS_COMMON_THANK_YOU");
      }
    } else if (mutation.isError) {
      switch (action) {
        default:
          return mutation?.error?.message;
      }
    }
  };
  if (mutation.isLoading || mutation.isIdle) {
    return <Loader />;
  }

  return (
    <Card>
      <BannerPicker
        t={t}
        data={mutation.data}
        action={state.action}
        isSuccess={mutation.isSuccess}
        isLoading={mutation.isIdle || mutation.isLoading}
        isEmployee={props.parentRoute.includes("employee")}
      />
      <CardText>{DisplayText(state.action, mutation.isSuccess, props.parentRoute.includes("employee"), t)}</CardText>
      <Link to={`${props.parentRoute.includes("employee") ? "/digit-ui/employee" : "/digit-ui/citizen"}`}>
        <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>
  );
};

export default Response;
