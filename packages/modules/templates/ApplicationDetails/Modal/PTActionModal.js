import { Loader, Modal, FormComposer, Toast } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";

import { configRejectApplication } from "../config";

const Heading = (props) => {
  return <h1 className="heading-m">{props.label}</h1>;
};

const Close = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);

const CloseBtn = (props) => {
  return (
    <div className="icon-bg-secondary" onClick={props.onClick}>
      <Close />
    </div>
  );
};

const ActionModal = ({ t, action, tenantId, state, id, closeModal, submitAction, actionData, applicationData }) => {
  const [config, setConfig] = useState({});
  const [defaultValues, setDefaultValues] = useState({});

  function submit(data) {
    const workflow = { action: action, comments: data?.comments, businessService: "PT.CREATE", moduleName: "PT" };

    submitAction({
      Property: {
        ...applicationData,
        workflow,
      },
    });
  }
  useEffect(() => {
    switch (action) {
      case "REJECT":
      case "SENDBACKTOCITIZEN":
        return setConfig(
          configRejectApplication({
            t,
            action,
          })
        );
    }
  }, [action]);

  return action && config.form ? (
    <Modal
      headerBarMain={<Heading label={t(config.label.heading)} />}
      headerBarEnd={<CloseBtn onClick={closeModal} />}
      actionCancelLabel={t(config.label.cancel)}
      actionCancelOnSubmit={closeModal}
      actionSaveLabel={t(config.label.submit)}
      actionSaveOnSubmit={() => {}}
      formId="modal-action"
    >
      <FormComposer
        config={config.form}
        noBoxShadow
        inline
        childrenAtTheBottom
        onSubmit={submit}
        defaultValues={defaultValues}
        formId="modal-action"
      />
    </Modal>
  ) : (
    <Loader />
  );
};

export default ActionModal;
