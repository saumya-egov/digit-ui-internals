const inboxSearchFields = {
  PT: [
    {
      label: "ES_SEARCH_APPLICATION_APPLICATION_NO",
      name: "applicationNos",
      roles: [],
    },
    {
      label: "ES_INBOX_UNIQUE_PROPERTY_ID",
      name: "propertyId",
      roles: [],
    },
    {
      label: "ES_SEARCH_APPLICATION_MOBILE_NO",
      name: "mobileNumber",
      maxlength: 10,
      roles: [],
    },
  ],
};

const searchFieldsForSearch = {
  PT: [
    {
      label: "ES_INBOX_UNIQUE_PROPERTY_ID",
      name: "applicationNos",
      roles: [],
    },
    {
      label: "ES_SEARCH_EXISTING_PROPERTY_ID",
      name: "mobileNumber",
      maxlength: 10,
      pattern: "[6-9][0-9]{9}",
      title: "ES_SEARCH_APPLICATION_MOBILE_INVALID",
      roles: [],
    },
    {
      label: "ES_SEARCH_APPLICATION_MOBILE_NO",
      name: "mobileNumber",
      maxlength: 10,
      roles: [],
    },
  ],
};

export const getSearchFields = (isInbox) => (isInbox ? inboxSearchFields : searchFieldsForSearch);
