import { initDB, initSDB } from "./scripts/storageWorker.js"
import { getFlagAct } from "./scripts/storageWorker.js"
import { 
    setPrevTabUrl, setPendingTabUrl,
    getPendingTabUrl, removeTabUrls,
    getWhiteList, setLang, updateBlockHistory
} from "./scripts/storageWorker.js"
import { checkURL } from "./scripts/checkURL.js"
import { hostFromUrl } from "./scripts/utility.js"
import { openWindow } from "./scripts/utility.js"

(async () => {
    await initDB();
    await initSDB();
})()

async function redirectBadSite(pendingDetails, flagAct) {
    console.log('checking...', pendingDetails.url, pendingDetails.tabId)
    if (!flagAct || pendingDetails.tabId === -1)
        return

    let hostInWhiteList = (await getWhiteList()).includes(hostFromUrl(pendingDetails.url))
    if (hostInWhiteList)
        return

    let [verdict, threatType, service] = await checkURL(pendingDetails.url)

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
    redirectPageURL.searchParams.set("service", service);
            
    let tab = await chrome.tabs.update(pendingDetails.tabId, { url: redirectPageURL.href })
    await setPrevTabUrl(pendingDetails.tabId, (tab.url === "") ? "https://www.google.com" : tab.url)
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