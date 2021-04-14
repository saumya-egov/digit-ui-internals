import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const DSSService = {
  getDashboardConfig: (moduleCode) =>
    Request({
      url: Urls.dss.dashboardConfig + `/${moduleCode}`,
      useCache: false,
      userService: false,
      method: "GET",
      authHeader: true,
    }),
};
