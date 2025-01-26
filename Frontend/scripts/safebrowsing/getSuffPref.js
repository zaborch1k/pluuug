import { publicsuffix } from "./publicsuffix_list.js";

function getSuff(hostname) {
    let variants = hostname.split('.');
    let max = Math.min(variants.length, 5);

    let reg = /^(\[.*\]|(\d{1,3}\.){3}\d{1,3})$/
    if (reg.test(hostname)) {
        return [hostname];
    }

    let offset = 4;
    reg = new RegExp(`^${variants.slice(-3).join('\.')}$`, "m");
    let suffFlag = reg.test(publicsuffix);
    if (!suffFlag) {
        reg = new RegExp(`^${variants.slice(-2).join('\.')}$`, "m");
        suffFlag = reg.test(publicsuffix);
        offset = 3;
    }

    let hosts = []
    for (let i = suffFlag ? offset : 2; i <= max; i++) {
        let host = variants.slice(-i).join('.');
        hosts.push(host);
    }

    if (hosts[hosts.length - 1] != hostname) {
        hosts.push(hostname);
    }

    return hosts;
}


function getPref(path) {
    let reg = /(?<=\/)|(?=[?])/;

    let variants = reg.test(path) ? path.split(reg) : [];
    let paths = [];
    if (variants[0]) {
        for (let i = 1; i <= variants.length; i++) {
            paths.push(variants.slice(0, i).join(''));
        }
    }

    return paths;
}


export function getSuffPref(url) {
    url = new URL(url);
    let path = url.pathname + url.search;
    let hostname = url.hostname;

    let ans_arr = []
    for (let suf of getSuff(hostname)) {
        for (let pref of getPref(path)) {
            ans_arr.push(suf + pref);
        }
    }

    return ans_arr
}