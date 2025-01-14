import { canonize } from "./canonize.js"
import { getSuffPref } from "./getSuffPref.js";
import { getList } from "./storageWorker.js"
import { updateList } from "./storageWorker.js"


// ---------------------------------------------- almost works ----------------------------------------------


function truncate(arr, bytes) {
    let truncArr = [];

    for (let elem of arr) {
        truncArr.push(elem.substring(0, bytes * 2));
    }
    return truncArr;
}

async function realTimeCheckWithoutLTL(expressionHashes) {
    let expressionHashPrefixes = truncate(expressionHashes, 4);
    let lc = await getList("lc"); // = local cache; [[expiration_1, fullHash_1], [expiration_2, fullHash_2], ... ]

    let currentTime = new Date();

    for (let i = 0; i < expressionHashPrefixes.length; i++) {
        let expressionHashPrefix = expressionHashPrefixes[i];

        for (let j = 0; j < lc.length; j++) {
            let arr = lc[j];

            if (arr[1].startsWith(expressionHashPrefix)) {
                if (currentTime > arr[0]) { // <------------------------------ `expiration` may be in wrong format [!]
                    lc.splice(j, 1);
                    updateList("lc", lc);

                } else {
                    expressionHashPrefixes.splice(i, 1);

                    // to avoid incorrect indexing 
                    let expressionHash = expressionHashes[i];
                    expressionHashes.splice(i, 1);
                    expressionHashes.push(expressionHash);

                    for (let a of lc) { 
                        if (a[1] == expressionHash) {
                            return "UNSAFE";
                        }
                    }
                }
            }
        }

        /* 
        method hashes.search

        send expressionHashPrefixes
        
        [!] If an error occurred (including network errors, HTTP errors, etc), return UNSURE
        */
    }

    let response = []; // = response received from the SB server

    for (let [expiration, fullHash] of response) { // <---------------------------------------------------------- [!]
        lc.push([expiration, fullHash]);
    }

    updateList("lc", lc);

    for (let [expiration, fullHash] of response) { 
        for (let hash of expressionHashes) {
            if (hash == fullHash) {
                return "UNSAFE";
            }
        }
    }

    return "SAFE";
}


export async function checkURL(url) {
    let u = canonize(url);
    let expressions = getSuffPref(u);
    let expressionHashes = []; // <---------------------------------------------------------- get it from `hashing` [!]

    let verdict = await realTimeCheckWithoutLTL(expressionHashes);

    console.log(url);
    console.log(expressions);
    console.log(expressionHashes);
    console.log(verdict);
    console.log("");

    return verdict;
}