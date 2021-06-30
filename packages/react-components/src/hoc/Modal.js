import React from "react";

import PopUp from "../atoms/PopUp";
import HeaderBar from "../atoms/HeaderBar";
import ButtonSelector from "../atoms/ButtonSelector";
import Toast from "../atoms/Toast";

const Modal = ({
  headerBarMain,
  headerBarEnd,
  popupStyles,
  children,
  actionCancelLabel,
  actionCancelOnSubmit,
  actionSaveLabel,
  actionSaveOnSubmit,
  error,
  setError,
  formId,
  isDisabled,
  hideSubmit,
}) => {
  return (
    <PopUp>
      <div className="popup-module" style={popupStyles}>
        <HeaderBar main={headerBarMain} end={headerBarEnd} />
        <div className="popup-module-main">
          {children}
          <div className="popup-module-action-bar">
            {actionCancelLabel ? <ButtonSelector theme="border" label={actionCancelLabel} onSubmit={actionCancelOnSubmit} /> : null}
            {!hideSubmit ? <ButtonSelector label={actionSaveLabel} onSubmit={actionSaveOnSubmit} formId={formId} isDisabled={isDisabled} /> : null}
          </div>
        </div>
      </div>
      {error && <Toast label={error} onClose={() => setError(null)} error />}
    </PopUp>
  );
};

export default Modal;
