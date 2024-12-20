// вариант 1 -> через скрипт-инъекцию

function injectScript(tabId) {
    chrome.tabs.query({lastFocusedWindow: true, active: true},function(tab){
        let url = tab[0].url;
        let msg;

        if (checkURL(url)) {
            msg = "good site";
        } else {
            msg = "bad site";
        }

        chrome.scripting.executeScript({target: {tabId}, files: ['inject.js']}, () => {
            chrome.scripting.executeScript({
              target: {tabId},
              args: [msg],
              func: (...args) => doAlert(...args),
            });
        });
    });
}

function checkURL(url) {
    // жесткая проверка url
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
                    injectScript(tabId);
                } 
            }
        });
    }
});

// вариант 2 -> отправка сообщений скрипту контента 