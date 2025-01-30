import { setMode, getLang, setLang, getMode } from "./storageWorker.js"
import { setTextOptions } from "./setText.js"

// ------------------------------------ init page  ------------------------------------

let res = await getLang();
let mode = await getMode();

const lang = (res == "ru-RU" || res == "ru") ? "ru" : "eng";

setTextOptions(lang);

document.getElementById(lang).setAttribute("selected", true);

// ----------------------------------------------------------------------------------------

document.getElementById("lang-select").onchange = async () => {
    let select = document.getElementById("lang-select");
    let selectedOption = select.options[select.selectedIndex].value;
    await setLang(selectedOption);
};

document.getElementById("choose-lang-mode" + mode).setAttribute("checked", true);

document.querySelectorAll('input[type="radio"][name="choose-lang"]').forEach(radio => {
    radio.addEventListener('change', async () => await setMode(radio.value));
});