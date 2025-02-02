import { checkSafebrowsing } from "./safebrowsing/checkSafebrowsing.js";
import { checkVirustotal } from "./virus_total/checkVirustotal.js";
import { getMode, getLC, pushToLC } from "./storageWorker.js";

async function checkInLC(modeLC, url) {
    let res = undefined

    for (let typeLC of modeLC) {
        let LC = await getLC(typeLC)
        res = LC[url]

        if (res === undefined) {
            continue
        }

        if (res[0] == "UNSAFE") {
            return res
        }
    }

    return res
}


export async function checkURL(url) {
    let functions = {"1": [checkSafebrowsing], "2": [checkVirustotal], "3": [checkSafebrowsing, checkVirustotal]}
    let listLC = {"1": ["LC_SB"], "2": ["LC_VT"], "3": ["LC_SB", "LC_VT"]}

    let mode = await getMode()
    let modeFuncs = functions[mode]
    let modeLC = listLC[mode]

    console.log('mode:', mode)

    let resLC = await checkInLC(modeLC, url) // [?] add noLC mode
    if (resLC !== undefined) {
        return resLC
    }

    let verdict, threatType, service
    for (let i = 0; i < modeFuncs.length; i++) {
        let fn = modeFuncs[i];
        let typeLC = modeLC[i];
        
        [verdict, threatType, service] = await fn(url)
        await pushToLC(typeLC, url, [verdict, threatType, service])

        if (verdict == 'UNSAFE') {
            return ['UNSAFE', threatType, service]
        }
    }

    return ["SAFE", undefined, service]
}