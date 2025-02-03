import { checkSafebrowsing } from "./safebrowsing/checkSafebrowsing.js";
import { checkVirustotal } from "./virus_total/checkVirustotal.js";
import { pushToLC } from "./storageWorker.js";

export async function checkURL(url) {
    let functions = [checkSafebrowsing, checkVirustotal];
    let listLC = ["LC_SB", "LC_VT"];

    let verdict, threatType, service
    for (let i = 0; i < functions.length; i++) {
        let fn = functions[i];
        let typeLC = listLC[i];
        
        [verdict, threatType, service] = await fn(url)
        await pushToLC(typeLC, url, [verdict, threatType, service])

        if (verdict == 'UNSAFE') {
            return ['UNSAFE', threatType, service]
        }
    }

    return ["SAFE", undefined, service]
}