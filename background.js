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

function redirectBadSite(tab, flagAct) {
    if (flagAct === undefined) 
        return
    if (!flagAct)
        return

    // Uncomment this when the Google API is completed.
    // if (checkURL(tab.url) !== "UNSAFE")
    //     return

    chrome.tabs.update(tab.tabId, { url: "https://www.evil.com/" })
}

chrome.webRequest.onBeforeRequest.addListener((details) => {
        getFlagAct((flagAct) => {
            redirectBadSite(details, flagAct);
        });
    },
    { urls: ["https://google.com/"] } // Replace google with <all_urls> when the Google API is completed.
);