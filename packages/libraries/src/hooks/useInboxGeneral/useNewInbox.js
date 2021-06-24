import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import { FSMService } from "../../services/elements/FSM";
import { PTService } from "../../services/elements/PT";
import { TableConfig } from "./tableConfig";
import { filterFunctions } from "./newFilterFn";
import { getSearchFields } from "./searchFields";
import { InboxGeneral } from "../../services/elements/InboxService";

const inboxConfig = (tenantId, filters) => ({
  PT: {
    services: ["PT.CREATE"],
    searchResponseKey: "Properties",
    businessIdsParamForSearch: "acknowledgementIds",
    businessIdAliasForSearch: "acknowldgementNumber",
    fetchFilters: filterFunctions.PT,
    _searchFn: () => PTService.search({ tenantId, filters }),
  },
  FSM: {
    services: ["FSM"],
    searchResponseKey: "fsm",
    businessIdsParamForSearch: "applicationNos",
    businessIdAliasForSearch: "applicationNo",
    fetchFilters: filterFunctions.FSM,
    _searchFn: () => FSMService.search(tenantId, filters),
  },
});

const callMiddlewares = async (data, middlewares) => {
  let applyBreak = false;
  let itr = -1;
  let _break = () => (applyBreak = true);
  let _next = async (data) => {
    if (!applyBreak && ++itr < middlewares.length) {
      let key = Object.keys(middlewares[itr])[0];
      let nextMiddleware = middlewares[itr][key];
      let isAsync = nextMiddleware.constructor.name === "AsyncFunction";
      if (isAsync) return await nextMiddleware(data, _break, _next);
      else return nextMiddleware(data, _break, _next);
    } else return data;
  };
  let ret = await _next(data);
  return ret || [];
};

const useNewInboxGeneral = ({ tenantId, ModuleCode, filters, middleware = [] }) => {
  const client = useQueryClient();
  const { t } = useTranslation();
  const { fetchFilters, searchResponseKey, businessIdAliasForSearch, businessIdsParamForSearch } = inboxConfig()[ModuleCode];
  let { workflowFilters, searchFilters, limit, offset, sortBy, sortOrder } = fetchFilters(filters);

  debugger;

  const query = useQuery(
    ["INBOX", workflowFilters, searchFilters, ModuleCode, limit, offset, sortBy, sortOrder],
    () =>
      InboxGeneral.Search({
        inbox: { tenantId, processSearchCriteria: workflowFilters, moduleSearchCriteria: searchFilters, limit, offset, sortBy, sortOrder },
      }),
    {
      select: (data) => {
        return data.items?.map((obj) => ({ searchData: obj.businessObject, workflowData: obj.moduleSearchCriteria }));
      },
      retry: false,
    }
  );

  return {
    ...query,
    searchResponseKey,
    businessIdsParamForSearch,
    businessIdAliasForSearch,
    tableConfig: TableConfig(t)[ModuleCode],
    searchFields: getSearchFields(true)[ModuleCode],
  };

  //   return {
  //     ...searchResult,
  //     revalidate,
  //     searchResponseKey,
  //     businessIdsParamForSearch,
  //     businessIdAliasForSearch,
  //     tableConfig: TableConfig(t)[ModuleCode],
  //     searchFields: getSearchFields(isInbox)[ModuleCode],
  //     wfFetching,
  //   };
};

export default useNewInboxGeneral;
