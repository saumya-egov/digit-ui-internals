import React, { useState, useEffect } from "react";
import { FormComposer, Dropdown, Loader } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import MyComponent from "../../../../../../react-components/src/atoms/MyComponent";

const Login = ({ config: propsConfig, t }) => {
  const { data: cities, isLoading } = Digit.Hooks.useTenants();
  const [user, setUser] = useState(null);
  const history = useHistory();
  const getUserType = () => Digit.UserService.getType();

  useEffect(() => {
    if (!user) {
      return;
    }
    Digit.UserService.setUser(user);
    const redirectPath = location.state?.from || "/digit-ui/employee";
    history.replace(redirectPath);
  }, [user]);

  const onLogin = async (data) => {
    if (!data.city) {
      alert("Please Select City!");
      return;
    }
    const requestData = {
      ...data,
      userType: getUserType(),
    };
    requestData.tenantId = data.city.code;
    delete requestData.city;
    try {
      const { UserRequest: info, ...tokens } = await Digit.UserService.authenticate(requestData);
      setUser({ info, ...tokens });
    } catch (err) {
      console.log({ err });
      alert(err?.response?.data?.error_description || "Invalid login credentials!");
    }
  };

  const onForgotPassword = () => {
    history.push("/digit-ui/employee/forgot-password");
  };

  console.log({ propsConfig });
  const [userId, password, city] = propsConfig.inputs;
  const config = [
    {
      body: [
        {
          label: t(userId.label),
          type: userId.type,
          populators: {
            name: userId.name,
          },
          isMandatory: true,
        },
        {
          label: t(password.label),
          type: password.type,
          populators: {
            name: password.name,
          },
          isMandatory: true,
        },
        {
          label: t(city.label),
          type: city.type,
          populators: {
            name: city.name,
            customProps: {},
            component: (props, customProps) => (
              <Dropdown
                option={cities}
                optionKey="i18nKey"
                select={(d) => {
                  props.onChange(d);
                }}
                {...customProps}
              />
            ),
          },
          isMandatory: true,
        },
      ],
    },
  ];

  return isLoading ? (
    <Loader />
  ) : (
    <FormComposer
      onSubmit={onLogin}
      noBoxShadow
      inline
      submitInForm
      config={config}
      label={propsConfig.texts.submitButtonLabel}
      secondaryActionLabel={propsConfig.texts.secondaryButtonLabel}
      onSecondayActionClick={onForgotPassword}
      heading={propsConfig.texts.header}
      headingStyle={{ textAlign: "center" }}
      cardStyle={{ maxWidth: "400px", margin: "auto", padding: "10px 0" }}
    />
  );
};
// Hariom
const languageData = [
  {
    id: 1,
    language: "ਪੰਜਾਬੀ",
  },
  {
    id: 2,
    language: "हिंदी",
  },
  {
    id: 3,
    language: "English",
  },
];

export const NewComponent = () => {
  return (
    <MyComponent 
      Image ="https://s3-alpha-sig.figma.com/img/670b/d21b/e76b5e9cb68c786f9deb34c8d893da73?Expires=1627257600&Signature=ASwsZacLUZcyn3ELeJQ4bhCN6Ce5mOBUxFSu4eNidBQhKQ6BhV7GxpZgY-ibQH9nhNfgjRnFu2eDE1HBIMvg5vgraqhKMDSfhibiF4hLtf1MY78TbLSV~Rc4WLGer8YPrubhhEt~erORzEVISxdTlHU6WVA1myW3CezKYrgs5POOz1aMjiPE5btlS1X~vBPtZycYqz9E4Mo~JgEB6Npm3zgaok~TcdLIib7iMVFTmMChaQ-aSVs17mYzz~XJT8Nx62NhTTBPg1fOQKj4kYNwF~BBkO7Mb1GBwf0H5e8r~LjNVBKuhuzh~8oFaQTQ58TyujqjeAKJzsb1vMtVMkBwxA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
      alt="mGramSeva Img"
      Line ="|"
      State = "Punjab"
      languageData ={languageData}
      continueBtn = "Continue"
     />
  );
};

// Hariom

Login.propTypes = {
  loginParams: PropTypes.any,
};

Login.defaultProps = {
  loginParams: null,
};

export default Login;
