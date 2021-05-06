import React, { useState } from "react";
import { Dropdown } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const ApplicantDetails = (channelMenu, channel, setChannel, disable = {}) => {
  const { t } = useTranslation();
  return {
    head: t("CONSUMERDETAILS"),
    body: [
      {
        label: t("UC_CONS_NAME_LABEL"),
        type: "text",
        isMandatory: true,
        populators: {
          name: "consumerName",
          validation: {
            required: true,
            pattern: /[A-Za-z]/,
          },
        },
        disable: disable.name,
      },
      {
        label: t("UC_MOBILE_NO_LABEL"),
        type: "text",
        isMandatory: true,
        populators: {
          name: "mobileNumber",
          validation: {
            required: true,
            pattern: /^[6-9]\d{9}$/,
          },
        },
        disable: disable.number,
      },
      {
        label: t("UC_DOOR_NO_LABEL"),
        type: "text",
        isMandatory: true,
        populators: {
          name: "Door/HouseNumber",
          validation: {
            required: true,
            pattern: /[a-zA-Z]{0,1}$/,
          },
        },
        disable: disable.number,
      },
      {
        label: t("UC_BLDG_NAME_LABEL"),
        type: "text",
        isMandatory: true,
        populators: {
          name: "Building/ColonyName",
          validation: {
            required: true,
            pattern: /[A-Za-z]/,
          },
        },
        disable: disable.name,
      },
      {
        label: t("UC_SRT_NAME_LABEL"),
        type: "text",
        isMandatory: true,
        populators: {
          name: "StreetName",
          validation: {
            required: true,
            pattern: /[A-Za-z]/,
          },
        },
        disable: disable.name,
      },
      {
        label: t("UC_MOHALLA_LABEL"),
        type: "dropdown",
        populators: (
          <Dropdown option={channelMenu} optionKey="i18nKey" id="channel" selected={channel} select={setChannel} t={t} disable={disable.channel} />
        ),
      },
      {
        label: t("UC_PINCODE_LABEL"),
        type: "text",
        isMandatory: true,
        populators: {
          name: "PinCode",
          validation: {
            required: true,
            pattern: /^(\d{4}|\d{6})$/,
          },
        },
        disable: disable.number,
      },
    ],
    head: t("SERVICEDETAILS"),
    body: [
      {
        label: t("TL_NEW_TRADE_DETAILS_CITY_LABEL"),
        type: "dropdown",
        populators: (
          <Dropdown option={channelMenu} optionKey="i18nKey" id="channel" selected={channel} select={setChannel} t={t} disable={disable.channel} />
        ),
      },
      {
        label: t("UC_SERVICE_CATEGORY_LABEL"),
        type: "dropdown",
        populators: (
          <Dropdown option={channelMenu} optionKey="i18nKey" id="channel" selected={channel} select={setChannel} t={t} disable={disable.channel} />
        ),
      },
      {
        label: t("UC_SERVICE_TYPE_LABEL"),
        type: "dropdown",
        populators: (
          <Dropdown option={channelMenu} optionKey="i18nKey" id="channel" selected={channel} select={setChannel} t={t} disable={disable.channel} />
        ),
      },
      {
        label: t("UC_FROM_DATE_LABEL"),
        type: "text",
        isMandatory: true,
        populators: {
          name: "FromDate",
          validation: {
            required: true,
            pattern: "(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]d{4}",
          },
        },
        disable: disable.number,
      },
      {
        label: t("UC_TO_DATE_LABEL"),
        type: "text",
        isMandatory: true,
        populators: {
          name: "ToDate",
          validation: {
            required: true,
            pattern: "(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]d{4}",
          },
        },
        disable: disable.number,
      },
      {
        label: t("UC_COMMENT_LABEL"),
        type: "text",
        isMandatory: true,
        populators: {
          name: "Comments",
          validation: {
            required: true,
            pattern: /[A-Za-z]/,
          },
        },
        disable: disable.name,
      },
    ],
  };
};

export default ApplicantDetails;
