import { checkSafebrowsing } from "./safebrowsing/checkSafebrowsing.js";
import { checkVirustotal } from "./virus_total/checkVirustotal.js";
import { getMode } from "./storageWorker.js";


export async function checkURL(url) {
    let functions = {"1": [checkSafebrowsing], "2": [checkVirustotal], "3": [checkSafebrowsing, checkVirustotal]}
    let mode = await getMode()
    let modeFuncs = functions[mode]
    console.log('mode:', mode)

    for (let fn of modeFuncs) {
        let [verdict, threatType] = await fn(url)

        if (verdict == 'UNSAFE') {
            return ['UNSAFE', threatType]
        }
    }

    return ['SAFE', undefined]
}