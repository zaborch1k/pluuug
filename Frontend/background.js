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

async function checkInLC(url) {
    let listLC = ["LC_SB", "LC_VT"];

    let res = undefined;

    for (let typeLC of listLC) {
        let LC = await getLC(typeLC)
        res = LC[url]

        if (res === undefined) {
            continue
        }

        if (res[0] == "UNSAFE") {
            return res
        }
    }

    return res
}

async function syncRedirectMode(pendingDetails) {
    let redirectPageURL = new URL(chrome.runtime.getURL("windows/checkingPage.html"));
    redirectPageURL.searchParams.set("pendingURL", pendingDetails.url);

    await chrome.tabs.update(pendingDetails.tabId, { url: redirectPageURL.href })
}

async function asyncRedirectMode(pendingDetails) {
    let [verdict, threatType, service] = await checkURL(pendingDetails.url)

    if (verdict !== "UNSAFE")
        return;
    
    // one host navigation check
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

chrome.webRequest.onBeforeRequest.addListener(async (pendingDetails) => {
    let flagAct = await getFlagAct();
    if (!flagAct || pendingDetails.tabId === -1) {
        return;
    }

    let resLC = await checkInLC(pendingDetails.url);
    if (resLC !== undefined) {
        console.log("in cash");
        if (resLC[0] === "SAFE") {
            return;

        } else {
            let redirectPageURL = new URL(chrome.runtime.getURL("windows/tempRedirect.html"));
            redirectPageURL.searchParams.set("threatType", resLC[1]);
            redirectPageURL.searchParams.set("service", resLC[2]);

            await chrome.tabs.update(pendingDetails.tabId, { url: redirectPageURL.href })
        }
    }

    let hostInWhiteList = (await getWhiteList()).includes(hostFromUrl(pendingDetails.url));
    if (hostInWhiteList) {
        return;
    }

    let mode = await getMode();
    if (mode == "1") { 
        await syncRedirectMode(pendingDetails);

    } else {
        await asyncRedirectMode(pendingDetails);
    }
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