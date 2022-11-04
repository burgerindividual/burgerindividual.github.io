import {Curtains, ShaderPass} from 'curtainsjs';
import 'regenerator-runtime/runtime';
import html2canvas from "html2canvas";

//// text "loading" effect
const FILL_DELAY = 5;

const walker = document.createTreeWalker(
  document.documentElement,
  NodeFilter.SHOW_TEXT,
  (node) => node.nodeName.toLowerCase() === "#text" && node.textContent !== "" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
);

const textElements = [];
const textContents = [];
let curIdx = 0;

let textElement;
// while (textElement = walker.nextNode()) {
//   textElements[curIdx] = textElement;
//   textContents[curIdx] = textElement.textContent;
//   textElement.textContent = "";
//   curIdx++;
// }
//
// document.addEventListener("DOMContentLoaded", function(){
//   fillText(textElements, textContents, curIdx);
// });

async function fillText(textElements, textContents, count) {
  for (let i = 0; i < count; i++) {
    let textElement = textElements[i];
    let textContent = textContents[i];
    for (let i = 0; i < textContent.length; i++) {
      textElement.textContent += textContent[i] + '█';
      await new Promise(r => setTimeout(r, FILL_DELAY));
      textElement.textContent = textElement.textContent.slice(0,-1);
    }
  }
}

//// scroll choppifier

// let fontSize = parseFloat(window.getComputedStyle(document.getElementById("terminal-text")).fontSize);

// document.addEventListener("scroll", function(){
//   document.getElementById("scroll-pane").style.top = (window.scrollY % fontSize) + "px";
// });

//// crt effect
// const RESOLUTION_MULTIPLIER = 1/3;
// const SCREEN_CURVATURE_X = 4.0;
// const SCREEN_CURVATURE_Y = 4.0;
// const SCAN_LINE_OPACITY_X = 0.25;
// const SCAN_LINE_OPACITY_Y = 0.25;
// const VIGNETTE_OPACITY = 1;
// const BRIGHTNESS = 1.5;
// const VIGNETTE_ROUNDNESS = 1;
//
// window.addEventListener("load", () => {
//   const curtains = new Curtains({
//     container: "curtains-canvas",
//     preserveDrawingBuffer: true,
//     pixelRatio: Math.min(1.5, window.devicePixelRatio) // limit pixel ratio for performance
//   });
//
//   html2canvas(
//     document.querySelector("#pre-shader-plane"),
//     document.getElementById("curtains-canvas").getElementsByTagName("canvas")[0]
//   );
//
//   curtains.onError(() => {
//     console.error("Error creating curtains context");
//   }).onContextLost(() => {
//     curtains.restoreContext();
//   });
//
//   const fs = require("fs");
//   const fragShader = fs.readFileSync("shaders/crt.fsh", 'utf8');
//
//   const params = {
//     fragmentShader: fragShader,
//     uniforms: {
//       curvature: {
//         name: "curvature",
//         type: "2f",
//         value: [SCREEN_CURVATURE_X, SCREEN_CURVATURE_Y]
//       },
//       resolution: {
//         name: "resolution",
//         type: "2f",
//         value: [document.clientWidth * RESOLUTION_MULTIPLIER, document.clientHeight * RESOLUTION_MULTIPLIER]
//       },
//       scanLineOpacity: {
//         name: "scanLineOpacity",
//         type: "2f",
//         value: [SCAN_LINE_OPACITY_X, SCAN_LINE_OPACITY_Y]
//       },
//       vignetteOpacity: {
//         name: "vignetteOpacity",
//         type: "1f",
//         value: VIGNETTE_OPACITY
//       },
//       brightness: {
//         name: "brightness",
//         type: "1f",
//         value: BRIGHTNESS
//       },
//       vignetteRoundness: {
//         name: "vignetteRoundness",
//         type: "1f",
//         value: VIGNETTE_ROUNDNESS
//       }
//     }
//   };
//
//   const shaderPass = new ShaderPass(curtains, params);
//
//   shaderPass.onError(() => {
//     console.error("Error creating curtains plane");
//   }).onAfterResize(() => {
//     const planeBoundingRect = shaderPass.getBoundingRect();
//     shaderPass.uniforms.resolution.value = [planeBoundingRect.width * RESOLUTION_MULTIPLIER, planeBoundingRect.height * RESOLUTION_MULTIPLIER];
//   });
// });
