export function getFlagAct(callback) {
    chrome.storage.local.get("flagAct", function (result) {
        let flagAct = result.flagAct;
        callback(flagAct);
    });
}

export function pushFlagAct(value, callback) {
    chrome.storage.local.set({"flagAct" : value}, callback);
}


// ------------------------------------ work with lists ------------------------------------

export function getLocalThreatLists() {
    return ["se", "mw", "uws", "uwsa", "pha"];
}

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


function getThreatListsUpdates() {
    let url = new URL('https://safebrowsing.googleapis.com/v5alpha1/hashLists:batchGet')
    let API_KEY = "AIzaSyD7og67g_IRRPeByq-ZtJcp2O1rgcUk_Es";
    let localThreatLists = getLocalThreatLists();

    url.searchParams.set('key', API_KEY);

    for (let list of localThreatLists) {
        url.searchParams.append('names', list);
    }

    fetch(url.toString())
    .then(response => console.log(response.text()));
}

// ----------------------------------- work with alarms ------------------------------------

export async function setAlarm(name, time) { // <------------------------- `time` in minutes
    await chrome.alarms.create(name, { delayInMinutes: time });
}

chrome.alarms.onAlarm.addListener((alarm) => {
    getThreatListsUpdates();

    let expiration = 20; // <------------------------ get it from `getThreatListsUpdates()`

    // [!]  change lists and write them to storage

    setAlarm("updateLTL", expiration);
});

// -----------------------------------------------------------------------------------------


// ----------------------------------------- DEBUG -----------------------------------------

// chrome.storage.local.remove("flagAct", function () {}); 

// -----------------------------------------------------------------------------------------

async function initLTL() {
    let localThreatLists = getLocalThreatLists();

    for (let list of localThreatLists) {
        chrome.storage.local.set({ [list] : []});
    }
}

export function initDB() { 
    getFlagAct(async function (flagAct) {
        if (flagAct === undefined) {
            console.log("initDB.....");
            await Promise.all([
                pushFlagAct(false, function (d) {}),

                initLTL(),

                chrome.storage.local.set({ ["lc"] : []})

                // other lists
            ])

            setAlarm("updateLTL", 0);

        }
    });
}