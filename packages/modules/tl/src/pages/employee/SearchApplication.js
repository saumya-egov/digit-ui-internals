import React from "react"
import { TextInput, Label, SubmitBar, LinkLabel, ActionBar, CloseSvg, DatePicker, CardLabelError } from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next";

const SearchApplication = ({path}) => {
    const { variant } = useParams();
    const { t } = useTranslation();

    const searchField = [
        {
          label: t("ES_SEARCH_APPLICATION_APPLICATION_NO"),
          name: "applicationNos",
        },
        {
          label: t("ES_SEARCH_APPLICATION_MOBILE_NO"),
          name: "mobileNumber",
          maxlength: 10,
          pattern: "[6-9][0-9]{9}",
          title: t("ES_SEARCH_APPLICATION_MOBILE_INVALID"),
        }]

    console.log("find me", path, variant)

    return <form >
            <div className="search-container" style={{ width: "auto", marginLeft : "revert" }}>
            <div className="search-complaint-container">
                {/* {(type === "mobile" || mobileView) && (
                <div className="complaint-header">
                    <h2>{t("ES_COMMON_SEARCH_BY")}</h2>
                    <span onClick={onClose}>
                    <CloseSvg />
                    </span>
                </div>
                )} */}
                <div className="complaint-input-container" style={{ width: "100%" }}>
                {searchField?.map((input, index) => (
                    <span key={index} className={index === 0 ? "complaint-input" : "mobile-input"}>
                    <Label>{input.label}</Label>
                    {/* {getFields(input)}{" "} */}
                    </span>
                ))}
                {!mobileView && <SubmitBar className="submit-bar-search" label={t("ES_COMMON_SEARCH")} submit />}
                </div>
                {error ? <CardLabelError className="search-error-label">{t("ES_SEARCH_APPLICATION_ERROR")}</CardLabelError> : null}
                {!mobileView && <span className="clear-search">{clearAll()}</span>}
            </div>
            </div>
    </form>
}

export default SearchApplication