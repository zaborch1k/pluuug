function canonizeURL(url) {
    // 1. canonize url ----------------------------------------------------------------------
    let strUrl = encodeURI(url);
    url = new URL(strUrl);

    let re = /[\x00-\x7F]+/;

    if (re.test(url)) {
        // [?] add punycode package
        //url = punycode.encode(url);
    }
    let hostname = url.hostname;

    re = new RegExp(toString(hostname) + '$');

    if (re.test(strUrl)) {
        strUrl += '/';
        url = new URL(strUrl);
    } 

    strUrl = strUrl.replace("0x09", '');
    strUrl = strUrl.replace("0x0d", '');
    strUrl = strUrl.replace("0x0a", '');
    strUrl = strUrl.replace(/#frag$/, '');

    strUrl = decodeURIComponent(url);
    url = new URL(strUrl);

    // 2. canonize host ----------------------------------------------------------------------
    hostname = url.hostname;
    let [pt1, pt2] = strUrl.split(hostname);

    hostname = hostname.replace(/^\.*/, '');
    hostname = hostname.replace(/\.*$/, '');

    // [?] Ipv4/ipv6/no 

    hostname = hostname.toLowerCase();

    strUrl = pt1 + hostname + pt2;
    url = new URL(strUrl);

    // 3. canonize path  ----------------------------------------------------------------------
    let search = url.search;
    let urlNoSearch = strUrl;
    let end = '';

    if (search != '') {
        [urlNoSearch, end] = strUrl.split(search);
        console.log(urlNoSearch);
    }

    urlNoSearch = urlNoSearch.replace('/./', '/');

    // [?] del all `/../` and previous path element

    urlNoSearch = urlNoSearch.replace(/\/*/, '/');
    strUrl = urlNoSearch + search + end;

    // percent-escape if <= ASCII 32, >= 127, #, %. The escapes should use uppercase hex characters
    let oldStrUrl = strUrl;
    strUrl = '';
    for (const char of oldStrUrl) {
        let asciiCode = char.charCodeAt(0);

        if (asciiCode <= 32 || asciiCode >= 127 || char == '#' || char == '%') {
            strUrl += encodeURIComponent(char);

        } else {
            strUrl += char;
        }
    }
    return strUrl;
}

function injectScriptWithAlert(tabId) {
    chrome.tabs.query({lastFocusedWindow: true, active: true},function(tab){
        let url = canonizeURL(tab[0].url);
        let msg;

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


function checkURL(url) {
    let flag = Math.trunc(Math.random() * (1 - 0 + 1) + 0);
    if (flag == 0) {
        return false;
    } 
    return true;
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