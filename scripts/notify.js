function getMSG(verdict) {
    return (verdict == "SAFE") ? "good site" : "bad site";
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