// src/utils/pdfUtils.js
import jsPDF from "jspdf"
import amiriFont from "@/assets/fonts/Amiri-Regular-normal"

jsPDF.API.events.push([
  'addFonts',
  function () {
    this.addFileToVFS('Amiri-Regular.ttf', amiriFont)
    this.addFont('Amiri-Regular.ttf', 'Amiri', 'normal')
  }
])
