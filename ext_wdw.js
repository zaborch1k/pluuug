var flagExtWdw = false;

function deactivate() {
    window.location.href = "main.html";
}

function openExtWindow() {
    chrome.tabs.create({url : chrome.runtime.getURL("ext_wdw.html")});
}