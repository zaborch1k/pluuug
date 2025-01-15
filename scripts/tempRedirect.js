import { getPrevUrl, getPendingUrl } from "./storageWorker.js"
import { hostFromUrl } from "./utility.js"

initPageContent()

document.getElementById("returnButton").onclick = () => {
    chrome.tabs.query({ lastFocusedWindow: true, active: true }, (tabs) => {
        getPrevUrl((url) => {
            chrome.tabs.update(tabs[0].tabId, { url: url })
        })
    })

    // resetAllUrls()
}

document.getElementById("proceedButton").onclick = () => {
    chrome.tabs.query({ lastFocusedWindow: true, active: true }, (tabs) => {
        getPendingUrl((url) => {
            chrome.tabs.update(tabs[0].tabId, { url: url })
        })
    })

    // resetAllUrls()
}

function initPageContent() {
    getPendingUrl((pendingUrl) => { getPrevUrl((prevUrl) => {
        document.getElementById("header").textContent = `Are you sure you want to visit ${hostFromUrl(pendingUrl)}?`
        document.getElementById("returnButton").textContent = `Return to ${hostFromUrl(prevUrl)}`
        document.getElementById("proceedButton").textContent = `Proceed to ${hostFromUrl(pendingUrl)}`
    })})
}