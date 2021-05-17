import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

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
  create: (details, tenantId) =>
    Request({
      url: Urls.mcollect.create,
      data: details,
      useCache: true,
      method: "POST",
      params: { tenantId },
      auth: true,
      userService: true,
    }),
  generateBill: (consumerCode, tenantId, businessService, operation) =>
    Request({
      url: Urls.mcollect.fetch_bill,
      data: {},
      useCache: true,
      method: "POST",
      params: { consumerCode, tenantId, businessService },
      auth: true,
      userService: true,
    }),
  search_bill: ({ tenantId, filters }) =>
    Request({
      url: filters.businesService !== "PT" ? Urls.mcollect.search_bill : Urls.mcollect.search_bill_pt,
      useCache: false,
      method: "POST",
      data: { searchCriteria: { tenantId, ...filters } },
      auth: true,
      userService: false,
      //params: { tenantId, ...filters },
    }),
};
