document.addEventListener("mouseup", getSelectedText);

function getSelectedText() {
  var selectedText = window.getSelection().toString();
  if (selectedText.length > 0) {
    try {
      var button = document.createElement("button");
      button.textContent = "Read Text";
      button.style.position = "absolute";
      button.style.top = "20px";
      button.style.left = "20px";
      button.onclick = function() {
        chrome.runtime.sendMessage({action: "readText", message: selectedText}, function(response) {});
      };
      document.body.appendChild(button);
    } catch (error) {
      console.log("Error: ", error);
    }
    
  }
}