import { useQuery, useQueryClient } from "react-query";
import { FSMService } from "../services/elements/FSM";
import { PTService } from "../services/elements/PT";

const fetchFilters = (filtersArg) => {
  // console.log(filters, "inside fetchFilters");
  let filtersObj = {};
  const { applicationNos, mobileNumber, limit, offset, sortBy, sortOrder, total } = filtersArg || {};
  if (filtersArg?.applicationStatus && filtersArg?.applicationStatus?.[0]) {
    filtersObj.applicationStatus = filtersArg?.applicationStatus.map((status) => status.code).join(",");
  }
  if (filtersArg?.locality) {
    filtersObj.locality = filtersArg?.locality.map((item) => item.code.split("_").pop()).join(",");
  }
  if (filtersArg?.uuid && Object.keys(filtersArg?.uuid).length > 0) {
    filtersObj.assignee = filtersArg?.uuid.code === "ASSIGNED_TO_ME" ? uuid : "";
  }
  if (mobileNumber) {
    filtersObj.mobileNumber = mobileNumber;
  }
  if (applicationNos) {
    filtersObj.applicationNos = applicationNos;
  }
  if (sortBy) {
    filtersObj.sortBy = sortBy;
  }
  if (sortOrder) {
    filtersObj.sortOrder = sortOrder;
  }
  if (!total) return { limit, offset, sortBy, sortOrder, ...filtersObj };
  else return { limit: 100000, offset: 0, sortBy, sortOrder, ...filtersObj };
};

const inboxConfig = (tenantId, filters) => ({
  PT: {
    searchResponseKey: "Properties",
    businessIdsParamForSearch: "propertyIds",
    businessIdAliasForSearch: "propertyId",
    _searchFn: () => PTService.search({ tenantId, filters }),
  },
  FSM: {
    searchResponseKey: "fsm",
    businessIdsParamForSearch: "applicationNos",
    businessIdAliasForSearch: "applicationNo",
    _searchFn: () => FSMService.search(tenantId, filters),
  },
});

/**
 *
 * @param {*} data
 * @param {Array of Objects containing async or pure functions} middlewares
 * @returns {object}
 */

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
  return ret;
};

const useInboxGeneral = ({
  tenantId,
  businessService,
  filters,
  middlewaresWf = [],
  middlewareSearch = [],
  combineResponse = (d, wf) => ({ searchData: { ...d }, workflowData: { ...wf } }),
  wfConfig = {},
  searchConfig = {},
}) => {
  const client = useQueryClient();
  const filtersObj = fetchFilters({ ...filters });

  const workflowFilters = filtersObj.assignee ? { assignee: uuid } : {};
  const workFlowInstances = useQuery(
    ["WORKFLOW_INBOX", businessService, workflowFilters],
    () =>
      Digit.WorkflowService.getAllApplication(tenantId, { ...workflowFilters, businessService }).then((data) =>
        callMiddlewares(data.ProcessInstances, middlewaresWf)
      ),
    { ...wfConfig }
  );

  const { data: processInstances, isLoading: workflowLoading, isFetching: wfFetching, isSuccess: wfSuccess } = workFlowInstances;
  let applicationNos = !wfFetching && wfSuccess ? { applicationNos: processInstances.map((e) => e.businessId).join() } : {};
  applicationNos = applicationNos?.applicationNos === "" ? { applicationNos: "xyz" } : applicationNos;

  const { searchResponseKey, businessIdAliasForSearch, businessIdsParamForSearch } = inboxConfig()[businessService];

  const searchFilters = {
    ...filtersObj,
    [businessIdsParamForSearch]: filtersObj.applicationNos ? filtersObj.applicationNos : applicationNos.applicationNos,
  };

  const { _searchFn } = inboxConfig(tenantId, searchFilters)[businessService];

  /**
   * Convert Wf Array to Object
   */

  const processInstanceBuisnessIdMap = processInstances?.reduce((object, item) => {
    return { ...object, [item["businessId"]]: item };
  }, {});

  const appList = useQuery(
    [
      "SEARCH_INBOX",
      businessService,
      { ...filtersObj, applicationNos: filtersObj.applicationNos ? filtersObj.applicationNos : applicationNos.applicationNos },
    ],
    () => _searchFn().then((data) => callMiddlewares(data[searchResponseKey], middlewareSearch)),
    {
      enabled: !wfFetching && wfSuccess,
      select: (d) => d.map((e) => combineResponse(e, processInstanceBuisnessIdMap[e[businessIdAliasForSearch]])),
      ...searchConfig,
    }
  );

  const revalidate = () => {
    client.refetchQueries(["WORKFLOW_INBOX"]);
    client.refetchQueries(["SEARCH_INBOX"]);
  };

  client.setQueryData(`FUNCTION_RESET_INBOX_${businessService}`, { revalidate });

  return {
    ...appList,
    revalidate,
    searchResponseKey,
    businessIdsParamForSearch,
    businessIdAliasForSearch,
  };
};

export default useInboxGeneral;
