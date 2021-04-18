export const filterFunctions = {
  PT: (filtersArg) => {
    console.log("filterArgs are", filtersArg);

    let { uuid } = Digit.UserService.getUser()?.info || {};

    const searchFilters = {};
    const workflowFilters = {};

    const { propertyIds, mobileNumber, limit, offset, sortBy, sortOrder, total, applicationStatus, services } = filtersArg || {};

    if (applicationStatus && applicationStatus?.[0]) {
      workflowFilters.applicationStatus = applicationStatus.map((status) => status.code).join(",");
    }
    if (filtersArg?.locality) {
      searchFilters.locality = filtersArg?.locality.map((item) => item.code.split("_").pop()).join(",");
    }
    if (filtersArg?.uuid && Object.keys(filtersArg?.uuid).length > 0) {
      workflowFilters.assignee = filtersArg?.uuid.code === "ASSIGNED_TO_ME" ? uuid : "";
    }
    if (mobileNumber) {
      searchFilters.mobileNumber = mobileNumber;
    }
    if (propertyIds) {
      searchFilters.propertyIds = propertyIds;
    }
    if (sortBy) {
      searchFilters.sortBy = sortBy;
    }
    if (sortOrder) {
      searchFilters.sortOrder = sortOrder;
    }
    if (services) {
      workflowFilters.businessService = services.join();
    }
    if (limit) {
      searchFilters.limit = limit;
    }
    if (offset) {
      searchFilters.offset = offset;
    }
    return { searchFilters, workflowFilters };
  },
};
