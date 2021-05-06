import { useQuery, useQueryClient } from "react-query";

const useMCollectSearch = ({ tenantId, filters }, config = {}) => {
  const client = useQueryClient();
debugger;
  const args = tenantId ? { tenantId, filters } : { filters };
  const { isLoading, error, data } = useQuery(["mCollectSearchList", tenantId, filters], () => Digit.MCollectService.search(args), config);
  return { isLoading, error, data, revalidate: () => client.invalidateQueries(["propertySearchList", tenantId, filters]) };
};

export default useMCollectSearch;
