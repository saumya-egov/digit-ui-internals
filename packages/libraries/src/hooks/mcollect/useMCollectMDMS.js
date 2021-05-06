import { MdmsService } from "../../services/elements/MDMS";
import { useQuery } from "react-query";

const useMCollectMDMS = (tenantId, moduleCode, type, filter, config = {}) => {
  const useMCollectBillingService = () => {
    return useQuery("PT_OWNERSHIP_CATEGORY", () => MdmsService.getMCollectBillingService(tenantId, moduleCode, type, filter), config);
  };

  switch (type) {
    case "BusinessService":
      return useMCollectBillingService();
  }
};

export default useMCollectMDMS;
