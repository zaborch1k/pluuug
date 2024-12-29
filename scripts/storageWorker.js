export function getFlagAct(callback) {
    chrome.storage.local.get("flagAct", function (result) {
        let flagAct = result.flagAct;
        callback(flagAct);
    });
}

export function pushFlagAct(value, callback) {
    chrome.storage.local.set({"flagAct" : value}, callback);
}