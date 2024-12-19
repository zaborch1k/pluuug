var flagExtWdw = false;

function deactivate() {
    window.location.href = "../windows/main.html";
}

function openExtWindow() {
    chrome.tabs.create({url : chrome.runtime.getURL("../windows/ext_wdw.html")});
}