document.getElementById("button").addEventListener("click", buttonClicked);

function buttonClicked() {
    window.location.href = "../windows/active.html";
}

function activate() {
    var url = getCurrentTab();
    debug(url);
}

function debug(url) {
    debug_txt.textContent = toString(url);
}


function getCurrentTab() {
    chrome.tabs.query({lastFocusedWindow: true, active: true},function(tab){debug_txt.textContent = tab[0].url});
}



