import { 
    setPrevTabUrl, setPendingTabUrl,
    getPendingTabUrl, removeTabUrls,
    getWhiteList, setLang, updateBlockHistory
} from "./storageWorker.js";
import { checkURL } from "./checkURL.js";

(async () => {
    let searchParams = new URLSearchParams(document.location.search);
    let pendingURL = searchParams.get("pendingURL");

    await checkAndRedirect(pendingURL);
})()

async function checkAndRedirect(pendingURL) {
    let [verdict, threatType, service] = await checkURL(pendingURL);

    await new Promise(resolve => setTimeout(resolve, 10000)); // virustotal simulator

    let currentTab = await chrome.tabs.getCurrent();

    if (verdict !== "UNSAFE") { // return to url
        await chrome.tabs.update(currentTab.tabId, { url: pendingURL });
        return;
    }

    await updateBlockHistory(pendingURL, threatType);
    
    let redirectPageURL = new URL(chrome.runtime.getURL("windows/tempRedirect.html"));
    redirectPageURL.searchParams.set("threatType", threatType);
    redirectPageURL.searchParams.set("service", service);

    let tab = await chrome.tabs.update(currentTab.tabId, { url: redirectPageURL.href })
}
