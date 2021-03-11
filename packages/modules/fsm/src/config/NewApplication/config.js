export const newConfig = [
  {
    head: "ES_NEW_APPLICATION_PROPERTY_DETAILS",
    body: [
      {
        label: "ES_NEW_APPLICATION_PROPERTY_TYPE",
        isMandatory: true,
        type: "component",
        route: "property-type",
        key: "propertyType",
        component: "SelectPropertyType",
        texts: {
          headerCaption: "",
          header: "CS_FILE_APPLICATION_PROPERTY_LABEL",
          cardText: "CS_FILE_APPLICATION_PROPERTY_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        nextStep: "property-subtype",
      },
      {
        label: "ES_NEW_APPLICATION_PROPERTY_SUB-TYPE",
        isMandatory: true,
        type: "component",
        route: "property-subtype",
        key: "subtype",
        component: "SelectPropertySubtype",
        texts: {
          headerCaption: "",
          header: "CS_FILE_APPLICATION_PROPERTY_SUBTYPE_LABEL",
          cardText: "CS_FILE_APPLICATION_PROPERTY_SUBTYPE_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        nextStep: "map",
      },
    ],
  },
  {
    head: "ES_NEW_APPLICATION_LOCATION_DETAILS",
    body: [
      {
        route: "map",
        component: "SelectGeolocation",
        nextStep: "pincode",
        hideInEmployee: true,
        key: "address",
      },
      {
        route: "pincode",
        component: "SelectPincode",
        texts: {
          headerCaption: "",
          header: "CS_FILE_APPLICATION_PINCODE_LABEL",
          cardText: "CS_FILE_APPLICATION_PINCODE_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "CORE_COMMON_SKIP_CONTINUE",
        },
        withoutLabel: true,
        key: "address",
        nextStep: "address",
        type: "component",
      },
      {
        route: "address",
        component: "SelectAddress",
        withoutLabel: true,
        texts: {
          headerCaption: "CS_FILE_APPLICATION_PROPERTY_LOCATION_LABEL",
          header: "CS_FILE_APPLICATION_PROPERTY_LOCATION_ADDRESS_TEXT",
          cardText: "CS_FILE_APPLICATION_PROPERTY_LOCATION_CITY_MOHALLA_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "address",
        nextStep: "check-slum",
        isMandatory: true,
        type: "component",
      },
      {
        type: "component",
        route: "check-slum",
        isMandatory: true,
        component: "CheckSlum",
        texts: {
          header: "ES_NEW_APPLICATION_SLUM_CHECK",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        component: "CheckSlum",
        key: "address",
        withoutLabel: true,
        nextStep: "slum-details",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "slum-details",
        isMandatory: true,
        component: "SelectSlumName",
        texts: {
          header: "CS_NEW_APPLICATION_SLUM_NAME",
          cardText: "CS_NEW_APPLICATION_SLUM_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        withoutLabel: true,
        key: "address",
        nextStep: "street",
      },
      {
        type: "component",
        route: "street",
        component: "SelectStreet",
        key: "address",
        withoutLabel: true,
        texts: {
          headerCaption: "CS_FILE_APPLICATION_PROPERTY_LOCATION_LABEL",
          header: "CS_FILE_APPLICATION_PROPERTY_LOCATION_ADDRESS_TEXT",
          cardText: "CS_FILE_APPLICATION_PROPERTY_LOCATION_STREET_DOOR_NO_LABEL",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "CORE_COMMON_SKIP_CONTINUE",
        },
        nextStep: "landmark",
      },
      {
        type: "component",
        route: "landmark",
        component: "SelectLandmark",
        withoutLabel: true,
        texts: {
          headerCaption: "CS_FILE_APPLICATION_PROPERTY_LOCATION_LABEL",
          header: "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE",
          cardText: "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "CORE_COMMON_SKIP_CONTINUE",
        },
        key: "address",
        nextStep: "pit-type",
      },
    ],
  },
  {
    head: "CS_CHECK_PIT_SEPTIC_TANK_DETAILS",
    body: [
      {
        label: "ES_NEW_APPLICATION_PIT_TYPE",
        isMandatory: true,
        type: "component",
        route: "pit-type",
        key: "pitType",
        component: "SelectPitType",
        texts: {
          header: "CS_FILE_PROPERTY_PIT_TYPE",
          cardText: "CS_FILE_PROPERTY_PIT_TYPE_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "CORE_COMMON_SKIP_CONTINUE",
        },
        nextStep: "tank-size",
      },
      {
        route: "tank-size",
        component: "SelectTankSize",
        isMandatory: true,
        texts: {
          headerCaption: "",
          header: "CS_FILE_APPLICATION_PIT_SEPTIC_TANK_SIZE_TITLE",
          cardText: "CS_FILE_APPLICATION_PIT_SEPTIC_TANK_SIZE_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        type: "component",
        key: "pitDetail",
        nextStep: null,
        label: "ES_NEW_APPLICATION_PIT_DIMENSION",
      },
    ],
  },
];
