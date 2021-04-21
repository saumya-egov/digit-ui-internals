import React from "react";
import { Dropdown, RadioButtons, ActionBar, RemoveableTag, CloseSvg, CheckBox } from "@egovernments/digit-ui-react-components";
import { useSelector } from "react-redux";
import { ApplyFilterBar } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

import Status from "./Status";

const Filter = ({ searchParams, onFilterChange, ...props }) => {
  const { t } = useTranslation();
  const clearAll = () => {};

  const ApplicationTypeMenu = [
    {
      label: "ES_PT_NEW_PROPERTY",
      value: "PT.CREATE",
    },
    {
      label: "ES_PT_TRANSFER_OWNERSHIP",
      value: "PT.MUTATION",
    },
  ];

  const onServiceSelect = (e, label) => {
    if (e.target.checked) onFilterChange({ services: [...searchParams.services, label] });
    else onFilterChange({ services: searchParams.services.filter((o) => o !== label) });
  };

  const translateState = (state) => {
    console.log(state);
    return state.state;
  };

  return (
    <React.Fragment>
      <div className="filter">
        <div className="filter-card">
          <div className="heading">
            <div className="filter-label">{t("ES_COMMON_FILTER_BY")}:</div>
            <div className="clearAll" onClick={clearAll}>
              {t("ES_COMMON_CLEAR_ALL")}
            </div>
            {props.type === "desktop" && (
              <span className="clear-search" onClick={clearAll}>
                {t("ES_COMMON_CLEAR_ALL")}
              </span>
            )}
            {props.type === "mobile" && (
              <span onClick={props.onClose}>
                <CloseSvg />
              </span>
            )}
          </div>
          <div>
            <RadioButtons
              onSelect={(d) => onFilterChange({ uuid: d })}
              selectedOption={searchParams?.uuid}
              t={t}
              optionsKey="name"
              options={[
                { code: "ASSIGNED_TO_ME", name: "ES_INBOX_ASSIGNED_TO_ME" },
                { code: "ASSIGNED_TO_ALL", name: "ES_INBOX_ASSIGNED_TO_ALL" },
              ]}
            />
            <div>
              <div className="filter-label">{t("ES_PT_APP_TYPE")}</div>
              {ApplicationTypeMenu.map((e, index) => {
                const checked = searchParams?.services?.includes(e.value);
                return (
                  <CheckBox
                    key={index + "service"}
                    label={t(e.label)}
                    value={e.label}
                    checked={checked}
                    onChange={(event) => onServiceSelect(event, e.value)}
                  />
                );
              })}
            </div>
            <div>
              <Status
                businessServices={searchParams.services}
                translateState={translateState}
                onAssignmentChange={(e, status) => {
                  if (e.target.checked) onFilterChange({ applicationStatus: [...searchParams?.applicationStatus, status] });
                  else onFilterChange({ applicationStatus: searchParams?.applicationStatus.filter((e) => e.code !== status.code) });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
