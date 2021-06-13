import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EditForm from "./EditForm";
const EditEmpolyee = ({ parentUrl, heading }) => {
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const { id: employeeId } = useParams();
    const { isLoading, isError, error, data, ...rest } = Digit.Hooks.hrms.useHRMSSearch({ codes: employeeId }, tenantId);
    return data?.Employees[0] && !isLoading ? <EditForm data={data?.Employees[0]} tenantId={tenantId} /> : <h5>Its loading</h5>;
};

export default EditEmpolyee;
