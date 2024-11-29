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

    if (!validateInputs(paperWidth, paperHeight, noOfCells, cellWidth, cellHeight)) {
      console.error('Invalid input values');
      return;
    }

    const canvasBody = document.querySelector('#canvasBody');
    if (canvasBody) {
      canvasBody.classList.remove('hidden');
      canvasBody.style.width = `${paperWidth}in`;
      canvasBody.style.height = `${paperHeight}in`;
      
      const flexContainer = canvasBody.querySelector('.flex');
      if (flexContainer) {
        flexContainer.innerHTML = generateCellsHTML(noOfCells, cellWidth, cellHeight);
        document.querySelector("#print_btn").disabled = false;
      }
    }
  });
}

function getInputValue(selector) {
  const element = document.querySelector(selector);
  return element ? element.value : null;
}

function validateInputs(...values) {
  return values.every(value => value !== null && value !== '' && !isNaN(value) && value > 0);
}

function generateCellsHTML(noOfCells, cellWidth, cellHeight) {
  const cellHTML = `<span class="inline-block border p-1" contenteditable style="width:${cellWidth}in;height:${cellHeight}in"></span>`;
  return cellHTML.repeat(noOfCells);
}


export function printCanvas(element) {
  const printContent = document.querySelector("#canvasBody .flex");
  
  if (document.querySelector("#canvasBody.hidden")) {
    element.disabled = true;;
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