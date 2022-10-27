import {Curtains, Plane} from "curtainsjs";

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
import {Curtains, Plane} from "curtainsjs";