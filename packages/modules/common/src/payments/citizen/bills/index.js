import React, { useEffect } from "react";
import { useParams, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import Routes from "./routes";
// import { myBillMap } from "./myBillsKeysMap";

export const MyBills = ({ stateCode }) => {
  const { businessService } = useParams();

  const { isLoading: storeLoading, data: store } = Digit.Services.useStore({
    stateCode,
    moduleCode: businessService,
    language: Digit.SessionStorage.get("locale") || "en_IN",
  });

  const history = useHistory();
  const { url } = useRouteMatch();
  const location = useLocation();

  const { isLoading, data } = Digit.Hooks.useFetchCitizenBillsForBuissnessService({ businessService }, { refetchOnMount: false });
  const { tenantId } = Digit.UserService.getUser()?.info || location?.state || {};

  if (!tenantId && !location?.state?.noAuth) {
    history.replace(`/digit-ui/citizen/login`, { from: url });
  }

  const { isLoading: mdmsLoading, data: mdmsBillingData } = Digit.Hooks.useGetPaymentRulesForBusinessServices(tenantId);

  const billsList = data?.Bill || [];

  const getPaymentRestrictionDetails = () => {
    const payRestrictiondetails = mdmsBillingData?.MdmsRes?.BillingService?.BusinessService;
    if (payRestrictiondetails?.length) return payRestrictiondetails.filter((e) => e.code == businessService)[0];
    else
      return {
        // isAdvanceAllowed: false,
        // isVoucherCreationEnabled: true,
        // minAmountPayable: 100,
        // partPaymentAllowed: true,
      };
  };

  const getProps = () => ({ billsList, paymentRules: getPaymentRestrictionDetails(), businessService });

  return (
    <React.Fragment>
      <Routes {...getProps()} />
    </React.Fragment>
  );
};
