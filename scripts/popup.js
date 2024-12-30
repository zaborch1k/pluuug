import { getFlagAct } from "./storageWorker.js"
import { pushFlagAct } from "./storageWorker.js"


// ------------------------------------ when opening  ------------------------------------

function changeButtonsText(flag) {
    if (flag) {
        document.getElementById("actButton").textContent = "отключить защиту";
        document.getElementById("extButton").style.visibility = 'visible';

    } else {
        document.getElementById("actButton").textContent = "включить защиту";
        document.getElementById("extButton").style.visibility = 'hidden';
    }
}

getFlagAct(function(flagAct) {
    if (flagAct !== undefined) {
        changeButtonsText(flagAct);
        
    } else {
        pushFlagAct(false, function(result){});
    }
});

// ----------------------------------------------------------------------------------------


document.getElementById("actButton").addEventListener("click", actButtonClicked);

function actButtonClicked() {
    getFlagAct(function(flagAct) {
        if (flagAct !== undefined) {
            pushFlagAct(!flagAct, function(result){});
            changeButtonsText(!flagAct);
        } 
    });
}


// open window by name || create new window if it doesnt exists
function openWindow(win) {
    let path = "/windows/" + win + ".html";
    let url = chrome.runtime.getURL(path);

    chrome.tabs.query({url : url}, function (tabs) {
        if (tabs.length >= 1) {
            chrome.tabs.update(tabs[0].id,{"active":true, "highlighted":true});
        } else {
            url = chrome.runtime.getURL(".." + path);
            chrome.tabs.create({url : url});
        }
    });
}


document.getElementById("extButton").addEventListener("click", extButtonClicked);

function extButtonClicked() {
    openWindow("extWdw");
}


document.getElementById("faqButton").addEventListener("click", faqButtonClicked);

function faqButtonClicked() {
    openWindow("faq");
}
