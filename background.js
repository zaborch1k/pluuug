function checkIPV4(str) {
    let arr = str.split('.');

    let len = arr.length;
    let limit = Number("11111111"); // max value of ip octet -> 255 (= 0b1111 1111)

    let re = new RegExp(/(^0b([0-1])+$)|(^0o([0-7])+$)|(^0x([0-9]|[A-F]|[a-f])+$)|(^([0-9])+$)/);

    for (let i = 0; i < len; i++) {
        // check if not dec/bin/oct/hex 
        if (!re.test(arr[i])) { 
            return str;
        }

        // check if not in [0-255] 
        if (i != len - 1 || i == 3) {
            let binValue = Number(Number((arr[i])).toString(2));
            if (binValue > limit) {
                return str;
            }
        }
    }

    if (len > 4) {
        return str;

    } else if (len != 4) {
        let bitsNeed = (4 - len + 1) * 8;
        let rest = Number((arr[len - 1])).toString(2);

        if (rest.length > bitsNeed) { 
            return str;
        }

        rest = rest.padStart(bitsNeed, '0');
        arr.splice(len - 1);

        let ind = 0;
        for (let i = len - 1; i < 4; i++) {
            let octet = rest.substring(ind, ind + 8);
            if (Number(octet) > limit) {
                return str;
            }
            arr.push("0b" + octet);
            ind += 8;
        }
    }
    str = Number((arr[0])).toString(10) + '.' + Number((arr[1])).toString(10) + '.' + Number((arr[2])).toString(10) + '.' + Number((arr[3])).toString(10);
    return str;
}

function checkIPV6(str) {
    return str;
}

function canonizeURL(url) {
    let re, strUrl;
    strUrl = encodeURI(url);

    // check if ascii only
    re = /^[\x00-\x7F]*$/;
    
    if (!re.test(url)) {  
        // [?] add punycode package
        //url = punycode.encode(url);
        console.log("do punycode");
    }

    url = new URL(strUrl);

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

    hostname = checkIPV4(hostname);
    hostname = checkIPV6(hostname);

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

function canonize(url) {
    url = canonizeURL(url);

    url.hostname = canonizeHost(url.hostname);
    url.pathname = canonizePath(url.pathname);
    url.href = percentEscape(url.href)

    return url.href;
}


function checkURL(url) {
    let flag = Math.trunc(Math.random() * (1 - 0 + 1) + 0);
    if (flag == 0) {
        return false;
    } 
    return true;
}

function injectScriptWithAlert(tabId) {
    chrome.tabs.query({lastFocusedWindow: true, active: true},function(tab){
        let url, msg;
        url = canonize(tab[0].url);

        if (checkURL(url)) {
            msg = "good site";

        } else {
            msg = "bad site";
        }

        chrome.scripting.executeScript({target: {tabId}, files: ['inject.js']}, () => {
            chrome.scripting.executeScript({
              target: {tabId},
              args: [url],
              func: (...args) => doAlert(...args),
            });
        });
    });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { 
    if (changeInfo.url) {
        chrome.storage.local.get("flagAct", function(result) {
            let flagAct = result.flagAct;
            if (flagAct !== undefined) {
                if (flagAct == true) {
                    injectScriptWithAlert(tabId);
                } 
            }
        });
    }
});