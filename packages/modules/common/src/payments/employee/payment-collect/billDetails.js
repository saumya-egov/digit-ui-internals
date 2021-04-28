import React, { useState, useEffect } from "react";
import { CardHeader, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const BillDetails = ({ businessService, consumerCode, consumerCodeAlias, Heading }) => {
  const { t } = useTranslation();

  const [amount, setAmount] = useState(0);

  const tenantId = Digit.ULBService.getCurrentTenantId();

  const [bill, setBill] = useState({});

  const { data, isLoading } = Digit.Hooks.useFetchPayment({ tenantId, businessService, consumerCode });

  const billDetails = bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod)?.[0] || [];

  const Arrears =
    bill?.billDetails
      ?.sort((a, b) => b.fromPeriod - a.fromPeriod)
      ?.reduce((total, current, index) => (index === 0 ? total : total + current.amount), 0) || 0;

  useEffect(() => {
    if (!bill && data) {
      let requiredBill = data.Bill.filter((e) => e.consumerCode == consumerCode)[0];
      console.log("here is the required bill", requiredBill);
      setBill(requiredBill);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <React.Fragment>
      <CardHeader>{t(Heading)}</CardHeader>
      <div className="bill-summary">
        {billDetails?.billAccountDetails
          ?.sort((a, b) => a.order - b.order)
          .map((amountDetails, index) => {
            return (
              <div key={index} className="bill-account-details">
                <div className="label">{t(amountDetails.taxHeadCode)}</div>
                <div className="value">₹ {amountDetails.amount?.toFixed(2)}</div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default BillDetails;
