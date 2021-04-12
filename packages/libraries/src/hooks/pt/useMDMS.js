import { MdmsService } from "../../services/elements/MDMS";
import { useQuery } from "react-query";

const useMDMS = (tenantId, moduleCode, type, config = {}, payload = []) => {
  const useFinancialYears = () => {
    return useQuery("PT_FINANCIAL_YEARLS", () => MdmsService.getDataByCriteria(tenantId, payload, moduleCode));
  };

  switch (type) {
    case "FINANCIAL_YEARLS":
      return useFinancialYears();
  }
};

export default useMDMS;
