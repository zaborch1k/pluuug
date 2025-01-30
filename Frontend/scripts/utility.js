export function hostFromUrl(url) {
    try {
        let host = new URL(url).hostname
        return host.startsWith("www.") ? host.slice(4) : host
    } catch (err) {
        return ""
    }
    
}

// open window by name || create new window if it doesnt exists
export async function openWindow(win) {
    let path = "/windows/" + win + ".html";
    let url = chrome.runtime.getURL(path);

    let tabs = await chrome.tabs.query({ url })

    if (tabs.length >= 1) {
        await chrome.tabs.update(tabs[0].id,{"active":true, "highlighted":true});
    } else {
        url = chrome.runtime.getURL(".." + path);
        await chrome.tabs.create({ url });
    }
}