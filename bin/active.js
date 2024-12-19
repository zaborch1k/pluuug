var flagExtWdw = false;
document.getElementById("button").addEventListener("click", deactivate);

function deactivate() {
    window.location.href = "../windows/main.html";
}

document.getElementById("button_nd").addEventListener("click", openExtWindow);

function openExtWindow() {
    chrome.tabs.create({url : chrome.runtime.getURL("../windows/ext_wdw.html")});
}