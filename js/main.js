import {Curtains, Plane} from 'curtainsjs';

//// text "loading" effect
const FILL_DELAY = 5;

var walker = document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT,null);

var textElements = [];
var textContents = [];
var curIdx = 0;

let textElement;
while (textElement = walker.nextNode()) {
  textElements[curIdx] = textElement;
  textContents[curIdx] = textElement.textContent;
  textElement.textContent = "";
  curIdx++;
}

document.addEventListener("DOMContentLoaded", function(){
  fillText(textElements, textContents, curIdx);
});

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
const RESOLUTION_MULTIPLIER = 1/3;
const SCREEN_CURVATURE_X = 4.0;
const SCREEN_CURVATURE_Y = 4.0;
const SCAN_LINE_OPACITY_X = 0.25;
const SCAN_LINE_OPACITY_Y = 0.25;
const VIGNETTE_OPACITY = 1;
const BRIGHTNESS = 1.5;
const VIGNETTE_ROUNDNESS = 1;

window.addEventListener("load", () => {
  // set up our WebGL context and append the canvas to our wrapper
  const curtains = new Curtains({
    container: "canvas",
    pixelRatio: Math.min(1.5, window.devicePixelRatio) // limit pixel ratio for performance
  });

  // get our plane element
  const planeElement = document.getElementById("pre-shader-plane");

  var fs = require("fs");
  var vertShader = fs.readFileSync("shaders/plane.vs", 'utf8');
  var fragShader = fs.readFileSync("shaders/crt.fs", 'utf8');

  // set our initial parameters (basic uniforms)
  const params = {
    vertexShader: vertShader,
    fragmentShader: fragShader,
    widthSegments: 1,
    heightSegments: 1,
    uniforms: {
      curvature: {
        name: "curvature",
        type: "2f",
        value: [SCREEN_CURVATURE_X, SCREEN_CURVATURE_Y]
      },
      screenResolution: {
        name: "screenResolution",
        type: "2f",
        value: [planeElement.clientWidth * RESOLUTION_MULTIPLIER, planeElement.clientHeight * RESOLUTION_MULTIPLIER]
      },
      scanLineOpacity: {
        name: "scanLineOpacity",
        type: "2f",
        value: [SCAN_LINE_OPACITY_X, SCAN_LINE_OPACITY_Y]
      },
      vignetteOpacity: {
        name: "vignetteOpacity",
        type: "1f",
        value: VIGNETTE_OPACITY
      },
      brightness: {
        name: "brightness",
        type: "1f",
        value: BRIGHTNESS
      },
      vignetteRoundness: {
        name: "vignetteRoundness",
        type: "1f",
        value: VIGNETTE_ROUNDNESS
      }
    }
  };

  const plane = new Plane(curtains, planeElement, params);

  plane.onAfterResize(() => {
    const planeBoundingRect = simplePlane.getBoundingRect();
    simplePlane.uniforms.screenResolution.value = [planeBoundingRect.width * RESOLUTION_MULTIPLIER, planeBoundingRect.height * RESOLUTION_MULTIPLIER];
  });
});
