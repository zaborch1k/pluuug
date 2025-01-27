export function setTextPopup(lang) {
    let ind = (lang == "ru") ? 0 : 1;

    let setTextContent = {
        "title" : ["Защита от фишинга", "Phishing Protection"],
        "name" : ["Защита от фишинга", "Phishing Protection"],
        "actButton" : ["включить проверку", "enable check"],
        "extButton" : ["панель просмотра", "view panel"],
    }

    for (let id in setTextContent) {
        document.getElementById(id).textContent = setTextContent[id][ind];
    }

}

export function setTextExtWdw(lang) {
    let ind = (lang == "ru") ? 0 : 1;

    let setTextContent = {
        "title" : ["Tabbed Page", "Tabbed Page"],
        "header" : ["Защита от фишинга", "Phishing protection"],
        "white-list-btn" : ["Белый список", "Whitelist"],
        "history-btn" : ["История блокировок", "Block history"],
        "white-list-adder-save-btn" : ["Сохранить", "Save"],
        "history-clear-btn" : ["Очистить историю", "Clear history"],
        "history-donload-btn" : ["Скачать историю", "Download block history"],
    }

    for (let id in setTextContent) {
        document.getElementById(id).textContent = setTextContent[id][ind];
    }

    let setPlaceholder = {
        "white-list-finder" : ["Поиск", "Search"],
        "white-list-adder" : ["Добавьте домен", "Add domain"],
        "history-search" : ["Поиск", "Search"]
    }

    for (let id in setPlaceholder) {
        document.getElementById(id).setAttribute("placeholder", setPlaceholder[id][ind])
    } 

    let setSelectTextContent = {
        "history-sort" : [["Сначала новые", "Сначала старые"], ["New ones first", "Old ones first"]],
        "history-reason-sort" : 
        [
            ["Любая причина", "Вредоносное ПО", "Нежелательное ПО", "Потенциально опасное приложение", "Социальная инженерия"],
            ["Any reason", "Malware", "Unwanted software", "Potentially harmful application", "Social engineering"]
        ]
    }

    for (let id in setSelectTextContent) {
        let select = document.getElementById(id);
        let options = select.querySelectorAll("select option");

        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            option.textContent = setSelectTextContent[id][ind][i];
        }
    }

    let setTheadTrTh = [
        ["Дата", "URL", "Причина"],
        ["Date", "URL", "Reason"]
    ]

    let ths = document.getElementById("history-table").querySelectorAll("thead tr th")
    for (let i = 0; i < ths.length; i++) {
        let th = ths[i];
        th.textContent = setTheadTrTh[ind][i];
    }
}


export function setTextTempRedirect(lang, pendingUrl, threatType, prevUrl) {
    let ind = (lang == "ru" || lang == "ru-RU") ? 0 : 1;

    let setTextContent = {
        "header" : [
            `"${pendingUrl}" небезопасен. Дальнейшее посещение может подвергнуть Вас риску.`,
            `"${pendingUrl}" is known to be malicious. Do you still want to proceed?`
        ],

        "reason" : [
            `Тип угрозы: ${threatType}`, `Threat type: ${threatType}`
        ],

        "returnButton" : [
            `Вернуться на "${prevUrl}"`, `Return to "${prevUrl}"`
        ],

        "proceedButton" : [
            `Продолжить в "${pendingUrl}"`, 
            `Proceed to "${pendingUrl}"`
        ],

        "whiteListButton" : [
            `Добавить "${pendingUrl}" в исключения и продолжить`,
            `Whitelist "${pendingUrl}" and proceed`
        ]
    }

    for (let id in setTextContent) {
        document.getElementById(id).textContent = setTextContent[id][ind];
    }
}

export function setTextOptions(lang) { // [!] change this text
    let ind = (lang == "ru" || lang == "ru-RU") ? 0 : 1;

    let setTextContent = {
        "title" : ["Настройки", "Options"],
        "header" : ["Настройки", "Options"],
        "chooseLang" : ["Язык (обновите страницы, чтобы изменения вступили в силу):", "Language (refresh pages for changes to take effect):"],
        "choose-mode-header" : ["Режимы защиты:", "Protection modes:"],

        "label1" : [
            "Первый режим: только safebrowsing. Повышенная производительность, но может снизиться точность",
            "First mode: safebrowsing only. Increased performance, but may decrease accuracy."
        ],

        "label2" : [
            "Второй режим: только virustotal",
            "Second mode: virustotal only"
        ],

        "label3" : [
            "Третий режим: safebrowsing + virustotal",
            "Third mode: safebrowsing + virustotal"
        ],
    }

    for (let id in setTextContent) {
        document.getElementById(id).textContent = setTextContent[id][ind];
    }
}