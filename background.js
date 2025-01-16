import { initDB } from "./scripts/storageWorker.js"
import { getFlagAct } from "./scripts/storageWorker.js"
import { 
    setPrevTabUrl, setPendingTabUrl,
    getPrevTabUrl, getPendingTabUrl,
    removeTabUrls
} from "./scripts/storageWorker.js"
import { notify, traceHosts } from "./scripts/notify.js"
import { checkURL } from "./scripts/checkURL.js"
import { hostFromUrl } from "./scripts/utility.js"

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

function redirectBadSite(pendingDetails, flagAct) {
    if (flagAct === undefined)
        return
    if (!flagAct)
        return

    if (pendingDetails.tabId === -1)
        return
    
    // Uncomment this when the Google API is completed.
    // if (checkURL(pendingDetails.url) !== "UNSAFE")
    //     return

    getPendingTabUrl(pendingDetails.tabId, (previousPendingUrl) => {
        let pendingHost = hostFromUrl(pendingDetails.url)

        if (pendingHost === "")
            return

        if (hostFromUrl(previousPendingUrl) === pendingHost)
            return

        setPendingTabUrl(pendingDetails.tabId, pendingDetails.url)
        
        chrome.tabs.update(pendingDetails.tabId, { url: chrome.runtime.getURL("windows/tempRedirect.html") }, (tab) => {
            setPrevTabUrl(pendingDetails.tabId, tab.url)
        })

        traceHosts(pendingDetails.tabId, hostFromUrl(previousPendingUrl), pendingHost)
    })
}

chrome.webRequest.onBeforeRequest.addListener((details) => {
        getFlagAct((flagAct) => {
            redirectBadSite(details, flagAct);
        });
    },
    {
        urls: ["https://*/*", "http://*/*"],
        types: ["main_frame"]
    }
);

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    removeTabUrls(tabId, () => {})
})

chrome.tabs.onCreated.addListener((tab) => {
    setPrevTabUrl(tab.id, tab.url)
})