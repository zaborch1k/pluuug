import {
    getPendingTabUrl, getPrevTabUrl,
    makeProceedWork, makeReturnWork,
    pushHostToWhiteList, getLang
} from "./storageWorker.js"
import { hostFromUrl } from "./utility.js"
import { setTextTempRedirect } from "./setText.js"

const lang = await getLang();

await initPageContent()

// async function httpGet(server, urlToCheck) {
//     const response = await fetch(`${server}/neuralnetwork?url=${urlToCheck}`)
//     const data = await response.text()
//     return data
// }

async function getActiveTab() {
    return await chrome.tabs.query({ lastFocusedWindow: true, active: true })
}

document.getElementById("readMore").onclick = async () => {
    let readMore = document.getElementById("readMore");

    if (readMore.textContent == "Скрыть" || readMore.textContent == "Hide") {
        document.getElementById("description").style.display = "none";
        document.getElementById("readMore").textContent = (lang == "ru") ? "Подробнее" : "Read more";

    } else {
        document.getElementById("description").style.display = "";
        document.getElementById("readMore").textContent = (lang == "ru") ? "Скрыть" : "Hide";
    }
}

document.getElementById("returnButton").onclick = async () => {
    let tabs = await getActiveTab()
    await makeReturnWork(tabs[0].id)

    let url = await getPrevTabUrl(tabs[0].id)
    await chrome.tabs.update(tabs[0].id, { url })
}

document.getElementById("proceedButton").onclick = async () => {
    let tabs = await getActiveTab()
    await makeProceedWork(tabs[0].id)

    let url = await getPendingTabUrl(tabs[0].id)
    await chrome.tabs.update(tabs[0].id, { url })
}

document.getElementById("whiteListButton").onclick = async () => {
    let tabs = await getActiveTab()
    await makeProceedWork(tabs[0].id)

    let url = await getPendingTabUrl(tabs[0].id)
    await pushHostToWhiteList(hostFromUrl(url))
    await chrome.tabs.update(tabs[0].id, { url })
}


async function initPageContent() {
    const currentTab = await chrome.tabs.getCurrent()
    console.log('currentTab:', currentTab, "activeTab:", await getActiveTab())

    let searchParams = new URLSearchParams(document.location.search);
    let threatType = searchParams.get("threatType");
    let service = searchParams.get("service");
    
    let pendingUrl = await getPendingTabUrl(currentTab.id)
    let prevUrl = await getPrevTabUrl(currentTab.id)

    console.log(pendingUrl, prevUrl)
    prevUrl = (prevUrl === pendingUrl) ? "https://www.google.com" : prevUrl

    document.getElementById("description").style.display = "none";

    setTextTempRedirect(lang, hostFromUrl(pendingUrl), service, threatType, hostFromUrl(prevUrl));
}