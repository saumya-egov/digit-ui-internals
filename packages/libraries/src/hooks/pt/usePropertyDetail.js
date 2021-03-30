import { PTSearch } from "../../services/molecules/PT/Search";
import { useQuery } from "react-query";

const usePropertyDetail = (t, tenantId, applicationNos, config = {}, userType) => {
  return useQuery(["PT_SEARCH", applicationNos, userType], () => PTSearch.applicationDetails(t, tenantId, applicationNos, userType), config);
};

export default usePropertyDetail;
