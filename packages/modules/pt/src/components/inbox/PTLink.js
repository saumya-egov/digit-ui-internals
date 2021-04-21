import { Card, PropertyHouse } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PTLink = ({ parentRoute }) => {
  const { t } = useTranslation();

  const allLinks = [
    {
      text: t("ES_TITLE_NEW_REGISTRATION"),
      link: "/digit-ui/employee/pt/new-application",
    },
    {
      text: t("ES_TITILE_SEARCH_APPLICATION"),
      link: `${parentRoute}/search`,
    },
  ];

  const [links, setLinks] = useState([]);

  const { roles } = Digit.UserService.getUser().info;

  const hasAccess = (accessTo) => {
    return roles.filter((role) => accessTo.includes(role.code)).length;
  };

  useEffect(() => {
    let linksToShow = [];
    allLinks.forEach((link) => {
      if (link.accessTo) {
        if (hasAccess(link.accessTo)) {
          linksToShow.push(link);
        }
      } else {
        linksToShow.push(link);
      }
    });
    setLinks(linksToShow);
  }, []);

  const GetLogo = () => (
    <div className="header">
      <span className="logo">
        <PropertyHouse />
      </span>{" "}
      <span className="text">{t("ES_TITLE_PROPERTY_TAX")}</span>
    </div>
  );

  return (
    <Card style={{ paddingRight: 0, marginTop: 0 }} className="employeeCard filter">
      <div className="complaint-links-container">
        {GetLogo()}
        <div className="body">
          {links.map(({ link, text, hyperlink = false, accessTo = [] }, index) => {
            return (
              <span className="link" key={index}>
                {hyperlink ? <a href={link}>{text}</a> : <Link to={link}>{text}</Link>}
              </span>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default PTLink;
