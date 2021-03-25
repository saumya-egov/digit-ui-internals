import React, { useState } from "react";
import {
  Header,
  Card,
  RadioButtons,
  SubmitBar,
  BackButton,
  CardLabel,
  CardLabelDesc,
  CardSectionHeader,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useParams, useRouteMatch, useHistory, useLocation } from "react-router-dom";

export const SelectPaymentType = (props) => {
  const { state } = useLocation();
  const { tenantId: __tenantId } = Digit.Hooks.useQueryParams();
  const paymentAmount = state?.paymentAmount;
  const { t } = useTranslation();
  const history = useHistory();
  const { path: currentPath } = useRouteMatch();
  const menu = ["AXIS"];
  const { consumerCode, businessService } = useParams();
  const tenantId = state?.tenantId || __tenantId || Digit.ULBService.getCurrentTenantId();
  const { control, handleSubmit } = useForm();
  const { data: paymentdetails } = Digit.Hooks.useFetchPayment({ tenantId: tenantId, consumerCode, businessService });

  const billDetails = paymentdetails?.Bill ? paymentdetails?.Bill[0] : {};
  console.log({ billDetails, payment: paymentdetails?.Bill });

  const onSubmit = async (d) => {
    const filterData = {
      Transaction: {
        tenantId: tenantId,
        txnAmount: paymentAmount || billDetails.totalAmount,
        module: businessService,
        billId: billDetails.id,
        consumerCode: consumerCode,
        productInfo: "Common Payment",
        gateway: "AXIS",
        taxAndPayments: [
          {
            billId: billDetails.id,
            amountPaid: paymentAmount || billDetails.totalAmount,
          },
        ],
        user: {
          name: billDetails.payerName,
          mobileNumber: billDetails.mobileNumber,
          tenantId: tenantId,
        },
        // success
        callbackUrl: `${window.location.protocol}//${window.location.host}/digit-ui/citizen/payment/success/${businessService}/${consumerCode}`,
        additionalDetails: {
          isWhatsapp: false,
        },
      },
    };

    try {
      const data = await Digit.PaymentService.createCitizenReciept(tenantId, filterData);
      const redirectUrl = data?.Transaction?.redirectUrl;
      window.location = redirectUrl;
    } catch (error) {
      console.log(error);
      // TODO: add error toast for error.response.data.Errors[0].message
    }
  };

  return (
    <React.Fragment>
      <BackButton>Back</BackButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>{t("PAYMENT_CS_HEADER")}</Header>
        <Card>
          <div className="payment-amount-info">
            <CardLabelDesc className="dark">{t("PAYMENT_CS_TOTAL_AMOUNT_DUE")}</CardLabelDesc>
            <CardSectionHeader> ₹ {paymentAmount || billDetails.totalAmount}</CardSectionHeader>
          </div>
          <CardLabel>{t("PAYMENT_CS_SELECT_METHOD")}</CardLabel>

          {menu?.length && (
            <Controller
              name="paymentType"
              defaultValue={menu[0]}
              control={control}
              render={(props) => <RadioButtons selectedOption={props.value} options={menu} onSelect={props.onChange} />}
            />
          )}
          <SubmitBar label={t("PAYMENT_CS_BUTTON_LABEL")} submit={true} />
        </Card>
      </form>
    </React.Fragment>
  );
};
