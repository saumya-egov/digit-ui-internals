import React from "react";
import { Dropdown } from "@egovernments/digit-ui-react-components";

export const configAcceptDso = ({ t, dsoData, dso, selectVehicleNo, vehicleNoList, vehicleNo, vehicle }) => {
  return {
    label: {
      heading: "ES_FSM_ACTION_TITLE_ASSIGN_VEHICLE",
      submit: "CS_COMMON_ASSIGN_VEHICLE",
      cancel: "CS_COMMON_CANCEL",
    },
    form: [
      {
        body: [
          {
            label: t("ES_FSM_ACTION_VEHICLE_REGISTRATION_NO"),
            isMandatory: true,
            type: "dropdown",
            populators: (
              <Dropdown
                option={vehicleNoList}
                autoComplete="off"
                optionKey="registrationNumber"
                id="vehicle"
                select={selectVehicleNo}
                selected={vehicleNo}
              />
            ),
          },
          {
            label: t("ES_FSM_ACTION_VEHICLE_CAPACITY_IN_LTRS"),
            type: "text",
            populators: {
              name: "capacity",
              validation: {
                required: true,
              },
            },
            disable: true,
          },
        ],
      },
    ],
  };
};
