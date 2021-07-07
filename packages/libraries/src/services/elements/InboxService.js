import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const InboxGeneral = {
  Search: ({ ...filters }) =>
    Request({
      url: Urls.InboxSearch,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      data: { ...filters },
    }),
};
