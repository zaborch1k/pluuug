export const checkIP = (hostname) => {
    hostname = checkIPV4(hostname);
    hostname = checkIPV6(hostname);
    return hostname;
};

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