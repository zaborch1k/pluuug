import { canonize } from "./canonize.js"
import { getSuffPref } from "./getSuffPref.js";

export function checkURL(url) {
    url = canonize(url);
    let suffPref = getSuffPref(url);

    console.log(url);
    console.log(suffPref);
    console.log("");

    let flag = Math.trunc(Math.random() * (1 - 0 + 1) + 0);
    if (flag == 0) {
        return false;
    } 
    return true;
}