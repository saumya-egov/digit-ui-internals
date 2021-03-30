import { PTService } from "../../elements/PT";
import { getPropertyTypeLocale, getPropertySubtypeLocale } from "../../../utils/fsm";

export const PTSearch = {
  all: async (tenantId, filters = {}) => {
    const response = await PTService.search({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await PTService.search({ tenantId, filters });
    return response.Properties[0];
  },
  applicationDetails: async (t, tenantId, applicationNos, userType) => {
    const filter = { applicationNos };
    // const response = await PTSearch.application(tenantId, filter);

    // const employeeResponse = [
    //   {
    //     title: "ES_TITLE_APPLICATION_DETAILS",
    //     values: [
    //       { title: "CS_FILE_DESLUDGING_APPLICATION_NO", value: response?.applicationNo },
    //       { title: "ES_APPLICATION_CHANNEL", value: `ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_${response?.source}` },
    //     ],
    //   },
    //   {
    //     title: "ES_APPLICATION_DETAILS_PROPERTY_ADDRESS",
    //     values: [
    //       { title: "ES_APPLICATION_DETAILS_LOCATION_PINCODE", value: response?.address?.pincode },
    //       { title: "ES_APPLICATION_DETAILS_LOCATION_CITY", value: response?.address?.cit },
    //       {
    //         title: "ES_APPLICATION_DETAILS_LOCATION_LOCALITY",
    //         value: `${response?.tenantId?.toUpperCase()?.split(".")?.join("_")}_REVENUE_${response?.address?.locality?.code}`,
    //       },
    //       { title: "ES_APPLICATION_DETAILS_LOCATION_STREET_NAME", value: response?.address?.street },
    //       { title: "ES_APPLICATION_DETAILS_LOCATION_BUILDING_NUMBER", value: response?.address?.buildingName },
    //     ],
    //   },
    //   {
    //     title: "ES_APPLICATION_DETAILS_PROPERTY_ASSESSMENT_DETAILS",
    //     values: [
    //       { title: "ES_APPLICATION_DETAILS_PROPERTY_USAGE_TYPE", value: getPropertyTypeLocale(response?.propertyUsage) },
    //       { title: "ES_APPLICATION_DETAILS_PROPERTY_TYPE", value: getPropertySubtypeLocale(response?.propertyUsage) },
    //       { title: "ES_APPLICATION_DETAILS_PROPERTY_PLOT_SIZE", value: response?.superBuiltUpArea },
    //       { title: "ES_APPLICATION_DETAILS_PROPERTY_NO_OF_FLOORS", value: response?.noOfFloors },
    //     ],
    //     additionalDetails: {
    //       floors: response?.floors,
    //     },
    //   },
    //   {
    //     title: "ES_APPLICATION_DETAILS_PROPERTY_OWNERSHIP_DETAILS",
    //     values: [
    //       { title: "ES_APPLICATION_DETAILS_OWNER_NAME", value: response?.owners[0]?.name },
    //       { title: "ES_APPLICATION_DETAILS_GENDER", value: response?.owners[0]?.gender },
    //       { title: "ES_APPLICATION_DETAILS_MOBILE_NUMBER", value: response?.owners[0]?.mobileNumber },
    //       { title: "ES_APPLICATION_DETAILS_SPECIAL_CATEGORY", value: response?.specialCategory || "NA" },
    //       { title: "ES_APPLICATION_DETAILS_GUARDIAN_NAME", value: response?.owners[0]?.name },
    //       { title: "ES_APPLICATION_DETAILS_OWNERSHIP_TYPE", value: response?.ownershipCategory },
    //       { title: "ES_APPLICATION_DETAILS_EMAIL", value: response?.owners[0]?.emailId },
    //       { title: "ES_APPLICATION_DETAILS_CORRESPONDENCE_ADDRESS", value: response?.owners[0]?.permanentAddress },
    //     ],
    //     additionalDetails: {
    //       documents: response?.documents,
    //     },
    //   },
    // ];
    const employeeResponse = [
      {
        title: "ES_TITLE_APPLICATION_DETAILS",
        values: [
          { title: "CS_FILE_DESLUDGING_APPLICATION_NO", value: applicationNos },
          { title: "ES_APPLICATION_CHANNEL", value: "Online" },
        ],
      },
      {
        title: "ES_APPLICATION_DETAILS_PROPERTY_ADDRESS",
        values: [
          { title: "ES_APPLICATION_DETAILS_LOCATION_PINCODE", value: "600001" },
          { title: "ES_APPLICATION_DETAILS_LOCATION_CITY", value: "City A" },
          {
            title: "ES_APPLICATION_DETAILS_LOCATION_LOCALITY",
            value: "Anand Nagar Extension",
          },
          { title: "ES_APPLICATION_DETAILS_LOCATION_STREET_NAME", value: "Gandhi Street" },
          { title: "ES_APPLICATION_DETAILS_LOCATION_BUILDING_NUMBER", value: "25/A" },
        ],
      },
      {
        title: "ES_APPLICATION_DETAILS_PROPERTY_ASSESSMENT_DETAILS",
        values: [
          { title: "ES_APPLICATION_DETAILS_PROPERTY_USAGE_TYPE", value: "Residential" },
          { title: "ES_APPLICATION_DETAILS_PROPERTY_TYPE", value: "Independent Building" },
          { title: "ES_APPLICATION_DETAILS_PROPERTY_PLOT_SIZE", value: "1000" },
          { title: "ES_APPLICATION_DETAILS_PROPERTY_NO_OF_FLOORS", value: "2" },
        ],
        additionalDetails: {
          floors: [
            {
              title: "Ground Floor",
              values: [
                {
                  title: "Unit 1",
                  values: [
                    {
                      title: "ES_APPLICATION_DETAILS_UNIT_USAGE_TYPE",
                      value: "Residentail",
                    },
                    {
                      title: "ES_APPLICATION_DETAILS_UNIT_OCCUPANCY_TYPE",
                      value: "Self Occupied",
                    },
                    {
                      title: "ES_APPLICATION_DETAILS_UNIT_BUILD_UP_AREA",
                      value: "1000 sq.ft",
                    },
                  ],
                },
                {
                  title: "Unit 2",
                  values: [
                    {
                      title: "ES_APPLICATION_DETAILS_UNIT_USAGE_TYPE",
                      value: "Residentail",
                    },
                    {
                      title: "ES_APPLICATION_DETAILS_UNIT_OCCUPANCY_TYPE",
                      value: "Self Occupied",
                    },
                    {
                      title: "ES_APPLICATION_DETAILS_UNIT_BUILD_UP_AREA",
                      value: "1000 sq.ft",
                    },
                  ],
                },
              ],
            },
            {
              title: "First Floor",
              values: [
                {
                  title: "Unit 1",
                  values: [
                    {
                      title: "ES_APPLICATION_DETAILS_UNIT_USAGE_TYPE",
                      value: "Residentail",
                    },
                    {
                      title: "ES_APPLICATION_DETAILS_UNIT_OCCUPANCY_TYPE",
                      value: "Self Occupied",
                    },
                    {
                      title: "ES_APPLICATION_DETAILS_UNIT_BUILD_UP_AREA",
                      value: "1000 sq.ft",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        title: "ES_APPLICATION_DETAILS_PROPERTY_OWNERSHIP_DETAILS",
        values: [
          { title: "ES_APPLICATION_DETAILS_OWNER_NAME", value: "Antriksh" },
          { title: "ES_APPLICATION_DETAILS_GENDER", value: "Male" },
          { title: "ES_APPLICATION_DETAILS_MOBILE_NUMBER", value: "XXXXXXXXXX" },
          { title: "ES_APPLICATION_DETAILS_SPECIAL_CATEGORY", value: "None" },
          { title: "ES_APPLICATION_DETAILS_GUARDIAN_NAME", value: "Antriksh" },
          { title: "ES_APPLICATION_DETAILS_OWNERSHIP_TYPE", value: "Single Owner" },
          { title: "ES_APPLICATION_DETAILS_EMAIL", value: "None" },
          { title: "ES_APPLICATION_DETAILS_CORRESPONDENCE_ADDRESS", value: "ABCD" },
        ],
        additionalDetails: {
          documents: [
            {
              title: "Documents",
              values: [
                {
                  title: "Address Proof",
                },
                {
                  title: "Address Proof",
                },
                {
                  title: "Address Proof",
                },
                {
                  title: "Address Proof",
                },
              ],
            },
          ],
        },
      },
    ];

    if (userType !== "CITIZEN")
      return {
        // tenantId: response.tenantId,
        applicationDetails: employeeResponse,
        // additionalDetails: response?.additionalDetails,
      };
  },
};
