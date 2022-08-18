import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const makePDF = (elements: HTMLElement) => {
  html2canvas(elements).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      elements.clientWidth,
      elements.clientHeight,
    );
    pdf.save('portfolio.pdf');
  });
};

export default makePDF;
