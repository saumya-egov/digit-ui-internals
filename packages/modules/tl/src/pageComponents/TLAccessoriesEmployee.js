import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CardLabel, LabelFieldPair, Dropdown, TextInput, LinkButton, CardLabelError, MobileNumber } from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import { getUniqueItemsFromArray, commonTransform, stringReplaceAll, getPattern } from "../utils";
import isUndefined from "lodash/isUndefined";

const createAccessoriesDetails = () => ({
    accessoryCategory: "",
    count: "",
    uom: "",
    uomValue: "",
    key: Date.now(),
});

const TLAccessoriesEmployee = ({ config, onSelect, userType, formData, setError, formState, clearErrors }) => {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const isEditScreen = pathname.includes("/modify-application/");
    const [accessoriesList, setAccessoriesList] = useState(formData?.accessories || [createAccessoriesDetails()]);
    const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const [accessories, SetAccessories] = useState([]);
    const [isErrors, setIsErrors] = useState(false);
    const [flag, setFlag] = useState(true);
    const [uomvalues, setUomvalues] = useState("");
    const isRenewal = window.location.href.includes("renew-application-details");


    const { data: billingSlabData } = Digit.Hooks.tl.useTradeLicenseBillingslab({ tenantId, filters: {} });

    const addAccessories = () => {
        const newAccessor = createAccessoriesDetails();
        setAccessoriesList((prev) => [...prev, newAccessor]);
    };

    const removeAccessor = (accessor) => {
        setAccessoriesList((prev) => prev.filter((o) => o.key != accessor.key));
    };

    useEffect(() => {
        const data = accessoriesList.map((e) => {
            return e;
        });
        onSelect(config?.key, data);
    }, [accessoriesList]);

    useEffect(() => {
        if (formData?.accessories?.length > 0 && !isRenewal) {
          let flag = true;
          accessoriesList.map(data => {
            Object.keys(data).map(dta => {
              if(dta != "key" &&  data[dta]) flag = false;
            });
          });
          formData?.accessories.map(data => {
            Object.keys(data).map(dta => {
              if (dta != "key" && data[dta] != undefined && data[data] != "" && data[data] != null) {
    
              } else {
                formData.accessories[0].count = 1;
                if (flag) setAccessoriesList(formData?.accessories);
                formData.accessories[0].count = "";
                setAccessoriesList(formData?.accessories);
                flag = false;
              }
            });
          })
        }
    
      }, [formData?.accessories?.[0]?.accessoryCategory?.code]);

    const commonProps = {
        focusIndex,
        allAccessoriesList: accessoriesList,
        setFocusIndex,
        removeAccessor,
        formData,
        formState,
        setAccessoriesList,
        // mdmsData,
        t,
        setError,
        clearErrors,
        config,
        accessories,
        setIsErrors,
        isErrors,
        SetAccessories,
        accessoriesList,
        billingSlabData,
        setUomvalues,
        uomvalues,
        isRenewal
    };

    if (isEditScreen) {
        return <React.Fragment />;
    }

    return (
        <React.Fragment>
            {accessoriesList.map((accessor, index) => (
                <AccessoriersForm key={accessor.key} index={index} accessor={accessor} {...commonProps} />
            ))}
            <LinkButton label={`${t("TL_NEW_TRADE_DETAILS_NEW_ACCESSORIES")}`} onClick={addAccessories} style={{ color: "orange" }} />

        </React.Fragment>
    );
};

const AccessoriersForm = (_props) => {
    const {
        accessor,
        index,
        focusIndex,
        allAccessoriesList,
        setFocusIndex,
        removeAccessor,
        setAccessoriesList,
        t,
        // mdmsData,
        formData,
        config,
        setError,
        clearErrors,
        formState,
        accessories,
        setIsErrors,
        isErrors,
        SetAccessories,
        accessoriesList,
        billingSlabData,
        setUomvalues,
        uomvalues,
        isRenewal
    } = _props;

    const { control, formState: localFormState, watch, setError: setLocalError, clearErrors: clearLocalErrors, setValue, trigger, getValues } = useForm();
    const formValue = watch();
    const { errors } = localFormState;

    const isIndividualTypeOwner = useMemo(() => formData?.ownershipCategory?.code.includes("INDIVIDUAL"), [formData?.ownershipCategory?.code]);

    useEffect(() => {
        trigger();
    }, []);

    useEffect(() => {
        trigger();
    }, [accessor?.accessoryCategory?.uom, formData?.accessories]);

    useEffect(() => {
        if (billingSlabData && billingSlabData?.billingSlab && billingSlabData?.billingSlab?.length > 0) {
            const processedData =
                billingSlabData.billingSlab &&
                billingSlabData.billingSlab.reduce(
                    (acc, item) => {
                        let accessory = { active: true };
                        let tradeType = { active: true };
                        if (item.accessoryCategory && item.tradeType === null) {
                            accessory.code = item.accessoryCategory;
                            accessory.uom = item.uom;
                            accessory.rate = item.rate;
                            item.rate && item.rate > 0 && acc.accessories.push(accessory);
                        } else if (item.accessoryCategory === null && item.tradeType) {
                            tradeType.code = item.tradeType;
                            tradeType.uom = item.uom;
                            tradeType.structureType = item.structureType;
                            tradeType.licenseType = item.licenseType;
                            tradeType.rate = item.rate;
                            !isUndefined(item.rate) &&
                                item.rate !== null &&
                                acc.tradeTypeData.push(tradeType);
                        }
                        return acc;
                    },
                    { accessories: [], tradeTypeData: [] }
                );


            const accessories = getUniqueItemsFromArray(
                processedData.accessories,
                "code"
            );
            let structureTypes = getUniqueItemsFromArray(
                processedData.tradeTypeData,
                "structureType"
            );
            structureTypes = commonTransform(
                {
                    StructureType: structureTypes.map(item => {
                        return { code: item.structureType, active: true };
                    })
                },
                "StructureType"
            );
            let licenseTypes = getUniqueItemsFromArray(
                processedData.tradeTypeData,
                "licenseType"
            );
            licenseTypes = licenseTypes.map(item => {
                return { code: item.licenseType, active: true };
            });

            accessories.forEach(data => {
                data.i18nKey = t(`TRADELICENSE_ACCESSORIESCATEGORY_${stringReplaceAll(data?.code?.toUpperCase(), "-", "_")}`);
            });

            // sessionStorage.setItem("TLlicenseTypes", JSON.stringify(licenseTypes));
            SetAccessories(accessories);
        }
    }, [billingSlabData]);



    useEffect(() => {
        console.log(formValue, "in formvalue chnage");
        const keys = Object.keys(formValue);
        if (!formValue?.accessoryCategory?.uom) {
            formValue.uomValue = "";
        }
        const part = {};
        keys.forEach((key) => (part[key] = accessor[key]));

        let _ownerType = isIndividualTypeOwner ? {} : { ownerType: { code: "NONE" } };

        if (!_.isEqual(formValue, part)) {
            Object.keys(formValue).map(data => {
                if (data != "key" && formValue[data] != undefined && formValue[data] != "" && formValue[data] != null && !isErrors) {
                  setIsErrors(true); 
                }
              });

            setAccessoriesList((prev) => prev.map((o) => {
                return (o.key && o.key === accessor.key ? { ...o, ...formValue, ..._ownerType } : { ...o })
            }));
            trigger();
        }
    }, [formValue]);

    useEffect(() => {
        if (Object.keys(errors).length && !_.isEqual(formState.errors[config.key]?.type || {}, errors)) {
            setError(config.key, { type: errors });
        }
        else if (!Object.keys(errors).length && formState.errors[config.key] && isErrors) {
            clearErrors(config.key);
        }
    }, [errors]);

    const errorStyle = { width: "70%", marginLeft: "30%", fontSize: "12px", marginTop: "-21px" };
    return (
        <React.Fragment>
            <div style={{ marginBottom: "16px" }}>
                <div style={{ border: "1px solid #E3E3E3", padding: "16px", marginTop: "8px" }}>
                    {allAccessoriesList?.length > 1 ? (
                        <div onClick={() => removeAccessor(accessor)} style={{ marginBottom: "16px", padding: "5px", cursor: "pointer", textAlign: "right" }}>
                            X
                        </div>
                    ) : null}
                    <LabelFieldPair>
                        <CardLabel className="card-label-smaller">{`${t("TL_NEW_TRADE_DETAILS_ACC_LABEL")}:`}</CardLabel>
                        <Controller
                            control={control}
                            name={"accessoryCategory"}
                            defaultValue={accessor?.accessoryCategory}
                            // rules={{ required: "NAME_REQUIRED", validate: { pattern: (val) => (/^\w+( +\w+)*$/.test(val) ? true : t("INVALID_NAME")) } }}
                            render={(props) => (
                                <Dropdown
                                    className="form-field"
                                    selected={props.value}
                                    select={(e) => {
                                        setValue("uom", e?.uom ? e?.uom : "");
                                        if (e?.uom !== accessor?.accessoryCategory?.uom) setValue("uomValue", "");
                                        props.onChange(e);
                                        setUomvalues(accessor?.accessoryCategory?.uom);
                                    }}
                                    onBlur={props.onBlur}
                                    option={accessories || []}
                                    optionKey="i18nKey"
                                    t={t}
                                    disable={isRenewal}
                                />
                            )}
                        />
                    </LabelFieldPair>
                    {/* <CardLabelError style={errorStyle}>{localFormState.touched.accessoryCategory ? errors?.name?.message : ""}</CardLabelError> */}
                    <LabelFieldPair>
                        <CardLabel className="card-label-smaller">{`${t("TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER")}:`}</CardLabel>
                        <div className="field">
                            <Controller
                                control={control}
                                name={"uom"}
                                defaultValue={accessor?.accessoryCategory?.uom}
                                // rules={accessor?.accessoryCategory?.uom ? { required: "Required" } : {}}
                                render={(props) => (
                                    <TextInput
                                        value={getValues("uom")}
                                        // value={uomvalues}
                                        // value={accessor?.accessoryCategory?.uom || ""}
                                        autoFocus={focusIndex.index === accessor?.key && focusIndex.type === "uom"}
                                        onChange={(e) => {
                                            props.onChange(e.target.value);
                                            setFocusIndex({ index: accessor.key, type: "uom" });
                                        }}
                                        disable={true}
                                        onBlur={props.onBlur}
                                        disable={isRenewal}
                                    />
                                )}
                            />
                        </div>
                    </LabelFieldPair>
                    {/* <CardLabelError style={errorStyle}>{localFormState.touched.uom ? errors?.uom?.message : ""}</CardLabelError> */}
                    <LabelFieldPair>
                        <CardLabel className="card-label-smaller">{`${t("TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL")}:`}</CardLabel>
                        <div className="field">
                            <Controller
                                control={control}
                                name={"uomValue"}
                                defaultValue={accessor?.uomValue}
                                rules={accessor?.accessoryCategory?.uom && { required: "Required", validate: (e) => ((e && getPattern("UOMValue").test(e)) || !e ? true : "ERR_DEFAULT_INPUT_FIELD_MSG") }}
                                render={(props) => (
                                    <TextInput
                                        value={getValues("uomValue")}
                                        // value={accessor?.accessoryCategory?.uom ? props.value : ""}
                                        autoFocus={focusIndex.index === accessor?.key && focusIndex.type === "uomValue"}
                                        onChange={(e) => {
                                            props.onChange(e.target.value);
                                            setFocusIndex({ index: accessor.key, type: "uomValue" });
                                        }}
                                        disable={!(accessor?.accessoryCategory?.uom)}
                                        onBlur={props.onBlur}
                                        disable={isRenewal}
                                    />
                                )}
                            />
                        </div>
                    </LabelFieldPair>
                    <CardLabelError style={errorStyle}>{localFormState.touched.uomValue ? errors?.uomValue?.message : ""}</CardLabelError>
                    <LabelFieldPair>
                        <CardLabel className="card-label-smaller">{`${t("TL_ACCESSORY_COUNT_LABEL")}:`}</CardLabel>
                        <div className="field">
                            <Controller
                                control={control}
                                name={"count"}
                                defaultValue={accessor?.count}
                                rules={accessor?.accessoryCategory?.code && { required: "Required", validate: (e) => ((e && getPattern("NoOfEmp").test(e)) || !e ? true : "ERR_DEFAULT_INPUT_FIELD_MSG") }}
                                // rules={accessor?.accessoryCategory?.code ? { required: "ERR_DEFAULT_INPUT_FIELD_MSG" } : {}}
                                render={(props) => (
                                    <TextInput
                                        value={props.value}
                                        autoFocus={focusIndex.index === accessor?.key && focusIndex.type === "count"}
                                        onChange={(e) => {
                                            props.onChange(e.target.value);
                                            setFocusIndex({ index: accessor.key, type: "count" });
                                        }}
                                        onBlur={props.onBlur}
                                        disable={isRenewal}
                                    />
                                )}
                            />
                        </div>
                    </LabelFieldPair>
                    <CardLabelError style={errorStyle}>{localFormState.touched.count ? errors?.count?.message : ""}</CardLabelError>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TLAccessoriesEmployee;
