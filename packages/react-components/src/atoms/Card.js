import React from "react";
import { useLocation } from "react-router-dom";

const Card = ({ className, onClick, style, children, className, ...props }) => {
  const { pathname } = useLocation();
  const classname = Digit.Hooks.fsm.useRouteSubscription(pathname);
  const info = Digit.UserService.getUser()?.info;
  const userType = info?.type;
  const isEmployee = classname === "employee" || userType === "EMPLOYEE";
  return (
    <div className={`${isEmployee ? "employeeCard" : "card"} ${className ? className : ""}`} onClick={onClick} style={style} {...props}>
      {children}
    </div>
  );
};

export default Card;
