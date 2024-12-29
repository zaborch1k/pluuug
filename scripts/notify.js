function getMSG(verdict) {
    let msg;

    if (verdict) {
        msg = "good site";

    } else {
        msg = "bad site";
    }
    
    return msg;
}

export function notify (tabId, verdict) {
    let msg = getMSG(verdict);

    chrome.scripting.executeScript({target: {tabId}, files: ['inject.js']}, () => {
        chrome.scripting.executeScript({
          target: {tabId},
          args: [msg],
          func: (...args) => showNotification(...args),
        });
    });
}