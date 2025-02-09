import crypto from 'crypto'


async function getHashWebAsync(pref) {  // <-------------------------------------- `web crypto api` hashing func
    const encoder = new TextEncoder();
    const data = encoder.encode(pref);
    const arrBuf = await crypto.subtle.digest('SHA-256', data);
    const hashArray = new Uint8Array(arrBuf);
    const first4Bytes = hashArray.subarray(0, 4);
    return btoa(String.fromCharCode(...first4Bytes));
}


export function getSHA256(pref, encoding) {
    let hash = crypto
        .createHash('sha256')
        .update(pref, 'utf-8')
        .digest();
    return hash.toString(encoding);
}

export function getShortenHash(hash, encoding) {
    let hashBuffer = Buffer
        .from(hash, encoding)
        .subarray(0, 4);
    return hashBuffer.toString(encoding);
}

export function convertToEncoding(hash, fromEncoding, toEncoding) {
    let newHash = Buffer
        .from(hash, fromEncoding)
        .toString(toEncoding);
    return newHash;
}


// <----------------------- debug -------------------------->

// let l = getSHA256('hello', 'hex')
// console.log(l, getShortenHash(l, 'hex'))