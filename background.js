import { initDB, initSDB } from "./scripts/storageWorker.js"
import { getFlagAct } from "./scripts/storageWorker.js"
import { 
    setPrevTabUrl, setPendingTabUrl,
    getPendingTabUrl, removeTabUrls,
    getWhiteList, setLang, updateBlockHistory, getMode, getSLC
} from "./scripts/storageWorker.js"
import { checkURL } from "./scripts/checkURL.js"
import { hostFromUrl } from "./scripts/utility.js"
import { openWindow } from "./scripts/utility.js"

(async () => {
    await initDB()
    await initSDB()
})()

async function checkInCash(url) {
    let LCres = (await getSLC())[url];

    if (LCres === undefined)
        return [undefined, undefined, undefined];

    return LCres;
}

async function checkURLIsSecure(penURL, penTabID) {
    // one host navigation check [?] => Yes, but it is also responsible for ensuring that the checking does not work after the continue button.
    let previousPendingUrl = await getPendingTabUrl(penTabID)
    if (hostFromUrl(previousPendingUrl) === hostFromUrl(penURL))
        return true;

    let prevURL = await getPendingTabUrl(penTabID); // previous pending url == current prev url (in the context of single tab)
    if (prevURL)
        await setPrevTabUrl(penTabID, prevURL);  // for return button
    await setPendingTabUrl(penTabID, penURL); // for proceed button

    let hostInWhiteList = (await getWhiteList()).includes(hostFromUrl(penURL));
    if (hostInWhiteList)
        return true;

    let urlInfo = await checkInCash(penURL);
    if (urlInfo[0] === "SAFE")
        return true;

    return urlInfo;
}

async function goToTempRedirect(penURL, penTabID, threatType, service) {
    await updateBlockHistory(penURL, threatType);

    // redirect to tempRedirect
    let tempRedirectURL = new URL(chrome.runtime.getURL("windows/tempRedirect.html"));
    tempRedirectURL.searchParams.set("threatType", threatType);
    tempRedirectURL.searchParams.set("service", service);

    try {
        await chrome.tabs.update(penTabID, { url: tempRedirectURL.href });
    } catch (err) {
        console.log('tab was closed before checking was completed')
    }
}

async function checkFirstMode(pendingDetails) {
    let penURL = pendingDetails.url;
    let penTabID = pendingDetails.tabId;

    let res = await checkURLIsSecure(penURL, penTabID);
    if (res === true){
        return;
    }
    let [verdict, threatType, service] = res;

    let url = chrome.runtime.getURL("windows/checkingPage.html");
    await chrome.tabs.update(penTabID, { url });
    await chrome.history.deleteUrl({ url });

    if (verdict === undefined) {
        [verdict, threatType, service] = await checkURL(penURL);
    }

    if (verdict == "SAFE") {
        // redirect back to the website
        await chrome.tabs.update(penTabID, { url: penURL });
        return;
    }

    await goToTempRedirect(penURL, penTabID, threatType, service)
}

chrome.webRequest.onBeforeRequest.addListener(async (pendingDetails) => {
    if (pendingDetails.url === "https://yandex.ru/search/pre") return;
    
    let flagAct = await getFlagAct();
    let mode = await getMode();
    if (!flagAct || pendingDetails.tabId === -1 || mode != '1')
        return;

    console.log('first mode')
    await checkFirstMode(pendingDetails);
},
{
    urls: ["https://*/*", "http://*/*"],
    types: ["main_frame"]
});

async function checkSecondMode(tab) {
    let penURL = tab.url;
    let penTabID = tab.id;

    let res = await checkURLIsSecure(penURL, penTabID);
    if (res === true){
        return;
    }
    let [verdict, threatType, service] = res;

    if (verdict === undefined) {
        [verdict, threatType, service] = await checkURL(penURL);
    }

    if (verdict == "SAFE") {
        return;
    }

    await goToTempRedirect(penURL, penTabID, threatType, service)
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    let flagAct = await getFlagAct();
    let mode = await getMode();

    if (!flagAct || mode != '2' || changeInfo.status != 'loading')
        return;
    if (!(/https?:\/\/.*/u).test(tab.url)) 
        return;

    console.log('second mode')
    await checkSecondMode(tab)
})

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

chrome.runtime.onInstalled.addListener(async (object) => {
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        await openWindow("faq");
    }
});