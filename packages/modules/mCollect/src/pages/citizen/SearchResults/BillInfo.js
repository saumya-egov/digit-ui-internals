import { Card, CardSubHeader, Header, LinkButton, Loader, Row, StatusTable, SubmitBar } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useParams } from "react-router-dom";

/* const setBillData = async (tenantId, propertyIds, updatefetchBillData, updateCanFetchBillData) => {
  const assessmentData = await Digit.PTService.assessmentSearch({ tenantId, filters: { propertyIds } });
  console.log(assessmentData, "assessmentData");
  let billData = {};
  if (assessmentData?.Assessments?.length > 0) {
    billData = await Digit.PaymentService.fetchBill(tenantId, {
      businessService: "PT",
      consumerCode: propertyIds,
    });
  } */

/* updatefetchBillData(billData);
  updateCanFetchBillData({
    loading: false,
    loaded: true,
    canLoad: true,
  });
}; */

/* const getBillAmount = (fetchBillData = null) => {
  if (fetchBillData == null) return "NA";
  return fetchBillData ? (fetchBillData?.Bill && fetchBillData.Bill[0] ? fetchBillData.Bill[0]?.totalAmount : "NA") : "NA";
}; */

const BillInfo = () => {
  const { t } = useTranslation();
  const { businessService: businessService, consumerCode: consumerCode } = useParams();
  console.log("CC");
  console.log(consumerCode);
  // debugger;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  console.log("tenantid");
  console.log(tenantId);
  const { data: data1 } = Digit.Hooks.useFetchPayment(
    { tenantId: "pb.amritsar", consumerCode, businessService },
    { tenantId: "pb.amritsar", consumerCode, businessService }
  );
  let Billinfo = data1 ? data1.Bill[0] : "";
  console.log("bill info");
  console.log(Billinfo);
  let accountdetails = [];
  accountdetails = Billinfo ? Billinfo?.billDetails[0].billAccountDetails : [];
  /* const { isLoading, isError, error, data } = Digit.Hooks.pt.usePropertySearch({ filters: { propertyIds } }, { filters: { propertyIds } });

  const [billData, updateCanFetchBillData] = useState({
    loading: false,
    loaded: false,
    canLoad: false,
  }); */
  //const [fetchBillData, updatefetchBillData] = useState({});

  const getBillingPeriod = () => {
    const { fromPeriod, toPeriod } = Billinfo ? Billinfo?.billDetails[0] : "";

    if (fromPeriod && toPeriod) {
      let from = new Date(Billinfo?.billDetails[0].fromPeriod).getFullYear().toString();
      let to = new Date(Billinfo?.billDetails[0].toPeriod).getFullYear().toString();
      return "FY " + from + "-" + to;
    } else return "N/A";
  };
  /* if (isLoading) {
    return <Loader />;
  } */
  /*  if (property?.status == "ACTIVE" && !billData.loading && !billData.loaded && !billData.canLoad) {
    updateCanFetchBillData({
      loading: false,
      loaded: false,
      canLoad: true,
    });
  }
  if (billData?.canLoad && !billData.loading && !billData.loaded) {
    updateCanFetchBillData({
      loading: true,
      loaded: false,
      canLoad: true,
    });
    setBillData(property?.tenantId || tenantId, propertyIds, updatefetchBillData, updateCanFetchBillData);
  } */

  /*  const ActionButton = ({ jumpTo }) => {
    const { t } = useTranslation();
    const history = useHistory();
    function routeTo() {
      history.push(jumpTo);
    }
    return <LinkButton label={t("PT_OWNER_HISTORY")} className="check-page-link-button" onClick={routeTo} />;
  }; */
  /****  Total Property Due code valeu is hardcoded , integrate with fetch bill api  */
  return (
    <React.Fragment>
      <Header>{t("Bill Details")}</Header>
      <Card>
        <StatusTable>
          <Row label={t("Challan No")} text={`${Billinfo?.consumerCode}`} textStyle={{ whiteSpace: "pre" }} />
          <Row label={t("Billing Period")} text={`${getBillingPeriod()}`} />
        </StatusTable>
        {accountdetails.map((account, index) => (
          <div key={index}>
            <StatusTable>
              <Row label={t(`${account.taxHeadCode.replaceAll(".", "_").toUpperCase()}`)} text={`${account.amount}`} />
              {/* <Row label={t("SGST")} text={`120`} />
            <Row label={t("Feild Fee")} text={`320`} />
            <Row label={t("CGST")} text={`143`} /> */}
            </StatusTable>
          </div>
        ))}

        <StatusTable>
          <Row label={t("Total Amount Due")} text={`${Billinfo.totalAmount}`} />
        </StatusTable>
        {/* <CardSubHeader>{t("PT_PROPERTY_ADDRESS_SUB_HEADER")}</CardSubHeader>
          <StatusTable>
            <Row label={t("PT_PROPERTY_ADDRESS_COLONY_NAME")} text={`${property.address?.buildingName || "NA"}`} />
            <Row label={t("PT_PROPERTY_ADDRESS_STREET_NAME")} text={`${property.address?.street || "NA"}`} />
            <Row label={t("PT_COMMON_LOCALITY_OR_MOHALLA")} text={`${t(property?.address?.locality?.name)}` || "NA"} />
            <Row label={t("PT_COMMON_CITY")} text={`${property.address?.city || "NA"}`} />
            <Row label={t("PT_PROPERTY_ADDRESS_PINCODE")} text={`${property.address?.pincode || "NA"}`} />
          </StatusTable>
          <CardSubHeader>{t("PT_PROPERTY_ASSESSMENT_DETAILS_HEADER")}</CardSubHeader>
          <StatusTable>
            <Row
              label={t("PT_ASSESMENT_INFO_USAGE_TYPE")}
              text={
                `${t(
                  (property.usageCategory !== "RESIDENTIAL" ? "COMMON_PROPUSGTYPE_NONRESIDENTIAL_" : "COMMON_PROPSUBUSGTYPE_") +
                    (property?.usageCategory?.split(".")[1] ? property?.usageCategory?.split(".")[1] : property.usageCategory)
                )}` || "NA"
              }
            />
            <Row label={t("PT_COMMON_PROPERTY_TYPE")} text={`${t(getPropertyTypeLocale(property?.propertyType))}` || "NA"} />
            <Row label={t("PT_ASSESMENT1_PLOT_SIZE")} text={`${property.landArea} sq.ft` || "NA"} />
            <Row label={t("PT_ASSESMENT_INFO_NO_OF_FLOOR")} text={`${property.noOfFloors || "NA"}`} />
          </StatusTable>
          {/* <CardSubHeader>{t("Ground Floor")}</CardSubHeader>
          <CardSubHeader>{t("Unit 1")}</CardSubHeader>
          <div style={{ border: "groove" }}>
            <StatusTable>
              <Row
                label={t("PT_ASSESSMENT_UNIT_USAGE_TYPE")}
                text={`${(Array.isArray(property) && property.units[0].usageCategory.toLowerCase()) || "NA"}`}
              />
              <Row
                label={t("PT_OCCUPANY_TYPE_LABEL")}
                text={`${(Array.isArray(property) && property.units[0].occupancyType.toLowerCase()) || "NA"}`}
              />
              <Row
                label={t("PT_BUILTUP_AREA_LABEL")}
                text={`${(Array.isArray(property) && property.units[0].constructionDetail?.builtUpArea) || "NA"}`}
              />
            </StatusTable>
          </div> 
          <div>
            {Array.isArray(units) &&
              units.length > 0 &&
              units.map((unit, index) => (
                <div key={index}>
                  {(flrno !== unit?.floorNo ? (i = 1) : (i = i + 1)) && i === 1 && (
                    <CardSubHeader>{t(`PROPERTYTAX_FLOOR_${unit?.floorNo}`)}</CardSubHeader>
                  )}
                  <div style={{ border: "groove" }}>
                    <CardSubHeader>
                      {t("Unit")} {i}
                    </CardSubHeader>
                    {(flrno = unit?.floorNo) > -5 && (
                      <StatusTable>
                        <Row
                          label={t("PT_ASSESSMENT_UNIT_USAGE_TYPE")}
                          text={
                            `${t(
                              (property.usageCategory !== "RESIDENTIAL" ? "COMMON_PROPSUBUSGTYPE_NONRESIDENTIAL_" : "COMMON_PROPSUBUSGTYPE_") +
                                (property?.usageCategory?.split(".")[1] ? property?.usageCategory?.split(".")[1] : property.usageCategory) +
                                (property.usageCategory !== "RESIDENTIAL" ? "_" + unit?.usageCategory.split(".").pop() : "")
                            )}` || "NA"
                          }
                        />
                        <Row label={t("PT_OCCUPANY_TYPE_LABEL")} text={`${t("PROPERTYTAX_OCCUPANCYTYPE_" + unit?.occupancyType)}` || "NA"} />
                        <Row label={t("PT_BUILTUP_AREA_LABEL")} text={`${`${unit?.constructionDetail?.builtUpArea} sq.ft` || "NA"}`} />
                      </StatusTable>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <CardSubHeader>{t("PT_COMMON_PROPERTY_OWNERSHIP_DETAILS_HEADER")}</CardSubHeader>
          <div>
            {Array.isArray(owners) &&
              owners.map((owner, index) => (
                <div key={index}>
                  <CardSubHeader>
                    {owners.length != 1 && (
                      <span>
                        {t("PT_OWNER_SUB_HEADER")} - {index + 1}{" "}
                      </span>
                    )}
                  </CardSubHeader>
                  <StatusTable>
                    <Row
                      label={t("PT_COMMON_APPLICANT_NAME_LABEL")}
                      text={`${owner?.name || "NA"}`}
                      actionButton={
                        <ActionButton jumpTo={`/digit-ui/citizen/pt/property/owner-history/${property.tenantId}/${property.propertyId}`} />
                      }
                    />
                    <Row label={t("PT_FORM3_GUARDIAN_NAME")} text={`${owner?.fatherOrHusbandName || "NA"}`} />
                    <Row label={t("PT_COMMON_GENDER_LABEL")} text={`${owner?.gender ? owner?.gender.toLowerCase() : "NA"}`} />
                    <Row
                      label={t("PT_FORM3_OWNERSHIP_TYPE")}
                      text={`${property?.ownershipCategory ? t(`PT_OWNERSHIP_${property?.ownershipCategory}`) : "NA"}`}
                    />
                    <Row label={t("PT_FORM3_MOBILE_NUMBER")} text={`${t(owner?.mobileNumber)}` || "NA"} />
                    <Row label={t("PT_MUTATION_AUTHORISED_EMAIL")} text={`${t("NA")}`} />
                    <Row label={t("PT_MUTATION_TRANSFEROR_SPECIAL_CATEGORY")} text={`${t(owner?.ownerType).toLowerCase()}` || "NA"} />
                    <Row label={t("PT_OWNERSHIP_INFO_CORR_ADDR")} text={`${t(owners?.correspondenceAddress)}` || "NA"} />
                  </StatusTable>
                </div>
              ))}
          </div>
          <CardSubHeader>{t("PT_COMMON_DOCS")}</CardSubHeader>
          <div>
            {Array.isArray(docs) ? (
              docs.length > 0 && <PropertyDocument property={property}></PropertyDocument>
            ) : (
              <StatusTable>
                <Row text="PT_NO_DOCUMENTS_MSG" />
              </StatusTable>
            )}
          </div>
          <div>
            {property?.status === "ACTIVE" && (
              <div style={{ marginTop: "24px", position: "fixed", bottom: "0px", width: "100%", marginLeft: "-6%" }}>
                <Link to={{ pathname: `/digit-ui/citizen/pt/property/edit-application/update=true/${property.propertyId}` }}>
                  <SubmitBar label={t("PT_UPDATE_PROPERTY_BUTTON")} />
                </Link>
              </div>
            )}
          </div>
            </Card>:*/}
        <div>
          {Billinfo?.status === "ACTIVE" && (
            <div /* style={{ marginTop: "24px", position: "fixed", bottom: "0px", width: "100%", marginLeft: "-6%" }} */>
              <Link to={{ pathname: `/digit-ui/citizen/payment/collect/${Billinfo.businessService}/${Billinfo.consumerCode}` }}>
                <SubmitBar label={t("PAY")} />
              </Link>
            </div>
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default BillInfo;
