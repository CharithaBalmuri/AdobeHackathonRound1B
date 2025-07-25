// // Import pdfjsLib from local ES module
// import * as pdfjsLib from './pdfjs/pdf.mjs';

// // Set the path to the worker
// pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.mjs';

// const pdfPath = "sample.pdf";
// const jsonPath = "headings.json";

// let pdfDoc = null,
//     pageNum = 1,
//     canvas = document.getElementById("pdf-canvas"),
//     ctx = canvas.getContext("2d");

// function renderPage(num) {
//   pdfDoc.getPage(num).then(function (page) {
//     const viewport = page.getViewport({ scale: 1.5 });
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;

//     const renderContext = {
//       canvasContext: ctx,
//       viewport: viewport,
//     };
//     page.render(renderContext);
//     document.getElementById("page-num").textContent = `Page: ${num} / ${pdfDoc.numPages}`;
//   });
// }

// pdfjsLib.getDocument(pdfPath).promise.then(function (pdfDoc_) {
//   pdfDoc = pdfDoc_;
//   renderPage(pageNum);
//   loadHeadings();
// });

// document.getElementById("prev").addEventListener("click", () => {
//   if (pageNum > 1) {
//     pageNum--;
//     renderPage(pageNum);
//   }
// });

// document.getElementById("next").addEventListener("click", () => {
//   if (pageNum < pdfDoc.numPages) {
//     pageNum++;
//     renderPage(pageNum);
//   }
// });

// function loadHeadings() {
//   fetch(jsonPath)
//     .then((res) => res.json())
//     .then((data) => {
//       const toc = document.getElementById("toc");
//       toc.innerHTML = "";

//       if (data.length === 0) {
//         toc.innerHTML = "<li>No headings found</li>";
//         return;
//       }

//       data.forEach((heading) => {
//         const li = document.createElement("li");
//         li.textContent = heading.text;   // Use 'text' here
//         li.style.marginLeft = `0px`;     // No level info, so no indent
//         li.style.cursor = "pointer";
//         li.addEventListener("click", () => {
//           pageNum = heading.page;
//           renderPage(pageNum);
//         });
//         toc.appendChild(li);
//       });
//     })
//     .catch(() => {
//       document.getElementById("toc").innerHTML = "<li>No headings found</li>";
//     });
// }



// Import pdfjsLib from local ES module
import * as pdfjsLib from './pdfjs/pdf.mjs';

// Set the path to the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.mjs';

const pdfPath = "sample.pdf";
const jsonPath = "headings.json";

let pdfDoc = null,
    pageNum = 1,
    canvas = document.getElementById("pdf-canvas"),
    ctx = canvas.getContext("2d");

function renderPage(num) {
  pdfDoc.getPage(num).then(function (page) {
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };
    page.render(renderContext);
    document.getElementById("page-num").textContent = `Page: ${num} / ${pdfDoc.numPages}`;
  });
}

pdfjsLib.getDocument(pdfPath).promise.then(function (pdfDoc_) {
  pdfDoc = pdfDoc_;
  renderPage(pageNum);
  loadHeadings();
});

document.getElementById("prev").addEventListener("click", () => {
  if (pageNum > 1) {
    pageNum--;
    renderPage(pageNum);
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (pageNum < pdfDoc.numPages) {
    pageNum++;
    renderPage(pageNum);
  }
});

function loadHeadings() {
  fetch(jsonPath)
    .then((res) => res.json())
    .then((data) => {
      const toc = document.getElementById("toc");
      toc.innerHTML = "";

      if (!data || data.length === 0) {
        toc.innerHTML = "<li>No headings found</li>";
        return;
      }

      data.forEach((heading) => {
        const li = document.createElement("li");
        li.textContent = heading.text;

        // Optional: Add indentation based on level (if present in heading)
        const indent = heading.level !== undefined ? heading.level * 20 : 0;
        li.style.marginLeft = `${indent}px`;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
          pageNum = heading.page;
          renderPage(pageNum);
        });

        toc.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error loading headings.json:", error);
      document.getElementById("toc").innerHTML = "<li>Error loading headings</li>";
    });
}
