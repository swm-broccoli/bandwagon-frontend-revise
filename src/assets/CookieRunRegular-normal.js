﻿import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('CookieRun Regular-normal.ttf', font);
this.addFont('CookieRun Regular-normal.ttf', 'CookieRun Regular', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])