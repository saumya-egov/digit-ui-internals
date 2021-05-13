import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  BreakLine,
  Card,
  CardLabel,
  CardLabelError,
  CardSubHeader,
  CardSectionHeader,
  TextArea,
  TextInput,
  ActionBar,
  SubmitBar,
  LabelFieldPair,
} from "@egovernments/digit-ui-react-components";
const TaxForm = forwardRef((props, ref) => {
  const refContainer = useRef(null);
  const { register,  getValues } = useForm();
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    submit(){
      console.log('function called', getValues())
      const res =  getValues();
     const  amount = []
     const key = Object.keys(res)[0];
     Object.keys(Object.values(res)[0]).forEach((ele=>amount.push({taxHeadCode:key+'.'+ele, amount: res[key]?res[key][ele]:undefined})))
    return amount;
   }
  }));

  const fieldSelector = (type, populators) => {
    switch (type) {
      case "text":
        return (
          <div className="field-container">
            {populators.componentInFront ? populators.componentInFront : null}
            <TextInput className="field desktop-w-full" {...populators} inputRef={register(populators.validation)} />
          </div>
        );
      case "textarea":
        return <TextArea className="field desktop-w-full" name={populators.name || ""} {...populators} inputRef={register(populators.validation)} />;
      default:
        return populators.dependency !== false ? populators : null;
    }
  };

  return  props
    ? props.data.length > 0 &&
        props.data
          .map((ele) => ({
            label: t(ele.name.split(".").join("_")),
            isMandatory: ele.isRequired,
            type: "text",
            populators: { name: ele.name, validation: { required: ele.isRequired } },
          }))
          .map((field, index) => {
            console.log(field);
            return (
              <React.Fragment key={index}>

                <LabelFieldPair>
                  <CardLabel>
                    {field.label}
                    {field.isMandatory ? " * " : null}
                  </CardLabel>
                  <div className="field">{fieldSelector(field.type, field.populators)}</div>
                </LabelFieldPair>

              </React.Fragment>
            );
          })
    : []
});
export default TaxForm;
