import React from "react";
import { useTranslation } from "react-i18next";

const BillSumary = ({ billAccountDetails, total }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="bill-summary">
        {billAccountDetails
          .sort((a, b) => b.amount - a.amount)
          .map((amountDetails, index) => {
            return (
              <div key={index} className="bill-account-details">
                <div className="label">{t(amountDetails.taxHeadCode)}</div>
                <div className="value">₹ {amountDetails.amount?.toFixed(2)}</div>
              </div>
            );
          })}

        <hr className="underline" />
        <div className="amount-details">
          <div className="label">{t("CS_PAYMENT_TOTAL_AMOUNT")}</div>
          <div className="value">₹ {Number(total)?.toFixed(2)}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BillSumary;
