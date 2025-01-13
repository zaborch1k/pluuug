export function getFlagAct(callback) {
    chrome.storage.local.get("flagAct", function (result) {
        let flagAct = result.flagAct;
        callback(flagAct);
    });
}

export function pushFlagAct(value, callback) {
    chrome.storage.local.set({"flagAct" : value}, callback);
}

// ----------------------------------------- DEBUG -----------------------------------------

// chrome.storage.local.remove("flagAct", function () {}); 

// -----------------------------------------------------------------------------------------

export function initDB() { 
    getFlagAct(async function (flagAct) {
        if (flagAct === undefined) {
            console.log("oooooooooooops we need to init db")
            await Promise.all([
                pushFlagAct(false, function (d) {}),

                chrome.storage.local.set({"gc" : ["its", "gc"]}, function (e) {}),

                chrome.storage.local.set({"lc" : []}, function (r) {}),

                chrome.storage.local.set({"se" : ["1", "2"]}, function (r) {}),

                chrome.storage.local.set({"mw" : ["3", "4"]}, function (r) {}),

                chrome.storage.local.set({"uws" : ["5", "6", "b"]}, function (r) {}),

                chrome.storage.local.set({"uwsa" : ["7", "8"]}, function (r) {}),

                chrome.storage.local.set({"pha" : ["9", "10"]}, function (r) {})
            ])
        }
    });
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

// works when alarms
export function updateAllListsOrSomething() { // <-------------------------------------- change my name [!]
    let API_KEY = "AIzaSyD7og67g_IRRPeByq-ZtJcp2O1rgcUk_Es";
    let url = new URL('https://safebrowsing.googleapis.com/v5alpha1/hashLists:batchGet')

    url.searchParams.set('key', API_KEY);
    url.searchParams.append('names', "gc");
    url.searchParams.append('names', "se");

    fetch(url.toString())
    .then(response => console.log(response.text()));

    // change lists and then write to storage
}
