import ReactDOM from "react-dom";
import html2canvas from "html2canvas";

const Download = {
  Image: (node, fileName) => {
    const saveAs = (uri, filename) => {
      const link = document.createElement("a");

      if (typeof link.download === "string") {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(uri);
      }
    };

    const element = ReactDOM.findDOMNode(node.current);
    html2canvas(element, {
      scrollY: -window.scrollY,
      useCORS: true,
    }).then((canvas) => {
      saveAs(canvas.toDataURL("image/jpeg", 1.0), `${fileName}.jpeg`);
    });
  },
};
export default Download;
