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
                pushFlagAct(false, function (d) {}),

                chrome.storage.local.set({ ["lc"] : []})

                // other lists
            ])
        }
    });
}