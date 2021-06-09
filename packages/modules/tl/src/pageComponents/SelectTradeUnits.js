import React, { useEffect, useState } from "react";
import { FormStep, TextInput, CardLabel, RadioButtons, LabelFieldPair, Dropdown, RadioOrSelect } from "@egovernments/digit-ui-react-components";
import { cardBodyStyle } from "../utils";
import { useLocation } from "react-router-dom";

// const SelectTradeUnits = ({ t, config, onSelect, userType, formData }) => {
//   let index = window.location.href.charAt(window.location.href.length - 1);
//   let validation = {};
//   const [TradeCategory, setTradeCategory] = useState(formData?.TadeDetails?.Units?.TeadeCategory || "");
//   const [TradeType, setTradeType] = useState(formData?.TadeDetails?.Units?.TradeType || "");
//   const [TradeSubType, setTradeSubType] = useState(formData?.TadeDetails?.Units?.TradeSubType || "");
//   const [UnitOfMeasure, setUnitOfMeasure] = useState(formData?.TadeDetails?.Units?.UnitOfMeasure || "");
//   const [UomValue, setUomValue] = useState(formData?.TadeDetails?.Units?.UomValue || "");
//   const [fields, setFeilds] = useState([{tradecategory:"",tradetype:"",tradesubtype:"",unit:null,uom:null}])

//   const tenantId = Digit.ULBService.getCurrentTenantId();
//   const stateId = tenantId.split(".")[0];

//   function handleAdd() {
//     const values = [...fields];
//     values.push({tradecategory:"",tradetype:"",tradesubtype:"",unit:null,uom:null});
//     setFeilds(values);
//   }

//   const { isLoading, data: Data = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeUnits", "[?(@.type=='TL')]");
//   console.log(Data);
//   let TradeCategoryMenu = [];
//   let TradeTypeMenu = [];
//   let TradeSubTypeMenu = [];
//   Data &&
//     Data.TradeLicense &&
//     Data.TradeLicense.TradeType.map((ob) => {
//       if (!TradeCategoryMenu.some((TradeCategoryMenu) => TradeCategoryMenu.code === `${ob.code.split(".")[0]}`)) {
//         TradeCategoryMenu.push({ i18nKey: `TRADELICENSE_TRADETYPE_${ob.code.split(".")[0]}`, code: `${ob.code.split(".")[0]}` });
//       }
//     });

//   const isUpdateProperty = formData?.isUpdateProperty || false;
//   let isEditProperty = formData?.isEditProperty || false;
//   const { pathname: url } = useLocation();
//   const editScreen = url.includes("/modify-application/");

//   useEffect(() => {
//     debugger;
//     if (TradeCategory) {
//       Data &&
//         Data.TradeLicense &&
//         Data.TradeLicense.TradeType.map((ob) => {
//           if (
//             ob.code.split(".")[0] === TradeCategory.code &&
//             !TradeTypeMenu.some((TradeTypeMenu) => TradeTypeMenu.code === `${ob.code.split(".")[1]}`)
//           ) {
//             TradeTypeMenu.push({ i18nKey: `TRADELICENSE_TRADETYPE_${ob.code.split(".")[1]}`, code: `${ob.code.split(".")[1]}` });
//           }
//         });
//     }
//     console.log(TradeTypeMenu);
//   });

//   useEffect(() => {
//     debugger;
//     if (TradeType) {
//       Data &&
//         Data.TradeLicense &&
//         Data.TradeLicense.TradeType.map((ob) => {
//           if (ob.code.split(".")[1] === TradeType.code && !TradeSubTypeMenu.some((TradeSubTypeMenu) => TradeSubTypeMenu.code === `${ob.code}`)) {
//             TradeSubTypeMenu.push({ i18nKey: `TL_${ob.code}`, code: `${ob.code}` });
//           }
//         });
//     }
//     console.log(TradeSubTypeMenu);
//   });

//   function selectTradeCategory(value) {
//     console.log(value);
//     setTradeCategory(value);
//     debugger;
//   }
//   function selectTradeType(value) {
//     setTradeType(value);
//   }
//   function selectTradeSubType(value) {
//     setTradeSubType(value);
//   }
//   function selectUnitOfMeasure(e) {
//     setUnitOfMeasure(e.target.value);
//   }
//   function selectUomValue(e) {
//     setUomValue(e.target.value);
//   }

//   const goNext = () => {
//     let units = formData.TradeDetails.Units;
//     let unitsdata;

//     unitsdata = { ...units, TradeCategory, TradeType, TradeSubType, UnitOfMeasure, UomValue };
//     console.log(unitsdata);
//     debugger;
//     onSelect(config.key, unitsdata);
//   };

//   const onSkip = () => onSelect();
//   // As Ticket RAIN-2619 other option in gender and gaurdian will be enhance , dont uncomment it
//   /* const options = [
//     { name: "Goods", value: "GOODS", code: "GOODS" },
//     { name: "Services", value: "SERVICES", code: "SERVICES" },
//     // { name: "Other", value: "OTHER", code: "OTHER" },
//   ]; */

//   const GuardianOptions = [
//     { name: "HUSBAND", code: "HUSBAND", i18nKey: "PT_RELATION_HUSBAND" },
//     { name: "Father", code: "FATHER", i18nKey: "PT_RELATION_FATHER" },
//     // { name: "Husband/Wife", code: "HUSBANDWIFE", i18nKey: "PT_RELATION_HUSBANDWIFE" },
//     // { name: "Other", code: "OTHER", i18nKey: "PT_RELATION_OTHER" },
//   ];

//   /* useEffect(() => {
//     if (userType === "employee") {
//       goNext();
//     }
//   }, [name, gender, mobileNumber, fatherOrHusbandName, relationship]);

//   if (userType === "employee") {
//     return (
//       <div>
//         <LabelFieldPair>
//           <CardLabel style={editScreen ? { color: "#B1B4B6" } : {}}>{`${t("PT_FORM3_MOBILE_NUMBER")}`}</CardLabel>
//           <div className="field">
//             <TextInput
//               type={"text"}
//               t={t}
//               isMandatory={false}
//               name="mobileNumber"
//               value={mobileNumber}
//               onChange={setMobileNo}
//               {...(validation = {
//                 isRequired: true,
//                 pattern: "[6-9]{1}[0-9]{9}",
//                 type: "tel",
//                 title: t("CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID"),
//               })}
//               disable={editScreen}
//             />
//           </div>
//         </LabelFieldPair>
//         <LabelFieldPair>
//           <CardLabel style={editScreen ? { color: "#B1B4B6" } : {}}>{`${t("PT_OWNER_NAME")}`}</CardLabel>
//           <div className="field">
//             <TextInput
//               t={t}
//               type={"text"}
//               isMandatory={false}
//               name="name"
//               value={name}
//               onChange={setOwnerName}
//               {...(validation = {
//                 isRequired: true,
//                 pattern: "^[a-zA-Z-.`' ]*$",
//                 type: "tel",
//                 title: t("PT_NAME_ERROR_MESSAGE"),
//               })}
//               disable={editScreen}
//             />
//           </div>
//         </LabelFieldPair>
//         <LabelFieldPair>
//           <CardLabel style={editScreen ? { color: "#B1B4B6" } : {}}>{`${t("PT_FORM3_GUARDIAN_NAME")}`}</CardLabel>
//           <div className="field">
//             <TextInput
//               t={t}
//               type={"text"}
//               isMandatory={false}
//               name="fatherOrHusbandName"
//               value={fatherOrHusbandName}
//               onChange={setGuardiansName}
//               {...(validation = {
//                 pattern: "^[a-zA-Z-.`' ]*$",
//                 type: "tel",
//                 title: t("PT_NAME_ERROR_MESSAGE"),
//               })}
//               disable={editScreen}
//             />
//           </div>
//         </LabelFieldPair>
//         <LabelFieldPair>
//           <CardLabel style={editScreen ? { color: "#B1B4B6" } : {}}>{`${t("PT_FORM3_RELATIONSHIP")}`}</CardLabel>
//           <Dropdown
//             className="form-field"
//             selected={relationship?.length === 1 ? relationship[0] : relationship}
//             disable={relationship?.length === 1 || editScreen}
//             option={GuardianOptions}
//             select={setGuardianName}
//             optionKey="i18nKey"
//             t={t}
//             name="relationship"
//           />
//         </LabelFieldPair>
//         <LabelFieldPair>
//           <CardLabel style={editScreen ? { color: "#B1B4B6" } : {}}>{`${t("PT_FORM3_GENDER")}`}</CardLabel>
//           <Dropdown
//             className="form-field"
//             selected={gender?.length === 1 ? gender[0] : gender}
//             disable={gender?.length === 1 || editScreen}
//             option={options}
//             select={setGenderName}
//             optionKey="code"
//             t={t}
//             name="gender"
//           />
//         </LabelFieldPair>
//         <LabelFieldPair>
//           <CardLabel style={editScreen ? { color: "#B1B4B6" } : {}}>{`${t("PT_OWNER_EMAIL")}`}</CardLabel>
//           <div className="field">
//             <TextInput
//               t={t}
//               type={"email"}
//               isMandatory={false}
//               optionKey="i18nKey"
//               name="email"
//               value={email}
//               onChange={setOwnerEmail}
//               disable={editScreen}
//             />
//           </div>
//         </LabelFieldPair>
//       </div>
//     );
//   } */

//   return (
//     <FormStep
//       config={config}
//       onSelect={goNext}
//       onSkip={onSkip}
//       t={t}
//       //isDisabled={!name || !mobileNumber || !gender }
//     >
//       <div style={cardBodyStyle}>
//         <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL")}`}</CardLabel>
//         <RadioButtons
//           t={t}
//           options={TradeCategoryMenu}
//           optionsKey="code"
//           name="TradeCategory"
//           value={TradeCategory}
//           selectedOption={TradeCategory}
//           onSelect={selectTradeCategory}
//           isDependent={true}
//           labelKey="TRADELICENSE_TRADETYPE"
//           //disabled={isUpdateProperty || isEditProperty}
//         />
//         <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`}</CardLabel>
//         <Dropdown
//           t={t}
//           optionKey="i18nKey"
//           isMandatory={config.isMandatory}
//           //options={[{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"}]}
//           option={TradeTypeMenu}
//           selected={TradeType}
//           select={selectTradeType}
//         />
//         <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}</CardLabel>
//         <Dropdown
//           t={t}
//           optionKey="i18nKey"
//           isMandatory={config.isMandatory}
//           //option={[{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"}]}
//           option={TradeSubTypeMenu}
//           selected={TradeSubType}
//           select={selectTradeSubType}
//         />
//         <CardLabel>{`${t("TL_UNIT_OF_MEASURE_LABEL")}`}</CardLabel>
//         <TextInput
//           t={t}
//           type={"text"}
//           isMandatory={false}
//           optionKey="i18nKey"
//           name="UnitOfMeasure"
//           value={UnitOfMeasure}
//           onChange={selectUnitOfMeasure}
//           //disable={isUpdateProperty || isEditProperty}
//           /* {...(validation = {
//             isRequired: true,
//             pattern: "^[a-zA-Z-.`' ]*$",
//             type: "text",
//             title: t("PT_NAME_ERROR_MESSAGE"),
//           })} */
//         />
//         <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL")}`}</CardLabel>
//         <TextInput
//           t={t}
//           type={"text"}
//           isMandatory={false}
//           optionKey="i18nKey"
//           name="UomValue"
//           value={UomValue}
//           onChange={selectUomValue}
//           //disable={isUpdateProperty || isEditProperty}
//           /* {...(validation = {
//             isRequired: true,
//             pattern: "^[a-zA-Z-.`' ]*$",
//             type: "text",
//             title: t("PT_NAME_ERROR_MESSAGE"),
//           })} */
//         />
//         {/* <CardLabel>{`${t("PT_FORM3_GENDER")}`}</CardLabel>
//         <RadioButtons
//           t={t}
//           options={options}
//           optionsKey="code"
//           name="gender"
//           value={gender}
//           selectedOption={gender}
//           onSelect={setGenderName}
//           isDependent={true}
//           labelKey="PT_COMMON_GENDER"
//           disabled={isUpdateProperty || isEditProperty}
//         />
//         <CardLabel>{`${t("PT_FORM3_MOBILE_NUMBER")}`}</CardLabel>
//         <TextInput
//           type={"text"}
//           t={t}
//           isMandatory={false}
//           optionKey="i18nKey"
//           name="mobileNumber"
//           value={mobileNumber}
//           onChange={setMobileNo}
//           disable={isUpdateProperty || isEditProperty}
//           {...(validation = {
//             isRequired: true,
//             pattern: "[6-9]{1}[0-9]{9}",
//             type: "tel",
//             title: t("CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID"),
//           })}
//         /> */}
//         {/*   <CardLabel>{`${t("PT_FORM3_GUARDIAN_NAME")}`}</CardLabel>
//         <TextInput
//           t={t}
//           type={"text"}
//           isMandatory={false}
//           optionKey="i18nKey"
//           name="fatherOrHusbandName"
//           value={fatherOrHusbandName}
//           onChange={setGuardiansName}
//           disable={isUpdateProperty || isEditProperty}
//           {...(validation = {
//             isRequired: true,
//             pattern: "^[a-zA-Z-.`' ]*$",
//             type: "text",
//             title: t("PT_NAME_ERROR_MESSAGE"),
//           })}
//         />
//         <CardLabel>{`${t("PT_FORM3_RELATIONSHIP")}`}</CardLabel>
//         <RadioButtons
//           t={t}
//           optionsKey="i18nKey"
//           name="relationship"
//           options={GuardianOptions}
//           value={relationship}
//           selectedOption={relationship}
//           onSelect={setGuardianName}
//           isDependent={true}
//           labelKey="PT_RELATION"
//           disabled={isUpdateProperty || isEditProperty}
//         /> */}
//       </div>
//     </FormStep>
//   );
// };

// export default SelectTradeUnits;

const SelectTradeUnits = ({ t, config, onSelect, userType, formData }) => {
  let index = window.location.href.charAt(window.location.href.length - 1);
  let validation = {};
  const [TradeCategory, setTradeCategory] = useState("");
  const [TradeType, setTradeType] = useState(formData?.TadeDetails?.Units?.TradeType || "");
  const [TradeSubType, setTradeSubType] = useState(formData?.TadeDetails?.Units?.TradeSubType || "");
  const [UnitOfMeasure, setUnitOfMeasure] = useState(formData?.TadeDetails?.Units?.UnitOfMeasure || "");
  const [UomValue, setUomValue] = useState(formData?.TadeDetails?.Units?.UomValue || "");
  const [fields, setFeilds] = useState([{ tradecategory: "", tradetype: "", tradesubtype: "", unit: null, uom: null }]);

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];

  function handleAdd() {
    const values = [...fields];
    values.push({ tradecategory: "", tradetype: "", tradesubtype: "", unit: null, uom: null });
    setFeilds(values);
  }

  const { isLoading, data: Data = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeUnits", "[?(@.type=='TL')]");
  console.log(Data);
  let TradeCategoryMenu = [];
  //let TradeTypeMenu = [];

  Data &&
    Data.TradeLicense &&
    Data.TradeLicense.TradeType.map((ob) => {
      if (!TradeCategoryMenu.some((TradeCategoryMenu) => TradeCategoryMenu.code === `${ob.code.split(".")[0]}`)) {
        TradeCategoryMenu.push({ i18nKey: `TRADELICENSE_TRADETYPE_${ob.code.split(".")[0]}`, code: `${ob.code.split(".")[0]}` });
      }
    });

  function getTradeTypeMenu(TradeCategory) {
    let TradeTypeMenu = [];
    Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (
          ob.code.split(".")[0] === TradeCategory.code &&
          !TradeTypeMenu.some((TradeTypeMenu) => TradeTypeMenu.code === `${ob.code.split(".")[1]}`)
        ) {
          TradeTypeMenu.push({ i18nKey: `TRADELICENSE_TRADETYPE_${ob.code.split(".")[1]}`, code: `${ob.code.split(".")[1]}` });
        }
      });
    return TradeTypeMenu;
  }

  function getTradeSubTypeMenu(TradeType) {
    let TradeSubTypeMenu = [];
    Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (ob.code.split(".")[1] === TradeType.code && !TradeSubTypeMenu.some((TradeSubTypeMenu) => TradeSubTypeMenu.code === `${ob.code}`)) {
          TradeSubTypeMenu.push({ i18nKey: `TL_${ob.code}`, code: `${ob.code}` });
        }
      });
    return TradeSubTypeMenu;
  }

  const isUpdateProperty = formData?.isUpdateProperty || false;
  let isEditProperty = formData?.isEditProperty || false;
  const { pathname: url } = useLocation();
  const editScreen = url.includes("/modify-application/");

  // useEffect(() => {
  //   debugger;
  //   if (TradeCategory) {
  //     Data &&
  //       Data.TradeLicense &&
  //       Data.TradeLicense.TradeType.map((ob) => {
  //         if (
  //           ob.code.split(".")[0] === TradeCategory.code &&
  //           !TradeTypeMenu.some((TradeTypeMenu) => TradeTypeMenu.code === `${ob.code.split(".")[1]}`)
  //         ) {
  //           TradeTypeMenu.push({ i18nKey: `TRADELICENSE_TRADETYPE_${ob.code.split(".")[1]}`, code: `${ob.code.split(".")[1]}` });
  //         }
  //       });
  //   }
  //   console.log(TradeTypeMenu);
  // });

  // useEffect(() => {
  //   debugger;
  //   if (TradeType) {
  //     Data &&
  //       Data.TradeLicense &&
  //       Data.TradeLicense.TradeType.map((ob) => {
  //         if (ob.code.split(".")[1] === TradeType.code && !TradeSubTypeMenu.some((TradeSubTypeMenu) => TradeSubTypeMenu.code === `${ob.code}`)) {
  //           TradeSubTypeMenu.push({ i18nKey: `TL_${ob.code}`, code: `${ob.code}` });
  //         }
  //       });
  //   }
  //   console.log(TradeSubTypeMenu);
  // });

  function selectTradeCategory(i, value) {
    console.log(value);
    let units = [...fields];
    units[i].tradecategory = value;
    setTradeCategory(value);
    setFeilds(units);
    debugger;
  }
  function selectTradeType(i, value) {
    let units = [...fields];
    units[i].tradetype = value;
    setTradeType(value);
    setFeilds(units);
  }
  function selectTradeSubType(i, value) {
    let units = [...fields];
    units[i].tradesubtype = value;
    setTradeSubType(value);
    setFeilds(units);
  }
  function selectUnitOfMeasure(i, e) {
    let units = [...fields];
    units[i].unit = e.target.value;
    setUnitOfMeasure(e.target.value);
    setFeilds(units);
  }
  function selectUomValue(i, e) {
    let units = [...fields];
    units[i].uom = e.target.value;
    setUomValue(e.target.value);
    setFeilds(units);
  }

  const goNext = () => {
    console.log(fields);
    debugger;
    let units = formData.TradeDetails.Units;
    let unitsdata;

    unitsdata = { ...units, units: fields };
    console.log(unitsdata);
    // debugger;
    onSelect(config.key, unitsdata);
  };

  const onSkip = () => onSelect();
  // As Ticket RAIN-2619 other option in gender and gaurdian will be enhance , dont uncomment it
  /* const options = [
    { name: "Goods", value: "GOODS", code: "GOODS" },
    { name: "Services", value: "SERVICES", code: "SERVICES" },
    // { name: "Other", value: "OTHER", code: "OTHER" },
  ]; */

  const GuardianOptions = [
    { name: "HUSBAND", code: "HUSBAND", i18nKey: "PT_RELATION_HUSBAND" },
    { name: "Father", code: "FATHER", i18nKey: "PT_RELATION_FATHER" },
    // { name: "Husband/Wife", code: "HUSBANDWIFE", i18nKey: "PT_RELATION_HUSBANDWIFE" },
    // { name: "Other", code: "OTHER", i18nKey: "PT_RELATION_OTHER" },
  ];

  return (
    <FormStep
      config={config}
      onSelect={goNext}
      onSkip={onSkip}
      t={t}
      //isDisabled={!name || !mobileNumber || !gender }
    >
      {fields.map((field, index) => {
        return (
          <div key={`${field}-${index}`}>
            <hr color="#d6d5d4" className="break-line"></hr>
            <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL")}`}</CardLabel>
            <RadioButtons
              t={t}
              options={TradeCategoryMenu}
              optionsKey="code"
              name="TradeCategory"
              value={TradeCategory}
              //selectedOption={TradeCategory}
              selectedOption={field?.tradecategory}
              onSelect={(e) => selectTradeCategory(index, e)}
              isDependent={true}
              labelKey="TRADELICENSE_TRADETYPE"
              //disabled={isUpdateProperty || isEditProperty}
            />
            <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`}</CardLabel>
            <Dropdown
              t={t}
              optionKey="i18nKey"
              isMandatory={config.isMandatory}
              //options={[{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"}]}
              //option={TradeTypeMenu}
              option={getTradeTypeMenu(field?.tradecategory)}
              //selected={TradeType}
              selected={field?.tradetype}
              select={(e) => selectTradeType(index, e)}
            />
            <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}</CardLabel>
            <Dropdown
              t={t}
              optionKey="i18nKey"
              isMandatory={config.isMandatory}
              //option={[{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"},{i18nKey : "a"}]}
              //option={TradeSubTypeMenu}
              option={getTradeSubTypeMenu(field?.tradetype)}
              //selected={TradeSubType}
              selected={field?.tradesubtype}
              select={(e) => selectTradeSubType(index, e)}
            />
            <CardLabel>{`${t("TL_UNIT_OF_MEASURE_LABEL")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              isMandatory={false}
              optionKey="i18nKey"
              name="UnitOfMeasure"
              //value={UnitOfMeasure}
              value={field?.unit}
              onChange={(e) => selectUnitOfMeasure(index, e)}
              //disable={isUpdateProperty || isEditProperty}
              /* {...(validation = {
            isRequired: true,
            pattern: "^[a-zA-Z-.`' ]*$",
            type: "text",
            title: t("PT_NAME_ERROR_MESSAGE"),
          })} */
            />
            <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              isMandatory={false}
              optionKey="i18nKey"
              name="UomValue"
              //value={UomValue}
              value={field?.uom}
              onChange={(e) => selectUomValue(index, e)}
              //disable={isUpdateProperty || isEditProperty}
              /* {...(validation = {
            isRequired: true,
            pattern: "^[a-zA-Z-.`' ]*$",
            type: "text",
            title: t("PT_NAME_ERROR_MESSAGE"),
          })} */
            />
          </div>
        );
      })}
      <hr color="#d6d5d4" className="break-line"></hr>
      <div style={{ justifyContent: "center", display: "flex", paddingBottom: "15px", color: "#FF8C00" }}>
        <button type="button" onClick={() => handleAdd()}>
          Add More Trade Units
        </button>
      </div>
    </FormStep>
  );
};
export default SelectTradeUnits;
