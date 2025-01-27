import { scanURL } from "./fetchFuncs.js";


// ---------------------------------------------- almost works ----------------------------------------------


export async function checkVirustotal(url) {
    console.log('virustotal start scanning');
    let stats = await scanURL(url);
    console.log(`virustotal scan completed: ${JSON.stringify(stats)}`);

    if (!stats) {
        return ['SAFE', undefined]
    }

    if (stats.malicious + stats.suspicious >= 3) {
        console.log('stats: ', stats.malicious, stats.suspicious, stats.malicious + stats.suspicious >= 3);
        return ['UNSAFE', undefined];
    }
    return ['SAFE', undefined];
}
