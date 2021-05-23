import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import * as func from "./Utils/Category";
import { FormComposer } from "../../components/FormComposer";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
const CreateChallen = ({ ChallanData }) => {
  console.log(ChallanData);
  debugger;
  const childRef = useRef();
  const history = useHistory();
  const { url } = useRouteMatch();
  let defaultval;
  let isEdit = false;
  console.log(url);
  debugger;
  if (url.includes("modify-challan")) {
    isEdit = true;
  }

  const { data: fetchBillData } = Digit.Hooks.useFetchBillsForBuissnessService({
    businessService: ChallanData[0].businessService,
    consumerCode: ChallanData[0].challanNo,
  });
  console.log(fetchBillData);
  debugger;

  const cities = Digit.Hooks.mcollect.usemcollectTenants();
  const getCities = () => cities?.filter((e) => e.code === Digit.ULBService.getCurrentTenantId()) || [];
  const { t } = useTranslation();
  const { data: fetchedLocalities } = Digit.Hooks.useBoundaryLocalities(
    getCities()[0]?.code,
    "admin",
    {
      enabled: !!getCities()[0],
    },
    t
  );

  const handlePincode = (event) => {
    const { value } = event.target;
    setPincode(value);
    if (!value) {
      setPincodeNotValid(false);
    }
  };

  const isPincodeValid = () => !pincodeNotValid;

  function selectLocality(locality) {
    console.log(locality);
    debugger;
    setSelectedLocality(locality);
  }

  function setcategories(category) {
    console.log(category);
    debugger;
    setSelectedcategories(category);
  }

  function ChangesetToDate(value) {
    if (new Date(fromDate) < new Date(value)) {
      setToDate(value);
    }
  }
  function setcategoriesType(categoryType) {
    console.log(categoryType);
    debugger;
    setselectedCategoryType(categoryType);
  }
  function humanize(str) {
    var frags = str.split("_");
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join("_");
  }
  const [canSubmit, setSubmitValve] = useState(true);
  const [localities, setLocalities] = useState(fetchedLocalities);
  const [categoires, setAPIcategories] = useState([]);
  const [categoiresType, setAPIcategoriesType] = useState([]);
  const [selectedCategory, setSelectedcategories] = useState(null);
  const [selectedCategoryType, setselectedCategoryType] = useState(null);
  const [TaxHeadMaster, setAPITaxHeadMaster] = useState([]);
  const [TaxHeadMasterFields, setTaxHeadMasterFields] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [pincodeNotValid, setPincodeNotValid] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const tenantId = window.Digit.SessionStorage.get("Employee.tenantId");
  const [pincode, setPincode] = useState("");
  const [selectedCity, setSelectedCity] = useState(getCities()[0] ? getCities()[0] : null);
  const selectCity = async (city) => {
    // if (selectedCity?.code !== city.code) {}
    return;
  };

  if (isEdit == true && fetchBillData && ChallanData) {
    defaultval = {
      name: fetchBillData.Bill[0].payerName,
      mobileNumber: fetchBillData.Bill[0].mobileNumber,
      doorNo: ChallanData[0].address.doorNo,
      buildingName: ChallanData[0].address.buildingName,
      street: ChallanData[0].address.street,
      pincode: ChallanData[0].address.pincode,
      //Mohalla : ChallanData[0].address.locality,
      locality: {
        code: "SUN13",
        i18nKey: `${ChallanData[0].tenantId.replaceAll(".", "_").toUpperCase()}_ADMIN_${ChallanData[0].address.locality.code}`,
        area: "A1",
        label: "Locality",
        ame: "Back Side Civil Courts Colony",
      },
      categoryType: "BILLINGSERVICE_BUSINESSSERVICE_ADVT_HOARDINGS",
    };
  }
  console.log(defaultval);
  debugger;

  useEffect(() => {
    setAPIcategoriesType(
      selectedCategory?.child
        ? selectedCategory.child.map((ele) => {
            ele.code = ele.code.includes("BILLINGSERVICE_BUSINESSSERVICE_")
              ? ele.code
              : "BILLINGSERVICE_BUSINESSSERVICE_" + ele.code.split(".").join("_").toUpperCase();
            return ele;
          })
        : []
    );
    setselectedCategoryType(null);
  }, [selectedCategory]);

  useEffect(() => {
    childRef.current.setValues({});
    setTaxHeadMasterFields(
      TaxHeadMaster.filter((ele) => {
        return (
          selectedCategoryType &&
          selectedCategoryType.code.split(selectedCategory.code + "_")[1] &&
          ele.service == selectedCategory.code + "." + humanize(selectedCategoryType.code.split(selectedCategory.code + "_")[1].toLowerCase())
        );
      })
    );
  }, [selectedCategoryType]);

  useEffect(() => {
    setLocalities(fetchedLocalities);
  }, [fetchedLocalities]);

  useEffect(() => {
    Digit.MDMSService.getPaymentRules(tenantId, "[?(@.type=='Adhoc')]").then((value) => {
      setAPIcategories(func.setServiceCategory(value.MdmsRes.BillingService.BusinessService));
      setAPITaxHeadMaster(value.MdmsRes.BillingService.TaxHeadMaster);
    });
  }, [tenantId]);

  useEffect(() => {
    if (selectedCategory && selectedCategoryType && fromDate != "" && toDate != "" && selectedLocality != null) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  }, [selectedCategory, selectedCategoryType, selectedLocality, fromDate, toDate]);

  useEffect(() => {
    const city = cities ? cities.find((obj) => obj.pincode?.find((item) => item == pincode)) : [];
    if (city?.code) {
      setPincodeNotValid(false);
      setSelectedCity(city);
      setSelectedLocality(null);
      const __localityList = fetchedLocalities;
      const __filteredLocalities = __localityList.filter((city) => city["pincode"] == pincode);
      setLocalities(__filteredLocalities);
    } else if (pincode === "" || pincode === null) {
      setPincodeNotValid(false);
      setLocalities(fetchedLocalities);
    } else {
      setPincodeNotValid(true);
    }
  }, [pincode]);

  const onSubmit = (data) => {
    TaxHeadMasterFields.map((ele) => {
      return { taxHeadCode: ele.code, amount: data[ele] };
    });
    const Challan = {
      citizen: {
        name: data.name,
        mobileNumber: data.mobileNumber,
      },
      businessService: selectedCategoryType
        ? selectedCategory.code + "." + humanize(selectedCategoryType.code.split(selectedCategory.code + "_")[1].toLowerCase())
        : "",
      consumerType: selectedCategory.code,
      description: data.comments,
      taxPeriodFrom: Date.parse(fromDate),
      taxPeriodTo: Date.parse(toDate),
      tenantId: tenantId,
      address: {
        buildingName: data.buildingName,
        doorNo: data.doorNo,
        street: data.street,
        locality: { code: selectedLocality.code },
      },
      amount: TaxHeadMasterFields.map((ele) => {
        return {
          taxHeadCode: ele.code,
          amount: data[ele.code.split(".").join("_").toUpperCase()] ? data[ele.code.split(".").join("_").toUpperCase()] : undefined,
        };
      }),
    };
    console.log(Challan);
    Digit.MCollectService.create({ Challan: Challan }, tenantId).then((result) => {
      if (result.challans && result.challans.length > 0) {
        const challan = result.challans[0];
        Digit.MCollectService.generateBill(challan.challanNo, tenantId, challan.businessService, "challan").then((response) => {
          if (response.Bill && response.Bill.length > 0) {
            history.push(
              `/digit-ui/employee/mcollect/acknowledgement?purpose=challan&status=success&tenantId=${tenantId}&billNumber=${response.Bill[0].billNumber}&serviceCategory=${response.Bill[0].businessService}&challanNumber=${response.Bill[0].consumerCode}`,
              { from: url }
            );
          }
        });
      }
    });
  };

  function setconfig() {
    const config = [
      {
        head: t("CONSUMERDETAILS"),
        body: [
          {
            label: t("UC_CONS_NAME_LABEL"),
            isMandatory: true,
            type: "text",
            populators: {
              name: "name",
              validation: {
                required: true,
                pattern: /^[A-Za-z]/,
              },
              error: t("CS_ADDCOMPLAINT_NAME_ERROR"),
            },
          },
          {
            label: t("UC_MOBILE_NO_LABEL"),
            isMandatory: true,
            type: "text",
            populators: {
              name: "mobileNumber",
              validation: {
                required: true,
                pattern: /^[6-9]\d{9}$/,
              },
              componentInFront: <div className="employee-card-input employee-card-input--front">+91</div>,
              error: t("CORE_COMMON_MOBILE_ERROR"),
            },
          },
          {
            label: t("UC_DOOR_NO_LABEL"),
            type: "text",
            populators: {
              name: "doorNo",
            },
          },
          {
            label: t("UC_BLDG_NAME_LABEL"),
            type: "text",
            populators: {
              name: "buildingName",
            },
          },
          {
            label: t("UC_SRT_NAME_LABEL"),
            type: "text",
            populators: {
              name: "street",
            },
          },
          {
            label: t("CORE_COMMON_PINCODE"),
            type: "text",
            populators: {
              name: "pincode",
              validation: { pattern: /^[1-9][0-9]{5}$/, validate: isPincodeValid },
              error: t("CORE_COMMON_PINCODE_INVALID"),
              onChange: handlePincode,
            },
          },
          {
            label: t("UC_MOHALLA_LABEL"),
            type: "dropdown",
            isMandatory: true,
            name: "Mohalla",
            dependency: localities ? true : false,
            populators: (
              <Dropdown isMandatory selected={selectedLocality} optionKey="i18nkey" id="locality" option={localities} select={selectLocality} t={t} />
            ),
          },
        ],
      },
      {
        head: t("SERVICEDETAILS"),
        body: [
          {
            label: t("TL_NEW_TRADE_DETAILS_CITY_LABEL"),
            isMandatory: true,
            type: "dropdown",
            name: "city",
            populators: (
              <Dropdown
                isMandatory
                selected={selectedCity}
                freeze={true}
                disable={true}
                option={getCities()}
                id="city"
                select={selectCity}
                optionKey="i18nKey"
                t={t}
              />
            ),
          },
          {
            label: t("UC_SERVICE_CATEGORY_LABEL"),
            type: "dropdown",
            isMandatory: true,
            name: "category",
            populators: (
              <Dropdown
                isMandatory
                selected={selectedCategory}
                optionKey="code"
                id="businessService"
                option={categoires}
                select={setcategories}
                t={t}
              />
            ),
          },
          {
            label: t("UC_SERVICE_TYPE_LABEL"),
            type: "dropdown",
            isMandatory: true,
            name: "categoryType",
            dependency: selectedCategory ? true : false,
            populators: (
              <Dropdown
                isMandatory
                selected={selectedCategoryType}
                optionKey="code"
                id="businessService"
                option={categoiresType}
                select={setcategoriesType}
                t={t}
              />
            ),
          },
          {
            label: t("UC_FROM_DATE_LABEL"),
            type: "date",
            name: "fromDate",
            isMandatory: true,
            populators: <DatePicker date={fromDate ? fromDate : ""} onChange={setFromDate} />,
          },
          {
            label: t("UC_TO_DATE_LABEL"),
            type: "date",
            name: "toDate",
            disable: fromDate == "" ? true : false,
            isMandatory: true,
            dependency: fromDate ? true : false,
            populators: <DatePicker date={toDate ? toDate : ""} min={fromDate} onChange={ChangesetToDate} />,
          },
          {
            label: t("UC_COMMENT_LABEL"),
            isMandatory: false,
            type: "textarea",
            populators: {
              name: "comments",
              validation: {
                required: false,
              },
            },
          },
        ],
      },
    ];
    if (TaxHeadMasterFields.length > 0 && config.length > 0) {
      const tempConfig = config;
      if (config[1].head == "Service Details") {
        const temp = TaxHeadMasterFields.map((ele) => ({
          label: t(ele.name.split(".").join("_")),
          isMandatory: ele.isRequired,
          type: "text",
          populators: {
            name: ele.name.split(".").join("_"),
            validation: { required: ele.isRequired, pattern: /^(0|[1-9][0-9]*)$/ },
            error: t("CORE_COMMON_FIELD_ERROR"),
          },
        }));
        console.log(temp);
        debugger;
        if (temp.length > 0) {
          tempConfig[1].body = [...tempConfig[1].body, ...temp];
        }
      }
      console.log(tempConfig);
      return tempConfig;
    } else {
      return config;
    }
  }

  return (
    <FormComposer
      ref={childRef}
      heading={t("UC_COMMON_HEADER")}
      config={setconfig()}
      onSubmit={onSubmit}
      setFormData={defaultval}
      isDisabled={!canSubmit}
      label={t("UC_ECHALLAN")}
    />
  );
};
export default CreateChallen;
