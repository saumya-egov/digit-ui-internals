import Urls from "../atoms/urls";
import { Request, ServiceRequest } from "../atoms/Utils/Request";

export const MCollectService = {
  search: ({ tenantId, filters }) =>
    Request({
      url: Urls.mcollect.search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId, ...filters },
    }),
  search_bill: ({ tenantId, filters }) =>
    Request({
      url: Urls.mcollect.search_bill,
      useCache: false,
      method: "POST",
      data: { searchCriteria: { tenantId, ...filters } },
      auth: true,
      userService: false,
      //params: { tenantId, ...filters },
    }),
};
