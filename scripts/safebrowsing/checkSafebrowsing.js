import { canonize } from "./canonize.js"
import { getSuffPref } from "./getSuffPref.js";
import { getList } from "../storageWorker.js"
import { updateList } from "../storageWorker.js"
import { getSHA256, getShortenHash, convertToEncoding } from "./getHash.js";
import { searchHashes } from "./fetchFuncs.js";

async function realTimeCheckWithoutLTL(expressionHashes) {
    let expressionHashPrefixes = expressionHashes.map((hash) => getShortenHash(hash, 'hex'));
    let lc = await getList("lc"); // = local cache; [[expiration_1, fullHash_1, reason_1], ... ] fullHash_n: a sha256 hash encoded in HEX

    let currentTime = new Date();

    for (let i = expressionHashPrefixes.length - 1; i >= 0; i--) {
        // i-- to avoid incorrect indexing 
        let expressionHashPrefix = expressionHashPrefixes[i];;

        for (let j = lc.length - 1; j >= 0; j--) {
            // j-- to avoid incorrect indexing 
            let arr = lc[j];

            if (arr[1].startsWith(expressionHashPrefix)) {
                let expiration = new Date(arr[0]);
                if (currentTime > expiration) {
                    lc.splice(j, 1);
                    await updateList("lc", lc);
                    
                } else {
                    expressionHashPrefixes.splice(i, 1);

                    let expressionHash = expressionHashes[i];

                    for (let a of lc) { 
                        if (a[1] == expressionHash) {
                            return ["UNSAFE", a[2]];
                        }
                    }
                }
            }
        }
    }

    let base64Hashes = expressionHashPrefixes.map(hash => convertToEncoding(hash, 'hex', 'base64'))
    let response = await searchHashes(base64Hashes); // = response received from the SB server
    console.log(`safebrowsing response ${JSON.stringify(response)}`)

    if (!response || response.length != 2) {
        return ["SAFE", undefined]
    }
        

    let [fullHashes, expiration] = response

    console.log(`safebrowsing expiration ${JSON.stringify(expiration)}`, expiration)
    for (let fullHashObj of fullHashes) {
        console.log(`safebrowsing fullHash ${JSON.stringify(fullHashObj.fullHash)}`)

        let threatType = fullHashObj.fullHashDetails[0].threatType;

        let dt = new Date();
        dt.setSeconds(expiration.seconds);
        dt = dt.toString();
                
        let hexHash = convertToEncoding(fullHashObj.fullHash, 'base64', 'hex');

        lc.push([dt, hexHash, threatType]);
    }
        
    await updateList("lc", lc);
        
    for (let fullHashObj of fullHashes) { 
        let threatType = fullHashObj.fullHashDetails[0].threatType;
        let hexHash = convertToEncoding(fullHashObj.fullHash, 'base64', 'hex');

        console.log('safebrowsing comparing hashes:')
        for (let hash of expressionHashes) {
            console.log(hexHash, hash)
            if (hash == hexHash) {
                return ["UNSAFE", threatType];
            }
        }
    }

    return ["SAFE", undefined];
}


export async function checkSafebrowsing(url) {
    console.log('safebrowsing start scanning')
    let u = canonize(url);
    let expressions = getSuffPref(u);
    let expressionHashes = expressions.map(item => getSHA256(item, 'hex')); // [verdict, threatType]

    let res = await realTimeCheckWithoutLTL(expressionHashes);
    console.log('safebrowsing scanning completed', res)
    res.push("Safebrowsing")

    return res;
}