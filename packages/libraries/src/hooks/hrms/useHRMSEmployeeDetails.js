const useHRMSEmployeeDetails = ({ tenantId, codes }) => {
  const data = Digit.HRMSService.employeedetails({ tenantId, codes });
  return data;
};
export default useHRMSEmployeeDetails;
