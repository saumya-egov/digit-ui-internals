import React from "react";
import { FormStep, CardLabel, RadioButtons, RadioOrSelect, CardHeader, KeyNote, Card } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
// import { cardBodyStyle, stringReplaceAll } from "../utils";

const TransfererDetails = ({ userType, formData, config, onSelect }) => {
  const { t } = useTranslation();
  console.log(formData, config, "inside transferer details");
  const ownershipType = formData.searchResult.property?.ownershipCategory?.split?.(".");

  return (
    <React.Fragment>
      <FormStep
        t={t}
        config={config}
        onSelect={onSelect}
        onSkip={() => {}}
        isDisabled={false}
        cardStyle={{ margin: "unset", padding: "unset", backgroundColor: "unset", border: "0px" }}
      >
        {formData.searchResult.property.owners.length > 1 ? (
          <Card>
            <CardHeader>{t("PT_MUTATION_TRANSFEROR_DETAILS")}</CardHeader>
          </Card>
        ) : null}
        {formData.searchResult.property.owners.map((owner, index, arr) => {
          return (
            <Card key={index}>
              {arr.length <= 1 ? <CardHeader>{t("PT_MUTATION_TRANSFEROR_DETAILS")}</CardHeader> : null}
              {config.labels
                ?.filter((e) => e.ownershipType === "ALL" || ownershipType?.[0].includes(e.ownershipType) || e.ownershipType === ownershipType?.[0])
                .map((label) => {
                  let noteValue = label?.keyPath?.reduce((acc, curr) => (curr === "_index_" ? acc?.[index] : acc?.[curr]), formData);
                  return (
                    <KeyNote
                      key={label.label}
                      keyValue={label.label}
                      note={typeof noteValue === "string" ? t(noteValue) : "-"}
                      noteStyle={label.noteStyle}
                    />
                  );
                })}
            </Card>
          );
        })}
      </FormStep>
    </React.Fragment>
  );
};

export default TransfererDetails;
