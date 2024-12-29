const count = (text, search) => (text.match(new RegExp(search, 'g')) || []).length;


// ############################################# IPV4 #############################################

function checkOctetsIPV4 (arr) {
    let len = arr.length;
    let limit = Number("11111111"); // max value of ip octet -> 255 (= 0b1111 1111)

    let re = new RegExp(/(^0b([0-1])+$)|(^0o([0-7])+$)|(^0x([0-9]|[A-F]|[a-f])+$)|(^([0-9])+$)/);

    for (let i = 0; i < len; i++) {
        // check if not dec/bin/oct/hex 
        if (!re.test(arr[i])) { 
            return false;
        }

        // check if not in [0-255] 
        if (i != len - 1 || i == 3) {
            let binValue = Number(Number((arr[i])).toString(2));
            if (binValue > limit) {
                return false;
            }
        }
    }

    return true;
}

function convertOctetsToDec (arr) {
    let len = arr.length;
    let limit = Number("11111111"); // max value of ip octet -> 255 (= 0b1111 1111)

    if (len > 4) {
        return -1;
        
    } else if (len != 4) {
        let bitsNeed = (4 - len + 1) * 8;
        let rest = Number((arr[len - 1])).toString(2);

        if (rest.length > bitsNeed) { 
            return -1;
        }

        rest = rest.padStart(bitsNeed, '0');
        arr.splice(len - 1);

        let ind = 0;
        for (let i = len - 1; i < 4; i++) {
            let octet = rest.substring(ind, ind + 8);
            if (Number(octet) > limit) {
                return -1;
            }
            arr.push("0b" + octet);
            ind += 8;
        }
    }

    return arr;
}


function checkIPV4(str) {
    let arr = str.split('.');

    if (!checkOctetsIPV4(arr)) {
        return [str, -1];
    }

    arr = convertOctetsToDec(arr);

    if (arr == -1) {
        return [str, -1];
    }

    let ip = "";
    ip += Number((arr[0])).toString(10) + '.' + Number((arr[1])).toString(10) + '.';
    ip += Number((arr[2])).toString(10) + '.' + Number((arr[3])).toString(10);

    return [ip, 4];
}

// ################################################################################################



// ############################################# IPV6 #############################################

// ----------------------------------------- regular form -----------------------------------------

function compress (arr) {
    let doubleColonsSeq = -1;  // -1 - hasnt started;  0 - in process;  1 - has finished
    let ip = "";

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '') {
            arr[i] = '0';
        }

        let cur = (Number("0x" + arr[i])).toString(16);
        if (cur.length > 4) { // bad ipv6 => error
            return -1;
        }

        if (cur == "0" && doubleColonsSeq != 1) {
            if (doubleColonsSeq == -1) {
                doubleColonsSeq = 0;
                if (i == 0) {
                    ip += ":";
                }
            } 

        } else {
            if (doubleColonsSeq == 0) { // finish doubleColonsSeq
                ip += ':';
                doubleColonsSeq = 1;
            }

            ip += cur;
            if (i != arr.length - 1) {
                ip += ':';
            }
        }
    }

    if (doubleColonsSeq == 0) {
        ip += ':';
    }
    return ip;
}

function getIPV4fromSpecNAT64(arr) { // works only if last two numbers are hex
    let pt1 = arr[arr.length - 2];
    let pt2 = arr[arr.length - 1];

    pt1 = (Number('0x' + pt1)).toString(16);
    pt2 = (Number('0x' + pt1)).toString(16);

    pt1 = pt1.padStart(4, "0");
    pt2 = pt2.padStart(4, "0");

    let ipv4 = "";
    ipv4 += "0x" + pt1.substring(0, 2) + ".0x" + pt1.substring(2, 4);
    ipv4 += ".0x" + pt2.substring(0, 2) + ".0x" + pt2.substring(2, 4);

    return checkIPV4(ipv4);
}


function regularFormIPV6(str, sz) {
    let ip = str;
    let flagNAT64 = 0;

    // check if NAT64
    let pref = new RegExp(/^(64:ff9b::(.)+)$/);

    if (pref.test(ip)) {
        flagNAT64 = 1;
    }

    // check if good ipv6
    let re = new RegExp(/^([0-9]|[A-F]|[a-f]|[:])*$/);

    if (!re.test(ip) || (count(ip, /::/)) > 1 || (count(ip, /[:]{3,}/)) > 0) {
        return [str, -1];
    }

    let arr = ip.split(":");
    if (arr.length > sz || (count(ip, /::/) == 0 && arr.length != sz)) {
        return [str, -1];
    }

    ip = compress(arr);

    // error while compressing
    if (ip == -1) {
        return [str, -1];
    }

    let typeIP = 6;
    if (flagNAT64) {
        [ip, typeIP] = getIPV4fromSpecNAT64(arr);
    }

    return [ip, typeIP];
}

// ------------------------------------------------------------------------------------------------


// ------------------------------------------ mixed form ------------------------------------------

function firstPartToIPV6(arr) {
    let typeIP;
    let ipv6 = "";
    let len = arr.length;

    for (let i = 0; i < len - 1; i++) {
        ipv6 += arr[i] + ":";
    }

    ipv6 += arr[len - 1];

    if (arr[len - 1] == '') {
        ipv6 += ':';
    }

    [ipv6, typeIP] = regularFormIPV6(ipv6, 6);

    if (typeIP == -1) {
        return -1;
    }
    return ipv6;
}

function secondPartToIPV4(arr) {
    let typeIP;
    let ipv4 = "";
    
    for (let i = 0; i < arr.length - 1; i++) {
        ipv4 += arr[i] + ".";
    }

    ipv4 += arr[arr.length - 1];
    [ipv4, typeIP] = checkIPV4(ipv4);

    if (arr.length != 4 || typeIP == -1) {
        return -1;
    }
    return ipv4;
}


function mixedFormIPV6(str) {
    let arrIPV6 = str.split(":");

    let arrIPV4 = (arrIPV6[arrIPV6.length - 1]).split(".");
    arrIPV6.splice(arrIPV6.length - 1, 1);

    let ipv6 = firstPartToIPV6(arrIPV6);
    let ipv4 = secondPartToIPV4(arrIPV4);

    if (ipv6 == -1 || ipv4 == -1) {
        return [str, -1];
    }

    return [ipv4, 4];
}

// ------------------------------------------------------------------------------------------------


function checkIPV6(str) {
    let re = new RegExp(/^\[.+\]$/);

    // if no [ ]
    if (!re.test(str)) {
        return [str, -1];
    }

    str = str.substring(1, str.length - 1);

    let typeIP;
    [str, typeIP] = regularFormIPV6(str, 8);

    // if not a regular ipv6 -> try mixed
    if (typeIP == -1) {
        [str, typeIP] = mixedFormIPV6(str);
    }

    // if not ipv4
    if (typeIP != 4) {
        str = "[" + str + "]";
    }

    return [str, typeIP];
}

// ################################################################################################


export const translateToIP = (hostname) => {
    let typeIP = -1; // -1 -> not an ip; 4 -> ipv4; 6 -> ipv6

    [hostname, typeIP] = checkIPV4(hostname);

    if (typeIP == -1) {
        [hostname, typeIP] = checkIPV6(hostname);
    }
    return [hostname, typeIP];
};
