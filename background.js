import { canonize } from "./scripts/canonize.js"

function checkURL(url) {
    let flag = Math.trunc(Math.random() * (1 - 0 + 1) + 0);
    if (flag == 0) {
        return false;
    } 
    return true;
}

function injectScriptWithAlert(tabId) {
    chrome.tabs.query({lastFocusedWindow: true, active: true},function(tab){
        let url, msg;
        url = canonize(tab[0].url);

        if (checkURL(url)) {
            msg = "good site";

        } else {
            msg = "bad site";
        }

        chrome.scripting.executeScript({target: {tabId}, files: ['inject.js']}, () => {
            chrome.scripting.executeScript({
              target: {tabId},
              args: [url],
              func: (...args) => doAlert(...args),
            });
        });
    });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { 
    if (changeInfo.url) {
        chrome.storage.local.get("flagAct", function(result) {
            let flagAct = result.flagAct;
            if (flagAct !== undefined) {
                if (flagAct == true) {
                    injectScriptWithAlert(tabId);
                } 
            }
        });
    }
});