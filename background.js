import { initDB } from "./scripts/storageWorker.js"
import { getFlagAct } from "./scripts/storageWorker.js"
import { setPendingUrl, setPrevUrl, getPendingUrl } from "./scripts/storageWorker.js"
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
    if (!changeInfo.url) {
        return
    }

    getFlagAct(function(flagAct) {
        processNewURL(tabId, flagAct);
    });
});

function redirectBadSite(details, flagAct) {
    if (flagAct === undefined) 
        return
    if (!flagAct)
        return
    
    getPendingUrl((url) => {
        if (url === details.url)
            return

        // Uncomment this when the Google API is completed.
        // if (checkURL(tab.url) !== "UNSAFE")
        //     return

        setPendingUrl(details.url, () => {})

        chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("windows/tempRedirect.html") }, (tab) => {
            setPrevUrl(tab.url)
        })
    })
}

chrome.webRequest.onBeforeRequest.addListener((details) => {
        getFlagAct((flagAct) => {
            redirectBadSite(details, flagAct);
        });
    },
    { urls: ["https://google.com/", "https://ya.ru/"] } // Replace google with <all_urls> when the Google API is completed.
);