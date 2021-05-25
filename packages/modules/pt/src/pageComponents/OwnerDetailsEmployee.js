import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CardLabel, LabelFieldPair, Dropdown, TextInput, LinkButton, CardLabelError, MobileNumber } from "@egovernments/digit-ui-react-components";
import { stringReplaceAll } from "../utils";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import _ from "lodash";

class OwnerDetails {
  constructor() {
    this.key = Date.now();
  }
  name = "";
  mobileNumber = "";
  fatherOrHusbandName = "";
  emailId = "";
  permanentAddress = "";
  relationship = "";
  ownerType = "";
  gender = "";
  isCorrespondenceAddress = false;
}

const PTEmployeeOwnershipDetails = ({ config, onSelect, userType, formData, setError, formState, clearErrors }) => {
  const { t } = useTranslation();
  const [owners, setOwners] = useState(formData?.owners || [new OwnerDetails()]);
  const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const { data: mdmsData, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", [
    "UsageCategory",
    "OccupancyType",
    "Floor",
    "OwnerType",
    "OwnerShipCategory",
    "Documents",
    "SubOwnerShipCategory",
    "OwnerShipCategory",
  ]);

  const addNewOwner = () => {
    setOwners((prev) => [...prev, new OwnerDetails()]);
  };

  const removeOwner = (owner) => {
    setOwners((prev) => prev.filter((o) => o.key != owner.key));
  };

  useEffect(() => {
    const data = owners.map((e) => {
      delete e.key;
      return e;
    });

    onSelect(config?.key, data);
  }, [owners]);

  useEffect(() => {
    setOwners([new OwnerDetails()]);
  }, [formData?.ownershipCategory?.code]);

  const commonProps = {
    focusIndex,
    allOwners: owners,
    setFocusIndex,
    removeOwner,
    formData,
    formState,
    setOwners,
    mdmsData,
    t,
    setError,
    clearErrors,
    config,
  };

  // const formComps = {
  //   INDIVIDUAL: (props) => <IndividualForm {...props} />,
  //   INSTITUTIONALPRIVATE: (props) => <PrivateForm {...props} />,
  //   GovtForm: (props) => <GovtForm {...props} />,
  // };

  // const ownerShipCategory = formData?.ownershipCategory?.code?.split?.(".")[0] || "INDIVIDUAL";

  return formData?.ownershipCategory?.code ? (
    <React.Fragment>
      {owners.map((owner, index) => (
        <OwnerForm key={owner.key} index={index} owner={owner} {...commonProps} />
      ))}
      {formData?.ownershipCategory?.code === "INDIVIDUAL.MULTIPLEOWNERS" ? (
        <LinkButton label="Add Owner" onClick={addNewOwner} style={{ color: "orange" }} />
      ) : null}
    </React.Fragment>
  ) : null;
};

const OwnerForm = (_props) => {
  const {
    owner,
    index,
    focusIndex,
    allOwners,
    setFocusIndex,
    removeOwner,
    setOwners,
    t,
    mdmsData,
    formData,
    config,
    setError,
    clearErrors,
    formState,
  } = _props;

  const { control, formState: localFormState, watch, setError: setLocalError, clearErrors: clearLocalErrors, setValue, trigger } = useForm();
  const formValue = watch();
  const { errors } = localFormState;

  const specialDocsMenu = useMemo(
    () =>
      mdmsData?.PropertyTax?.Documents?.filter((e) => e.code === "OWNER.SPECIALCATEGORYPROOF")?.[0]
        .dropdownData?.filter((e) => e.parentValue.includes(formValue?.ownerType?.code))
        .map?.((e) => ({
          i18nKey: `PROPERTY_DOCUMENT_${e.code}`,
          code: e.code,
        })) || [],
    [mdmsData, formValue]
  );

  const ownerTypesMenu = useMemo(
    () => mdmsData?.PropertyTax?.OwnerType?.map?.((e) => ({ i18nKey: `PROPERTY_OWNERTYPE_${e.code}`, code: e.code })) || [],
    [mdmsData]
  );

  useEffect(() => {
    trigger();
  }, []);

  useEffect(() => {
    const keys = Object.keys(formValue);
    const part = {};
    keys.forEach((key) => (part[key] = owner[key]));

    if (!_.isEqual(formValue, part)) {
      setOwners((prev) => prev.map((o) => (o.key === owner.key ? { ...o, ...formValue } : o)));
      trigger();
    }
  }, [formValue]);

  useEffect(() => {
    console.log(formValue, errors.mobileNumber, "in formvalue chnage");
    if (Object.keys(errors).length && !_.isEqual(formState.errors[config.key]?.type || {}, errors)) setError(config.key, { type: errors });
    else if (!Object.keys(errors).length && formState.errors[config.key]) clearErrors(config.key);
  }, [errors]);

  const errorStyle = { width: "70%", marginLeft: "30%", fontSize: "12px", marginTop: "-21px" };
  return (
    <React.Fragment>
      <div style={{ marginBottom: "16px" }}>
        <div className="label-field-pair">
          <h2 className="card-label card-label-smaller" style={{ color: "#505A5F" }}>
            Owner {index + 1}
          </h2>
        </div>
        <div style={{ border: "1px solid #E3E3E3", padding: "16px", marginTop: "8px" }}>
          {allOwners?.length > 2 ? (
            <div onClick={() => removeOwner(owner)} style={{ marginBottom: "16px", padding: "5px", cursor: "pointer", textAlign: "right" }}>
              X
            </div>
          ) : null}

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">Name</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"name"}
                defaultValue={owner?.name}
                rules={{ required: "NAME_REQUIRED" }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                    autoFocus={focusIndex.index === owner?.key && focusIndex.type === "name"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      setFocusIndex({ index: owner.key, type: "name" });
                    }}
                    onBlur={props.onBlur}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>{localFormState.touched.name ? errors?.name?.message : ""}</CardLabelError>

          {formData?.ownershipCategory?.code.includes("INDIVIDUAL") ? (
            <React.Fragment>
              <LabelFieldPair>
                <CardLabel className="card-label-smaller">Gender</CardLabel>
                <Controller
                  control={control}
                  name={"gender"}
                  defaultValue={owner?.gender}
                  rules={{ required: "REQUIRED" }}
                  render={(props) => (
                    <Dropdown
                      className="form-field"
                      selected={props.value}
                      select={props.onChange}
                      onBlur={props.onBlur}
                      option={[
                        { i18nKey: "PT_FORM3_MALE", code: "Male" },
                        { i18nKey: "PT_FORM3_FEMALE", code: "Female" },
                        { i18nKey: "PT_FORM3_TRANSGENDER", code: "Transgender" },
                      ]}
                      optionKey="i18nKey"
                      t={t}
                    />
                  )}
                />
              </LabelFieldPair>
              <CardLabelError style={errorStyle}>{localFormState.touched.gender ? errors?.gender?.message : ""}</CardLabelError>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <LabelFieldPair>
                <CardLabel className="card-label-smaller">Landline</CardLabel>
                <div className="field">
                  <Controller
                    control={control}
                    name={"altContactNumber"}
                    defaultValue={owner?.altContactNumber}
                    // rules={}
                    render={(props) => (
                      <MobileNumber
                        value={props.value}
                        autoFocus={focusIndex.index === owner?.key && focusIndex.type === "altContactNumber"}
                        onChange={(e) => {
                          props.onChange(e);
                          setFocusIndex({ index: owner.key, type: "altContactNumber" });
                        }}
                        labelStyle={{ marginTop: "unset" }}
                        onBlur={props.onBlur}
                      />
                    )}
                  />
                </div>
              </LabelFieldPair>
              <CardLabelError style={errorStyle}>{localFormState.touched.altContactNumber ? errors?.altContactNumber?.message : ""}</CardLabelError>
            </React.Fragment>
          )}
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">Owner Mobile Number</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"mobileNumber"}
                defaultValue={owner?.name}
                rules={{ required: "Required", validate: (v) => (/^[6789]\d{9}$/.test(v) ? true : "invalid Phone") }}
                render={(props) => (
                  <MobileNumber
                    value={props.value}
                    autoFocus={focusIndex.index === owner?.key && focusIndex.type === "mobileNumber"}
                    onChange={(e) => {
                      props.onChange(e);
                      setFocusIndex({ index: owner.key, type: "mobileNumber" });
                    }}
                    labelStyle={{ marginTop: "unset" }}
                    onBlur={props.onBlur}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>{localFormState.touched.mobileNumber ? errors?.mobileNumber?.message : ""}</CardLabelError>
          {formData?.ownershipCategory?.code.includes("INDIVIDUAL") ? (
            <React.Fragment>
              <LabelFieldPair>
                <CardLabel className="card-label-smaller">Guardian's Name</CardLabel>
                <div className="field">
                  <Controller
                    control={control}
                    name={"fatherOrHusbandName"}
                    defaultValue={owner?.fatherOrHusbandName}
                    rules={{ required: "required" }}
                    render={(props) => (
                      <TextInput
                        value={props.value}
                        autoFocus={focusIndex.index === owner?.key && focusIndex.type === "fatherOrHusbandName"}
                        onChange={(e) => {
                          props.onChange(e.target.value);
                          setFocusIndex({ index: owner.key, type: "fatherOrHusbandName" });
                        }}
                        onBlur={props.onBlur}
                      />
                    )}
                  />
                </div>
              </LabelFieldPair>
              <CardLabelError style={errorStyle}>
                {localFormState.touched.fatherOrHusbandName ? errors?.fatherOrHusbandName?.message : ""}
              </CardLabelError>
              <LabelFieldPair>
                <CardLabel className="card-label-smaller">Relationship with Guardian</CardLabel>
                <Controller
                  control={control}
                  name={"relationship"}
                  defaultValue={owner?.relationship}
                  rules={{ required: "RelationShip Required" }}
                  render={(props) => (
                    <Dropdown
                      className="form-field"
                      selected={props.value}
                      select={props.onChange}
                      onBlur={props.onBlur}
                      option={[
                        { i18nKey: "PT_FORM3_FATHER", code: "FATHER" },
                        { i18nKey: "PT_FORM3_HUSBAND", code: "HUSBAND" },
                      ]}
                      optionKey="i18nKey"
                      t={t}
                    />
                  )}
                />
              </LabelFieldPair>
              <CardLabelError style={errorStyle}>{localFormState.touched.relationship ? errors?.relationship?.message : ""}</CardLabelError>
              <LabelFieldPair>
                <CardLabel className="card-label-smaller">Owner Type</CardLabel>
                <Controller
                  control={control}
                  name={"ownerType"}
                  defaultValue={owner?.ownerType}
                  rules={{ required: "required" }}
                  render={(props) => (
                    <Dropdown
                      className="form-field"
                      selected={props.value}
                      select={props.onChange}
                      onBlur={props.onBlur}
                      option={ownerTypesMenu}
                      optionKey="i18nKey"
                      t={t}
                    />
                  )}
                />
              </LabelFieldPair>
              <CardLabelError style={errorStyle}>{localFormState.touched.ownerType ? errors?.ownerType?.message : ""}</CardLabelError>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <LabelFieldPair>
                <CardLabel className="card-label-smaller">Designation</CardLabel>
                <div className="field">
                  <Controller
                    control={control}
                    name={"designation"}
                    defaultValue={owner?.designation || ""}
                    rules={{ required: "required" }}
                    render={(props) => (
                      <TextInput
                        value={props.value}
                        autoFocus={focusIndex.index === owner?.key && focusIndex.type === "designation"}
                        onChange={(e) => {
                          props.onChange(e.target.value);
                          setFocusIndex({ index: owner.key, type: "designation" });
                        }}
                        onBlur={props.onBlur}
                      />
                    )}
                  />
                </div>
              </LabelFieldPair>
              <CardLabelError style={errorStyle}>{localFormState.touched.designation ? errors?.designation?.message : ""}</CardLabelError>
            </React.Fragment>
          )}

          {formValue.ownerType?.code && formValue.ownerType?.code !== "NONE" ? (
            <React.Fragment>
              <LabelFieldPair>
                <CardLabel className="card-label-smaller">Document</CardLabel>
                <Controller
                  control={control}
                  name={"documents.documentType"}
                  defaultValue={owner?.documents?.documentType}
                  rules={{ required: "required" }}
                  render={(props) => (
                    <Dropdown
                      className="form-field"
                      selected={props.value}
                      select={props.onChange}
                      onBlur={props.onBlur}
                      option={specialDocsMenu}
                      optionKey="i18nKey"
                      t={t}
                    />
                  )}
                />
              </LabelFieldPair>
              <CardLabelError style={errorStyle}>
                {localFormState.touched.documents?.documentType ? errors?.documents?.documentType?.message : ""}
              </CardLabelError>
              <LabelFieldPair>
                <CardLabel className="card-label-smaller">Document ID</CardLabel>
                <div className="field">
                  <Controller
                    control={control}
                    name={"documents.documentUid"}
                    defaultValue={owner?.documents?.documentUid}
                    rules={{ required: "required" }}
                    render={(props) => (
                      <TextInput
                        value={props.value}
                        autoFocus={focusIndex.index === owner?.key && focusIndex.type === "documents.documentUid"}
                        onChange={(e) => {
                          props.onChange(e);
                          setFocusIndex({ index: owner.key, type: "documents.documentUid" });
                        }}
                        labelStyle={{ marginTop: "unset" }}
                        onBlur={props.onBlur}
                      />
                    )}
                  />
                </div>
              </LabelFieldPair>
              <CardLabelError style={errorStyle}>
                {localFormState.touched.documents?.documentUid ? errors?.documents?.documentUid?.message : ""}
              </CardLabelError>{" "}
            </React.Fragment>
          ) : null}
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">Email</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"emailId"}
                defaultValue={owner?.emailId}
                rules={{ validate: (e) => ((e && /^[^\s@]+@[^\s@]+$/.test(e)) || !e ? true : "INVALID_EMAIL") }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                    autoFocus={focusIndex.index === owner?.key && focusIndex.type === "emailId"}
                    onChange={(e) => {
                      props.onChange(e);
                      setFocusIndex({ index: owner.key, type: "emailId" });
                    }}
                    labelStyle={{ marginTop: "unset" }}
                    onBlur={props.onBlur}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>{localFormState.touched.emailId ? errors?.emailId?.message : ""}</CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">Correspondence Address</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"correspondenceAddress"}
                defaultValue={owner?.correspondenceAddress}
                // rules={}
                render={(props) => (
                  <TextInput
                    value={props.value}
                    autoFocus={focusIndex.index === owner?.key && focusIndex.type === "correspondenceAddress"}
                    onChange={(e) => {
                      props.onChange(e);
                      setFocusIndex({ index: owner.key, type: "correspondenceAddress" });
                    }}
                    onBlur={props.onBlur}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>
            {localFormState.touched.correspondenceAddress ? errors?.correspondenceAddress?.message : ""}
          </CardLabelError>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PTEmployeeOwnershipDetails;
