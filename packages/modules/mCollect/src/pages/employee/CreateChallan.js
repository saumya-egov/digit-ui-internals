import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import * as func from "./Utils/Category";
import { FormComposer } from "../../../../pgr/src/components/FormComposer";
import TaxForm from "../../components/TaxForm";
const CreateChallen = ({ parentUrl }) => {
  const cities = Digit.Hooks.pgr.useTenants();
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

  function setcategoriesType(categoryType) {
    setselectedCategoryType(categoryType);
  }
  const [canSubmit, setSubmitValve] = useState(false);
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
  const dispatch = useDispatch();

  const [pincode, setPincode] = useState("");
  const [selectedCity, setSelectedCity] = useState(getCities()[0] ? getCities()[0] : null);
  const selectCity = async (city) => {
    // if (selectedCity?.code !== city.code) {}
    return;
  };

  function onChange() {}
  useEffect(() => {
    setAPIcategoriesType(selectedCategory?.child ? selectedCategory.child : []);
  }, [selectedCategory]);

  useEffect(() => {
    setTaxHeadMasterFields(
      TaxHeadMaster.filter((ele) => {
        return ele.service == selectedCategoryType.code;
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
    console.log(data);
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
          label: t("UC_BLDG_NAME_LABEL"),
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
          label: t("UC_SRT_NAME_LABEL"),
          isMandatory: true,
          type: "text",
          populators: {
            name: "Street Name",
            validation: {
              required: true,
              pattern: /^[A-Za-z]/,
            },
            error: t("CS_ADDCOMPLAINT_NAME_ERROR"),
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
          populators: (
            <Dropdown
              isMandatory
              selected={selectedCity}
              freeze={true}
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
          populators: <DatePicker date={fromDate} onChange={setFromDate} />,
        },
        {
          label: t("UC_TO_DATE_LABEL"),
          type: "date",
          dependency: fromDate ? true : false,
          populators: <DatePicker date={toDate} onChange={setToDate} />,
        },
        {
          isMandatory: false,
          type: "custom",
          populators: <TaxForm data={TaxHeadMasterFields} />,
        },
        {
          label: t("UC_COMMENT_LABEL"),
          isMandatory: false,
          type: "textarea",
          populators: {
            name: "name",
            validation: {
              required: false,
            },
          },
        },
      ],
    },
  ];

  return <FormComposer heading={t("UC_COMMON_HEADER")} config={config} onSubmit={onSubmit} isDisabled={canSubmit} label={t("UC_ECHALLAN")} />;
};
export default CreateChallen;
