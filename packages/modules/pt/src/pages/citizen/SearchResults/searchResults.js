import React from "react";
import { Header, ResponseComposer, Loader } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PropertySearchResults = ({ template, header, actionButtonLabel, isMutation, onSelect, config }) => {
  const { t } = useTranslation();
  const { mobileNumber, propertyIds, oldPropertyIds, locality, city } = Digit.Hooks.useQueryParams();
  const filters = {};
  if (mobileNumber) filters.mobileNumber = mobileNumber;
  if (propertyIds) filters.propertyIds = propertyIds;
  if (oldPropertyIds) filters.oldPropertyIds = oldPropertyIds;
  if (locality) filters.locality = locality;

  // console.log({ mobileNumber, propertyIds, oldPropertyIds, locality, city }, "inside search result");

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const searchArgs = city ? { tenantId: city, filters, auth: false } : { filters, auth: false };
  const result = Digit.Hooks.pt.usePropertySearch(searchArgs);
  const consumerCode = result?.data?.Properties?.map((a) => a.propertyId).join(",");

  const fetchBillParams = mobileNumber ? { mobileNumber, consumerCode } : { consumerCode };

  const paymentDetails = Digit.Hooks.useFetchBillsForBuissnessService(
    { businessService: "PT", ...fetchBillParams, tenantId: city },
    {
      enabled: consumerCode ? true : false,
      retry: false,
    }
  );

  const history = useHistory();

  if (paymentDetails.isLoading || result.isLoading) {
    return <Loader />;
  }

  if (result.error || !consumerCode) {
    return <div>{t("CS_PT_NO_PROPERTIES_FOUND")}</div>;
  }

  const onSubmit = (data) => {
    if (isMutation) {
      let property = result?.data?.Properties?.filter?.((e) => e.propertyId === data.property_id)[0];
      onSelect(config.key, { data, property });
    } else history.push(`/digit-ui/citizen/payment/my-bills/PT/${data.property_id}`, { tenantId });
  };

  const payment = {};

  paymentDetails?.data?.Bill?.forEach((element) => {
    if (element?.consumerCode) {
      payment[element?.consumerCode] = {
        total_due: element?.totalAmount,
        bil_due__date: new Date(element?.billDate).toDateString(),
      };
    }
  });

  const arr = isMutation ? result?.data?.Properties?.filter((e) => e.status === "ACTIVE") : result?.data?.Properties;

  const searchResults = arr?.map((property) => {
    let addr = property?.address || {};

    return {
      property_id: property?.propertyId,
      owner_name: (property?.owners || [])[0]?.name,
      property_address: [addr.doorNo || "", addr.buildingName || "", addr.street || "", addr.locality?.name || "", addr.city || ""]
        .filter((a) => a)
        .join(", "),
      total_due: payment[property?.propertyId]?.total_due || 0,
      bil_due__date: payment[property?.propertyId]?.bil_due__date || t("N/A"),
    };
  });

  return (
    <div className="static" style={{ marginTop: "16px" }}>
      <div className="static-wrapper">
        {header && (
          <Header style={{ marginLeft: "8px" }}>
            {t(header)} ({searchResults?.length})
          </Header>
        )}
        <ResponseComposer data={searchResults} template={template} actionButtonLabel={actionButtonLabel} onSubmit={onSubmit} />
      </div>

      {/* <div
        style={{
          paddingLeft: "16px",
          paddingTop: "16px",
          position: "fixed",
          bottom: "40px",
          backgroundColor: "#e3e3e3",
          textAlign: "left",
          width: "100%",
        }}
      >
        <p>{t("PT_TEXT_WANT_TO_ADD_A_NEW_PROPERTY")} </p>
        <p className="link">
          <Link to="/digit-ui/citizen/pt/property/new-application/info">{t("PT_COMMON_CLICK_HERE_TO_REGISTER_NEW_PROPERTY")}</Link>
        </p>
      </div> */}
    </div>
  );
};

PropertySearchResults.propTypes = {
  template: PropTypes.any,
  header: PropTypes.string,
  actionButtonLabel: PropTypes.string,
};

PropertySearchResults.defaultProps = {
  template: [],
  header: null,
  actionButtonLabel: null,
};

export default PropertySearchResults;
