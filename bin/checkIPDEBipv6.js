export const checkIP = (hostname) => {
    hostname = checkIPV4(hostname);
    hostname = checkIPV6(hostname);
    checker();
    return hostname;
};

const count = (text, search) => (text.match(new RegExp(search, 'g')) || []).length;

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
    let re = new RegExp(/^\[.+\]$/);
    
    if (!re.test(str)) {
        return str;
    }

    str = str.substring(1, str.length - 1);

    str = IPV6regularForm(str);
    str = IPV6mixedForm(str);

    return str;
}

function IPV6regularForm(str) {
    let re = new RegExp(/^([0-9]|[A-F]|[a-f]|[:])*$/);

    if (!re.test(str) || (count(str, /::/)) > 1 || (count(str, /[:]{3,}/)) > 0) {
        return str;
    }

    let arr = str.split(":");
    if (arr.length > 8 || (count(str, /::/) == 0 && arr.length != 8)) {
        return str;
    }

    let doubleColonsSeq = -1;  // -1 - hasnt started;  0 - in process;  1 - has finished
    let newStr = "";

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '') {
            arr[i] = '0';
        }

        let cur = (Number("0x" + arr[i])).toString(16);

        if (arr[i].length > 4) {
            return str;
        }

        if (cur == "0" && doubleColonsSeq != 1) {
            if (doubleColonsSeq == -1) {
                doubleColonsSeq = 0;
                if (i == 0) {
                    newStr += ":";
                }
            } 

        } else {
            if (doubleColonsSeq == 0) { // finish doubleColonsSeq
                newStr += ':';
                doubleColonsSeq = 1;
            }

            newStr += cur;
            if (i != arr.length - 1) {
                newStr += ':';
            }
        }
    }

    if (doubleColonsSeq == 0) {
        newStr += ':';
    }
    return newStr;
}

function IPV6mixedForm(str) {
    return str;
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
    ];

    for (let i = 0; i < arr.length; i++) {
        console.log("");
        console.log("------------------------- new -----------------------");
        console.log(arr[i]);
        console.log(checkIPV6(arr[i]));
    }
}