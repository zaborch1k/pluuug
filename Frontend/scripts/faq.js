import { setTextFaq } from "./setText.js"
import { getLang} from "./storageWorker.js"

document.addEventListener("DOMContentLoaded", async function () {
    let res = await getLang();
    const lang = (res == "ru-RU" || res == "ru") ? "ru" : "eng";
    setTextFaq(lang);
});