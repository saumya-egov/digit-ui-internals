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
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { BillDetailsKeyNoteConfig } from "./billDetailsConfig";

const BillDetails = ({ businessService, consumerCode, consumerCodeAlias, Heading }) => {
  const { t } = useTranslation();

  console.log(consumerCode, businessService, "consumercode");

  const [amount, setAmount] = useState(0);

  const tenantId = Digit.ULBService.getCurrentTenantId();

  const [bill, setBill] = useState();

  const { data, isLoading } = Digit.Hooks.useFetchPayment({ tenantId, businessService, consumerCode });

  const yearWiseBills = bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod);

  const billDetails = yearWiseBills?.[0] || [];

  // const Arrears = useMemo(
  //   bill?.billDetails
  //     ?.sort((a, b) => b.fromPeriod - a.fromPeriod)
  //     ?.reduce((total, current, index) => (index === 0 ? total : total + current.amount), 0) || 0,
  //   [bill]
  // );

  useEffect(() => {
    if (!bill && data) {
      let requiredBill = data.Bill.filter((e) => e.consumerCode == consumerCode)[0];
      console.log("here is data", data);
      setBill(requiredBill);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  const getFinancialYear = (_bill) => {
    const { fromPeriod, toPeriod } = _bill;
    let from = new Date(fromPeriod).getFullYear().toString();
    let to = new Date(toPeriod).getFullYear().toString();
    return from + "-" + to;
  };

  const thStyle = { textAlign: "left", borderBottom: "#D6D5D4 1px solid", padding: "16px 12px", whiteSpace: "break-spaces" };
  const tdStyle = { textAlign: "left", borderBottom: "#D6D5D4 1px solid", padding: "8px 10px", breakWord: "no-break" };

  const config = BillDetailsKeyNoteConfig()[businessService];

  return (
    <React.Fragment>
      <CardSectionHeader>{t(config.heading)}</CardSectionHeader>
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
        <Row label={t("CS_PAYMENT_TOTAL_AMOUNT")} textStyle={{ fontWeight: "bold" }} text={"₹ " + bill?.totalAmount} />
      </StatusTable>
      <div style={{ display: "flex", padding: "10px", paddingLeft: "unset", maxWidth: "95%" }}>
        <div style={{ backgroundColor: "#EEEEEE", boxShadow: "2px 0px 3px 2px #D6D5D4", position: "relative" }}>
          <table>
            <thead>
              <tr>
                <th style={thStyle}>{t("FINANCIAL YEAR")}</th>
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
                    <th style={thStyle} key={index}>
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
                <th style={thStyle}>{t("TOTAL TAX")}</th>
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
    </React.Fragment>
  );
};

export default BillDetails;
