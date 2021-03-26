import React from "react";
import { useQuery, useQueryClient } from "react-query";

const fetchFilters = (filters) => {
  let filtersObj = {};
  const { applicationNos, mobileNumber, limit, offset, sortBy, sortOrder, total } = filters;
  if (filters.applicationStatus && filters.applicationStatus?.[0]) {
    filtersObj.applicationStatus = filters.applicationStatus.map((status) => status.code).join(",");
  }
  if (filters.locality) {
    filtersObj.locality = filters.locality.map((item) => item.code.split("_").pop()).join(",");
  }
  if (filters.uuid && Object.keys(filters.uuid).length > 0) {
    filtersObj.assignee = filters.uuid.code === "ASSIGNED_TO_ME" ? uuid : "";
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

const inboxConfig = () => ({
  PT: {
    statusArray: [],
    inboxFiltersArray: [],
    searchFields: [],
  },
  FSM: {
    statusArray: [],
    inboxFiltersArray: [],
    searchFields: [],
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
  return ret;
};

const useInboxGeneral = ({
  tenantId,
  businessService,
  filters,
  middlewaresWf = [],
  middlewareSearch = [],
  combineResponse,
  wfConfig = {},
  searchConfig = {},
}) => {
  const client = useQueryClient();
  const workflowFilters = fetchFilters(filters).assignee ? { assignee: uuid } : {};

  const workFlowInstances = useQuery(
    ["WORKFLOW", businessService, workflowFilters],
    () => Digit.WorkflowService.getAllApplication(tenantId, { ...workflowFilters, businesssService }),
    { ...workFlowConfig, select: (data) => data.ProcessInstances }
  );
};
export default useInboxGeneral;
