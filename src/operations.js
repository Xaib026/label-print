
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs";

export const css = new URL('../src/css/main.css', import.meta.url).href;
export function headerToggle(element) {
  
  element.addEventListener('click', () => {
    document.querySelector('header nav').classList.toggle('hidden');
    element.querySelector('i').classList.toggle('fa-rotate-180');
  })
}



export function generateCanvas(button) {
  button.addEventListener('click', () => {
    const paperWidth = getInputValue('#paper-width');
    const paperHeight = getInputValue('#paper-height');
    const noOfCells = getInputValue('#no-of-cells');
    const cellWidth = getInputValue('#no-of-cols');
    const cellHeight = getInputValue('#no-of-rows');

    let isValid = true;
    
    function validateAndToggle(selector, value) {
      const input = document.querySelector(selector);
      if (!validateInputs(value)) {
        input.classList.add('border-red-500');
        if (isValid) input.focus();
        isValid = false;
      } else {
          input.classList.remove('border-red-500');
      }
    }

    validateAndToggle('#no-of-cells', noOfCells);
    validateAndToggle('#no-of-rows', cellHeight);
    validateAndToggle('#no-of-cols', cellWidth);
    validateAndToggle('#paper-width', paperWidth);
    validateAndToggle('#paper-height', paperHeight);

    if (!isValid) return;

    const canvasBody = document.querySelector('#canvasBody');
    if (canvasBody) {
      canvasBody.classList.remove('hidden');
      canvasBody.style.width = `${paperWidth}in`;
      canvasBody.style.height = `${paperHeight}in`;
      
      const flexContainer = canvasBody.querySelector('.flex');
      if (flexContainer) {
        flexContainer.innerHTML = generateCellsHTML(noOfCells, cellWidth, cellHeight);
        document.querySelector("#print_btn").disabled = false;
        document.querySelector("#upload_btn").disabled = false;
      }
      document.querySelector("#clear_btn").classList.remove('hidden');
    }
  });
}

export function clearCanvas() {

  document.querySelector("#print_btn").disabled = true;
  document.querySelector("#upload_btn").disabled = true;
  document.querySelector("#canvasBody").classList.add('hidden');
  document.querySelector("#clear_btn").classList.add('hidden');
  document.querySelector('#canvasBody .flex').innerHTML = '';

  // Reset input values
  document.querySelector('#paper-width').value = '';
  document.querySelector('#paper-height').value = '';
  document.querySelector('#no-of-cells').value = '';
  document.querySelector('#no-of-cells').focus();
  document.querySelector('#no-of-cols').value = '';
  document.querySelector('#no-of-rows').value = '';

}

function getInputValue(selector) {
  const element = document.querySelector(selector);
  return element ? element.value : null;
}

function validateInputs(...values) {
  return values.every(value => value !== null && value !== '' && !isNaN(value) && value > 0);
}

function generateCellsHTML(noOfCells, cellWidth, cellHeight) {
  const cellHTML = `<span class="inline-flex items-center justify-center border p-1" contenteditable style="width:${cellWidth}mm;height:${cellHeight}mm"></span>`;
  return cellHTML.repeat(noOfCells);
}


export function printCanvas(element) {
  const printContent = document.querySelector("#canvasBody .flex");
  
  if (document.querySelector("#canvasBody.hidden")) {
    element.disabled = true;
    document.querySelector("#upload_btn").disabled = true;
  }

  element.addEventListener('click', () => {
    
    // Create a new window
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Print</title>
            <link href="${css}" rel="stylesheet">
        </head>
        <body class="p-6 bg-white">
            ${printContent.outerHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
    
    // Wait for the styles to load and print
    printWindow.onload = function () {
      printWindow.print();
      printWindow.close();
    };
  })
}


export function handleFile(e) {
  const fileInput = e.target;
  const file = fileInput.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  // Preloader for load the file if in case it takes too long
  document.querySelector("#preloader").classList.remove('hidden');

  reader.onload = function(event) {
    try {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const ws = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const noOfCells1 = parseInt(document.querySelector('#no-of-cells').value, 10);
      const cells = document.querySelectorAll("#canvasBody > .flex > span");

      for (let i = 0; i < noOfCells1; i++) {
        if (!jsonData[i]) break;
        if (cells[i]) {
          cells[i].innerText = jsonData[i].join(', ');
        }
      }

      document.querySelector("#preloader").classList.add('hidden');
    } catch (error) {
      console.error("Error parsing file:", error);
      alert("There was an error processing the file. Please ensure it is a valid Excel file.");
    }
    fileInput.value = "";
  };

  reader.onerror = function(err) {
    console.error("Error reading file:", err);
    alert("Failed to read file. Please try again.");
    fileInput.value = "";
  };
}