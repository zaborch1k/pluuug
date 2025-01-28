import { getFlagAct } from "./storageWorker.js"
import { pushFlagAct, getLang } from "./storageWorker.js"
import { setTextPopup } from "./setText.js"

let res = await getLang();
const lang = (res == "ru-RU" || res == "ru") ? "ru" : "eng";
setTextPopup(lang);
//

// ------------------------------------ when opening  ------------------------------------

function changeButtonsText(flag) {
    let text;
    if (flag) {
        text = (lang == "ru") ? "отключить проверку" : "disable check";
        document.getElementById("actButton").textContent = text;
        document.getElementById("extButton").style.visibility = 'visible';

    } else {
        text = (lang == "ru") ? "включить проверку" : "enable check";
        document.getElementById("actButton").textContent = text;
        document.getElementById("extButton").style.visibility = 'hidden';
    }
}

getFlagAct(function(flagAct) {
    if (flagAct !== undefined) {
        changeButtonsText(flagAct);
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


document.getElementById("extButton").addEventListener("click", () => openWindow("extWdw"))


document.getElementById("faqButton").addEventListener("click", () => openWindow("faq"))

document.getElementById('optionsButton').addEventListener("click", () => openWindow("options"))