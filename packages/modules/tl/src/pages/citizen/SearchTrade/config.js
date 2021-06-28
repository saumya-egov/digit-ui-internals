export const config = [
    {
      texts: {
        header: "Search Trade License",
        submitButtonLabel: "Search",
        text: "Provide atleast one parameter",
      },
      inputs: [
        {
          label: "Owner Mobile Number",
          type: "mobileNumber",
          name: "mobileNumber",
          error: "ERR_HRMS_INVALID_USER_ID",
        },
        {
          label: "Trade License Number",
          type: "text",
          name: "LicenseNum",
          error: "ERR_HRMS_INVALID_CITY",
        },
      ],
    },
  ];