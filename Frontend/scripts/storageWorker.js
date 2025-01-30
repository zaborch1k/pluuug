// ------------------------------------ helper funcs ------------------------------------

async function get(key, st='local') {
    return (await chrome.storage[st].get(key))[key]
}

async function set(obj, st='local') {
    await chrome.storage[st].set(obj)
}

// ------------------------------------ flag access logic ------------------------------------

export async function getFlagAct() {
    return await get("flagAct")
}

export async function setFlagAct(value) {
    await set({"flagAct" : value});
}

// ------------------------------------ Whitelist logic ------------------------------------

export async function pushHostToWhiteList(host) {
    let list = await get("whiteList")
    list.push(host)
    await set({ "whiteList": list })
}

export async function getWhiteList() {
    return await get("whiteList")
}

// ------------------------------------ BlockHistory logic ------------------------------------

export async function updateBlockHistory(url, reason) {
    let date = (new Date()).toISOString().toString(); // ???

    let blockHistory = await getList("blockHistory")

    blockHistory.push([date, url, reason]);
    await updateList("blockHistory", blockHistory);
}

// ------------------------------------ Language logic ------------------------------------

export async function setLang(lang) {
    await set({ lang })
}

export async function getLang() {
    return await get("lang")
}

// ------------------------------------ mode logic -----------------------------------------------

export async function setMode(num) {
    await set({ "mode": num })
}

export async function getMode() {
    return await get('mode')
}

// ------------------------------------ Cut the memory of a deleted tab ------------------------------------

export async function removeTabUrls(tabId) {
    await chrome.storage.session.remove(
        [
            `${tabId}pendingUrl`,
            `${tabId}prevUrl`
        ]
    )
}

// ------------------------------------ Work with pending urls for a specified tab ------------------------------------

export async function getPendingTabUrl(tabId) {
    return await get(`${tabId}pendingUrl`, 'session')
}

export async function setPendingTabUrl(tabId, url) {
    if (url.startsWith("chrome-extension"))
        return
    
    await set({ [`${tabId}pendingUrl`]: url }, 'session')
}

// ------------------------------------ Work with previous urls for a specified tab ------------------------------------

export async function getPrevTabUrl(tabId) {
    return await get(`${tabId}prevUrl`, 'session')
}

export async function setPrevTabUrl(tabId, url) {
    if (url.startsWith("chrome-extension"))
        return
    
    await set({ [`${tabId}prevUrl`]: url }, 'session')
}

// ------------------------------------ Logic to be executed after either proceeding or returning ------------------------------------

export async function makeProceedWork(tabId) {
    let url = await getPendingTabUrl(tabId)
    await setPrevTabUrl(tabId, url)
}

export async function makeReturnWork(tabId) {
    let url = await getPrevTabUrl(tabId)
    await setPendingTabUrl(tabId, url)
}

// ------------------------------------ work with lists ------------------------------------

export async function getList(name) {
    return await get(name);
}


export async function updateList(name, list) {
    await set({ [name] : list}); 
}


// ----------------------------------------- DEBUG -----------------------------------------

// chrome.storage.local.remove("flagAct", function () {}); 

// -----------------------------------------------------------------------------------------


export async function initDB() { 
    let flagAct = await getFlagAct()

    if (flagAct !== undefined) {
        return
    }

    console.log("initDB.....");
        
    await Promise.all([
        setFlagAct(false),
            
        setLang(chrome.i18n.getUILanguage()),

        setMode("1"), // ???

        set({ "whiteList": [] }),

        set({ "lc": [] }),

        set({ "mode": "3" }),

        set({ "blockHistory": [] })
    ])
}