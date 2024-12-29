import { canonize } from "./canonize.js"

export function checkURL(url) {
    url = canonize(url);

    let flag = Math.trunc(Math.random() * (1 - 0 + 1) + 0);
    if (flag == 0) {
        return false;
    } 
    return true;
}