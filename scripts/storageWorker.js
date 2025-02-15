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
    await set({ [`${tabId}pendingUrl`]: url }, 'session')
}

// ------------------------------------ Work with previous urls for a specified tab ------------------------------------

export async function getPrevTabUrl(tabId) {
    let prevUrl = await get(`${tabId}prevUrl`, 'session')
    prevUrl = !prevUrl ? "https://www.google.com" : prevUrl
    return prevUrl
}

export async function setPrevTabUrl(tabId, url) {
    await set({ [`${tabId}prevUrl`]: url }, 'session')
}

// ------------------------------------ Logic to be executed after either proceeding or returning ------------------------------------

export async function makeProceedWork(tabId) { // FIXME: possible code duplication
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


// ------------------------------------ control tab switching ------------------------------------

export async function setControlCurrentTab(value) {
    await set({"controlCurrentTab" : value}, "session")
}

export async function getControlCurrentTab() {
    return await get("controlCurrentTab", "session")
}

// ----------------------------------------- caching -----------------------------------------

async function setSLC(sLC) {
    await set({'sLC' : sLC}, "session")
}

export async function getSLC() {
    return await get('sLC', "session")
}

export async function pushToSLC(url, urlInfo) {
    let sLC = await getSLC();
    sLC[url] = urlInfo;
    await setSLC(sLC);
}

// -----------------------------------------------------------------------------------------

export async function initDB() { 
    let isDB = await get("isDB");

    if (isDB !== undefined) {
        return
    }
    
    await Promise.all([
        set({ "isDB": true }),

        setFlagAct(false),
            
        setLang(chrome.i18n.getUILanguage()),

        set({ "whiteList": [] }),

        set({ "lc": [] }),

        set({ "mode": "2" }),

        set({ "blockHistory": [] })
    ])

    console.log('init completed!')
}

export async function initSDB() {
    let isSDB = await get("isSDB", "session")

    if (isSDB !== undefined) {
        return
    }

    await Promise.all([
        set({ "isSDB": true }, "session"),

        set({ "sLC": {} }, "session"),

        setControlCurrentTab("white-list")
    ])
}
