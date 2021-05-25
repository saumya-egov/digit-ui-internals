import React, { useState, useEffect } from "react";
import {
  FormStep,
  RadioButtons,
  CitizenInfoLabel,
  LabelFieldPair,
  CardLabel,
  Dropdown,
  CardLabelError,
} from "@egovernments/digit-ui-react-components";
import { cardBodyStyle } from "../utils";

const PropertyUsageType = ({ t, config, onSelect, userType, formData, formState, setError, clearErrors, onBlur }) => {
  const [usageCategoryMajor, setPropertyPurpose] = useState(formData?.usageCategoryMajor);
  //   const { data: Menu, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OccupancyType");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const { data: Menu = {}, isLoading: menuLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "UsageCategory") || {};
  let usagecat = [];
  usagecat = Menu?.PropertyTax?.UsageCategory || [];
  let i;
  let menu = [];

  function usageCategoryMajorMenu(usagecat) {
    if (userType === "employee") {
      const catMenu = usagecat
        ?.filter((e) => e?.code.split(".").length <= 2 && e.code !== "NONRESIDENTIAL")
        ?.map((item) => {
          const arr = item?.code.split(".");
          if (arr.length == 2) return { i18nKey: "PROPERTYTAX_BILLING_SLAB_" + arr[1], code: item?.code };
          else return { i18nKey: "PROPERTYTAX_BILLING_SLAB_" + item?.code, code: item?.code };
        });
      return catMenu;
    } else {
      for (i = 0; i < 10; i++) {
        if (
          Array.isArray(usagecat) &&
          usagecat.length > 0 &&
          usagecat[i].code.split(".")[0] == "NONRESIDENTIAL" &&
          usagecat[i].code.split(".").length == 2
        ) {
          menu.push({ i18nKey: "PROPERTYTAX_BILLING_SLAB_" + usagecat[i].code.split(".")[1], code: usagecat[i].code });
        }
      }
      return menu;
    }
  }

  /*  menu = [
    {
      i18nKey: "PROPERTYTAX_BILLING_SLAB_INSTITUTIONAL",
    },
    {
      i18nKey: "PROPERTYTAX_BILLING_SLAB_INDUSTRIAL",
    },
    {
      i18nKey: "PROPERTYTAX_BILLING_SLAB_COMMERCIAL",
    },
  ]; */

  const onSkip = () => onSelect();

  /* useEffect(() => {
    if (userType !== "employee" && formData?.isResdential?.i18nKey === "PT_COMMON_YES" && formData?.usageCategoryMajor?.i18nKey !== "RESIDENTIAL") {
      //selectPropertyPurpose({i18nKey : "RESIDENTAL"})
      onSelect(config.key, { i18nKey: "PROPERTYTAX_BILLING_SLAB_RESIDENTIAL" }, true);
    }
  }, [formData?.usageCategoryMajor?.i18nKey]); */

  function selectPropertyPurpose(value) {
    setPropertyPurpose(value);
  }

  function goNext() {
    if (usageCategoryMajor?.i18nKey === "PROPERTYTAX_BILLING_SLAB_OTHERS") {
      usageCategoryMajor.i18nKey = "PROPERTYTAX_BILLING_SLAB_NONRESIDENTIAL";
      onSelect(config.key, usageCategoryMajor);
    } else {
      onSelect(config.key, usageCategoryMajor);
    }
    // onSelect(config.key,ResidentialType, false, index);
  }

  useEffect(() => {
    if (userType === "employee") {
      if (!usageCategoryMajor) {
        setError(config.key, { type: "required", message: `${config.key.toUpperCase()}_REQUIRED` });
      } else {
        clearErrors(config.key);
      }
      goNext();
    }
  }, [usageCategoryMajor]);

  const inputs = [
    {
      label: "PT_PROPERTY_DETAILS_USAGE_TYPE_HEADER",
      type: "dropdown",
      name: "propertyUsageType",
      validation: {},
    },
  ];

  if (userType === "employee") {
    return inputs?.map((input, index) => {
      return (
        <React.Fragment key={index}>
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t(input.label)}</CardLabel>
            <Dropdown
              className="form-field"
              selected={usageCategoryMajor}
              disable={usageCategoryMajorMenu(usagecat)?.length === 1}
              option={usageCategoryMajorMenu(usagecat)}
              select={(e) => {
                console.log(t("PROPERTYTAX_BILLING_SLAB_" + e.code.split(".")[1]), e, "selected option is");
                selectPropertyPurpose(e);
              }}
              optionKey="i18nKey"
              onBlur={onBlur}
              t={t}
            />
          </LabelFieldPair>
          {formState.touched[config.key] ? (
            <CardLabelError style={{ width: "70%", marginLeft: "30%", fontSize: "12px", marginTop: "-21px" }}>
              {formState.errors?.[config.key]?.message}
            </CardLabelError>
          ) : null}
        </React.Fragment>
      );
    });
  }

  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!usageCategoryMajor}>
        <div style={{ ...cardBodyStyle, maxHeight: "calc(100vh - 30em)" }}>
          <RadioButtons
            t={t}
            optionsKey="i18nKey"
            isMandatory={config.isMandatory}
            //options={menu}
            options={usageCategoryMajorMenu(usagecat) || {}}
            selectedOption={usageCategoryMajor}
            onSelect={selectPropertyPurpose}
          />
        </div>
      </FormStep>
      {<CitizenInfoLabel info={t("CS_FILE_APPLICATION_INFO_LABEL")} text={t("PT_USAGE_TYPE_INFO_MSG", usageCategoryMajor)} />}
    </React.Fragment>
  );
};

export default PropertyUsageType;
