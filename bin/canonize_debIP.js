import { translateToIP } from "./translateToIP.js"

function canonizeURL(url) {
    let strUrl = encodeURI(url);
    
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

    let typeIP = -1;
    [hostname, typeIP] = translateToIP(hostname);

    hostname = hostname.toLowerCase();
    return [hostname, typeIP];
}

function canonizePath(path) {
    path = path.replace('/./', '/');
    path = path.replace(/\/[^\/]*\/\.\.\//g, '/');
    path = path.replace(/\/+/g, '/');
    return path;
}

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


export function canonize(url) {
    url = canonizeURL(url);

    let typeIP = -1;
    [url.hostname, typeIP] = canonizeHost(url.hostname);
    url.pathname = canonizePath(url.pathname);
    url.href = percentEscape(url.href)

    checker(); ///////////////////////////////

    return url.href;
}



function checker() {
    let arr = [
        // not an ipv6 format
        "[34gs:dlld:0x:asd:3]",
        "3FFE:FFFF:7654:FEDA:1245:BA98:3210:4562",

        // wrong : seq
        "[3FFE:FFFF::7654:FEDA::3210:4562]",
        "[3FFE:FFFF:::7654:FEDA:3210:4562]",
        "[3FFE:FFFF:::::FEDA:3210:4562]",
        
        // wrong size
        "[3FFE:FFFF::7654:FEDA::3210:4562:3]",
        "[3FFE:FFFF:4]",

        // arr[i].length > 4
        "[3FFE:FFFFF:7654:FEDA:1245:BA98:3210:4562]",
        "[FFED::BA98:3210:4562555555555555444444444]",

        // compressing
        "[2001:0db8:0000::1]",
        "[0:0:0:0:0:0:0:0]",
        "[3FFE:0FFFF:0000:FEDA:01245:BA98:3210:04562]",
        "[00:0:5:00:0:44:66:33]",
        "[8:7:5:00:0:44:66:33]",
        "[8:7:5:99:7:44:00:0]",
        "[8:7:5:99:7:0:8:8]",
        "[0:7:5:99:7:44:00:0]",

        // else
        "[::ffff:1.2.3.4]",
        "[64:ff9b::1.2.3.4]",
        "64:ff9b::1.2.3.4",
        "[::ffff:12.34]",
        "[64:ff9b::b982:2c09]",
        "[64:ff9b::b982:3:e:d]",

        //ipv4
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
        "0x13.680702",

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

    for (let i = 0; i < arr.length; i++) {
        console.log("");
        console.log("--------------------------------- new --------------------------------");
        console.log(arr[i]);
        console.log(translateToIP(arr[i]));
    }
}