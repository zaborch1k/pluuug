import {
    getPendingTabUrl, getPrevTabUrl,
    makeProceedWork, makeReturnWork,
    pushHostToWhiteList, getLang
} from "./storageWorker.js"
import { hostFromUrl } from "./utility.js"

await initPageContent()

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

    getPendingTabUrl(currentTab.id, (pendingUrl) => getPrevTabUrl(currentTab.id, (prevUrl) => getLang((lang) => {
        prevUrl = (prevUrl === pendingUrl) ? "https://www.google.com" : prevUrl
        
        switch (lang) {
            case "ru-RU":
            case "ru":
                document.getElementById("header").textContent = `"${hostFromUrl(pendingUrl)}" небезопасен. Дальнейшее посещение может подвергнуть Вас риску.`
                document.getElementById("reason").textContent = `Причина недоверия: !TO BE AN INSERTED VARIABLE!`
                document.getElementById("returnButton").textContent = `Вернуться на "${hostFromUrl(prevUrl)}"`
                document.getElementById("proceedButton").textContent = `Продолжить в "${hostFromUrl(pendingUrl)}"`
                document.getElementById("whiteListButton").textContent = `Добавить "${hostFromUrl(pendingUrl)}" в исключения и продолжить`
                return
            default:
                document.getElementById("header").textContent = `"${hostFromUrl(pendingUrl)}" is known to be malicious. Do you still want to proceed?`
                document.getElementById("reason").textContent = `Reason for suspicion: !TO BE AN INSERTED VARIABLE!`
                document.getElementById("returnButton").textContent = `Return to "${hostFromUrl(prevUrl)}"`
                document.getElementById("proceedButton").textContent = `Proceed to "${hostFromUrl(pendingUrl)}"`
                document.getElementById("whiteListButton").textContent = `Whitelist "${hostFromUrl(pendingUrl)}" and proceed`
                return
        }
    })))
}