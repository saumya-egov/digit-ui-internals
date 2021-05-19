import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const printReciept = async (businessService, receiptNumber) => {
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const state = tenantId?.split(".")[0];
    const payments = await Digit.PaymentService.getReciept(tenantId, businessService, { consumerCodes: receiptNumber });
    let response = { filestoreIds: [payments.Payments[0]?.fileStoreId] };

    if (!payments.Payments[0]?.fileStoreId) {
        response = await Digit.PaymentService.generatePdf(state, { Payments: payments.Payments }, "consolidatedreceipt");
    }
    const fileStore = await Digit.PaymentService.printReciept(state, { fileStoreIds: response.filestoreIds[0] });
    window.open(fileStore[response.filestoreIds[0]], "_blank");
};

export const getActionButton = (businessService, receiptNumber) => {
    const { t } = useTranslation();
    return (
        <a href="javascript:void(0)"
            style={{
                color: "#FE7A51",
                cursor: "pointer"
            }}
            onClick={value => {
                printReciept(businessService, receiptNumber);
            }}
        > {t(`${"UC_DOWNLOAD_RECEIPT"}`)} </a>
    )
}