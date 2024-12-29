import { getFlagAct } from "./scripts/storageWorker.js"
import { notify } from "./scripts/notify.js"
import { checkURL } from "./scripts/checkURL.js"


function processNewURL(tabId, flagAct) {
    if (flagAct !== undefined) {
        if (flagAct == true) {
            chrome.tabs.query({lastFocusedWindow: true, active: true}, function(tab){
                let url = tab[0].url;

                let verdict = checkURL(url);
    
                notify(tabId, verdict);
            });
        } 
    }
}


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { 
    if (changeInfo.url) {
        getFlagAct(function(flagAct) {
            processNewURL(tabId, flagAct);
        });
    }
});