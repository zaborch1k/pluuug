import { getFlagAct } from "./storageWorker.js"
import { setFlagAct, getLang } from "./storageWorker.js"
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

let flagAct = await getFlagAct()
if (flagAct !== undefined) {
    changeButtonsText(flagAct);
}


// ----------------------------------------------------------------------------------------

document.getElementById("actButton").onclick = async () => {
    let flagAct = await getFlagAct()
    if (flagAct !== undefined) {
        await setFlagAct(!flagAct);
        changeButtonsText(!flagAct);
    }
}

document.getElementById("extButton").addEventListener("click", async () => await openWindow("extWdw"))

document.getElementById("faqButton").addEventListener("click", async () => await openWindow("faq"))

document.getElementById('optionsButton').addEventListener("click", async () => await openWindow("options"))