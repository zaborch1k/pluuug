function canonize(url) {
    url = canonizeURL(url);

    url.hostname = canonizeHost(url.hostname);
    url.pathname = canonizePath(url.pathname);
    url.href = percentEscape(url.href)

    return url.href;
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

function canonizePath(path) {
    path = path.replace('/./', '/');
    path = path.replace(/\/[^\/]*\/\.\.\//g, '/');
    path = path.replace(/\/+/g, '/');

    return path;
}


function canonizeHost(hostname) {
    // remove unnecessary .

    hostname = hostname.replace(/^\.*/, '');
    hostname = hostname.replace(/\.*$/, '');
    hostname = hostname.replace(/\.+/g, '.');

    // [?] check if ipv4/ipv6

    hostname = hostname.toLowerCase();
    return hostname;
}

function canonizeURL(url) {
    let re, strUrl;
    strUrl = encodeURI(url);

    // check if ascii only

    re = /^[\x00-\x7F]*$/;
    
    if (!re.test(url)) {  
        // if not ascii -> do punycode 
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

    // check '/' at the end

    if (strUrl[strUrl.length - 1] != '/') {
        strUrl += '/';
        url = new URL(strUrl);
    }

    // percent unescape

    strUrl = decodeURI(url);
    url = new URL(strUrl);
    return url;
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


//  ---------------------------------------------------------------- debug only ----------------------------------------------------------------

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { 
//     chrome.storage.local.get("flagAct", function(result) {
//         const arr = [ 
//             "https://ароарваорар.com",
//             "https://test1.com/zaborch1k0x09/./pluu0x0dug///blob/mai0x0an/bin/../ext_wdw.html#frag", //err
//             "https://.......tes..t1.com......../....dsffssdf..../",
//             "https://sfKdgfjJDkdlvjkL",
//             "https://sf...Kdg................fjJDk...dlvjkL....com..././/.././",
//             "https://sfKdgfjJDkdlvjkL/../gfffgd/../gff.../",
//             "https://sfKdgfj///////JDkdlvjkL/////////////////", //err
//         ]; 

//         for (let i = 0; i < arr.length; i++) {
//             console.log('');
//             console.log("---------new----------");
//             console.log(arr[i]);
//             console.log(canonize(arr[i]));
//         }
    
//     });
// });