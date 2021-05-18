import React, { useRef, useState } from "react";
import { Ellipsis } from "./svgindex";

const Menu = ({ menu, displayKey, onSelect }) => (
  <div className="menu">
    {menu.map((item, index) => (
      <div className="item" onClick={() => onSelect(item)} key={index}>
        {item[displayKey]}
      </div>
    ))}
  </div>
);

const EllipsisMenu = ({ menuItems, displayKey, onSelect }) => {
  const menuRef = useRef();
  const [active, setActive] = useState(false);
  Digit.Hooks.useClickOutside(menuRef, () => setActive(false));

  function onItemSelect(item) {
    setActive(false);
    onSelect(item);
  }

  return (
    <div className="ellipsis-menu-wrap" ref={menuRef}>
      <Ellipsis onClick={() => setActive(true)} />
      {active ? <Menu menu={menuItems} displayKey={displayKey} onSelect={onItemSelect} /> : null}
    </div>
  );
};

export default EllipsisMenu;
