import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const DSSService = {
  getDashboardConfig: () =>
    Request({
      url: Urls.dss.dashboardConfig + '/propertytax',
      useCache: false,
      userService: false,
      method: "GET",
      auth: true
    })
}