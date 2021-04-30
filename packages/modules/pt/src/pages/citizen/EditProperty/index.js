// import React from "react";
import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { newConfig } from "../../../config/Create/config";
import CheckPage from "../Create/CheckPage";
import PTAcknowledgement from "../Create/PTAcknowledgement";
import { stringReplaceAll } from "../../../utils";

const getPropertyEditDetails = (data = {}) => {
  // converting owners details
  //debugger;
  console.log("inside");
  console.log(data);

  if (data?.ownershipCategory === "INSTITUTIONALPRIVATE" || data?.ownershipCategory === "INSTITUTIONALGOVERNMENT") {
    let document = [];
    if (data?.owners[0]?.documents[0]?.documentType.includes("IDENTITYPROOF")) {
      data.owners[0].documents[0].documentType = {
        code: data?.owners[0]?.documents[0].documentType,
        i18nKey: stringReplaceAll(data?.owners[0]?.documents[0].documentType, ".", "_"),
      };
      document["proofIdentity"] = data?.owners[0]?.documents[0];
    }
    (data.owners[0].designation = data?.institution?.designation),
      (data.owners[0].inistitutionName = data?.institution?.name),
      (data.owners[0].name = data?.institution?.nameOfAuthorizedPerson),
      (data.owners[0].inistitutetype = { value: data?.institution.type, code: data?.institution.type }),
      (data.owners[0].documents = document);
    data.owners[0].permanentAddress = data?.owners[0]?.correspondenceAddress;
    data.owners[0].isCorrespondenceAddress = data?.owners[0]?.isCorrespondenceAddress;
  } else {
    data.owners.map((owner) => {
      let document = [];
      owner.documents &&
        owner.documents.map((doc) => {
          if (doc.documentType && typeof doc.documentType == "string" && doc.documentType.includes("SPECIALCATEGORYPROOF")) {
            doc.documentType = { code: doc.documentType, i18nKey: stringReplaceAll(doc.documentType, ".", "_") };
            document["specialProofIdentity"] = doc;
          }
          if (doc.documentType && typeof doc.documentType == "string" && doc.documentType.includes("IDENTITYPROOF")) {
            doc.documentType = { code: doc.documentType, i18nKey: stringReplaceAll(doc.documentType, ".", "_") };
            document["proofIdentity"] = doc;
          }
        });
      owner.emailId = owner?.emailId;
      owner.fatherOrHusbandName = owner?.fatherOrHusbandName;
      owner.isCorrespondenceAddress = owner?.isCorrespondenceAddress;
      owner.mobileNumber = owner?.mobileNumber;
      owner.name = owner?.name;
      owner.permanentAddress = owner?.permanentAddress;
      owner.gender = { code: owner?.gender };
      owner.ownerType = { code: owner?.ownerType };
      owner.relationship = { code: owner?.relationship };
      owner.documents = document;
    });
  }
  //converting ownershipCategory
  data.ownershipCategory = { code: data?.ownershipCategory, value: data?.ownershipCategory };

  //converting address details
  if (data?.address?.geoLocation?.latitude && data?.address?.geoLocation?.longitude) {
    data.address.geoLocation = {
      latitude: data?.address?.geoLocation?.latitude,
      longitude: data?.address?.geoLocation?.longitude,
    };
  } else {
    data.address.geoLocation = {};
  }
  data.address.pincode = data?.address?.pincode;
  let addressDocs = data?.documents?.filter((doc) => doc.documentType.includes("ADDRESSPROOF"));
  addressDocs[0].documentType = { code: addressDocs[0].documentType, i18nKey: stringReplaceAll(addressDocs[0].documentType, ".", "_") };
  if (data?.address?.documents) {
    data.address.documents["ProofOfAddress"] = addressDocs[0];
  } else {
    data.address.documents = [];
    data.address.documents["ProofOfAddress"] = addressDocs && Array.isArray(addressDocs) && addressDocs.length > 0 && addressDocs[0];
  }
  data.documents["ProofOfAddress"] = addressDocs && Array.isArray(addressDocs) && addressDocs.length > 0 && addressDocs[0];

  const getunitobjectforInd = (data, ob, flrno) => {
    let totbuiltarea = 0;
    let selfoccupiedtf = false,
      rentedtf = false,
      unoccupiedtf = false;
    ob["plotSize"] = `${data?.landArea}`;
    data?.units &&
      data?.units.map((unit1, index) => {
        if (unit1?.floorNo == flrno && unit1?.occupancyType === "RENTED") {
          rentedtf = true;
          ob["AnnualRent"] = `${unit1.arv}` || "";
          ob["RentArea"] = `${unit1?.constructionDetail?.builtUpArea}`;
          totbuiltarea = totbuiltarea + parseInt(unit1?.constructionDetail?.builtUpArea);
        } else if (unit1?.floorNo == flrno && unit1?.occupancyType === "UNOCCUPIED") {
          unoccupiedtf = true;
          ob["UnOccupiedArea"] = `${unit1?.constructionDetail?.builtUpArea}`;
          totbuiltarea = totbuiltarea + parseInt(unit1?.constructionDetail?.builtUpArea);
        } else if (unit1?.floorNo == flrno && unit1?.occupancyType === "SELFOCCUPIED") {
          selfoccupiedtf = true;
          ob["floorarea"] = `${unit1?.constructionDetail?.builtUpArea}`;
          totbuiltarea = totbuiltarea + parseInt(unit1?.constructionDetail?.builtUpArea);
        }
        ob["SubUsageTypeOfRentedArea"] =
          unit1?.floorNo == flrno
            ? {
                i18nKey: `COMMON_PROPSUBUSGTYPE_${(
                  unit1.usageCategory.split(".")[0] +
                  `_${unit1.usageCategory.split(".")[1]}` +
                  `_${unit1.usageCategory.split(".").pop()}`
                ).replaceAll(".", "_")}`,

                Subusagetypeofrentedareacode: unit1.usageCategory,
              }
            : "";
        ob["SubUsageType"] = {
          i18nKey:
            unit1?.floorNo == flrno
              ? `COMMON_PROPSUBUSGTYPE_${(
                  unit1.usageCategory.split(".")[0] +
                  `_${unit1.usageCategory.split(".")[1]}` +
                  `_${unit1.usageCategory.split(".").pop()}`
                ).replaceAll(".", "_")}`
              : "",
        };
      });
    ob["selfOccupied"] =
      rentedtf == true
        ? selfoccupiedtf == true
          ? { i18nKey: "PT_PARTIALLY_RENTED_OUT", code: "RENTED" }
          : {
              i18nKey: "PT_FULLY_RENTED_OUT",
              code: "RENTED",
            }
        : {
            i18nKey: "PT_YES_IT_IS_SELFOCCUPIED",
            code: "SELFOCCUPIED",
          };
    ob["IsAnyPartOfThisFloorUnOccupied"] =
      unoccupiedtf == true ? { i18nKey: "PT_COMMON_YES", code: "UNOCCUPIED" } : { i18nKey: "PT_COMMON_NO", code: "UNOCCUPIED" };
    ob["builtUpArea"] = `${totbuiltarea}`;

    return ob;
  };
  // asessment details
  if (data?.channel === "CFC_COUNTER") {
    if (data?.propertyType === "VACANT") {
      console.log("vacant");
      data.PropertyType = { code: data?.propertyType, i18nKey: `COMMON_PROPTYPE_${data.propertyType}` };
      data.isResdential =
        data?.usageCategory === "RESIDENTIAL"
          ? { code: "RESIDENTIAL", i18nKey: "PT_COMMON_YES" }
          : { code: "NONRESIDENTIAL", i18nKey: "PT_COMMON_NO" };
      data.usageCategoryMajor = { code: data?.usageCategory, i18nKey: `PROPERTYTAX_BILLING_SLAB_${data?.usageCategory?.split(".").pop()}` };
      data.landarea = { floorarea: data?.landArea };
    } else if (data?.propertyType === "BUILTUP.SHAREDPROPERTY") {
      let selfoccupiedtf = false,
        rentedtf = false,
        unoccupiedtf = false;
      data.isResdential =
        data?.usageCategory === "RESIDENTIAL"
          ? { code: "RESIDENTIAL", i18nKey: "PT_COMMON_YES" }
          : { code: "NONRESIDENTIAL", i18nKey: "PT_COMMON_NO" };
      data.usageCategoryMajor = { code: data?.usageCategory, i18nKey: `PROPERTYTAX_BILLING_SLAB_${data?.usageCategory?.split(".").pop()}` };
      data.PropertyType = { code: data?.propertyType, i18nKey: `COMMON_PROPTYPE_BUILTUP_${data.propertyType.split(".").pop()}` };
      data.Floorno =
        data?.units[0]?.floorNo < 0
          ? { i18nKey: `PROPERTYTAX_FLOOR__${data?.units[0]?.floorNo * -1}` }
          : { i18nKey: `PROPERTYTAX_FLOOR_${data?.units[0]?.floorNo}` };
      data.Subusagetypeofrentedarea = {
        SubUsageTypeOfRentedArea: {
          i18nKey: `COMMON_PROPSUBUSGTYPE_${data?.units[0]?.usageCategory
            .slice(0, data?.units[0]?.usageCategory.lastIndexOf("."))
            .replaceAll(".", "_")}`,
        },
        Subusagetypeofrentedareacode: data?.units[0]?.usageCategory,
      };
      data.subusagetype = {
        SubUsageType: {
          i18nKey: `COMMON_PROPSUBUSGTYPE_${data?.units[0]?.usageCategory
            .slice(0, data?.units[0]?.usageCategory.lastIndexOf("."))
            .replaceAll(".", "_")}`,
        },
      };
      data?.units &&
        data?.units.map((unit, index) => {
          if (unit?.occupancyType === "RENTED") {
            rentedtf = true;
            data.Constructiondetails = { RentArea: unit?.constructionDetail?.builtUpArea, AnnualRent: unit?.arv };
          } else if (unit?.occupancyType === "UNOCCUPIED") {
            unoccupiedtf = true;
            data.UnOccupiedArea = { UnOccupiedArea: unit?.constructionDetail?.builtUpArea };
          } else if (unit?.occupancyType === "SELFOCCUPIED") {
            selfoccupiedtf = true;
            data.landarea = { floorarea: unit?.constructionDetail?.builtUpArea };
          }
        });
      data.selfOccupied =
        rentedtf == true
          ? selfoccupiedtf == true
            ? { i18nKey: "PT_PARTIALLY_RENTED_OUT", code: "RENTED" }
            : {
                i18nKey: "PT_FULLY_RENTED_OUT",
                code: "RENTED",
              }
          : {
              i18nKey: "PT_YES_IT_IS_SELFOCCUPIED",
              code: "SELFOCCUPIED",
            };
      data.IsAnyPartOfThisFloorUnOccupied =
        unoccupiedtf == true ? { i18nKey: "PT_COMMON_YES", code: "UNOCCUPIED" } : { i18nKey: "PT_COMMON_NO", code: "UNOCCUPIED" };
      data.floordetails = { plotSize: 1000, builtUpArea: data?.superBuiltUpArea };
    } else if (data?.propertyType === "BUILTUP.INDEPENDENTPROPERTY") {
      console.log("inside independent property");
      let nooffloor = 0,
        noofbasemement = 0;
      let floornumbers = [];
      data.isResdential =
        data?.usageCategory === "RESIDENTIAL"
          ? { code: "RESIDENTIAL", i18nKey: "PT_COMMON_YES" }
          : { code: "NONRESIDENTIAL", i18nKey: "PT_COMMON_NO" };
      data.usageCategoryMajor = { code: data?.usageCategory, i18nKey: `PROPERTYTAX_BILLING_SLAB_${data?.usageCategory?.split(".").pop()}` };
      data.PropertyType = { code: data?.propertyType, i18nKey: `COMMON_PROPTYPE_BUILTUP_${data.propertyType.split(".").pop()}` };
      data?.units &&
        data?.units.map((unit, index) => {
          floornumbers.push(unit.floorNo);
          /* if (unit.floorNo === 0 || unit.floorNo === 1 || unit.floorNo === 2) {
            debugger;
            nooffloor = nooffloor + 1;
          } else if (unit.floorNo === -1 || unit.floorNo === -2) {
            debugger;
            noofbasemement = noofbasemement + 1;
          } */
        });
      data.noOfFloors = floornumbers.includes(2)
        ? { i18nKey: "PT_GROUND_PLUS_TWO_OPTION", code: 2 }
        : floornumbers.includes(1)
        ? { i18nKey: "PT_GROUND_PLUS_ONE_OPTION", code: 1 }
        : { i18nKey: "PT_GROUND_FLOOR_OPTION", code: 0 };
      data.noOofBasements = floornumbers.includes(-2)
        ? { i18nKey: "PT_TWO_BASEMENT_OPTION" }
        : floornumbers.includes(-1)
        ? { i18nKey: "PT_ONE_BASEMENT_OPTION" }
        : { i18nKey: "PT_NO_BASEMENT_OPTION" };
      //debugger;
      //console.log(data);
      //let unitedit = new Array(nooffloor + noofbasemement).fill({});
      let unitedit = [];
      let ob = {};
      let flooradded = [];
      let flrno;
      let totbuiltarea = 0;
      //console.log("unitedit");
      //console.log(unitedit);
      data?.units &&
        data?.units.map((unit, index) => {
          ob = {};
          totbuiltarea = 0;
          let selfoccupiedtf = false,
            rentedtf = false,
            unoccupiedtf = false;
          if (unit.floorNo == 0) {
            flrno = unit.floorNo;
            ob = getunitobjectforInd(data, ob, flrno);
            /* ob["plotSize"] = `${data?.landArea}`;
            data?.units && 
              data?.units.map((unit1, index) => {
                if (unit1?.occupancyType === "RENTED") {
                  rentedtf = true;
                  ob["AnnualRent"] = `${unit1.arv}` || "";
                  ob["RentArea"] = `${unit1?.constructionDetail?.builtUpArea}`;
                  totbuiltarea = totbuiltarea + parseInt(unit1?.constructionDetail?.builtUpArea);
                } else if (unit1?.occupancyType === "UNOCCUPIED") {
                  unoccupiedtf = true;
                  ob["UnOccupiedArea"] = `${unit1?.constructionDetail?.builtUpArea}`;
                  totbuiltarea = totbuiltarea + parseInt(unit1?.constructionDetail?.builtUpArea);
                } else if (unit1?.occupancyType === "SELFOCCUPIED") {
                  selfoccupiedtf = true;
                  ob["floorarea"] = `${unit1?.constructionDetail?.builtUpArea}`;
                  totbuiltarea = totbuiltarea + parseInt(unit1?.constructionDetail?.builtUpArea);
                }
                ob["SubUsageTypeOfRentedArea"] = {
                    i18nKey: `COMMON_PROPSUBUSGTYPE_${(unit1.usageCategory
                      .split(".")[0]+`_${unit1.usageCategory.split(".")[1]}`+`_${(unit1.usageCategory.split(".").pop())}`)
                      .replaceAll(".", "_")}`,
                  
                  Subusagetypeofrentedareacode: unit1.usageCategory,
                };
                ob["SubUsageType"] = {
                    i18nKey: `COMMON_PROPSUBUSGTYPE_${(unit1.usageCategory
                      .split(".")[0]+`_${unit1.usageCategory.split(".")[1]}`+`_${(unit1.usageCategory.split(".").pop())}`)
                      .replaceAll(".", "_")}`,
                  
                };
                
              });
            ob["selfOccupied"] =
              rentedtf == true
                ? selfoccupiedtf == true
                  ? { i18nKey: "PT_PARTIALLY_RENTED_OUT", code: "RENTED" }
                  : {
                      i18nKey: "PT_FULLY_RENTED_OUT",
                      code: "RENTED",
                    }
                : {
                    i18nKey: "PT_YES_IT_IS_SELFOCCUPIED",
                    code: "SELFOCCUPIED",
                  };
            ob["IsAnyPartOfThisFloorUnOccupied"] =
              unoccupiedtf == true ? { i18nKey: "PT_COMMON_YES", code: "UNOCCUPIED" } : { i18nKey: "PT_COMMON_NO", code: "UNOCCUPIED" };
              ob["builtUpArea"] = `${totbuiltarea}`; */
          } else if (unit.floorNo == 1) {
            flrno = unit.floorNo;
            ob = getunitobjectforInd(data, ob, flrno);
            /*unit.plotSize = data?.landArea;
            data?.units &&
              data?.units.map((unit1, index) => {
                if (unit1?.occupancyType === "RENTED") {
                  rentedtf = true;
                  unit.AnnualRent = unit1.arv || "";
                  unit.RentArea = unit1?.constructionDetail?.builtUpArea;
                } else if (unit1?.occupancyType === "UNOCCUPIED") {
                  unoccupiedtf = true;
                  unit.UnOccupiedArea = unit1.constructionDetail?.builtUpArea;
                } else if (unit1?.occupancyType === "SELFOCCUPIED") {
                  selfoccupiedtf = true;
                  unit.floorarea = unit1?.builtUpArea;
                }
                data.Subusagetypeofrentedarea = {
                  SubUsageTypeOfRentedArea: {
                    i18nKey: `COMMON_PROPSUBUSGTYPE_${unit1.usageCategory
                      .slice(0, data?.units[0]?.usageCategory.lastIndexOf("."))
                      .replaceAll(".", "_")}`,
                  },
                  Subusagetypeofrentedareacode: unit1.usageCategory,
                };
                data.subusagetype = {
                  SubUsageType: {
                    i18nKey: `COMMON_PROPSUBUSGTYPE_${unit1.usageCategory
                      .slice(0, data?.units[0]?.usageCategory.lastIndexOf("."))
                      .replaceAll(".", "_")}`,
                  },
                };
              });
            unit.selfOccupied =
              rentedtf == true
                ? selfoccupiedtf == true
                  ? { i18nKey: "PT_PARTIALLY_RENTED_OUT", code: "RENTED" }
                  : {
                      i18nKey: "PT_FULLY_RENTED_OUT",
                      code: "RENTED",
                    }
                : {
                    i18nKey: "PT_YES_IT_IS_SELFOCCUPIED",
                    code: "SELFOCCUPIED",
                  };
            data.IsAnyPartOfThisFloorUnOccupied =
              unoccupiedtf == true ? { i18nKey: "PT_COMMON_YES", code: "UNOCCUPIED" } : { i18nKey: "PT_COMMON_NO", code: "UNOCCUPIED" };*/
          } /*else if (unit.floorNo == 2) {
            unit.plotSize = data?.landArea;
            data?.units &&
              data?.units.map((unit1, index) => {
                if (unit1?.occupancyType === "RENTED") {
                  rentedtf = true;
                  unit.AnnualRent = unit1.arv || "";
                  unit.RentArea = unit1?.constructionDetail?.builtUpArea;
                } else if (unit1?.occupancyType === "UNOCCUPIED") {
                  unoccupiedtf = true;
                  unit.UnOccupiedArea = unit1.constructionDetail?.builtUpArea;
                } else if (unit1?.occupancyType === "SELFOCCUPIED") {
                  selfoccupiedtf = true;
                  unit.floorarea = unit1?.builtUpArea;
                }
                unit.Subusagetypeofrentedarea = {
                  SubUsageTypeOfRentedArea: {
                    i18nKey: `COMMON_PROPSUBUSGTYPE_${unit1.usageCategory
                      .slice(0, data?.units[0]?.usageCategory.lastIndexOf("."))
                      .replaceAll(".", "_")}`,
                  },
                  Subusagetypeofrentedareacode: unit1.usageCategory,
                };
                unit.subusagetype = {
                  SubUsageType: {
                    i18nKey: `COMMON_PROPSUBUSGTYPE_${unit1.usageCategory
                      .slice(0, data?.units[0]?.usageCategory.lastIndexOf("."))
                      .replaceAll(".", "_")}`,
                  },
                };
              });
            unit.selfOccupied =
              rentedtf == true
                ? selfoccupiedtf == true
                  ? { i18nKey: "PT_PARTIALLY_RENTED_OUT", code: "RENTED" }
                  : {
                      i18nKey: "PT_FULLY_RENTED_OUT",
                      code: "RENTED",
                    }
                : {
                    i18nKey: "PT_YES_IT_IS_SELFOCCUPIED",
                    code: "SELFOCCUPIED",
                  };
            unit.IsAnyPartOfThisFloorUnOccupied =
              unoccupiedtf == true ? { i18nKey: "PT_COMMON_YES", code: "UNOCCUPIED" } : { i18nKey: "PT_COMMON_NO", code: "UNOCCUPIED" };
          }
          unitedit.push(unit);*/
          console.log("ob");
          console.log(ob);
          !flooradded.includes(unit.floorNo) ? unitedit.push(ob) : console.log("skipping push");
          flooradded.push(flrno);
        });
      console.log("unitedit");
      console.log(unitedit);
      data.units = unitedit;
    }
  } else {
    if (data?.additionalDetails?.propertyType?.code === "VACANT") {
      data.PropertyType = data?.additionalDetails?.propertyType;
      data.isResdential = data?.additionalDetails?.isResdential;
      data.usageCategoryMajor = { code: data?.usageCategory, i18nKey: `PROPERTYTAX_BILLING_SLAB_${data?.usageCategory?.split(".").pop()}` };
      data.landarea = { floorarea: data?.landArea };
    } else if (data?.additionalDetails?.propertyType?.code === "BUILTUP.SHAREDPROPERTY") {
      data.isResdential = data?.additionalDetails?.isResdential;
      data.usageCategoryMajor = { code: data?.usageCategory, i18nKey: `PROPERTYTAX_BILLING_SLAB_${data?.usageCategory?.split(".").pop()}` };
      data.PropertyType = data?.additionalDetails?.propertyType;
      data.Floorno =
        data?.units[0]?.floorNo < 0
          ? { i18nKey: `PROPERTYTAX_FLOOR__${data?.units[0]?.floorNo * -1}` }
          : { i18nKey: `PROPERTYTAX_FLOOR_${data?.units[0]?.floorNo}` };
      data.selfOccupied = data?.additionalDetails?.selfOccupied;
      data.Subusagetypeofrentedarea = data?.additionalDetails?.Subusagetypeofrentedarea;
      data.subusagetype = data?.additionalDetails?.subusagetype;
      data.IsAnyPartOfThisFloorUnOccupied = data?.additionalDetails?.IsAnyPartOfThisFloorUnOccupied;
      data?.units &&
        data?.units.map((unit, index) => {
          if (unit?.occupancyType === "RENTED") {
            data.Constructiondetails = { RentArea: unit?.constructionDetail?.builtUpArea, AnnualRent: unit?.arv };
          } else if (unit?.occupancyType === "UNOCCUPIED") {
            data.UnOccupiedArea = { UnOccupiedArea: unit?.constructionDetail?.builtUpArea };
          } else if (unit?.occupancyType === "SELFOCCUPIED") {
            data.landarea = { floorarea: unit?.constructionDetail?.builtUpArea };
          }
        });
      data.floordetails = { plotSize: data?.landArea, builtUpArea: data?.additionalDetails?.builtUpArea };
    } else if (data?.additionalDetails?.propertyType?.code === "BUILTUP.INDEPENDENTPROPERTY") {
      data.isResdential = data?.additionalDetails?.isResdential;
      data.usageCategoryMajor = { code: data?.usageCategory, i18nKey: `PROPERTYTAX_BILLING_SLAB_${data?.usageCategory?.split(".").pop()}` };
      data.PropertyType = data?.additionalDetails?.propertyType;
      data.noOfFloors = data?.additionalDetails?.noOfFloors;
      data.noOofBasements = data?.additionalDetails?.noOofBasements;
      data.units = data?.additionalDetails?.unit;
      data.units[0].selfOccupied = data?.additionalDetails?.unit[0]?.selfOccupied;
      data.units["-1"] = data?.additionalDetails?.basement1;
      data.units["-2"] = data?.additionalDetails?.basement2;
    }
  }
  console.log(data);
  return data;
};
const EditProperty = ({ parentRoute }) => {
  const queryClient = useQueryClient();
  const match = useRouteMatch();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const history = useHistory();
  let config = [];
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_PROPERTY", {});
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const acknowledgementIds = window.location.href.split("/").pop();
  const propertyIds = window.location.href.split("/").pop();
  let application = {};
  const typeOfProperty = window.location.href.includes("update=true");
  /* const { isLoading, isError, error, data } = Digit.Hooks.pt.usePropertySearch(tenantId, {
    filters: typeOfProperty ? { propertyIds } : { acknowledgementIds },
  }); */
  sessionStorage.setItem("isEditApplication", false);
  let data = {};
  useEffect(() => {
    data = {
      Properties: [
        {
          id: "ff891c02-3aa0-4a7f-9e09-615547a61ba6",
          propertyId: "PB-PT-2021-04-29-016354",
          surveyId: null,
          linkedProperties: null,
          tenantId: "pb.amritsar",
          accountId: "7830332f-0f39-4ab0-b239-8af4e6cf126a",
          oldPropertyId: null,
          status: "INWORKFLOW",
          address: {
            tenantId: "pb.amritsar",
            doorNo: null,
            plotNo: null,
            id: "6dca595d-de1c-444b-840f-af0fd83a8cc0",
            landmark: null,
            city: "Amritsar",
            district: null,
            region: null,
            state: null,
            country: null,
            pincode: null,
            buildingName: null,
            street: null,
            locality: {
              code: "SUN04",
              name: "Ajit Nagar - Area1",
              label: "Locality",
              latitude: null,
              longitude: null,
              area: "Area1",
              children: [],
              materializedPath: null,
            },
            geoLocation: {
              latitude: null,
              longitude: null,
            },
            additionalDetails: null,
          },
          acknowldgementNumber: "PB-AC-2021-04-29-016131",
          propertyType: "BUILTUP.INDEPENDENTPROPERTY",
          ownershipCategory: "INDIVIDUAL.SINGLEOWNER",
          owners: [
            {
              id: 22772,
              uuid: "89275e09-5129-4a66-bfa3-638935c4aebb",
              userName: "401fbff1-1541-4a58-9898-2462ef2e3c4f",
              password: null,
              salutation: null,
              name: "abc",
              gender: "Male",
              mobileNumber: "9876543210",
              emailId: null,
              altContactNumber: null,
              pan: null,
              aadhaarNumber: null,
              permanentAddress: "Ajit Nagar - Area1, amritsar",
              permanentCity: null,
              permanentPinCode: null,
              correspondenceCity: null,
              correspondencePinCode: null,
              correspondenceAddress: null,
              active: true,
              dob: null,
              pwdExpiryDate: null,
              locale: null,
              type: "CITIZEN",
              signature: null,
              accountLocked: null,
              roles: [
                {
                  id: null,
                  name: "Citizen",
                  code: "CITIZEN",
                  tenantId: null,
                },
              ],
              fatherOrHusbandName: "def",
              bloodGroup: null,
              identificationMark: null,
              photo: null,
              createdBy: "7830332f-0f39-4ab0-b239-8af4e6cf126a",
              createdDate: 1619688414986,
              lastModifiedBy: "7830332f-0f39-4ab0-b239-8af4e6cf126a",
              lastModifiedDate: 1619688414986,
              tenantId: "pb.amritsar",
              ownerInfoUuid: "815bc198-446d-4f82-b329-9bf5edcafa4e",
              isPrimaryOwner: null,
              ownerShipPercentage: null,
              ownerType: "NONE",
              institutionId: null,
              status: "ACTIVE",
              documents: null,
              relationship: "FATHER",
            },
          ],
          institution: null,
          creationReason: "CREATE",
          usageCategory: "NONRESIDENTIAL.COMMERCIAL",
          noOfFloors: 5,
          landArea: 1100,
          superBuiltUpArea: null,
          source: "MUNICIPAL_RECORDS",
          channel: "CFC_COUNTER",
          documents: [
            {
              id: "4594857d-e70e-4b19-acfe-4f9f9f3fa015",
              documentType: "OWNER.ADDRESSPROOF.ELECTRICITYBILL",
              fileStoreId: "a1d354a2-bf7a-4e3f-acf0-175fa0c9e42f",
              documentUid: "a1d354a2-bf7a-4e3f-acf0-175fa0c9e42f",
              auditDetails: null,
              status: "ACTIVE",
            },
            {
              id: "865c6473-3005-4efd-afd7-572acb40a1e3",
              documentType: "OWNER.IDENTITYPROOF.AADHAAR",
              fileStoreId: "f0389a1b-b975-4790-ad14-1943e36747e2",
              documentUid: "f0389a1b-b975-4790-ad14-1943e36747e2",
              auditDetails: null,
              status: "ACTIVE",
            },
            {
              id: "e9e610db-f297-437e-901a-14d9eed8c426",
              documentType: "OWNER.REGISTRATIONPROOF.COURTDECREE",
              fileStoreId: "1ceaba35-056b-4567-876a-58859544bb91",
              documentUid: "1ceaba35-056b-4567-876a-58859544bb91",
              auditDetails: null,
              status: "ACTIVE",
            },
            {
              id: "761a7f5e-c6ea-4e8a-ad63-03336913bb5f",
              documentType: "OWNER.USAGEPROOF.TRADELICENCE",
              fileStoreId: "753816e7-452d-4686-b8ac-8396f2eae319",
              documentUid: "753816e7-452d-4686-b8ac-8396f2eae319",
              auditDetails: null,
              status: "ACTIVE",
            },
            {
              id: "de9ba0b0-d0f9-4a79-87b1-a95800f43c41",
              documentType: "OWNER.CONSTRUCTIONPROOF.BPACERTIFICATE",
              fileStoreId: "59eda26c-7c63-4526-84f8-8c6a0c5633b1",
              documentUid: "59eda26c-7c63-4526-84f8-8c6a0c5633b1",
              auditDetails: null,
              status: "ACTIVE",
            },
            {
              id: "90497467-d3f7-4f15-9d2f-a6ce6214c9fc",
              documentType: "OWNER.OCCUPANCYPROOF.RENTAGREEMENT",
              fileStoreId: "b7682ea5-760f-4bbe-b48c-db69ca85a8ae",
              documentUid: "b7682ea5-760f-4bbe-b48c-db69ca85a8ae",
              auditDetails: null,
              status: "ACTIVE",
            },
          ],
          units: [
            {
              id: "d4f6a969-0257-45f8-8110-bf88c3855939",
              tenantId: "pb.amritsar",
              floorNo: 0,
              unitType: "ACRESTAURANT",
              usageCategory: "NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.ACRESTAURANT",
              occupancyType: "SELFOCCUPIED",
              active: true,
              occupancyDate: null,
              constructionDetail: {
                carpetArea: null,
                builtUpArea: 25.56,
                plinthArea: null,
                superBuiltUpArea: null,
                constructionType: null,
                constructionDate: null,
                dimensions: null,
              },
              additionalDetails: null,
              auditDetails: null,
              arv: null,
            },
            {
              id: "c523b946-aeab-408c-89c3-72c88498a1a0",
              tenantId: "pb.amritsar",
              floorNo: 1,
              unitType: "ACRESTAURANT",
              usageCategory: "NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.ACRESTAURANT",
              occupancyType: "SELFOCCUPIED",
              active: true,
              occupancyDate: null,
              constructionDetail: {
                carpetArea: null,
                builtUpArea: 11.67,
                plinthArea: null,
                superBuiltUpArea: null,
                constructionType: null,
                constructionDate: null,
                dimensions: null,
              },
              additionalDetails: null,
              auditDetails: null,
              arv: null,
            },
            {
              id: "416a45b1-1dbe-41ef-b89f-2a644440e927",
              tenantId: "pb.amritsar",
              floorNo: 7,
              unitType: "ACRESTAURANT",
              usageCategory: "NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.ACRESTAURANT",
              occupancyType: "RENTED",
              active: true,
              occupancyDate: null,
              constructionDetail: {
                carpetArea: null,
                builtUpArea: 13.33,
                plinthArea: null,
                superBuiltUpArea: null,
                constructionType: null,
                constructionDate: null,
                dimensions: null,
              },
              additionalDetails: null,
              auditDetails: null,
              arv: 1200,
            },
            {
              id: "cea4d169-844e-499c-92eb-857bc2215248",
              tenantId: "pb.amritsar",
              floorNo: -1,
              unitType: "ACRESTAURANT",
              usageCategory: "NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.ACRESTAURANT",
              occupancyType: "SELFOCCUPIED",
              active: true,
              occupancyDate: null,
              constructionDetail: {
                carpetArea: null,
                builtUpArea: 12.22,
                plinthArea: null,
                superBuiltUpArea: null,
                constructionType: null,
                constructionDate: null,
                dimensions: null,
              },
              additionalDetails: null,
              auditDetails: null,
              arv: null,
            },
            {
              id: "721857e6-2d3e-4657-af5d-ad61b5d43c9a",
              tenantId: "pb.amritsar",
              floorNo: -2,
              unitType: "ACRESTAURANT",
              usageCategory: "NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.ACRESTAURANT",
              occupancyType: "SELFOCCUPIED",
              active: true,
              occupancyDate: null,
              constructionDetail: {
                carpetArea: null,
                builtUpArea: 13.33,
                plinthArea: null,
                superBuiltUpArea: null,
                constructionType: null,
                constructionDate: null,
                dimensions: null,
              },
              additionalDetails: null,
              auditDetails: null,
              arv: null,
            },
            {
              id: "62e6cb6c-de65-4d84-9e38-52543e9cfcd3",
              tenantId: "pb.amritsar",
              floorNo: 0,
              unitType: "ACRESTAURANT",
              usageCategory: "NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.ACRESTAURANT",
              occupancyType: "SELFOCCUPIED",
              active: true,
              occupancyDate: null,
              constructionDetail: {
                carpetArea: null,
                builtUpArea: 25.56,
                plinthArea: null,
                superBuiltUpArea: null,
                constructionType: null,
                constructionDate: null,
                dimensions: null,
              },
              additionalDetails: null,
              auditDetails: null,
              arv: null,
            },
            {
              id: "dc579372-92d8-4df9-aba2-5d68aadb7014",
              tenantId: "pb.amritsar",
              floorNo: 0,
              unitType: "ACRESTAURANT",
              usageCategory: "NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.ACRESTAURANT",
              occupancyType: "UNOCCUPIED",
              active: true,
              occupancyDate: null,
              constructionDetail: {
                carpetArea: null,
                builtUpArea: 25.56,
                plinthArea: null,
                superBuiltUpArea: null,
                constructionType: null,
                constructionDate: null,
                dimensions: null,
              },
              additionalDetails: null,
              auditDetails: null,
              arv: null,
            },
            {
              id: "2581845f-2b81-4f91-b34b-9a618f74d99a",
              tenantId: "pb.amritsar",
              floorNo: -1,
              unitType: "ACRESTAURANT",
              usageCategory: "NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.ACRESTAURANT",
              occupancyType: "RENTED",
              active: true,
              occupancyDate: null,
              constructionDetail: {
                carpetArea: null,
                builtUpArea: 13.33,
                plinthArea: null,
                superBuiltUpArea: null,
                constructionType: null,
                constructionDate: null,
                dimensions: null,
              },
              additionalDetails: null,
              auditDetails: null,
              arv: 12000,
            },
          ],
          additionalDetails: null,
          auditDetails: {
            createdBy: "7830332f-0f39-4ab0-b239-8af4e6cf126a",
            lastModifiedBy: "7830332f-0f39-4ab0-b239-8af4e6cf126a",
            createdTime: 1619688414779,
            lastModifiedTime: 1619688414779,
          },
          workflow: null,
        },
      ],
    };
    console.log(data.Properties[0]);
    application = data?.Properties[0];
    if (data && application) {
      application = data?.Properties[0];
      if (typeOfProperty) {
        application.isUpdateProperty = true;
        application.isEditProperty = false;
      } else {
        application.isUpdateProperty = false;
        application.isEditProperty = true;
      }
      let propertyEditDetails = getPropertyEditDetails(application);
      setParams({ ...params, ...propertyEditDetails });
    }
  }, [data]);

  // const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_PROPERTY", application);

  const goNext = (skipStep, index, isAddMultiple, key) => {
    let currentPath = pathname.split("/").pop(),
      lastchar = currentPath.charAt(currentPath.length - 1),
      isMultiple = false,
      nextPage;
    if (Number(parseInt(currentPath)) || currentPath == "0" || currentPath == "-1") {
      if (currentPath == "-1" || currentPath == "-2") {
        currentPath = pathname.slice(0, -3);
        currentPath = currentPath.split("/").pop();
        isMultiple = true;
      } else {
        currentPath = pathname.slice(0, -2);
        currentPath = currentPath.split("/").pop();
        isMultiple = true;
      }
    } else {
      isMultiple = false;
    }
    if (!isNaN(lastchar)) {
      isMultiple = true;
    }
    let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
    if (typeof nextStep == "object" && nextStep != null && isMultiple != false) {
      if (nextStep[sessionStorage.getItem("ownershipCategory")]) {
        nextStep = `${nextStep[sessionStorage.getItem("ownershipCategory")]}/${index}`;
      } else if (nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]) {
        if (`${nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]}` === "un-occupied-area") {
          nextStep = `${nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]}/${index}`;
        } else {
          nextStep = `${nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]}`;
        }
      } else if (nextStep[sessionStorage.getItem("subusagetypevar")]) {
        nextStep = `${nextStep[sessionStorage.getItem("subusagetypevar")]}/${index}`;
      } else if (nextStep[sessionStorage.getItem("area")]) {
        // nextStep = `${nextStep[sessionStorage.getItem("area")]}/${index}`;

        if (`${nextStep[sessionStorage.getItem("area")]}` !== "map") {
          nextStep = `${nextStep[sessionStorage.getItem("area")]}/${index}`;
        } else {
          nextStep = `${nextStep[sessionStorage.getItem("area")]}`;
        }
      } else if (nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]) {
        nextStep = `${nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]}/${index}`;
      } else {
        nextStep = `${nextStep[sessionStorage.getItem("noOofBasements")]}/${index}`;
        //nextStep = `${"floordetails"}/${index}`;
      }
    }
    if (typeof nextStep == "object" && nextStep != null && isMultiple == false) {
      if (nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]) {
        nextStep = `${nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]}`;
      } else if (nextStep[sessionStorage.getItem("subusagetypevar")]) {
        nextStep = `${nextStep[sessionStorage.getItem("subusagetypevar")]}`;
      } else if (nextStep[sessionStorage.getItem("area")]) {
        nextStep = `${nextStep[sessionStorage.getItem("area")]}`;
      } else if (nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]) {
        nextStep = `${nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]}`;
      } else if (nextStep[sessionStorage.getItem("PropertyType")]) {
        nextStep = `${nextStep[sessionStorage.getItem("PropertyType")]}`;
      } else if (nextStep[sessionStorage.getItem("isResdential")]) {
        nextStep = `${nextStep[sessionStorage.getItem("isResdential")]}`;
      }
    }
    /* if (nextStep === "is-this-floor-self-occupied") {
      isMultiple = false;
    } */
    let redirectWithHistory = history.push;
    if (skipStep) {
      redirectWithHistory = history.replace;
    }
    if (isAddMultiple) {
      nextStep = key;
    }
    if (nextStep === null) {
      return redirectWithHistory(`${match.path}/check`);
    }
    if (!isNaN(nextStep.split("/").pop())) {
      nextPage = `${match.path}/${nextStep}`;
    } else {
      nextPage = isMultiple && nextStep !== "map" ? `${match.path}/${nextStep}/${index}` : `${match.path}/${nextStep}`;
    }

    redirectWithHistory(nextPage);
  };

  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };

  function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
    if (key === "owners") {
      let owners = params.owners || [];
      owners[index] = data;
      setParams({ ...params, ...{ [key]: [...owners] } });
    } else if (key === "units") {
      let units = params.units || [];
      units[index] = data;
      setParams({ ...params, units });
    } else {
      setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
    }
    goNext(skipStep, index, isAddMultiple, key);
  }

  const handleSkip = () => {};
  const handleMultiple = () => {};

  const onSuccess = () => {
    clearParams();
    queryClient.invalidateQueries("PT_CREATE_PROPERTY");
  };
  newConfig.forEach((obj) => {
    config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  });
  config.indexRoute = `isResidential`;

  return (
    <Switch>
      {config.map((routeObj, index) => {
        const { component, texts, inputs, key } = routeObj;
        const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
        return (
          <Route path={`${match.path}/${routeObj.route}`} key={index}>
            <Component config={{ texts, inputs, key }} onSelect={handleSelect} onSkip={handleSkip} t={t} formData={params} onAdd={handleMultiple} />
          </Route>
        );
      })}
      <Route path={`${match.path}/check`}>
        <CheckPage onSubmit={createProperty} value={params} />
      </Route>
      <Route path={`${match.path}/acknowledgement`}>
        <PTAcknowledgement data={params} onSuccess={onSuccess} />
      </Route>
      <Route>
        <Redirect to={`${match.path}/${config.indexRoute}`} />
      </Route>
    </Switch>
  );
};

export default EditProperty;
