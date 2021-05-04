import React, { useState, useEffect } from "react";
import { FormComposer, CardLabelDesc, Loader } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchProperty = ({ config: propsConfig }) => {
  const { t } = useTranslation();

  const cities = Digit.Hooks.fsm.useTenants();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCurrentTenantId();

  // moduleCode, type, config = {}, payload = []
  const { data: propertyIdFormat, isLoading } = Digit.Hooks.pt.useMDMS(tenantId, "DIGIT-UI", "HelpText", {
    select: (data) => {
      return data?.["DIGIT-UI"]?.["HelpText"]?.[0]?.PT?.propertyIdFormat;
    },
  });

  const onPropertySearch = async (data) => {
    if (!data.mobileNumber && !data.propertyId && !data.oldPropertyId) {
      return alert("Provide at least one parameter");
    } else {
      history.push(
        `/digit-ui/citizen/pt/property/search-results?mobileNumber=${data.mobileNumber}&propertyIds=${data.propertyId}&oldPropertyIds=${data.oldPropertyId}`
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ marginTop: "16px" }}>
      <FormComposer
        onSubmit={onPropertySearch}
        noBoxShadow
        inline
        submitInForm
        config={config}
        label={propsConfig.texts.submitButtonLabel}
        heading={propsConfig.texts.header}
        text={propsConfig.texts.text}
        cardStyle={{ margin: "auto" }}
        headingStyle={{ fontSize: "32px", marginBottom: "16px" }}
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
