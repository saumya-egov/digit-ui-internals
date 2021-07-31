import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormComposer, Toast, CitizenInfoLabel, Header } from "@egovernments/digit-ui-react-components";
import { newConfig } from "../../../config/config";
import { useHistory } from "react-router-dom";
import { convertDateToEpoch, stringReplaceAll, convertEpochToDate } from "../../../utils";
import cloneDeep from "lodash/cloneDeep";


const ReNewApplication = (props) => {

  const applicationData = cloneDeep(props?.location?.state?.applicationData) || {};

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const [canSubmit, setSubmitValve] = useState(false);

  const history = useHistory();
  // delete
  const [_formData, setFormData, _clear] = Digit.Hooks.useSessionStorage("store-data", null);
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_HAPPENED", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_SUCCESS_DATA", {});

  const [showToast, setShowToast] = useState(null);
  const [error, setError] = useState(null);

  let financialYear = cloneDeep(applicationData?.financialYear);
  let financialYearDate = applicationData?.financialYear?.split('-')[1];
  let finalFinancialYear = `20${Number(financialYearDate)}-${Number(financialYearDate)+1}`
  if (window.location.href.includes("edit-application-details")) finalFinancialYear = financialYear;

  const tradeDetails = [
    {
      tradeName: applicationData?.tradeName,
      financialYear: { code: finalFinancialYear, i18nKey: `FY${finalFinancialYear}`, id: finalFinancialYear?.split('-')[0] },
      licenseType: "",
      structureType: { i18nKey: t(`COMMON_MASTERS_STRUCTURETYPE_${stringReplaceAll(applicationData?.tradeLicenseDetail?.structureType?.split('.')[0]?.toUpperCase(), ".", "_")}`), code: applicationData?.tradeLicenseDetail?.structureType?.split('.')[0] },
      structureSubType: { i18nKey: `COMMON_MASTERS_STRUCTURETYPE_${stringReplaceAll(applicationData?.tradeLicenseDetail?.structureType?.toUpperCase(), ".", "_")}`, code: applicationData?.tradeLicenseDetail?.structureType },
      commencementDate: convertEpochToDate(applicationData?.commencementDate),
      gstNo: applicationData?.tradeLicenseDetail?.additionalDetail?.gstNo || "",
      operationalArea: applicationData?.tradeLicenseDetail?.operationalArea || "",
      noOfEmployees: applicationData?.tradeLicenseDetail?.noOfEmployees || "",
      key: Date.now()
    }
  ];

  if (applicationData?.tradeLicenseDetail?.tradeUnits?.length > 0) {
    applicationData?.tradeLicenseDetail?.tradeUnits?.forEach((data, index) => {
      let tradeType1 = cloneDeep(data?.tradeType);
      let tradeType2 = cloneDeep(data?.tradeType);
      let tradeType3 = cloneDeep(data?.tradeType);

      let code1 = typeof data?.tradeType == "string" && stringReplaceAll(tradeType3, "-", "_");
      if (typeof data?.tradeType == "string") data.tradeCategory = { code: tradeType1?.split('.')[0], i18nKey: `TRADELICENSE_TRADETYPE_${tradeType1?.split('.')[0]}` };
      if (typeof data?.tradeType == "string") data.tradeSubType = { code: tradeType3, i18nKey: t(`TRADELICENSE_TRADETYPE_${stringReplaceAll(code1, ".", "_")}`), uom: data?.uom || "" };
      if (typeof data?.tradeType == "string") data.tradeType = { code: tradeType2?.split('.')[1], i18nKey: `TRADELICENSE_TRADETYPE_${tradeType2?.split('.')[1]}` };
      data.uom = data?.uom;
      data.uomValue = data?.uomValue;
      data.key = (Date.now() + ((index + 1) * 20))
    })
  }

  if (applicationData?.tradeLicenseDetail?.accessories?.length > 0) {
    applicationData?.tradeLicenseDetail?.accessories?.forEach((data, index) => {
      let accessory1 = cloneDeep(data?.accessoryCategory);
      let accessory2 = cloneDeep(data?.accessoryCategory);

      if (typeof data?.accessoryCategory == "string") data.accessoryCategory = { code: accessory1, i18nKey: `TRADELICENSE_ACCESSORIESCATEGORY_${stringReplaceAll(accessory1, "-", "_")}`, uom: data?.uom };
      data.uom = data?.uom;
      data.uomValue = data?.uomValue || "";
      data.count= data?.count || "";
      data.key = (Date.now() + ((index + 1) * 20))
    })
  }

  applicationData.tradeLicenseDetail.address.locality = { ...applicationData.tradeLicenseDetail.address.locality, ...{ i18nkey: applicationData.tradeLicenseDetail.address.locality?.name } };

  const ownershipCategory = {
    code: applicationData?.tradeLicenseDetail?.subOwnerShipCategory,
    i18nKey: `COMMON_MASTERS_OWNERSHIPCATEGORY_${stringReplaceAll(applicationData?.tradeLicenseDetail?.subOwnerShipCategory, ".", "_")}`
  }

  if (applicationData?.tradeLicenseDetail?.owners?.length > 0) {
    applicationData?.tradeLicenseDetail?.owners?.forEach((data, index) => {
      if (typeof data?.gender == "string") data.gender = { code: data?.gender, i18nKey: `TL_GENDER_${data?.gender}` };
      // if (typeof data?.relationship == "string") data.relationship = { code: data?.relationship, i18nKey: `COMMON_RELATION_${data?.relationship}` };
      if (typeof data?.ownerType == "string") data.ownerType = { code: data?.ownerType, i18nKey: data?.ownerType }
      // if (!data?.fatherOrHusbandName) data.fatherOrHusbandName = "";
      if (!data?.emailId) data.emailId = "";
      if (!data?.permanentAddress) data.permanentAddress = "";
      data.key = (Date.now() + ((index + 1) * 20))
    });
  }

  let clonedData = cloneDeep(props?.location?.state?.applicationData);
  clonedData.checkForRenewal = false;

  const defaultValues = {
    tradedetils1: clonedData,
    tradedetils: tradeDetails,
    tradeUnits: applicationData?.tradeLicenseDetail?.tradeUnits,
    accessories: applicationData?.tradeLicenseDetail?.accessories,
    address: applicationData?.tradeLicenseDetail?.address || {},
    ownershipCategory: ownershipCategory,
    owners: applicationData?.tradeLicenseDetail?.owners || [],
    documents: { documents: applicationData?.tradeLicenseDetail?.applicationDocuments || [] },
    // applicationData: cloneDeep(props?.location?.state?.applicationData)
  };


  const closeToast = () => {
    setShowToast(null);
    setError(null);
  };

  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
  }, []);

  const onFormValueChange = (setValue, formData, formState) => {
    setSubmitValve(!Object.keys(formState.errors).length);
  };

  const onSubmit = (data) => {

    let EDITRENEWAL = data?.tradedetils1?.checkForRenewal;
    let sendBackToCitizen = false;
    if (data?.tradedetils1?.action == "SENDBACKTOCITIZEN") {
      EDITRENEWAL = false;
      sendBackToCitizen = true;
    }
    

    if (data?.owners?.length > 0) {
      data?.owners.forEach(data => {
        data.gender = data?.gender?.code;
        // data.relationship = data?.relationship?.code;
        data.ownerType = data?.ownerType?.code;
      })
    };

    for (let i = 0; i < data?.tradedetils1?.tradeLicenseDetail?.owners?.length; i++) {
      let filteredArray = data?.owners?.filter(owner => owner.id === data?.tradedetils1?.tradeLicenseDetail?.owners[i]?.id);
      if (filteredArray?.length == 0) {
        let removedOwner = data?.tradedetils1?.tradeLicenseDetail?.owners[i];
        removedOwner.active = false;
        removedOwner.userActive = false;
        data?.owners.push(removedOwner);
        EDITRENEWAL = true;
      }
    }

    if (data?.tradeUnits?.length > 0) {
      data?.tradeUnits.forEach(data => {
          data.tradeType = data?.tradeSubType?.code || null,
          data.uom = data?.tradeSubType?.uom || null,
          data.uomValue = Number(data?.uomValue) || null
      });
    };

    for (let i = 0; i < data?.tradedetils1?.tradeLicenseDetail?.tradeUnits?.length; i++) {
      let filteredArray = data?.tradeUnits?.filter(unit => unit.id === data?.tradedetils1?.tradeLicenseDetail?.tradeUnits[i]?.id);
      if (filteredArray?.length == 0) {
        let removedUnit = data?.tradedetils1?.tradeLicenseDetail?.tradeUnits[i];
        removedUnit.active = false;
        data?.tradeUnits.push(removedUnit);
        EDITRENEWAL = true;
      }
    }

    let accessoriesFlag = false;
    if (data?.accessories?.length > 0) {
      if (data?.accessories?.length === 1 && !data?.accessories?.[0]?.accessoryCategory?.code ) accessoriesFlag = true;
      data?.accessories?.forEach(data => {
        const accessoryCategory1 = cloneDeep(data?.accessoryCategory);
        const accessoryCategory2 = cloneDeep(data?.accessoryCategory);
        data.accessoryCategory = accessoryCategory1?.code || null,
        data.uom = accessoryCategory2?.uom || null,
        data.count = Number(data?.count) || null,
        data.uomValue = Number(data?.uomValue) || null
      });
    };
    if(accessoriesFlag) data.accessories = null;

    data.address.city = data?.address?.city?.code || null;

    let applicationDocuments = data?.documents?.documents || [];
    let commencementDate = convertDateToEpoch(data?.tradedetils?.["0"]?.commencementDate);
    let financialYear = data?.tradedetils?.["0"]?.financialYear?.code;
    let gstNo = data?.tradedetils?.["0"]?.gstNo || "";
    let noOfEmployees = Number(data?.tradedetils?.["0"]?.noOfEmployees) || "";
    let operationalArea = Number(data?.tradedetils?.["0"]?.operationalArea) || "";
    let structureType = data?.tradedetils?.["0"]?.structureSubType?.code || "";
    let tradeName = data?.tradedetils?.["0"]?.tradeName || "";
    let subOwnerShipCategory = data?.ownershipCategory?.code || "";
    let licenseType = data?.tradedetils?.["0"]?.licenseType?.code || "PERMANENT";

    if (!EDITRENEWAL || sendBackToCitizen) {
      let formData = cloneDeep(data.tradedetils1);

      formData.action = sendBackToCitizen ? "RESUBMIT" : "INITIATE",
      formData.applicationType = sendBackToCitizen ? data?.tradedetils1?.applicationType :"RENEWAL",
      formData.workflowCode = sendBackToCitizen ? data?.tradedetils1?.workflowCode : "DIRECTRENEWAL",
      formData.commencementDate = commencementDate;
      formData.financialYear = financialYear;
      formData.licenseType = licenseType;
      formData.tenantId = tenantId;
      formData.tradeName = tradeName;

      if (gstNo) formData.tradeLicenseDetail.additionalDetail.gstNo = gstNo;
      if (noOfEmployees) formData.tradeLicenseDetail.noOfEmployees = noOfEmployees;
      if (operationalArea) formData.tradeLicenseDetail.operationalArea = operationalArea;
      if (data?.accessories?.length > 0) formData.tradeLicenseDetail.accessories = data?.accessories;
      if (data?.tradeUnits?.length > 0) formData.tradeLicenseDetail.tradeUnits = data?.tradeUnits;
      if (data?.owners?.length > 0) formData.tradeLicenseDetail.owners = data?.owners;
      if (data?.address) formData.tradeLicenseDetail.address = data?.address;
      if (structureType) formData.tradeLicenseDetail.structureType = structureType;
      if (subOwnerShipCategory) formData.tradeLicenseDetail.subOwnerShipCategory = subOwnerShipCategory;
    
      Digit.TLService.update({ Licenses: [formData] }, tenantId)
      .then((result, err) => {
        if (result?.Licenses?.length > 0) {
          if (result?.Licenses?.length > 0) {
            history.replace(
              `/digit-ui/employee/tl/response`,
              { data: result?.Licenses }
            );
          }
        }
      })
      .catch((e) => {
        setShowToast({ key: "error" });
        setError(e?.response?.data?.Errors[0]?.message || null);
      });

    } else {
      let formData = cloneDeep(data.tradedetils1);

      formData.action = "INITIATE",
      formData.applicationType = "RENEWAL",
      formData.workflowCode = "EDITRENEWAL",
      formData.commencementDate = commencementDate;
      formData.financialYear = financialYear;
      formData.licenseType = licenseType;
      formData.tenantId = tenantId;
      formData.tradeName = tradeName;

      if (gstNo) formData.tradeLicenseDetail.additionalDetail.gstNo = gstNo;
      if (noOfEmployees) formData.tradeLicenseDetail.noOfEmployees = noOfEmployees;
      if (operationalArea) formData.tradeLicenseDetail.operationalArea = operationalArea;
      if (data?.accessories?.length > 0) formData.tradeLicenseDetail.accessories = data?.accessories;
      if (data?.tradeUnits?.length > 0) formData.tradeLicenseDetail.tradeUnits = data?.tradeUnits;
      if (data?.owners?.length > 0) formData.tradeLicenseDetail.owners = data?.owners;
      if (data?.address) formData.tradeLicenseDetail.address = data?.address;
      if (structureType) formData.tradeLicenseDetail.structureType = structureType;
      if (subOwnerShipCategory) formData.tradeLicenseDetail.subOwnerShipCategory = subOwnerShipCategory;
      if (applicationDocuments) formData.tradeLicenseDetail.applicationDocuments = applicationDocuments;

      Digit.TLService.update({ Licenses: [formData] }, tenantId)
      .then((result, err) => {
        if (result?.Licenses?.length > 0) {
          let licenses = result?.Licenses?.[0];
          licenses.action = "APPLY";
          Digit.TLService.update({ Licenses: [licenses] }, tenantId).then((response) => {
            if (response?.Licenses?.length > 0) {
              history.replace(
                `/digit-ui/employee/tl/response`,
                { data: response?.Licenses }
              );
            }
          }).catch((e) => {
            setShowToast({ key: "error" });
            setError(e?.response?.data?.Errors[0]?.message || null);
          });
        }
      })
      .catch((e) => {
        setShowToast({ key: "error" });
        setError(e?.response?.data?.Errors[0]?.message || null);
      });
    }
  };

  let configs = [];
  newConfig.map(conf => {
    if (conf.head !== "ES_NEW_APPLICATION_PROPERTY_ASSESSMENT") {
      configs.push(conf);
    }
  });


  function checkHead(head) {
    if (head === "ES_NEW_APPLICATION_LOCATION_DETAILS") {
      return "TL_CHECK_ADDRESS"
    } else if (head === "ES_NEW_APPLICATION_OWNERSHIP_DETAILS") {
      return "TL_OWNERSHIP_DETAILS_HEADER"
    } else {
      return head
    }
  }

  return (
    <div>
      <div style={{marginLeft: "15px"}}>
        <Header>{window.location.href.includes("employee/tl/edit-application-details") ? t("ES_TITLE_RE_NEW_TRADE_LICESE_APPLICATION") : t("ES_TITLE_RENEW_TRADE_LICESE_APPLICATION")}</Header>
      </div>
      <FormComposer
        heading={""}
        isDisabled={!canSubmit}
        label={t("ES_COMMON_APPLICATION_SUBMIT")}
        config={configs.map((config) => {
          return {
            ...config,
            body: config.body.filter((a) => {
              return !a.hideInEmployee
            }),
            head: checkHead(config.head)
          };
        })}
        fieldStyle={{ marginRight: 0 }}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        onFormValueChange={onFormValueChange}
        breaklineStyle={{ border: "0px" }}
      />
      {showToast && <Toast error={showToast?.key === "error" ? true : false} label={error} onClose={closeToast} />}
    </div>

  );
};

export default ReNewApplication;
