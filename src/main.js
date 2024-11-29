import '../src/css/main.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { generateCanvas, headerToggle, printCanvas } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1 class="text-3xl text-center text-blue-700">
//       Hello world Tailwind!
//     </h1>
//     <h2 class="text-lg text-red-500">New test</h2>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

document.querySelector('#app').innerHTML = `
  <header class="relative">
    <nav class="flex items-end gap-4 p-4 px-6 w-fit mx-auto">
      <div>
        <label class="text-xs text-gray-500">No. of Cells</label>
        <input type="text" id="no-of-cells" class="block border w-28 h-10 px-2" >
      </div>
      <div>
        <label class="text-xs text-gray-500">Cells Height (in)</label>
        <input type="text" id="no-of-rows" class="block border w-28 h-10 px-2" >
      </div>
      <div>
        <label class="text-xs text-gray-500">Cells Width (in)</label>
        <input type="text" id="no-of-cols" class="block border w-28 h-10 px-2" >
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
        <button id="save_btn" class="bg-black text-white px-4 py-2 rounded-md hover:bg-slate-800">Create</button>
      </div>
    </nav>
    <button class="absolute top-full -mt-2 left-6 bg-white text-black px-4 py-1 rounded-md" id="header-toggle"><i class="fa-solid fa-chevron-up"></i></button>
  </header>
  <section class="w-full h-full bg-gray-50 overflow-auto p-5">
    <div class="w-fit mx-auto">
      <div class="canvas border hidden p-4" id="canvasBody">
        <div class="flex flex-wrap"></div>
      </div>
    </div>
    <button id="print_btn" class="fixed bottom-6 right-6 bg-black text-white text-xl px-5 py-4 rounded-full hover:bg-slate-800 disabled:hidden"><i class="fa-solid fa-print"></i></button>
  </section>
`

// setupCounter(document.querySelector('#counter'))
// document.querySelector('#no-of-cells').addEventListener('change', (e) => {
//   alert(e.target.value)
// })

document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.querySelector('#save_btn');
  if (saveButton) {
    generateCanvas(saveButton);
  }

  headerToggle(document.querySelector('#header-toggle'))
});


printCanvas(document.querySelector("#print_btn"))