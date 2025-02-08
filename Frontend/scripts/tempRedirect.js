import {
    getPendingTabUrl, getPrevTabUrl,
    makeProceedWork, makeReturnWork,
    pushHostToWhiteList, getLang
} from "./storageWorker.js"
import { hostFromUrl } from "./utility.js"
import { setTextTempRedirect } from "./setText.js"

const lang = await getLang();

await initPageContent();

// async function httpGet(server, urlToCheck) {
//     const response = await fetch(`${server}/neuralnetwork?url=${urlToCheck}`)
//     const data = await response.text()
//     return data
// }

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

async function getActiveTab() {
    return (await chrome.tabs.query({ active: true }))[0]
}

document.getElementById("returnButton").onclick = async () => {
    let tab = await getActiveTab()
    await makeReturnWork(tab.id)

    let url = await getPrevTabUrl(tab.id)
    window.location.replace(url);
}

document.getElementById("proceedButton").onclick = async () => {
    let tab = await getActiveTab()
    await makeProceedWork(tab.id)

    let url = await getPendingTabUrl(tab.id)
    window.location.replace(url);
}

document.getElementById("whiteListButton").onclick = async () => {
    let tab = await getActiveTab()
    await makeProceedWork(tab.id)

    let url = await getPendingTabUrl(tab.id)
    await pushHostToWhiteList(hostFromUrl(url))
    window.location.replace(url);
}


async function initPageContent() {
    const currentTab = await getActiveTab();

    let searchParams = new URLSearchParams(document.location.search);
    let threatType = searchParams.get("threatType");
    let service = searchParams.get("service");
    
    let pendingUrl = await getPendingTabUrl(currentTab.id)
    let prevUrl = await getPrevTabUrl(currentTab.id)

    prevUrl = !prevUrl ? "https://www.google.com" : prevUrl

    document.getElementById("description").style.display = "none";
    setTextTempRedirect(lang, hostFromUrl(pendingUrl), service, threatType, hostFromUrl(prevUrl));
}