function changeButtonsText(flag) {
    if (flag) {
        document.getElementById("actButton").textContent = "отключить защиту";
        document.getElementById("extButton").style.visibility = 'visible';

    } else {
        document.getElementById("actButton").textContent = "включить защиту";
        document.getElementById("extButton").style.visibility = 'hidden';
    }
}

chrome.storage.local.get("flagAct", function(result) {
    let flagAct = result.flagAct;
    if (flagAct !== undefined) {
        changeButtonsText(flagAct);
        
    } else {
        chrome.storage.local.set({"flagAct" : false}, function(result) {});
    }
});

document.getElementById("actButton").addEventListener("click", actButtonClicked);

function actButtonClicked() {
    chrome.storage.local.get("flagAct", function(result) {
        let flagAct = result.flagAct;

        if (flagAct !== undefined) {
            chrome.storage.local.set({"flagAct" : !flagAct}, function(result) {});
            changeButtonsText(!flagAct);
        } 
    });
}

document.getElementById("extButton").addEventListener("click", extButtonClicked);

function extButtonClicked() {
    chrome.tabs.query({url : chrome.runtime.getURL("/windows/extWdw.html")}, function (tabs) {
        let extUrl = chrome.runtime.getURL("../windows/extWdw.html");
        if (tabs.length >= 1) {
            chrome.tabs.update(tabs[0].id,{"active":true, "highlighted":true});
        } else {
            chrome.tabs.create({url : chrome.runtime.getURL("../windows/extWdw.html")});
        }
    });
}

document.getElementById("faqButton").addEventListener("click", faqButtonClicked);

function faqButtonClicked() {
    chrome.tabs.query({url : chrome.runtime.getURL("/windows/faq.html")}, function (tabs) {
        let extUrl = chrome.runtime.getURL("../windows/faq.html");
        if (tabs.length >= 1) {
            chrome.tabs.update(tabs[0].id,{"active":true, "highlighted":true});
        } else {
            chrome.tabs.create({url : chrome.runtime.getURL("../windows/faq.html")});
        }
    });
}

