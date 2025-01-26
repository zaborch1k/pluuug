function getMSG(verdict) {
    return (verdict === "SAFE") ? "good site" : "bad site";
}

export function notify(tabId, verdict) {
    let msg = getMSG(verdict);

    chrome.scripting.executeScript({target: {tabId}, files: ['inject.js']}, () => {
        chrome.scripting.executeScript({
          target: {tabId},
          args: [msg],
          func: (...args) => showNotification(...args),
        });
    });
}

export function traceHosts(tabId, from, to) { // Temp for debug.
    chrome.scripting.executeScript({target: { tabId }, files: ['inject.js']}, () => {
        chrome.scripting.executeScript({
          target: { tabId },
          args: [`Going from ${from} to ${to}.`],
          func: (...args) => showNotification(...args)
        })
    })
}