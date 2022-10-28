console.log("content script is running...!", chrome);
let selectionText = "";
const bodyDom = document.querySelector("body");

function getSelectedText() {
  let selectedText = "";
  if (window.getSelection) {
    selectedText = window.getSelection().toString();
  } else if (document.getSelection) {
    selectedText = document.getSelection().toString();
  } else if (document.selection) {
    selectedText = document.selection.createRange().text;
  } else {
    return "";
  }
  return selectedText;
}
function getSelectedTextNode() {
  let selectedText = "";
  if (window.getSelection) {
    selectedText = window.getSelection();
  } else if (document.getSelection) {
    selectedText = document.getSelection();
  } else if (document.selection) {
    selectedText = document.selection.createRange();
  } else {
    return "";
  }
  return selectedText;
}
function getRangeSectionText() {
  const selectionTextNode = getSelectedTextNode();
  const getRange = selectionTextNode.getRangeAt(0);
  const selectionRect = getRange.getBoundingClientRect();
  return selectionRect;
}
function renderToolTipTranslator(selectionTextRange, selectionText) {
  const toolTipWrapper = document.createElement("div");
  toolTipWrapper.id = "translator";
  const toolTipIcon = document.createElement("div");
  toolTipIcon.classList.add("translator-icon");
  toolTipIcon.innerHTML = `<svg width="21px" height="21px" version="1.1" id="anna_vital_language_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" xml:space="preserve">
<path d="M62.4,101c-1.5-2.1-2.1-3.4-1.8-3.9c0.2-0.5,1.6-0.7,3.9-0.5c2.3,0.2,4.2,0.5,5.8,0.9c1.5,0.4,2.8,1,3.8,1.7
 c1,0.7,1.8,1.5,2.3,2.6c0.6,1,1,2.3,1.4,3.7c0.7,2.8,0.5,4.7-0.5,5.7c-1.1,1-2.6,0.8-4.6-0.6c-2.1-1.4-3.9-2.8-5.5-4.2
 C65.5,105.1,63.9,103.2,62.4,101z M40.7,190.1c4.8-2.1,9-4.2,12.6-6.4c3.5-2.1,6.6-4.4,9.3-6.8c2.6-2.3,5-4.9,7-7.7
 c2-2.7,3.8-5.8,5.4-9.2c1.3,1.2,2.5,2.4,3.8,3.5c1.2,1.1,2.5,2.2,3.8,3.4c1.3,1.2,2.8,2.4,4.3,3.8c1.5,1.4,3.3,2.8,5.3,4.5
 c0.7,0.5,1.4,0.9,2.1,1c0.7,0.1,1.7,0,3.1-0.6c1.3-0.5,3-1.4,5.1-2.8c2.1-1.3,4.7-3.1,7.9-5.4c1.6-1.1,2.4-2,2.3-2.7
 c-0.1-0.7-1-1-2.7-0.9c-3.1,0.1-5.9,0.1-8.3-0.1c-2.5-0.2-5-0.6-7.4-1.4c-2.4-0.8-4.9-1.9-7.5-3.4c-2.6-1.5-5.6-3.6-9.1-6.2
 c1-3.9,1.8-8,2.4-12.4c0.3-2.5,0.6-4.3,0.8-5.6c0.2-1.2,0.5-2.4,0.9-3.3c0.3-0.8,0.4-1.4,0.5-1.9c0.1-0.5-0.1-1-0.4-1.6
 c-0.4-0.5-1-1.1-1.9-1.7c-0.9-0.6-2.2-1.4-3.9-2.3c2.4-0.9,5.1-1.7,7.9-2.6c2.7-0.9,5.7-1.8,8.8-2.7c3-0.9,4.5-1.9,4.6-3.1
 c0.1-1.2-0.9-2.3-3.2-3.5c-1.5-0.8-2.9-1.1-4.3-0.9c-1.4,0.2-3.2,0.9-5.4,2.2c-0.6,0.4-1.8,0.9-3.4,1.6c-1.7,0.7-3.6,1.5-6,2.5
 c-2.4,1-5,2-7.8,3.1c-2.9,1.1-5.8,2.2-8.7,3.2c-2.9,1.1-5.7,2-8.2,2.8c-2.6,0.8-4.6,1.4-6.1,1.6c-3.8,0.8-5.8,1.6-5.9,2.4
 c0,0.8,1.5,1.6,4.4,2.4c1.2,0.3,2.3,0.6,3.1,0.6c0.8,0.1,1.7,0.1,2.5,0c0.8-0.1,1.6-0.3,2.4-0.5c0.8-0.3,1.7-0.7,2.8-1.1
 c1.6-0.8,3.9-1.7,6.9-2.8c2.9-1,6.6-2.4,11.2-4c0.9,2.7,1.4,6,1.4,9.8c0,3.8-0.4,8.1-1.4,13c-1.3-1.1-2.7-2.3-4.2-3.6
 c-1.5-1.3-2.9-2.6-4.3-3.9c-1.6-1.5-3.2-2.5-4.7-3c-1.6-0.5-3.4-0.5-5.5,0c-3.3,0.9-5,1.9-4.9,3.1c0,1.2,1.3,1.8,3.8,1.9
 c0.9,0.1,1.8,0.3,2.7,0.6c0.9,0.3,1.9,0.9,3.2,1.8c1.3,0.9,2.9,2.2,4.7,3.8c1.8,1.6,4.2,3.7,7,6.3c-1.2,2.9-2.6,5.6-4.1,8
 c-1.5,2.5-3.4,5-5.5,7.3c-2.2,2.4-4.7,4.8-7.7,7.2c-3,2.5-6.6,5.1-10.8,7.8c-4.3,2.8-6.5,4.7-6.5,5.6C35,192.1,37,191.7,40.7,190.1z
  M250.5,81.8v165.3l-111.6-36.4L10.5,253.4V76.1l29.9-10V10.4l81.2,28.7L231.3,2.6v73.1L250.5,81.8z M124.2,50.6L22.3,84.6v152.2
 l101.9-33.9V50.6L124.2,50.6z M219.4,71.9V19L138.1,46L219.4,71.9z M227,201.9L196.5,92L176,85.6l-30.9,90.8l18.9,5.9l5.8-18.7
 l31.9,10l5.7,22.3L227,201.9z M174.8,147.7l22.2,6.9l-10.9-42.9L174.8,147.7z"/>
</svg>`;
  toolTipWrapper.appendChild(toolTipIcon);
  //determine top left of tooltip
  const top = selectionTextRange.top + selectionTextRange.height + 6 + "px";
  const left =
    selectionTextRange.left +
    (selectionTextRange.width / 2 - toolTipWrapper.offsetWidth / 2) +
    "px";
  toolTipWrapper.style.position = "absolute";
  // toolTipWrapper.style.background = "white";
  toolTipWrapper.style.padding = "4px";
  toolTipWrapper.style.top = top;
  toolTipWrapper.style.left = left;
  toolTipWrapper.style.cursor = "pointer";
  bodyDom.appendChild(toolTipWrapper);
  // display the translation icon next to the selection text
  //listen when you click on the translator icon

  if (toolTipWrapper) {
    toolTipWrapper.addEventListener("click", async () => {
      console.log("hello", selectionText);
      if (selectionText.length > 0) {
        const result = await fetch(
          `http://localhost:3000/api/translator?keyword=${selectionText}&input=de&output=uk`
        );
        const resultJson = await result.json();
        renderToolTipResultTranslator(
          selectionTextRange,
          selectionText,
          resultJson.text
        );
      }
    });
  }
}

function renderToolTipResultTranslator(
  selectionTextRange,
  selectionText,
  selectedTextTranslated
) {
  const toolTipWrapper = document.createElement("div");
  toolTipWrapper.id = "translator-result";
  const toolTipContainer = document.createElement("div");
  toolTipContainer.classList.add("translator-result-container");
  toolTipContainer.innerHTML = `
  <label>Input: <span>${selectionText}</span></label>
  <br />
  <label>Output: <span>${selectedTextTranslated}</span></label>`;
  toolTipWrapper.appendChild(toolTipContainer);
  //determine top left of tooltip
  const top =
    selectionTextRange.top +
    selectionTextRange.height -
    selectionTextRange.height -
    6 +
    "px";
  const left =
    selectionTextRange.left +
    (selectionTextRange.width / 2 - toolTipWrapper.offsetWidth / 2) +
    "px";
  toolTipWrapper.style.position = "absolute";
  // toolTipWrapper.style.background = "white";
  toolTipWrapper.style.padding = "5px";
  toolTipWrapper.style.top = top;
  toolTipWrapper.style.left = left;
  toolTipWrapper.style.cursor = "pointer";
  toolTipWrapper.style.border = "1px solid red";
  toolTipWrapper.style.borderRadius = "10px";
  bodyDom.appendChild(toolTipWrapper);
  // display the translation icon next to the selection text
  //listen when you click on the translator icon
}

// get selected text
bodyDom.addEventListener("mouseup", () => {
  //remove before translated popup/tooltip: detect click outside then turn off tooltip
  // setTimeout(() => {
  //   const tooltipResult = document.querySelector("div#translator-result");
  //   if (tooltipResult) tooltipResult.remove();
  // }, 6000);
  selectionText = getSelectedText();
  if (selectionText.length > 0) {
    const selectionRange = getRangeSectionText();
    renderToolTipTranslator(selectionRange, selectionText);
  }
  // setTimeout(() => {
  //   const toolTipWrapper = document.querySelector("div#translator");
  //   if (toolTipWrapper) toolTipWrapper.remove();
  // }, 3000);
});
