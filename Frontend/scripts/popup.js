import { getFlagAct } from "./storageWorker.js"
import { pushFlagAct, getLang } from "./storageWorker.js"
import { setTextPopup } from "./setText.js"
import { openWindow } from "./utility.js";

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

// ------------------------------------ init page  ------------------------------------

let res = await getLang();
const lang = (res == "ru-RU" || res == "ru") ? "ru" : "eng";

setTextPopup(lang);

getFlagAct(function(flagAct) {
    if (flagAct !== undefined) {
        changeButtonsText(flagAct);
    }
});

// ----------------------------------------------------------------------------------------

document.getElementById("actButton").onclick = () => {
    getFlagAct(function(flagAct) {
        if (flagAct !== undefined) {
            pushFlagAct(!flagAct, function(result){});
            changeButtonsText(!flagAct);
        } 
    });
}

document.getElementById("extButton").addEventListener("click", () => openWindow("extWdw"))

document.getElementById("faqButton").addEventListener("click", () => openWindow("faq"))

document.getElementById('optionsButton').addEventListener("click", () => openWindow("options"))