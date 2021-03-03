import React, { useEffect, useState } from "react";
import { RadioButtons, FormComposer, Dropdown, CardSectionHeader, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useCardPaymentDetails } from "./card";
import { useChequeDetails, ChequeDetailsComponent } from "./cheque";
import isEqual from "lodash/isEqual";

export const CollectPayment = (props) => {
  // const { formData, addParams } = props;
  const { t } = useTranslation();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { path: currentPath } = useRouteMatch();
  const { consumerCode, businessService } = useParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { data: paymentdetails, isLoading } = Digit.Hooks.useFetchPayment({ tenantId: tenantId, consumerCode, businessService });
  const bill = paymentdetails?.Bill ? paymentdetails?.Bill[0] : {};
  // TODO: enhancement to disablePayerDetails
  const [disablePayerDetails, setDisablePayerDetails] = useState(true);

  const { cardConfig } = useCardPaymentDetails(props);
  const { chequeConfig, date } = useChequeDetails(props);
  const additionalCharges = getAdditionalCharge() || [];

  const [formState, setFormState] = useState({});

  const defaultPaymentModes = [
    { code: "CASH", label: "Cash" },
    { code: "CHEQUE", label: "Cheque" },
    { code: "CARD", label: "Debit/Credit Card" },
    // { code: "DD", label: "Demand Draft" },
    // { code: "OFFLINE_NEFT", label: "Offline NEFT" },
    // { code: "OFFLINE_RTGS", label: "Offline RTGS" },
    // { code: "POSTAL_ORDER", label: "Postal Order" },
  ];

  const formConfigMap = {
    CHEQUE: chequeConfig,
    CARD: cardConfig,
  };

  const getPaymentModes = () => defaultPaymentModes;
  const paidByMenu = ["Owner", "Other"];
  const [selectedPaymentMode, setPaymentMode] = useState(formState?.selectedPaymentMode || getPaymentModes()[0]);

  const onSubmit = async (data) => {
    bill.totalAmount = Math.round(bill.totalAmount);
    console.log(data, bill.totalAmount);
    const recieptRequest = {
      Payment: {
        ...data,
        mobileNumber: data.payerMobile,
        paymentDetails: [
          {
            businessService,
            billId: bill.id,
            totalDue: bill.totalAmount,
            totalAmountPaid: bill.totalAmount,
          },
        ],
        tenantId: bill.tenantId,
        totalDue: bill.totalAmount,
        totalAmountPaid: bill.totalAmount,
      },
    };

    recieptRequest.Payment.paymentMode = data?.paymentMode?.code;
    if (data.chequeDetails) {
      recieptRequest.Payment = { ...recieptRequest.Payment, ...data.chequeDetails };
      delete recieptRequest.Payment.chequeDetails;
      if (data.chequeDetails.errorObj) {
        const errors = data.chequeDetails.errorObj;
        const messages = Object.keys(errors)
          .map((e) => t(errors[e]))
          .join();
        alert(`${messages} are required`);
        return;
      }

      recieptRequest.Payment.instrumentDate = new Date(recieptRequest?.Payment?.instrumentDate).getTime();
      recieptRequest.Payment.transactionNumber = "12345678";
    }
    const resposne = await Digit.PaymentService.createReciept(tenantId, recieptRequest);
    queryClient.invalidateQueries();
    history.push(`${props.basePath}/success/${businessService}/${resposne?.Payments[0]?.paymentDetails[0]?.receiptNumber.replace(/\//g, "%2F")}`);
  };

  function getAdditionalCharge() {
    const billAccountDetails = bill?.billDetails
      ?.map((billDetail) => {
        return billDetail.billAccountDetails;
      })
      ?.flat();

    return billAccountDetails?.map((billAccountDetail) => {
      return {
        label: t(billAccountDetail.taxHeadCode),
        populators: <div style={{ marginBottom: 0, textAlign: "right" }}>₹ {billAccountDetail.amount}</div>,
      };
    });
  }

  useEffect(() => {
    document?.getElementById("paymentInfo")?.scrollIntoView({ behavior: "smooth" });
    document?.querySelector("#paymentInfo + .label-field-pair input")?.focus();
  }, [selectedPaymentMode]);

  const config = [
    {
      head: "Payment Details",
      body: [
        ...additionalCharges,
        {
          label: "Total Amount",
          populators: <CardSectionHeader style={{ marginBottom: 0, textAlign: "right" }}> {`₹ ${bill.totalAmount}`} </CardSectionHeader>,
        },
      ],
    },
    {
      head: "Payer Details",
      body: [
        {
          label: "Paid By",
          isMandatory: true,
          type: "custom",
          populators: {
            name: "paidBy",
            customProps: { t, isMendatory: true, option: paidByMenu },
            component: (props, customProps) => (
              <Dropdown
                {...customProps}
                selected={props.value}
                select={(d) => {
                  if (isEqual(d, paidByMenu[0])) {
                    props.setValue("payerName", bill?.payerName);
                    props.setValue("payerMobile", bill?.mobileNumber);
                    setDisablePayerDetails(true);
                  } else {
                    props.setValue("payerName", "");
                    props.setValue("payerMobile", "");
                    setDisablePayerDetails(false);
                  }
                  props.onChange(d);
                }}
              />
            ),
            defaultValue: formState?.paidBy || paidByMenu[0],
          },
        },
        {
          label: "Payer Name",
          isMandatory: true,
          type: "text",
          populators: {
            name: "payerName",
            validation: {
              required: true,
              pattern: /^[A-Za-z]/,
            },
            error: "a valid name required",
            defaultValue: bill?.payerName || formState?.payerName || "",
          },
          disable: disablePayerDetails,
        },
        {
          label: "Payer Mobile",
          isMandatory: true,
          type: "text",
          populators: {
            name: "payerMobile",
            validation: {
              required: true,
              pattern: /^[6-9]\d{9}$/,
            },
            error: "a valid mobile no. required",
            defaultValue: bill?.mobileNumber || formState?.payerMobile || "",
          },
          disable: disablePayerDetails,
        },
      ],
    },
    {
      head: "Payment Mode",
      body: [
        {
          withoutLabel: true,
          type: "custom",
          populators: {
            name: "paymentMode",
            customProps: {
              options: getPaymentModes(),
              optionsKey: "label",
              style: { display: "flex", flexWrap: "wrap" },
              innerStyles: { minWidth: "33%" },
            },
            defaultValue: formState?.paymentMode || getPaymentModes()[0],
            component: (props, customProps) => (
              <RadioButtons
                selectedOption={props.value}
                onSelect={(d) => {
                  props.onChange(d);
                }}
                {...customProps}
              />
            ),
          },
        },
      ],
    },
  ];

  const getDefaultValues = () => ({
    payerName: bill?.payerName || formState?.payerName || "",
    payerMobile: bill?.mobileNumber || formState?.payerMobile || "",
  });

  const getFormConfig = () => config.concat(formConfigMap[formState?.paymentMode?.code] || []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <FormComposer
        cardStyle={{ paddingBottom: "100px" }}
        heading={"Collect Payment"}
        label={"Generate Reciept"}
        config={getFormConfig()}
        onSubmit={onSubmit}
        formState={formState}
        defaultValues={getDefaultValues()}
        onFormValueChange={(setValue, formValue) => {
          if (!isEqual(formValue.paymentMode, selectedPaymentMode)) {
            setFormState(formValue);
            setPaymentMode(formState.paymentMode);
          }
        }}
      ></FormComposer>
      {/* <ChequeDetailsComponent chequeDetails={{}} /> */}
    </React.Fragment>
  );
};
