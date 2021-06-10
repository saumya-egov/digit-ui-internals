import React from "react";
import { useTranslation } from "react-i18next";
import { SubmitBar, ActionBar, Menu } from "@egovernments/digit-ui-react-components";

function ApplicationDetailsActionBar({ workflowDetails, displayMenu, onActionSelect, setDisplayMenu, businessService }) {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      {!workflowDetails?.isLoading && workflowDetails?.data?.nextActions?.length > 0 && (
        <ActionBar>
          {displayMenu && workflowDetails?.data?.nextActions ? (
            <Menu
              localeKeyPrefix={businessService === "PT" ? "WF_EMPLOYEE_PT.CREATE" : "ES_FSM"}
              options={workflowDetails?.data?.nextActions.map((action) => action.action)}
              t={t}
              onSelect={onActionSelect}
            />
          ) : null}
          <SubmitBar label={t(businessService === "PT" ? "WF_TAKE_ACTION" : "ES_COMMON_TAKE_ACTION")} onSubmit={() => setDisplayMenu(!displayMenu)} />
        </ActionBar>
      )}
    </React.Fragment>
  );
}

export default ApplicationDetailsActionBar;
