import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const makePDF = (elements: HTMLElement) => {
  html2canvas(elements).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'px', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, 400, 1000);
    pdf.save('download.pdf');
  });
};

export default makePDF;
