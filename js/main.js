import 'regenerator-runtime/runtime';

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
