import { getSuffPref } from './getSuffPref.js';
import { canonize } from './canonize.js';
import { safe_browsing } from '../../search_hashes_proto.js'  // <------------------ static code (https://github.com/protobufjs/protobuf.js/tree/master/cli)
import { getSHA256, getShortenHash } from './getHash.js';


async function checkSiteSafe(expressionHashPrefixes) {
    let url = new URL('https://safebrowsing.googleapis.com/v5/hashes:search');
    
    url.searchParams.set('key', 'AIzaSyAey0m-PguKPq9hI5Up7RNAcp1AEEHInv8');
    for (let pref of expressionHashPrefixes) {
        url.searchParams.append('hashPrefixes', pref);
    }
    url.href = decodeURI(url.href);

    let response = await fetch(url.toString(), {'method': 'GET'});
    if (response.status == 200) {
        return new Uint8Array(await response.arrayBuffer())
    }
}


export async function searchHashes(expressionHashPrefixes) {
    let result = await checkSiteSafe(expressionHashPrefixes);

    if (!result) {
        return
    }

    let SearchHashes = safe_browsing.V5.SearchHashesResponse
    let message = SearchHashes.decode(result);

    let object = SearchHashes.toObject(message, {
        longs: String,
        enums: String,
        bytes: String,
    });
    return Object.values(object);
}


// <----------------------- debug ---------------------------------> 

// let arr = [
//     "http://alok.cvfxz-biz.my.id"
// ]

// let canonized = canonize(arr[0]);
// let urls = getSuffPref(canonized);
// let hashList = urls.map((url) => getShortenHash(getSHA256(url, 'base64'), 'base64'))

// console.log(urls)

// searchHashes(hashList).then((res) => console.log(res))