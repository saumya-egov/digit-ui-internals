import { useQuery } from "react-query";
import { TLService } from "../../services/elements/TL";

const useTLSearchApplication = (params, config = {}) => {
  return useQuery(["TL_Application", params], () => TLService.search(params), config);
};

export default useTLSearchApplication;
