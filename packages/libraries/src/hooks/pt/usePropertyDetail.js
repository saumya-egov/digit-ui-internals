import { PTSearch } from "../../services/molecules/PT/Search";
import { useQuery } from "react-query";

const useApplicationDetail = (t, tenantId, applicationNos, config = {}, userType) => {
  return useQuery(["PT_SEARCH", applicationNos, userType], () => PTSearch.applicationDetails(t, tenantId, applicationNos, userType), config);
};

export default useApplicationDetail;
