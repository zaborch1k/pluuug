// вариант 1 -> через скрипт-инъекцию

function injectScript(tabId) {
    chrome.scripting.executeScript(
        {
            target: {tabId: tabId},
            files: ['inject.js'],
        }
    );

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