import React, { useRef, useState } from "react";
import { Ellipsis } from "./svgindex";

const Menu = ({ menu, displayKey, onSelect }) => (
  <div className="menu">
    {menu.map((item) => (
      <div className="item" onClick={() => onSelect(item)}>
        {" "}
        {item[displayKey]}{" "}
      </div>
    ))}
  </div>
);

const EllipsisMenu = ({ menuItems, displayKey, onSelect }) => {
  const menuRef = useRef();
  const [active, setActive] = useState(false);
  Digit.Hooks.useClickOutside(menuRef, () => setActive(false));

  return (
    <div className="ellipsis-menu-wrap" ref={menuRef}>
      <Ellipsis onClick={() => setActive(true)} />
      {active ? <Menu menu={menuItems} displayKey={displayKey} onSelect={onSelect} /> : null}
    </div>
  );
};

export default EllipsisMenu;
