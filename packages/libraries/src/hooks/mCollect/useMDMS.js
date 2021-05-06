import { MdmsService } from "../../services/elements/MDMS";
import { useQuery } from "react-query";

const useMDMS = (tenantId, moduleCode, type, config = {}, payload = []) => {
  const queryConfig = { staleTime: Infinity, ...config };

  const BusinessService = () => {
    return useQuery("BUSINESSSERVICE", () => MdmsService.getBusinessService(tenantId, moduleCode, payload), queryConfig);
  };
  const TaxHeadMaster = () => {
    return useQuery("TAXHEADMASTER", () => MdmsService.getTaxHeadMaster(tenantId, moduleCode, payload), queryConfig);
  };
  const TaxPeriod = () => {
    return useQuery("TAXPERIOD", () => MdmsService.getTaxPeriod(tenantId, moduleCode, payload), queryConfig);
  };
  switch (type) {
    case "BusinessService":
      return BusinessService();
    case "TaxHeadMaster":
      return TaxHeadMaster();
    case "TaxPeriod":
      return TaxPeriod();
  }
};

export default useMDMS;
