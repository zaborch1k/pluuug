import { initDB } from "./scripts/storageWorker.js"
import { getFlagAct } from "./scripts/storageWorker.js"
import { 
    setPrevTabUrl, setPendingTabUrl,
    getPendingTabUrl, removeTabUrls,
    getWhiteList, setLang, updateBlockHistory
} from "./scripts/storageWorker.js"
import { checkURL } from "./scripts/checkURL.js"
// import { notify, traceHosts } from "./scripts/notify.js"
import { hostFromUrl } from "./scripts/utility.js"
import { openWindow } from "./scripts/utility.js"

(async () => {await initDB()})()

// ----------------- debug only -----------------
function randomThreatType() {
    let rawThreatTypes = ["MALWARE", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION", "SOCIAL_ENGINEERING", "VIRUSTOTAL"];
    let ind = Math.floor(Math.random() * (3 - 0 + 1))
    return rawThreatTypes[ind];
}
// ------------------------------------------------


async function redirectBadSite(pendingDetails, flagAct) {
    console.log('checking...', pendingDetails.url, pendingDetails.tabId)
    if (flagAct === undefined) // ???
        return
    if (!flagAct)
        return

    if (pendingDetails.tabId === -1)
        return

    let hostInWhiteList = (await getWhiteList()).includes(hostFromUrl(pendingDetails.url))
    if (hostInWhiteList)
        return

    let res = await checkURL(pendingDetails.url)
    let [verdict, threatType] = res;
        
        // threatType = randomThreatType(); // debug only

    if (verdict !== "UNSAFE")
        return
    
    let previousPendingUrl = await getPendingTabUrl(pendingDetails.tabId)
    let pendingHost = hostFromUrl(pendingDetails.url)
    
    if (pendingHost === "")
        return
    
    if (hostFromUrl(previousPendingUrl) === pendingHost)
        return
    
    await setPendingTabUrl(pendingDetails.tabId, pendingDetails.url)

    await updateBlockHistory(pendingDetails.url, threatType);

    let redirectPageURL = new URL(chrome.runtime.getURL("windows/tempRedirect.html"));
    redirectPageURL.searchParams.set("threatType", threatType);
            
    let tab = await chrome.tabs.update(pendingDetails.tabId, { url: redirectPageURL.href })
    await setPrevTabUrl(pendingDetails.tabId, (tab.url === "") ? "https://www.google.com" : tab.url)
    
    // traceHosts(pendingDetails.tabId, hostFromUrl(previousPendingUrl), pendingHost)
}


chrome.runtime.onInstalled.addListener(async (object) => {
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        await openWindow("faq");
    }
});

chrome.webRequest.onBeforeRequest.addListener(async (details) => {
        let flagAct = await getFlagAct()
        await redirectBadSite(details, flagAct);
    },
    {
        urls: ["https://*/*", "http://*/*"],
        types: ["main_frame"]
    }
);

chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
    await removeTabUrls(tabId)
})

chrome.runtime.onStartup.addListener(async () => {
    const extensionTabIds = (await chrome.tabs.query({}))
        .filter(tab => tab.url.includes("tempRedirect.html"))
        .map(tab => tab.id)
    await chrome.tabs.remove(extensionTabIds)
    if ((await getFlagAct()) === undefined)
        return
    await setLang(chrome.i18n.getUILanguage())
})

chrome.webRequest.onCompleted.addListener(async (details) => {
    await chrome.history.deleteUrl({ url: chrome.runtime.getURL("windows/tempRedirect.html") })
},
{
    urls: ["https://*/*", "http://*/*"],
    types: ["main_frame"]
}
);