import {
    getPendingTabUrl, getPrevTabUrl,
    makeProceedWork, makeReturnWork,
    pushHostToWhiteList
} from "./storageWorker.js"
import { hostFromUrl } from "./utility.js"

initPageContent()

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


function initPageContent() {
    chrome.tabs.query({ "lastFocusedWindow": true, active: true }, (tabs) => {
        getPendingTabUrl(tabs[0].id, (pendingUrl) => { getPrevTabUrl(tabs[0].id, (prevUrl) => {
            document.getElementById("header").textContent = `Are you sure you want to visit ${hostFromUrl(pendingUrl)}?`
            document.getElementById("returnButton").textContent = `Return to ${hostFromUrl(prevUrl)}`
            document.getElementById("proceedButton").textContent = `Proceed to ${hostFromUrl(pendingUrl)}`
            document.getElementById("whiteListButton").textContent = `Add ${hostFromUrl(pendingUrl)} to whitelist`
        })})
    })
}