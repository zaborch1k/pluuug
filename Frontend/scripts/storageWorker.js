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

// ------------------------------------ BlockHistory logic ------------------------------------

export async function updateBlockHistory(url, reason) {
    let date = new Date();
    date = date.toISOString();

    getList("blockHistory").then((blockHistory) => {
        date = date.toString();

        blockHistory.push([date.toString(), url, reason]);
        updateList("blockHistory", blockHistory);
    });
}

// ------------------------------------ Language logic ------------------------------------

export function setLang(lang, callback = () => {}) {
    chrome.storage.local.set({ "lang": lang }, callback)
}
export async function getLang() {
    let res = await chrome.storage.local.get("lang");
    return res.lang;
}

// ------------------------------------ mode logic -----------------------------------------------

export async function setMode(num) {
    await set({ "mode": num })
}

export async function getMode() {
    return await get('mode')
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
    if (url.startsWith("chrome-extension"))
        return

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
    if (url.startsWith("chrome-extension"))
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

function set(obj) {
    return new Promise(function(resolve, reject) {
        chrome.storage.local.set(obj, () => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError.message);

            } else {
                resolve();
            }
        });
    });
}

export async function getList(name) {
    let list = await get(name);
    return list;
}


export async function updateList(name, list) {
    await chrome.storage.local.set({ [name] : list});  // set(obj) [!]
}

// -----------------------------------------------------------------------------------------


// ----------------------------------------- DEBUG -----------------------------------------

// chrome.storage.local.remove("flagAct", function () {}); 

// -----------------------------------------------------------------------------------------


export function initDB() { 
    getFlagAct(async function (flagAct) {
        if (flagAct !== undefined) {
            return
        }

        console.log("initDB.....");
        
        await Promise.all([
            pushFlagAct(false),
            
            setLang(chrome.i18n.getUILanguage()),

            setMode("1"),

            chrome.storage.local.set({ "whiteList" : [] }),

            chrome.storage.local.set({ "lc" : [] }),

            chrome.storage.local.set({ "mode": "3" }),

            chrome.storage.local.set({ "blockHistory" : []})

            // other lists
        ])
    });
}