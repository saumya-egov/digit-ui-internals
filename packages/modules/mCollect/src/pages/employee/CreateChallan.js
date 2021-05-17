import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import * as func from "./Utils/Category";
import { FormComposer } from "../../components/FormComposer";
import TaxForm from "../../components/TaxForm";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
const CreateChallen = ({ parentUrl }) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const childRef = useRef();
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
    setSelectedLocality(locality);
  }

  function setcategories(category) {
    setSelectedcategories(category);
  }

  function ChangesetToDate(value) {
    if (new Date(fromDate) < new Date(value)) {
      setToDate(value);
    }
  }
  function setcategoriesType(categoryType) {
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

  useEffect(() => {
    setAPIcategoriesType(
      selectedCategory?.child
        ? selectedCategory.child.map((ele) => {
            ele.code = "BILLINGSERVICE_BUSINESSSERVICE_" + ele.code.split(".").join("_").toUpperCase();
            return ele;
          })
        : []
    );
  }, [selectedCategory]);

  useEffect(() => {
    setTaxHeadMasterFields(
      TaxHeadMaster.filter((ele) => {
        return ele.service == selectedCategory.code + "." + humanize(selectedCategoryType.code.split(selectedCategory.code + "_")[1].toLowerCase());
      })
    );
  }, [selectedCategoryType]);

  useEffect(() => {
    setLocalities(fetchedLocalities);
  }, [fetchedLocalities]);

  useEffect(() => {
    Digit.MDMSService.getPaymentRules(tenantId).then((value) => {
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
    const Challan = {
      citizen: {
        name: data.name,
        mobileNumber: data.mobileNumber,
      },
      businessService: selectedCategory.code + "." + humanize(selectedCategoryType.code.split(selectedCategory.code + "_")[1].toLowerCase()),
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
      amount: childRef.current.submit(),
    };
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
          isMandatory: false,
          type: "custom",
          populators: <TaxForm ref={childRef} data={TaxHeadMasterFields} />,
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

  return <FormComposer heading={t("UC_COMMON_HEADER")} config={config} onSubmit={onSubmit} isDisabled={!canSubmit} label={t("UC_ECHALLAN")} />;
};
export default CreateChallen;
