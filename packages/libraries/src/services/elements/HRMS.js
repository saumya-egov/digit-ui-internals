import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const HRMSService = {
  employeedetails: ({ codes, tenantId }) =>
    Request({
      url: Urls.hrms.employeedetails,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId, ...codes },
    }),
};
