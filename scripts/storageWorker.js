// ------------------------------------ flag access logic ------------------------------------

export function getFlagAct(callback) {
    chrome.storage.local.get("flagAct", function (result) {
        let flagAct = result.flagAct;
        callback(flagAct);
    });
}

export function pushFlagAct(value, callback = () => {}) {
    chrome.storage.local.set({"flagAct" : value}, callback);
}

// ------------------------------------ Whitelist logic ------------------------------------

export function pushHostToWhiteList(host, callback = () => {}) {
    chrome.storage.local.get("whiteList", (result) => {
        let list = result.whiteList
        list.push(host)

        chrome.storage.local.set({ "whiteList": list }, callback)
    })
}

export function getWhiteList(callback) {
    chrome.storage.local.get("whiteList", (result) => {
        callback(result.whiteList)
    })
}

export function isHostInWhiteList(host, callback) {
    chrome.storage.local.get("whiteList", (result) => {
        let list = result.whiteList
        
        callback(list.includes(host))
    })
}

// ------------------------------------ Cut the memory of a deleted tab ------------------------------------

export function removeTabUrls(tabId, callback = () => {}) {
    chrome.storage.session.remove([`${tabId}pendingUrl`, `${tabId}prevUrl`], callback)
}

// ------------------------------------ Work with pending urls for a specified tab ------------------------------------

export function getPendingTabUrl(tabId, callback) {
    chrome.storage.session.get(`${tabId}pendingUrl`, (result) => {
        callback(result[`${tabId}pendingUrl`])
    })
}

export function setPendingTabUrl(tabId, url, callback = () => {}) {
    let key = `${tabId}pendingUrl`
    chrome.storage.session.set({ [key]: url }, callback)
}

// ------------------------------------ Work with previous urls for a specified tab ------------------------------------

export function getPrevTabUrl(tabId, callback) {
    chrome.storage.session.get(`${tabId}prevUrl`, (result) => {
        callback(result[`${tabId}prevUrl`])
    })
}

export function setPrevTabUrl(tabId, url, callback = () => {}) {
    if (url.substring(0, 16) === "chrome-extension")
        return
    let key = `${tabId}prevUrl`
    chrome.storage.session.set({ [key]: url }, callback)
}

// ------------------------------------ Logic to be executed after either proceeding or returning ------------------------------------

export function makeProceedWork(tabId, callback = () => {}) {
    getPendingTabUrl(tabId, (url) => {
        setPrevTabUrl(tabId, url, callback)
    })
}

export function makeReturnWork(tabId, callback = () => {}) {
    getPrevTabUrl(tabId, (url) => {
        setPendingTabUrl(tabId, url, callback)
    })
}

// ------------------------------------ work with lists ------------------------------------

function get(key) {
    return new Promise(function(resolve, reject) {
        chrome.storage.local.get(key, function(result) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError.message);

            } else {
                resolve(result[key]);
            }
        });
    });
}

export async function getList(name) {
    let list = await get(name);
    return list;
}


export async function updateList(name, list) {
    await chrome.storage.local.set({ [name] : list});
}

// -----------------------------------------------------------------------------------------


// ----------------------------------------- DEBUG -----------------------------------------

// chrome.storage.local.remove("flagAct", function () {}); 

// -----------------------------------------------------------------------------------------


export function initDB() { 
    getFlagAct(async function (flagAct) {
        if (flagAct === undefined) {
            console.log("initDB.....");
            await Promise.all([
                pushFlagAct(false),

                chrome.storage.local.set({ "whiteList" : []}),

                chrome.storage.local.set({ "lc" : []})

                // other lists
            ])
        }
    });
}