import {
    getPendingTabUrl, getPrevTabUrl,
    makeProceedWork, makeReturnWork,
    pushHostToWhiteList, getLang
} from "./storageWorker.js"
import { hostFromUrl } from "./utility.js"
import { getPrettyThreatType } from "./prettyData.js"
import { setTextTempRedirect } from "./setText.js"

await initPageContent()

// async function httpGet(server, urlToCheck) {
//     const response = await fetch(`${server}/neuralnetwork?url=${urlToCheck}`)
//     const data = await response.text()
//     return data
// }

document.getElementById("returnButton").onclick = () => {
    chrome.tabs.query({ lastFocusedWindow: true, active: true }, (tabs) => {
        makeReturnWork(tabs[0].id)
        
        getPrevTabUrl(tabs[0].id, (url) => {
            chrome.tabs.update(tabs[0].id, { url: url })
        })
    })
}

document.getElementById("proceedButton").onclick = () => {
    chrome.tabs.query({ lastFocusedWindow: true, active: true }, (tabs) => {
        makeProceedWork(tabs[0].id)

        getPendingTabUrl(tabs[0].id, (url) => {
            chrome.tabs.update(tabs[0].id, { url: url })
        })
    })
}

document.getElementById("whiteListButton").onclick = () => {
    chrome.tabs.query({ lastFocusedWindow: true, active: true }, (tabs) => {
        makeProceedWork(tabs[0].id)

        getPendingTabUrl(tabs[0].id, (url) => {
            pushHostToWhiteList(hostFromUrl(url))
            chrome.tabs.update(tabs[0].id, { url: url })
        })
    })
}


async function initPageContent() {
    const currentTab = await chrome.tabs.getCurrent()
    let lang = await getLang();

    let searchParams = new URLSearchParams(document.location.search);
    let threatType = searchParams.get("threatType");
    threatType = getPrettyThreatType(threatType, lang); // [!] add description for all threat types

    getPendingTabUrl(currentTab.id, (pendingUrl) => getPrevTabUrl(currentTab.id, (prevUrl) => {
        prevUrl = (prevUrl === pendingUrl) ? "https://www.google.com" : prevUrl
        
        setTextTempRedirect(lang, hostFromUrl(pendingUrl), threatType, hostFromUrl(prevUrl));
    }))
}