import { canonize } from "./canonize.js"
import { getSuffPref } from "./getSuffPref.js";
import { getList } from "../storageWorker.js"
import { updateList } from "../storageWorker.js"
import { getSHA256, getShortenHash, convertToEncoding } from "./getHash.js";
import { searchHashes } from "./fetchFuncs.js";


// ---------------------------------------------- almost works ----------------------------------------------


async function realTimeCheckWithoutLTL(expressionHashes) {
    let expressionHashPrefixes = expressionHashes.map((hash) => getShortenHash(hash, 'hex'));
    let lc = await getList("lc"); // = local cache; [[expiration_1, fullHash_1], [expiration_2, fullHash_2], ... ] fullHash_n: a sha256 hash encoded in HEX

    let currentTime = new Date();

    for (let i = expressionHashPrefixes.length - 1; i >= 0; i--) {
        // i-- to avoid incorrect indexing 
        let expressionHashPrefix = expressionHashPrefixes[i];;

        for (let j = lc.length - 1; j >= 0; j--) {
            // j-- to avoid incorrect indexing 
            let arr = lc[j];

            if (arr[1].startsWith(expressionHashPrefix)) {
                if (currentTime > arr[0]) {
                    lc.splice(j, 1);
                    updateList("lc", lc);
                    
                } else {
                    expressionHashPrefixes.splice(i, 1);

                    let expressionHash = expressionHashes[i];

                    for (let a of lc) { 
                        if (a[1] == expressionHash) {
                            return "UNSAFE";
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
        return "SAFE"
    }
        

    let [fullHashes, expiration] = response

    console.log(`safebrowsing expiration ${JSON.stringify(expiration)}`, expiration)
    for (let fullHashObj of fullHashes) {
        console.log(`safebrowsing fullHash ${JSON.stringify(fullHashObj.fullHash)}`)
                
        let date = new Date();
        date.setSeconds(date.getSeconds() + expiration.seconds);
                
        let hexHash = convertToEncoding(fullHashObj.fullHash, 'base64', 'hex');

        lc.push([date, hexHash]);
    }
        
    updateList("lc", lc);
        
    for (let fullHashObj of fullHashes) { 
        let hexHash = convertToEncoding(fullHashObj.fullHash, 'base64', 'hex');
        for (let hash of expressionHashes) {
            console.log('safebrowsing comparing hashes:')
            console.log(hexHash, hash)
            if (hash == hexHash) {
                return "UNSAFE";
            }
        }
    }

    return "SAFE";
}


export async function checkSafebrowsing(url) {
    console.log('safebrowsing start scanning')
    let u = canonize(url);
    let expressions = getSuffPref(u);
    let expressionHashes = expressions.map(item => getSHA256(item, 'hex'));

    let verdict = await realTimeCheckWithoutLTL(expressionHashes);
    console.log('safebrowsing scanning completed', verdict)

    return verdict;
}

