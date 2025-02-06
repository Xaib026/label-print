import '../src/css/main.css'
import { 
  generateCanvas, clearCanvas, headerToggle, printCanvas,
   handleFile 
  } from './operations.js'

document.querySelector('#app').innerHTML = `
  <header class="relative">
    <nav class="flex items-end gap-4 p-4 px-6 w-fit mx-auto">
      <div>
        <label class="text-xs text-gray-500">No. of Cells</label>
        <input type="text" id="no-of-cells" class="block border w-28 h-10 px-2" >
      </div>
      <div>
        <label class="text-xs text-gray-500">Cells Width (mm)</label>
        <input type="text" id="no-of-cols" class="block border w-28 h-10 px-2" >
      </div>
      <div>
        <label class="text-xs text-gray-500">Cells Height (mm)</label>
        <input type="text" id="no-of-rows" class="block border w-28 h-10 px-2" >
      </div>
      <div>
        <label class="text-xs text-gray-500">Paper Width (in)</label>
        <input type="text" id="paper-width" class="block border w-28 h-10 px-2" >
      </div>
      <div>
        <label class="text-xs text-gray-500">Paper height (in)</label>
        <input type="text" id="paper-height" class="block border w-28 h-10 px-2" >
      </div>
      <div>
        <button id="save_btn" class="bg-black text-white px-4 py-2 rounded-md hover:bg-slate-800 disabled:bg-gray-300">Create</button>
        <button id="clear_btn" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 hidden">Clear</button>
      </div>
    </nav>
    <button class="absolute top-full -mt-2 left-6 bg-white text-black px-4 py-1 rounded-md" id="header-toggle"><i class="fa-solid fa-chevron-up"></i></button>
  </header>
  <section class="w-full h-full bg-gray-50 overflow-auto p-5" id="mainBody">
    <div class="w-fit mx-auto">
      <div class="canvas border hidden p-4" id="canvasBody">
        <div class="flex flex-wrap"></div>
      </div>
    </div>
    <span id="preloader" class="hidden absolute inset-0 m-auto w-10 h-10 rounded-full border-4 border-black border-l-transparent animate-spin opacity-50 "></span>
    <div class="flex flex-col gap-2 fixed bottom-6 right-6">
      <input type="file" class="hidden" id="upload_excel_file" accept=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
      <button id="upload_btn" class="bg-green-500 text-white text-xl px-5 py-4 rounded-full hover:bg-green-600 transition-all disabled:hidden disabled:bottom-16"><i class="fa-solid fa-file-import"></i></button>
      <button id="print_btn" class="bg-black text-white text-xl px-5 py-4 rounded-full hover:bg-slate-800 transition-all disabled:hidden disabled:bottom-0"><i class="fa-solid fa-print"></i></button>
    </div>
  </section>
`

// document.querySelector('#app').innerHTML = `
// <input type="file" class="hidden" id="upload_excel_file">
// <button id="upload_btn" class="fixed bottom-24 -mb-1 right-6 bg-green-500 text-white text-xl px-5 py-4 rounded-full hover:bg-green-600 transition-all disabled:hidden disabled:bottom-16"><i class="fa-solid fa-file-import"></i></button>`

document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.querySelector('#save_btn');
  const clearButtton = document.querySelector('#clear_btn');
  if (saveButton) {
    generateCanvas(saveButton);
  }
  if (clearButtton) {
    clearButtton.addEventListener('click', () => {
      clearCanvas();
    })
  }
  headerToggle(document.querySelector('#header-toggle'))
});


printCanvas(document.querySelector("#print_btn"))
const fileInput = document.querySelector("#upload_excel_file")
document.querySelector("#upload_btn").addEventListener('click', () => {
  fileInput.click();
})

fileInput.addEventListener('change', handleFile)