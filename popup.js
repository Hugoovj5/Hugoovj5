document.addEventListener("DOMContentLoaded", function () {
  const boldButton = document.getElementById("boldButton");
  const italicButton = document.getElementById("italicButton");
  const fontSelect = document.getElementById("fontSelect");
  const fontSizeInput = document.getElementById("fontSizeInput");
  const applyButton = document.getElementById("applyButton");

  boldButton.addEventListener("click", () => {
    chrome.scripting.executeScript({
      target: { tabId: 1 },
      function: setBold,
    });
  });

  italicButton.addEventListener("click", () => {
    chrome.scripting.executeScript({
      target: { tabId: 1 },
      function: setItalic,
    });
  });

  applyButton.addEventListener("click", () => {
    const selectedFont = fontSelect.value;
    const fontSize = fontSizeInput.value;
    chrome.scripting.executeScript({
      target: { tabId: 1 },
      function: setFontAndSize,
      args: [selectedFont, fontSize],
    });
  });
});

function setBold() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const span = document.createElement("span");
  span.style.fontWeight = "bold";
  range.surroundContents(span);
}

function setItalic() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const span = document.createElement("span");
  span.style.fontStyle = "italic";
  range.surroundContents(span);
}

function setFontAndSize(font, size) {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const span = document.createElement("span");
  span.style.fontFamily = font;
  span.style.fontSize = size + "px";
  range.surroundContents(span);
}
