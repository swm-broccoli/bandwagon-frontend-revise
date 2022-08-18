import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactDOM from 'react-dom';

const makePDF = (elements: HTMLElement) => {
  /*html2canvas(elements).then((canvas) => {
    const imgData = canvas.toDataURL();
    const pdf = new jsPDF();
    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight(),
    );
    pdf.save(`portfolio-${Date.now()}.pdf`);
  });*/
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.html(elements, { margin: 10, html2canvas: { scale: 1.0 } }).then(() => {
    pdf.save(`portfolio-${Date.now()}.pdf`);
  });
};

export default makePDF;
