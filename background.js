import { initDB } from "./scripts/storageWorker.js"
import { getFlagAct } from "./scripts/storageWorker.js"
import { notify } from "./scripts/notify.js"
import { checkURL } from "./scripts/checkURL.js"

initDB();

function processNewURL(tabId, flagAct) {
    if (flagAct === undefined) {
        return;
    }
    if (!flagAct) {
        return;
    }

    chrome.tabs.query({lastFocusedWindow: true, active: true}, async function(tab){
        let url = tab[0].url;

        let verdict = await checkURL(url);

        notify(tabId, verdict);
    });
}


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { 
    if (changeInfo.url) {
        getFlagAct(function(flagAct) {
            processNewURL(tabId, flagAct);
        });
    }
});