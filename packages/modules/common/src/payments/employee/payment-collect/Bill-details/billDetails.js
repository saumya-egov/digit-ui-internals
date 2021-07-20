import React, { useState, useEffect, useMemo } from "react";
import {
  CardHeader,
  CardLabel,
  Loader,
  CardCaption,
  CardSubHeader,
  CardSectionHeader,
  Row,
  StatusTable,
  RadioButtons,
  TextInput,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { BillDetailsKeyNoteConfig } from "./billDetailsConfig";

export const BillDetailsFormConfig = (props, t) => ({
  PT: [
    {
      head: t("ES_BILL_DETAILS_PT_DETAILS_HEADING"),
      body: [
        {
          withoutLabel: true,
          type: "custom",
          populators: {
            name: "amount",
            customProps: { businessService: "PT", consumerCode: props.consumerCode },
            component: (props, customProps) => <BillDetails onChange={props.onChange} amount={props.value} {...customProps} />,
          },
        },
      ],
    },
  ],
  mcollect: [
    {
      head: t("COMMON_PAY_SCREEN_HEADER"),
      body: [
        {
          withoutLabel: true,
          type: "custom",
          populators: {
            name: "amount",
            customProps: { businessService: props.businessService, consumerCode: props.consumerCode },
            component: (props, customProps) => <BillDetails onChange={props.onChange} amount={props.value} {...customProps} />,
          },
        },
      ],
    },
  ],
});

const BillDetails = ({ businessService, consumerCode, _amount, onChange }) => {
  const { t } = useTranslation();
  const { workflow: ModuleWorkflow } = Digit.Hooks.useQueryParams();

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { data, isLoading } = Digit.Hooks.useFetchPayment({ tenantId, businessService, consumerCode });

  const [bill, setBill] = useState();
  const [showDetails, setShowDetails] = useState(true);

  const yearWiseBills = bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod);
  const billDetails = yearWiseBills?.[0] || [];

  const getTotal = () => bill?.totalAmount ? bill?.totalAmount : 0;

  const { isLoading: mdmsLoading, data: mdmsBillingData } = Digit.Hooks.useGetPaymentRulesForBusinessServices(tenantId);
  const [paymentRules, setPaymentRules] = useState();

  useEffect(() => {
    const payRestrictiondetails = mdmsBillingData?.MdmsRes?.BillingService?.BusinessService;
    if (payRestrictiondetails?.length) setPaymentRules(payRestrictiondetails.filter((e) => e.code == businessService)[0]);
    else
      setPaymentRules({
        // isAdvanceAllowed: false,
        // isVoucherCreationEnabled: true,
        // minAmountPayable: 100,
        // partPaymentAllowed: true,
      });
  }, [mdmsBillingData]);

  const { minAmountPayable, isAdvanceAllowed } = paymentRules || {};

  const [paymentType, setPaymentType] = useState(t("CS_PAYMENT_FULL_AMOUNT"));
  const [amount, setAmount] = useState(getTotal());
  const [paymentAllowed, setPaymentAllowed] = useState(true);
  const [formError, setError] = useState("");

  const changeAmount = (value) => {
    setAmount(value);
  };

  useEffect(() => {
    const allowPayment = minAmountPayable && amount >= minAmountPayable && !isAdvanceAllowed && amount <= getTotal() && !formError;
    if (paymentType != t("CS_PAYMENT_FULL_AMOUNT")) setPaymentAllowed(allowPayment);
    else setPaymentAllowed(true);
  }, [paymentType, amount]);

  useEffect(() => {
    if (!bill && data) {
      let requiredBill = data.Bill.filter((e) => e.consumerCode == consumerCode)[0];
      setBill(requiredBill);
    }
  }, [data]);

  useEffect(() => {
    if (paymentType !== t("CS_PAYMENT_FULL_AMOUNT")) onChangeAmount(amount.toString());
    else {
      setError("");
      changeAmount(getTotal());
    }
  }, [paymentType, bill]);

  useEffect(() => {
    if (paymentType !== t("CS_PAYMENT_FULL_AMOUNT")) onChange({ amount, paymentAllowed, error: formError, minAmountPayable });
    else onChange({ amount: getTotal(), paymentAllowed: true, error: formError, minAmountPayable });
  }, [paymentAllowed, formError, amount, paymentType]);

  // for setting error
  const onChangeAmount = (value) => {
    setError("");
    if (isNaN(value) || value.includes(".")) {
      setError("AMOUNT_INVALID");
    } else if (!isAdvanceAllowed && value > getTotal()) {
      setError("CS_ADVANCED_PAYMENT_NOT_ALLOWED");
    } else if (value < minAmountPayable) {
      setError("CS_CANT_PAY_BELOW_MIN_AMOUNT");
    }
    changeAmount(value);
  };

  if (isLoading || mdmsLoading) return <Loader />;

  const getFinancialYear = (_bill) => {
    const { fromPeriod, toPeriod } = _bill;
    let from = new Date(fromPeriod).getFullYear().toString();
    let to = new Date(toPeriod).getFullYear().toString();
    return from + "-" + to;
  };

  const thStyle = { textAlign: "left", borderBottom: "#D6D5D4 1px solid", padding: "16px 12px", whiteSpace: "break-spaces" };
  const tdStyle = { textAlign: "left", borderBottom: "#D6D5D4 1px solid", padding: "8px 10px", breakWord: "no-break" };

  const config = BillDetailsKeyNoteConfig()[ModuleWorkflow ? ModuleWorkflow : businessService];

  return (
    <React.Fragment>
      {/* <CardSectionHeader>{t(config.heading)}</CardSectionHeader> */}
      <StatusTable>
        {bill &&
          config.details.map((obj, index) => {
            const value = obj.keyPath.reduce((acc, key) => {
              if (typeof key === "function") acc = key(acc);
              else acc = acc[key];
              return acc;
            }, bill);
            return <Row key={index + "bill"} label={t(obj.keyValue)} text={value} />;
          })}
      </StatusTable>
      <StatusTable style={{ paddingTop: "46px" }}>
        <Row label={t("ES_PAYMENT_TAXHEADS")} textStyle={{ fontWeight: "bold" }} text={t("ES_PAYMENT_AMOUNT")} />
        <hr style={{ width: "40%" }} className="underline" />
        {billDetails?.billAccountDetails
          ?.sort((a, b) => a.order - b.order)
          .map((amountDetails, index) => (
            <Row
              key={index + "taxheads"}
              labelStyle={{ fontWeight: "normal" }}
              label={t(amountDetails.taxHeadCode)}
              text={"₹ " + amountDetails.amount?.toFixed(2)}
            />
          ))}

        <hr style={{ width: "40%" }} className="underline" />
        <Row label={t("CS_PAYMENT_TOTAL_AMOUNT")} textStyle={{ fontWeight: "bold" }} text={"₹ " +getTotal()} />
      </StatusTable>
      {showDetails && !ModuleWorkflow ? (
        <React.Fragment>
          <div style={{ maxWidth: "95%", display: "inline-block", textAlign: "right" }}>
            <div style={{ display: "flex", padding: "10px", paddingLeft: "unset", maxWidth: "95%" }}>
              <div style={{ backgroundColor: "#EEEEEE", boxShadow: "2px 0px 3px 2px #D6D5D4", position: "relative" }}>
                <table>
                  <thead>
                    <tr>
                      <th style={thStyle}>{t("FINANCIAL_YEAR")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearWiseBills?.map((year_bill, index) => (
                      <tr key={index}>
                        <td style={tdStyle}>{getFinancialYear(year_bill)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ backgroundColor: "#EEEEEE", overflowX: "auto" }}>
                <table>
                  <thead>
                    <tr>
                      {yearWiseBills?.[0]?.billAccountDetails
                        ?.sort((a, b) => a.order - b.order)
                        ?.map((head, index) => (
                          <th style={{ ...thStyle }} key={index}>
                            {t(head.taxHeadCode)}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {yearWiseBills?.map((year_bill, index) => {
                      const sorted_tax_heads = year_bill?.billAccountDetails?.sort((a, b) => a.order - b.order);
                      return (
                        <tr key={index}>
                          {sorted_tax_heads.map((e, i) => (
                            <td style={tdStyle} key={i}>
                              {e.amount}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ backgroundColor: "#EEEEEE", boxShadow: "-2px 0px 3px 2px #D6D5D4", position: "relative" }}>
                <table>
                  <thead>
                    <tr>
                      <th style={thStyle}>{t("TOTAL_TAX")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearWiseBills?.map((year_bill, index) => {
                      return (
                        <tr key={index}>
                          <td style={tdStyle}>{year_bill.amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ float: "right" }} onClick={() => setShowDetails(false)} className="filter-button">
              {t("ES_COMMON_HIDE_DETAILS")}
            </div>
          </div>{" "}
        </React.Fragment>
      ) : (
        !ModuleWorkflow && (
          <div style={{}} onClick={() => setShowDetails(true)} className="filter-button">
            {t("ES_COMMON_VIEW_DETAILS")}
          </div>
        )
      )}
      {!ModuleWorkflow && (
        <div className="bill-payment-amount">
          <CardSectionHeader>{t("CS_COMMON_PAYMENT_AMOUNT")}</CardSectionHeader>
          <RadioButtons
            style={{ display: "flex" }}
            innerStyles={{ padding: "5px" }}
            selectedOption={paymentType}
            onSelect={setPaymentType}
            options={paymentRules.partPaymentAllowed ? [t("CS_PAYMENT_FULL_AMOUNT"), t("CS_PAYMENT_CUSTOM_AMOUNT")] : [t("CS_PAYMENT_FULL_AMOUNT")]}
          />
          <div style={{ position: "relative" }}>
            <span
              className="payment-amount-front"
              style={{ border: `1px solid ${paymentType === t("CS_PAYMENT_FULL_AMOUNT") ? "#9a9a9a" : "black"}` }}
            >
              ₹
            </span>
            {paymentType !== t("CS_PAYMENT_FULL_AMOUNT") ? (
              <TextInput
                style={{ width: "30%" }}
                className="text-indent-xl"
                onChange={(e) => onChangeAmount(e.target.value)}
                value={amount}
                disable={getTotal() === 0}
              />
            ) : (
              <TextInput style={{ width: "30%" }} className="text-indent-xl" value={getTotal()} disable={true} />
            )}
            {formError === "CS_CANT_PAY_BELOW_MIN_AMOUNT" ? (
              <span className="card-label-error">
                {t(formError)}: {"₹" + minAmountPayable}
              </span>
            ) : (
              <span className="card-label-error">{t(formError)}</span>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default BillDetails;
