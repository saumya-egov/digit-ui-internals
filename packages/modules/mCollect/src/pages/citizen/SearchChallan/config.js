export const config = [
  {
    texts: {
      header: "MCOLLECT_SEARCH_CHALLAN_HEADER",
      submitBarLabel: "UC_SEARCH_LABEL",
      cardText: "CS_MCOLLECT_HOME_SEARCH_RESULTS_DESC",
    },
    inputs: [
      {
        label: "MCOLLECT_MOBILE_NO_LABEL",
        type: "mobileNumber",
        name: "mobileNumber",
        error: "CORE_COMMON_PHONENO_INVALIDMSG",
      },
      {
        label: "MCOLLECT_CHALLAN_NO_LABEL",
        //description: "CS_PROPERTY_ID_FORMAT_MUST_BE",
        type: "number",
        name: "ChallanNo",
        error: "MCOLLECT_WRONG_CHALLAN_NO",
      },
      {
        label: "UC_SERVICE_CATEGORY_LABEL",
        type: "any",
        name: "ServiceCategory",
        error: "MCOLLECT_INVALID_SERVICE_CATEGORY",
      },
    ],
  },
];
