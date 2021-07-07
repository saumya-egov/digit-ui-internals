import React, { useEffect, useState } from "react";
import { Dropdown, FormStep, RadioButtons, LabelFieldPair, CardLabel } from "@egovernments/digit-ui-react-components";

const ReasonForTransfer = (props) => {
  const { t, config, onSelect, userType, formData, setError, clearErrors, errors } = props;

  const { data, isLoading } = Digit.Hooks.pt.useMDMS("pb", "PropertyTax", "ReasonForTransfer", {});

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (data) {
      let opt = data.PropertyTax.ReasonForTransfer.map((e) => ({ ...e, i18nKey: "PROPERTYTAX_REASONFORTRANSFER_" + e.code }));
      console.log(opt, "inside reason");
      setMenu(opt);
    }
  }, [data]);

  const [reasonForTransfer, setSelected] = useState(formData?.[config.key]?.reasonForTransfer);

  const goNext = () => {
    onSelect(config.key, { ...formData?.[config.key], reasonForTransfer });
  };

  const onSkip = () => {};

  useEffect(() => {
    if (userType === "employee") {
      if (!reasonForTransfer) {
        setError(config.key, { type: "Required" });
      } else if (errors?.[config.key]) clearErrors(config.key);
      goNext();
    }
  }, [reasonForTransfer]);

  if (userType === "employee") {
    return (
      <React.Fragment>
        <LabelFieldPair>
          <CardLabel style={{ fontWeight: "bold" }} className="card-label-smaller">
            {t("PT_MUTATION_TRANSFER_REASON") + " *"}
          </CardLabel>
          <div className="field">
            <Dropdown option={menu} optionKey={"i18nKey"} select={setSelected} selected={reasonForTransfer} />
          </div>
        </LabelFieldPair>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!reasonForTransfer}>
        <div>
          <RadioButtons
            t={t}
            optionsKey="i18nKey"
            isMandatory={config.isMandatory}
            options={menu}
            onSelect={setSelected}
            selectedOption={reasonForTransfer}
          />
        </div>
      </FormStep>
    </React.Fragment>
  );
};

export default ReasonForTransfer;
