import React from "react";
import CitizenApp from "./pages/citizen";
import EmployeeApp from "./pages/employee";
import { Link, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PTCard from "./components/PTCard";

export const PTModule = ({ userType }) => {
  const { path, url } = useRouteMatch();

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  }
};

export const PTLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();

  if (userType === "citizen") {
    return <React.Fragment>Citizen</React.Fragment>;
  } else {
    return (
      <div className="employee-app-container">
        <div className="ground-container">
          <div className="employeeCard">
            <div className="complaint-links-container">
              <div className="header">
                <span className="logo">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"
                      fill="white"
                    ></path>
                  </svg>
                </span>
                <span className="text">{t("ES_TITLE_FSM")}</span>
              </div>
              <div className="body">
                <span className="link">
                  <Link to={`${matchPath}/inbox`}>{t("ES_TITLE_INBOX")}</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const PTComponents = {
  PTCard,
  PTModule,
  PTLinks,
};
