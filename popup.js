let startButton = document.getElementById('startButton');
startButton.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {file: 'app.js'});
    });
  };


let changeButton = document.getElementById("opt");
changeButton.onclick = function() {
  startButton.classList.toggle("class1");
};