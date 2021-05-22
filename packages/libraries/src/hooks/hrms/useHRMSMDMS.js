import { MdmsService } from "../../services/elements/MDMS";
import { useQuery } from "react-query";

const useHrmsMDMS = (tenantId, config = {}) => {
  return useQuery(["HRMS_EMP_RD", tenantId], () => MdmsService.getHrmsEmployeeRolesandDesignation(tenantId), config);
};

export default useHrmsMDMS;
