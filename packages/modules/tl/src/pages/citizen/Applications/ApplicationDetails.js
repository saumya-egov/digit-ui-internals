import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Header, Card, Row, LinkButton, Loader, MultiLink, SubmitBar } from "@egovernments/digit-ui-react-components";
import { useHistory, useLocation, useParams } from "react-router-dom";
import getPDFData from "../../../utils/getTLAcknowledgementData";

const ApplicationDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { tenantId } = useParams();
  const history = useHistory();
  const [bill, setBill] = useState(null);
  const [SLAValue, setSLA] = useState("");
  const state = tenantId;

  const { isLoading, isError, error, data: application, error: errorApplication } = Digit.Hooks.tl.useTLSearchApplication({
    tenantId: tenantId,
    applicationNumber: id,
  });

  const { data: paymentsHistory } = Digit.Hooks.tl.useTLPaymentHistory(tenantId, id);

  const getSLA = async (application) => {
    console.log(application?.workflowCode);
    const workflowInstances = await Digit.WorkflowService.init(tenantId, application?.workflowCode);
    console.log(workflowInstances?.BusinessServices[0]?.businessServiceSla);
    setSLA(workflowInstances?.BusinessServices[0]?.businessServiceSla);
  };
  useEffect(() => {
    if (application)
      Digit.PaymentService.fetchBill(tenantId, {
        consumerCode: application.Licenses[0]?.applicationNumber,
        businessService: application.Licenses[0]?.businessService,
      }).then((res) => {
        setBill(res?.Bill[0]);
      });
  }, [application]);

  useEffect(() => {
    if (application) {
      console.log(application.Licenses[0]);
      getSLA(application?.Licenses[0]);
    }
  }, [application]);

  const coreData = Digit.Hooks.useCoreData();

  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    console.log(application?.pdfData, errorApplication);
  }, [application, errorApplication]);

  if (isLoading) {
    return <Loader />;
  }

  if (application?.applicationDetails?.length === 0) {
    history.goBack();
  }

  const tenantInfo = coreData.tenants.find((tenant) => tenant.code === application?.Licenses[0]?.tenantId);
  console.log(tenantInfo);
  const handleDownloadPdf = async () => {
    let res = application?.Licenses[0];
    const data = getPDFData({ ...res }, tenantInfo, t);
    console.log(data);
    data.then((res) => Digit.Utils.pdf.generate(res));
    setShowOptions(false);
  };

  const downloadPaymentReceipt = async () => {
    console.log("print payment receipt", paymentsHistory);
    const receiptFile = { filestoreIds: [paymentsHistory.Payments[0]?.fileStoreId] };

    if (!receiptFile?.fileStoreIds?.[0]) {
      const newResponse = await Digit.PaymentService.generatePdf(state, { Payments: [paymentsHistory.Payments[0]] }, "tradelicense-receipt");
      const fileStore = await Digit.PaymentService.printReciept(state, { fileStoreIds: newResponse.filestoreIds[0] });
      window.open(fileStore[newResponse.filestoreIds[0]], "_blank");
      setShowOptions(false);
    } else {
      const fileStore = await Digit.PaymentService.printReciept(state, { fileStoreIds: receiptFile.filestoreIds[0] });
      window.open(fileStore[receiptFile.filestoreIds[0]], "_blank");
      setShowOptions(false);
    }
  };

  const downloadTLcertificate = async () => {
    const TLcertificatefile = await Digit.PaymentService.generatePdf(tenantId, application, "tlcertificate");
    const receiptFile = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: TLcertificatefile.filestoreIds[0] });
    console.log(TLcertificatefile.filestoreIds[0], receiptFile);
    window.open(receiptFile[TLcertificatefile.filestoreIds[0]], "_blank");
    // printReciept
    // window.open("blob:https://qa.digit.org/"+TLcertificatefile.filestoreIds[0], "_blank");
    setShowOptions(false);
  };

  const dowloadOptions = [
    {
      label: t("TL_CERTIFICATE"),
      onClick: downloadTLcertificate,
    },
    {
      label: t("CS_COMMON_APPLICATION_ACKNOWLEDGEMENT"),
      onClick: handleDownloadPdf,
    },
    {
      label: t("CS_COMMON_PAYMENT_RECEIPT"),
      onClick: downloadPaymentReceipt,
    },
  ];

  return (
    <React.Fragment>
      <MultiLink onHeadClick={() => setShowOptions(!showOptions)} displayOptions={showOptions} options={dowloadOptions} />
      {/* <div>
          <LinkButton label={t("CS_COMMON_DOWNLOAD")} className="check-page-link-button pt-application-download-btn" onClick={() => setShowOptions(!showOptions)}/>
        </div> */}
      <Card style={{ position: "relative", marginTop: "2rem" }}>
        {application?.Licenses?.map((application) => {
          return (
            <div className="employee-data-table">
              <Row
                className="employee-data-table"
                label={t("TL_COMMON_TABLE_COL_APP_NO")}
                text={application?.applicationNumber}
                textStyle={{ whiteSpace: "pre", border: "none" }}
              />
              <Row label={t("TL_APPLICATION_CATEGORY")} text={t("ACTION_TEST_TRADE_LICENSE")} textStyle={{ whiteSpace: "pre" }} />
              {application?.tradeLicenseDetail.owners.map((ele) => {
                return <Row label={t("TL_COMMON_TABLE_COL_OWN_NAME")} text={t(ele.name)} textStyle={{ whiteSpace: "pre" }} />;
              })}
              <Row
                style={{ border: "none" }}
                label={t("TL_COMMON_TABLE_COL_TRD_NAME")}
                text={application?.tradeName}
                textStyle={{ whiteSpace: "pre" }}
              />
              <Row
                style={{ border: "none" }}
                label={t("TL_COMMON_TABLE_COL_STATUS")}
                text={t(`WF_NEWTL_${application?.status}`)}
                textStyle={{ whiteSpace: "pre" }}
              />
              <Row
                style={{ border: "none" }}
                label={t("TL_COMMON_TABLE_COL_SLA_NAME")}
                text={`${SLAValue / (1000 * 60 * 60 * 24)} Days`}
                textStyle={{ whiteSpace: "pre" }}
              />
              {application?.tradeLicenseDetail?.tradeUnits?.map((ele) => {
                return (
                  <div>
                    <Row
                      label={t("TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL")}
                      text={t(`TRADELICENSE_TRADETYPE_${ele?.tradeType.split(".")[0]}`)}
                      textStyle={{ whiteSpace: "pre" }}
                    />
                    <Row
                      style={{ border: "none" }}
                      label={t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}
                      text={t(`TRADELICENSE_TRADETYPE_${ele?.tradeType.split(".")[1]}`)}
                      textStyle={{ whiteSpace: "pre" }}
                    />
                    <Row
                      style={{ border: "none" }}
                      label={t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}
                      text={t(
                        `TRADELICENSE_TRADETYPE_${ele?.tradeType.split(".")[0]}_${ele?.tradeType.split(".")[1]}_${ele?.tradeType
                          .split(".")[2]
                          .split("-")
                          .join("_")}`
                      )}
                      textStyle={{ whiteSpace: "pre" }}
                    />
                  </div>
                );
              })}
              {application?.tradeLicenseDetail?.accessories?.map((ele) => {
                return (
                  <div>
                    <Row
                      style={{ border: "none" }}
                      label={t("TL_REVIEWACCESSORY_TYPE_LABEL")}
                      text={ele?.accessoryCategory}
                      textStyle={{ whiteSpace: "pre" }}
                    />
                    <Row label={t("TL_NEW_TRADE_ACCESSORY_COUNT_LABEL")} text={ele?.count} textStyle={{ whiteSpace: "pre" }} />
                    <Row label={t("TL_NEW_TRADE_ACCESSORY_UOM_LABEL")} text={ele?.uom} textStyle={{ whiteSpace: "pre" }} />
                    <Row label={t("TL_NEW_TRADE_ACCESSORY_UOMVALUE_LABEL")} text={ele?.uomValue} textStyle={{ whiteSpace: "pre" }} />
                  </div>
                );
              })}
              {application?.tradeLicenseDetail?.owners?.map((ele) => {
                return (
                  <div>
                    <Row
                      style={{ border: "none" }}
                      label={t("TL_NEW_TRADE_ADDRESS_LABEL")}
                      text={ele?.permanentAddress}
                      textStyle={{ whiteSpace: "pre" }}
                    />
                  </div>
                );
              })}
              {application?.status == "PENDINGPAYMENT" ? (
                <Link
                  to={{
                    pathname: `/digit-ui/citizen/payment/collect/${application?.businessService}/${application?.applicationNumber}`,
                    state: { bill, tenantId: state.tenantId },
                  }}
                >
                  <SubmitBar label={t("COMMON_MAKE_PAYMENT")} />
                </Link>
              ) : null}
            </div>
          );
        })}
      </Card>
    </React.Fragment>
  );
};

export default ApplicationDetails;
