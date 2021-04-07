import { useQuery } from "react-query"
import { DSSService } from "../../services/elements/DSS"

const useDashoardConfig = () => {
  return useQuery("DSS_DASHBOARD_CONFIG", () => DSSService.getDashboardConfig());
};

export default useDashoardConfig;