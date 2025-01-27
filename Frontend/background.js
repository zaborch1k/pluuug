import { initDB } from "./scripts/storageWorker.js"
import { getFlagAct } from "./scripts/storageWorker.js"
import { 
    setPrevTabUrl, setPendingTabUrl,
    getPendingTabUrl, removeTabUrls,
    isHostInWhiteList, setLang, updateBlockHistory
} from "./scripts/storageWorker.js"
import { checkURL } from "./scripts/checkURL.js"
import { notify, traceHosts } from "./scripts/notify.js"
import { hostFromUrl } from "./scripts/utility.js"

initDB();

// ----------------- debug only -----------------
function randomThreatType() {
    let rawThreatTypes = ["MALWARE", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION", "SOCIAL_ENGINEERING", "VIRUSTOTAL"];
    let ind = Math.floor(Math.random() * (3 - 0 + 1))
    return rawThreatTypes[ind];
}
// ------------------------------------------------

function redirectBadSite(pendingDetails, flagAct) {
    console.log('checking...', pendingDetails.url)
    if (flagAct === undefined)
        return
    if (!flagAct)
        return

    if (pendingDetails.tabId === -1)
        return

    checkURL(pendingDetails.url).then(res => {
        let [verdict, threatType] = res;
        console.log(res);
        
        // threatType = randomThreatType(); // debug only

        if (verdict !== "UNSAFE")
            return

        getPendingTabUrl(pendingDetails.tabId, (previousPendingUrl) => isHostInWhiteList(hostFromUrl(pendingDetails.url), (hostInWhiteList) => {
            if (hostInWhiteList)
                return
    
            let pendingHost = hostFromUrl(pendingDetails.url)
    
            if (pendingHost === "")
                return
    
            if (hostFromUrl(previousPendingUrl) === pendingHost)
                return
    
            setPendingTabUrl(pendingDetails.tabId, pendingDetails.url)

            updateBlockHistory(pendingDetails.url, threatType); 

            let redirectPageURL = new URL(chrome.runtime.getURL("windows/tempRedirect.html"));
            redirectPageURL.searchParams.set("threatType", threatType);
            
            chrome.tabs.update(pendingDetails.tabId, { url: chrome.runtime.getURL("windows/tempRedirect.html") }, (tab) => {
                setPrevTabUrl(pendingDetails.tabId, (tab.url === "") ? "https://www.google.com" : tab.url)
            })
    
            traceHosts(pendingDetails.tabId, hostFromUrl(previousPendingUrl), pendingHost)
        }))
    });
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
    removeTabUrls(tabId)
})

chrome.tabs.onCreated.addListener((tab) => {
    setPrevTabUrl(tab.id, tab.url)
})

chrome.runtime.onStartup.addListener(() => getFlagAct(async (flagAct) => {
    const extensionTabIds = (await chrome.tabs.query({ }))
        .filter(tab => tab.url.includes("tempRedirect.html"))
        .map(tab => tab.id)
    chrome.tabs.remove(extensionTabIds)
    if (flagAct === undefined)
        return
    setLang(chrome.i18n.getUILanguage())
}))

chrome.webRequest.onCompleted.addListener((details) => {
    chrome.history.deleteUrl({ url: chrome.runtime.getURL("windows/tempRedirect.html") })
},
{
    urls: ["https://*/*", "http://*/*"],
    types: ["main_frame"]
}
);