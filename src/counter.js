// export function setupCounter(element) {
//   let counter = 0
//   const setCounter = (count) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }

export function headerToggle(element) {
  
  element.addEventListener('click', () => {
    document.querySelector('header nav').classList.toggle('hidden');
    element.querySelector('i').classList.toggle('fa-rotate-180');
  })
}

// export function generateCanvas(button){ 
//   button.addEventListener('click',()=>{
//    const paperWidth = document.querySelector('#paper-width').value
//    const paperHeight = document.querySelector('#paper-height').value
//    const noOfCells = document.querySelector('#no-of-cells').value
//    const noOfRows = document.querySelector('#no-of-rows').value 
//    const noOfCols = document.querySelector('#no-of-cols').value
//    console.log(paperWidth, paperHeight, noOfRows, noOfCols)
//    document.querySelector('#canvasBody').style.width = `${paperWidth}in`
//    document.querySelector('#canvasBody').style.height = `${paperHeight}in`
//    document.querySelector('#canvasBody .flex').innerHTML = ''
//    for (let i = 0; i < noOfCells; i++) {
//      document.querySelector('#canvasBody .flex').innerHTML += `<span class="inline-block border p-1" style="width:${noOfCols}in;height:${noOfRows}in"></span>`
//    }
//   })
// }

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
            <link href="./src/css/main.css" rel="stylesheet">
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