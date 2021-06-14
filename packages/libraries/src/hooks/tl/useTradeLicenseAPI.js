import { TLService } from "../../services/elements/TL";
import { useMutation } from "react-query";

const useTradeLicenseAPI = (tenantId, type = true) => {
  return useMutation((data) => TLService.create(data, tenantId));
};

export default useTradeLicenseAPI;
