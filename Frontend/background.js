import { initDB, initSDB } from "./scripts/storageWorker.js"
import { getFlagAct } from "./scripts/storageWorker.js"
import { 
    setPrevTabUrl, setPendingTabUrl,
    getPendingTabUrl, removeTabUrls,
    getWhiteList, setLang, updateBlockHistory, getMode, getLC
} from "./scripts/storageWorker.js"
import { checkURL } from "./scripts/checkURL.js"
import { hostFromUrl } from "./scripts/utility.js"
import { openWindow } from "./scripts/utility.js"

(async () => {
    await initDB();
    await initSDB();
})()

async function checkInCash(url) {
    let listLC = ["LC_SB", "LC_VT"];

    let res;

    for (let typeLC of listLC) {
        let LC = await getLC(typeLC);
        res = LC[url];

        if (res === undefined) {
            continue;
        }

        if (res[0] == "UNSAFE") {
            return res;
        }
    }

    if (res === undefined) {
        res = [undefined, undefined, undefined];
    }

    return res;
}

async function checkAndRedirect(pendingDetails) {
    let pendingURL = pendingDetails.url;
    let hostInWhiteList = (await getWhiteList()).includes(hostFromUrl(pendingDetails.url));
    if (hostInWhiteList) {
        return;
    }

    let [verdict, threatType, service] = await checkInCash(pendingDetails.url);
    if (verdict === "SAFE" ) {
        return;
    }

    // one host navigation check [?]
    let previousPendingUrl = await getPendingTabUrl(pendingDetails.tabId)
    let pendingHost = hostFromUrl(pendingDetails.url)
    
    if (pendingHost === "")
        return
    
    if (hostFromUrl(previousPendingUrl) === pendingHost) {
        return;
    }
        

    let mode = await getMode();
    let curTabID = pendingDetails.tabId;
    let tabURL;
    if (mode == "1") { 
        // redirect to checkingPage
        console.log('redirect...')
        let checkingPageURL = new URL(chrome.runtime.getURL("windows/checkingPage.html"));
        let checkingPage = await chrome.tabs.update(pendingDetails.tabId, { url: checkingPageURL.href });
        tabURL = checkingPage.url;
        curTabID = checkingPage.id;
    }

    if (verdict === undefined) {
        [verdict, threatType, service] = await checkURL(pendingDetails.url);
    }

    if (verdict !== "UNSAFE") {
        if (mode == "1") { 
            // redirect to checkingPage
            await chrome.tabs.update(curTabID, { url: pendingDetails.url });
        }
        return;
    }

    await setPendingTabUrl(curTabID, pendingURL); // for proceed button

    console.log("curTabID", curTabID);
    console.log("pendingDetails.tabID", pendingDetails.tabID);

    await updateBlockHistory(pendingURL, threatType);

    // redirect to tempRedirect
    let tempRedirectURL = new URL(chrome.runtime.getURL("windows/tempRedirect.html"));
    tempRedirectURL.searchParams.set("threatType", threatType);
    tempRedirectURL.searchParams.set("service", service);

    let tab = await chrome.tabs.update(curTabID, { url: tempRedirectURL.href });   
    console.log("tab", tab);     
    if (mode != "1") {
        tabURL = tab.url;
    } 
    await setPrevTabUrl(curTabID, (tabURL === "") ? "https://www.google.com" : tabURL);  // for return button
}

chrome.runtime.onInstalled.addListener(async (object) => {
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        await openWindow("faq");
    }
});

chrome.webRequest.onBeforeRequest.addListener(async (pendingDetails) => {
    let flagAct = await getFlagAct();
    if (!flagAct || pendingDetails.tabId === -1) {
        return;
    }

    await checkAndRedirect(pendingDetails);
},
{
    urls: ["https://*/*", "http://*/*"],
    types: ["main_frame"]
});

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