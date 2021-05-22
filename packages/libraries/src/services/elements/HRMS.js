import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

const HrmsService = {
    search: (tenantId, filters, searchParams) =>
        Request({
            url: Urls.hrms.search,
            useCache: false,
            method: "POST",
            auth: true,
            userService: true,
            params: { tenantId, ...filters, ...searchParams },
        }),
    count: ({ tenantId }) =>
        Request({
            url: Urls.hrms.count,
            useCache: false,
            method: "POST",
            auth: true,
            userService: true,
            params: { tenantId },
        })
}

export default HrmsService;