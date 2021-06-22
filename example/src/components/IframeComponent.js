import React from "react";

function html() {
  return { __html: '<iframe src="./example.html" height="100%" width="100%" /> ' };
}

const IframeComponent = () => {
  return <div style={{ height: "100vw" }} dangerouslySetInnerHTML={html()}></div>;
};

export default IframeComponent;
