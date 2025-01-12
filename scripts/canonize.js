function canonizeURL(url) {
    let strUrl = url;
    url = new URL(strUrl);

    if (url == url.origin) {
        strUrl += '/';
    }

    strUrl = encodeURI(url.href);
    
    strUrl = strUrl.replace("0x09", '');
    strUrl = strUrl.replace("0x0d", '');
    strUrl = strUrl.replace("0x0a", '');
    strUrl = strUrl.replace(/#.*/, '');

    strUrl = decodeURI(strUrl);
    url = new URL(strUrl);
    return url;
}

function transformIfIP(str) {
    let flag = false;

    if (str.startsWith("[::ffff:")) {
        str = str.substring(8, str.length - 1);
        flag = true;

    } else if (str.startsWith("[64:ff9b::")) {
        str = str.substring(10, str.length - 1);
        flag = true;
    }

    if (flag) {
        let arr = str.split(':');

        let pt1 = (parseInt(arr[0], 16).toString(2)).padStart(16, "0");
        let pt2 = (parseInt(arr[1], 16).toString(2)).padStart(16, "0");

        str = (parseInt(pt1.substring(0, 8), 2)).toString(10) + '.' + (parseInt(pt1.substring(8, 16), 2)).toString(10) + '.';
        str += (parseInt(pt2.substring(0, 8), 2)).toString(10) +  '.' + (parseInt(pt2.substring(8, 16), 2)).toString(10);
    }
    return str; 
}

function canonizeHost(hostname) {
    hostname = hostname.replace(/^\.*/, '');
    hostname = hostname.replace(/\.*$/, '');
    hostname = hostname.replace(/\.+/g, '.');

    hostname = transformIfIP(hostname);

    hostname = hostname.toLowerCase();
    return hostname;
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
    
    url.hostname = canonizeHost(url.hostname);
    url.pathname = canonizePath(url.pathname);
    url.href = percentEscape(url.href)

    return url.href;
}