import { checkIP } from "../scripts/checkIP.js"
export const canonize = (url) => funCanonize(url);

function funCanonize(url) {
    url = canonizeURL(url);

    url.hostname = canonizeHost(url.hostname);
    url.pathname = canonizePath(url.pathname);
    url.href = percentEscape(url.href)

    return url.href;
}

function canonizeURL(url) {
    let strUrl = encodeURI(url);

    let re = /^[\x00-\x7F]*$/; // check if ascii only
    
    if (!re.test(url)) {  
        // [?] add punycode package
        //url = punycode.encode(url);
        console.log("do punycode");
    }

    strUrl = strUrl.replace("0x09", '');
    strUrl = strUrl.replace("0x0d", '');
    strUrl = strUrl.replace("0x0a", '');
    strUrl = strUrl.replace(/#frag$/, '');
    url = new URL(strUrl);

    if (strUrl[strUrl.length - 1] != '/') {
        strUrl += '/';
        url = new URL(strUrl);
    }

    strUrl = decodeURI(url);
    url = new URL(strUrl);
    return url;
}


function canonizeHost(hostname) {
    hostname = hostname.replace(/^\.*/, '');
    hostname = hostname.replace(/\.*$/, '');
    hostname = hostname.replace(/\.+/g, '.');

    hostname = checkIP(hostname);

    hostname = hostname.toLowerCase();
    return hostname;
}


function canonizePath(path) {
    path = path.replace('/./', '/');
    path = path.replace(/\/[^\/]*\/\.\.\//g, '/');
    path = path.replace(/\/+/g, '/');
    return path;
}


// percent-escape if <= ASCII 32, >= 127, #, %. The escapes should use uppercase hex characters

function percentEscape(strUrl) {
    let newStrUrl = '';
    for (const char of strUrl) {
        let asciiCode = char.charCodeAt(0);

        if (asciiCode <= 32 || asciiCode >= 127 || char == '#' || char == '%') {
            newStrUrl += encodeURIComponent(char);

        } else {
            newStrUrl += char;
        }
    }
    return strUrl;
}
