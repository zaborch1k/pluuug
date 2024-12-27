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
    hostname = hostname.replace(/^\.*/, '');
    hostname = hostname.replace(/\.*$/, '');
    hostname = hostname.replace(/\.+/g, '.');

    hostname = checkIPV4(hostname);
    //checker();
    hostname = checkIPV6(hostname);

    hostname = hostname.toLowerCase();
    return hostname;
}

function checker() {
    let correctIpv4 = [
        // dec
        "0019.0010.0098.0254",
        "19.10.98.254",
        "19.10.25342",
        "19.680702",
        "319447806",

        // oct
        "0o0023.0o0012.0o0142.0o0376",
        "0o23.0o12.0o142.0o376",
        "0o23.0o12.0o61376",
        "0o23.0o2461376",
        "0o2302461376",

        // hex
        "0x13.0xA.0x62.0xFE",
        "0x13.0xA.0x62FE",
        "0x13.0xA62FE",
        "0x130A62FE",

        // mixed
        "19.0xA.0o0142.0o376",
        "0o23.0xA.0o61376",
        "0x13.680702"
    ];

    let incorectIpv4 = [
        // not dec/bin/oct/hex
        "0b92.9.4.3",
        "4.9.0b92",
        "0o8.9.4.3",
        "0oa.9.4.3",
        "0o.9.4.3",
        "0xkj.9.4.3",
        "0x.9.4.3",
        "0xdk.5.3.5",

        // not in [0-255]
        "0b000100000000.4.3.2",
        "6.4.3.0x100",
        "6.0o400.3.2",

        // rest is more than bitNeed
        "4294967296",
        "0o40000000000",
        "0x100000000",
        "0b000100000000000000000000000000000000",
        "6.16777216",
        "6.0x1000000",
        "6.0o100000000",
        "5.3.65536",
        "5.3.0o200000",
        "5.3.0x10000",

        // len > 4
        "3.4.3.3.3.45",
        "3.2.5.3.35.3",
    ];

    console.log("************************************** CORRECT ************************************** ")
    for (let i = 0; i < correctIpv4.length; i++) {
        console.log("");
        console.log("----------new-----------");
        console.log(correctIpv4[i]);
        console.log(checkIPV4(correctIpv4[i]));
    }

    console.log("\n************************************** INCORRECT ************************************** ");
    for (let i = 0; i < incorectIpv4.length; i++) {
        console.log("");
        console.log("----------new-----------");
        console.log(incorectIpv4[i]);
        console.log(checkIPV4(incorectIpv4[i]));
    }
}

function checkIPV4(str) {
    let re, arr, limit, len;

    arr = str.split('.');
    len = arr.length;
    limit = Number("11111111"); // max value of ip octet -> 255
    console.log(arr);

    // check if not dec/bin/oct/hex 
    re = new RegExp(/(^0b([0-1])+$)|(^0o([0-7])+$)|(^0x([0-9]|[A-F]|[a-f])+$)|(^([0-9])+$)/);

    for (let i = 0; i < len; i++) {
        if (!re.test(arr[i])) {
            console.log("not dec/bin/oct/hex : ", arr[i]);
            return str;
        }

        if (i != len - 1 || i == 3) {
            let binValue = Number(Number((arr[i])).toString(2));
            console.log(binValue, limit);

            if (binValue > limit) {
                console.log("not in [0-255] : ", binValue);
                return str;
            }
        }
    }

    if (len > 4) {
        console.log('len > 4');
        return str;

    } else if (len != 4) {
        let bitsNeed = (4 - len + 1) * 8;
        let rest = Number((arr[len - 1])).toString(2);

        console.log(rest);

        if (rest.length > bitsNeed) { 
            console.log("rest is more than : ", bitsNeed);
            return str;
        }

        rest = rest.padStart(bitsNeed, '0');
        console.log(rest);
        arr.splice(len - 1);

        let c = 0;

        for (let i = len - 1; i < 4; i++) {
            let octet = rest.substring(c, c + 8);
            if (Number(octet) > limit) {
                console.log("> octet : ", octet);
                return str;
            }
            arr.push("0b" + octet);
            c += 8;
        }
        console.log(arr);
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

// check urls

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


// check if ipv4