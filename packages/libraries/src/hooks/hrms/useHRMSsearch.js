import { useQuery, useQueryClient } from "react-query";
import  HrmsService  from "../../services/elements/HRMS";

export const useHRMSSearch = (searchparams, tenantId, filters, config = {}) => {
  return useQuery(["HRMS_SEARCH", searchparams, tenantId, filters], () => HrmsService.search(tenantId, filters, searchparams), config);
};

export default useHRMSSearch;
