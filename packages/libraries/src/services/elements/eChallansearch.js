import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const ChallanSearchService = {
  search: ({ tenantId, filters }) =>
    Request({
      url: Urls.mCollect.search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId, ...filters },
    }),
