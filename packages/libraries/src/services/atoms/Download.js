import ReactDOM from "react-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

  PDF: (node, fileName) => {
    const getPDF = (canvas) => {
      const width = canvas.width;
      const height = canvas.height;
      const o = width > height ? "l" : "p";
      const format = "a4";

      return new jsPDF(o, "mm", format);
    };

    const element = ReactDOM.findDOMNode(node.current);
    html2canvas(element, {
      scrollY: -window.scrollY,
      useCORS: true,
    }).then((canvas) => {
      const pdf = getPDF(canvas);
      const pngImage = canvas.toDataURL("image/png", 1.0);
      // console.log("pngImage", pngImage, canvas.width, canvas.height)
      const imageWidth = canvas.width > canvas.height ? 297 : 210;
      const imageHeight = canvas.width < canvas.height ? 297 : 210;
      pdf.addImage(pngImage, "PNG", 0, 0, imageWidth, imageHeight);
      pdf.save(`${fileName}.pdf`);
    });
  },
};
export default Download;
