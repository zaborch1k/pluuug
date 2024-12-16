document.getElementById("button").addEventListener("click", buttonClicked);
activate();
var flag = false;

function buttonClicked() {
    // var text_act = "активно";
    // var text_deact = "неактивно";

    // var button = document.getElementById("button");
    // flag = !flag;

    // if (flag) {
    //     //активация
    //     button.textContent = text_act;
    //     activate();

    // } else {
    //     //деактивация
    //     button.textContent = text_deact;
    // }
}

function activate() {
    var debug_txt = document.getElementById("debug_txt");
    debug_txt.textContent = debug_txt.textContent + "d";
    var url = getCurrentTab();
    debug(url);
}

function debug(url) {
    debug_txt.textContent = toString(url);
}


function getCurrentTab() {
    chrome.tabs.query({lastFocusedWindow: true, active: true},function(tab){debug_txt.textContent = tab[0].url});
}



