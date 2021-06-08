import React, { useState, useEffect, useLayoutEffect } from "react";
import { FormComposer, CardLabelDesc, Loader } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchProperty = ({ config: propsConfig, onSelect }) => {
  const { t } = useTranslation();

  const history = useHistory();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [canSubmit, setCanSubmit] = useState(false);

  console.log(propsConfig, "inside searchProperty");

  useLayoutEffect(() => {
    const getActionBar = () => {
      let el = document.querySelector("div.action-bar-wrap");
      if (el) el.style.bottom = "40px";
      else {
        setTimeout(() => {
          getActionBar();
        }, 100);
      }
    };
    getActionBar();
    //
  }, []);

  // moduleCode, type, config = {}, payload = []
  const { data: propertyIdFormat, isLoading } = Digit.Hooks.pt.useMDMS(tenantId, "DIGIT-UI", "HelpText", {
    select: (data) => {
      return data?.["DIGIT-UI"]?.["HelpText"]?.[0]?.PT?.propertyIdFormat;
    },
  });

  const onPropertySearch = async (data) => {
    if (!data.mobileNumber && !data.propertyId && !data.oldPropertyId) {
      return alert("Provide at least one parameter");
    } else if (propsConfig.action === "MUTATION") {
      onSelect(config.key, data, null, null, null, { ...data, propertyIds: data.propertyId, oldPropertyIds: data.oldPropertyId });
    } else {
      history.push(
        `/digit-ui/citizen/pt/property/search-results?mobileNumber=${data?.mobileNumber ? data?.mobileNumber : ``}&propertyIds=${
          data?.propertyId ? data.propertyId : ``
        }&oldPropertyIds=${data?.oldPropertyId ? data?.oldPropertyId : ``}`
      );
    }
  };

  const [mobileNumber, property, oldProperty] = propsConfig.inputs;

  const config = [
    {
      body: [
        {
          label: mobileNumber.label,

          type: mobileNumber.type,
          populators: {
            name: mobileNumber.name,
          },
          isMandatory: false,
        },
        {
          label: property.label,
          description: t(property.description) + "\n" + propertyIdFormat,
          descriptionStyles: { whiteSpace: "pre" },
          type: property.type,
          populators: {
            name: property.name,
          },
          isMandatory: false,
        },
        {
          label: oldProperty.label,
          type: oldProperty.type,
          populators: {
            name: oldProperty.name,
          },
          isMandatory: false,
        },
      ],
    },
  ];

  const onFormValueChange = (setValue, data) => {
    const mobileNumberLength = data?.[mobileNumber.name]?.length;
    const oldPropId = data?.[oldProperty.name];
    const propId = data?.[property.name];

    if (mobileNumberLength > 0 && mobileNumberLength < 10) setCanSubmit(false);
    else if (!propId && !oldPropId && !mobileNumberLength) setCanSubmit(false);
    else setCanSubmit(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ marginTop: "16px" }}>
      <FormComposer
        onSubmit={onPropertySearch}
        noBoxShadow
        inline
        config={config}
        label={propsConfig.texts.submitButtonLabel}
        heading={propsConfig.texts.header}
        text={propsConfig.texts.text}
        cardStyle={{ margin: "auto" }}
        headingStyle={{ fontSize: "32px", marginBottom: "16px" }}
        isDisabled={!canSubmit}
        onFormValueChange={onFormValueChange}
      ></FormComposer>
    </div>
  );
};

SearchProperty.propTypes = {
  loginParams: PropTypes.any,
};

SearchProperty.defaultProps = {
  loginParams: null,
};

export default SearchProperty;
