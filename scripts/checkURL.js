import { checkSafebrowsing } from "./safebrowsing/checkSafebrowsing.js";
import { checkVirustotal } from "./virus_total/checkVirustotal.js";
import { checkYSafeBrowsing } from "./checkYSafeBrowsing.js";
import { pushToSLC } from "./storageWorker.js";

export async function checkURL(url) {
    console.log("-------------------- NEW CHECK : ", url)
    let functions = [checkYSafeBrowsing, checkSafebrowsing, checkVirustotal];

    let verdict, threatType, service
    for (let fn of functions) {
        [verdict, threatType, service] = await fn(url)
        await pushToSLC(url, [verdict, threatType, service])

        if (verdict == 'UNSAFE') {
            return ['UNSAFE', threatType, service]
        }
    }

    return ["SAFE", undefined, service]
}