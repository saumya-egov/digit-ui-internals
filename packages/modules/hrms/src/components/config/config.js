export const newConfig = [
  {
    head:"Personal Details",
    body:[
      {
        type:"component",
        component:"SelectEmployeeName",
        key: "SelectEmployeeName",
        withoutLabel: true,
      },
      {
        type:"component",
        component:"SelectEmployeePhoneNumber",
        key: "SelectEmployeePhoneNumber",
        withoutLabel: true,
      },
      {
        type:"component",
        component:"SelectDateofBirthEmployment",
        key: "SelectDateofBirthEmployment",
        withoutLabel: true,
      },
      ,{
        type:"component",
        component:"Banner",
        key: "Banner0",
        withoutLabel: true,
        texts: {
          headerCaption: "Info",
          header: "The Mobile  number entered must be unique. Search the mobile number to check if it exist already in the system",
        }
        },
      {
        type:"component",
        component:"SelectEmployeeGender",
        key: "SelectEmployeeGender",
        withoutLabel: true,
      },
      {
        type:"component",
        component:"SelectEmployeeEmailId",
        key: "SelectEmployeeEmailId",
        withoutLabel: true,
      },
      {
        type:"component",
        component:"SelectEmployeeCorrespondenceAddress",
        key: "SelectEmployeeCorrespondenceAddress",
        withoutLabel: true,
      }

    ]
  },
  {
    head:"HR_NEW_EMPLOYEE_FORM_HEADER",
    body:[
      {
        type:"component",
        component:"SelectEmployeeId",
        key: "SelectEmployeeId",
        withoutLabel: true,
      },

      {
        type:"component",
        component:"SelectDateofEmployment",
        key: "SelectDateofEmployment",
        withoutLabel: true,
      },
      {
        type:"component",
        component:"SelectEmployeeType",
        key: "SelectEmployeeType",
        withoutLabel: true,
      },{
      type:"component",
      component:"Banner",
      key: "Banner1",
      withoutLabel: true,
      texts: {
        headerCaption: "Info",
        header: "ID Assigned to Employee by Municipality after hiring. Incase there is no ID assigned, leave  the column blank for system to generate Employee ID",
      }
      }
    ]
  },
    {
      head: "ES_NEW_APPLICATION_LOCATION_DETAILS",
      body: [
        {
            type: "component",
            component: "Jurisdictions",
            key: "Jurisdictions",
            withoutLabel: true,
          }
      ]
    },

    {
        head: "HR_ASSIGN_DET_HEADER",
        body: [
          {
            type:"component",
            component:"Banner",
            key: "Banner2",
            withoutLabel: true,
            texts: {
              headerCaption: "Info",
              header: "Verify entered details before submission. Assignment details cannot be edited once submitted.",
            }
            },
          {
              type: "component",
              component: "Assignments",
              key: "Assignments",
              withoutLabel: true,
            }
        ]
      }
]