import { getPrettyThreatType } from "./prettyData.js"

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


export function setTextTempRedirect(lang, pendingUrl, service, threatType, prevUrl) {
    let ind = (lang == "ru" || lang == "ru-RU") ? 0 : 1;
    console.log(threatType)
    let descriptions = {
        "MALWARE": [
            "Вредоносное ПО - программы, которые нарушают нормальное функционирование конечных устройств. Вы можете столкнуться с несанкционированным доступом, утечкой Ваших данных или блокировкой устройства.", 
            "Malware is software that disrupts the normal functioning of end devices. You may experience unauthorized access, leakage of your data, or blocking of your device."
        ],

        "UNWANTED_SOFTWARE": [
            "Нежелательное ПО - программы, которые могут устанавливать дополнительное программное обеспечение, изменять поведение цифрового устройства, а также выполнять действия без запроса или разрешения пользователя, например: /n/n1. программы для показа рекламы/n2. программы с вводящим в заблуждение поведением/n3. программы слежки/n4. программы для майнинга криптовалют", 
            "Unwanted software - programs that can install additional software, change the behavior of a digital device, and perform actions without the user's request or permission, such as:/n/n1. programs for displaying advertisements/n2. programs with misleading behavior/n3. surveillance programs/n4. programs for mining cryptocurrency"
        ], 

        "POTENTIALLY_HARMFUL_APPLICATION": [
            "Потенциально опасное приложение может снижать производительность компьютера, отображать рекламные объявления или устанавливать другое, более вредоносное программное обеспечение",
            "Potentially harmful application may slow down your computer, display advertisements, or install other, more malicious software."
        ],

        "SOCIAL_ENGINEERING": [
            "Социальная инженерия - метод атаки без использования технических средств. Злоумышленники могут обманным путем заставить Вас раскрыть конфиденциальные данные (пароли, данные банковских счетов) или совершить потенциально опасные действия (установить вредоносную программу), выдавая себя за известный сервис.", 
            "Social engineering is a method of attack without using technical means. Attackers can trick you into revealing confidential data (passwords, bank account details) or performing potentially dangerous actions (installing malware) by posing as a well-known service."
        ]
    }

    let description = descriptions[threatType];
    threatType = getPrettyThreatType(threatType, lang);

    let setTextContent = {
        "header" : [
            `По данным сервиса ${service}, "${pendingUrl}" небезопасен. Дальнейшее посещение может подвергнуть Вас риску.`,
            `According to ${service}, "${pendingUrl}" is known to be malicious. Do you still want to proceed?`
        ],

        "reason" : [
            `Тип угрозы: ${threatType}`, `Threat type: ${threatType}`
        ],

        "readMore" : [
            "Подробнее", "Read more"
        ],
        
        "description" : [
            description[0], description[1]
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
            "Первый режим: уеби меня кирпич-1",
            "First mode: ----."
        ],

        "label2" : [
            "Второй режим: уеби меня кирпич-2",
            "Second mode: ~~~~"
        ],
    }

    for (let id in setTextContent) {
        document.getElementById(id).textContent = setTextContent[id][ind];
    }
}

export function setTextFaq(lang) {
    let ind = (lang == "ru" || lang == "ru-RU") ? 0 : 1;

    let setTextContent = {
        "header1" : ["Вопрос1", "Вопрос1, но на английском"],
        "text1" : ["Куча текста", "Куча текста на английском"],

        "header2" : ["Вопрос2", "Вопрос2, но на английском"],
        "text2" : ["Очееееееееееееееееееееееееееееееееееееень много текста", "Очееееееееееееееееееееееееееееееееееееень много текста, но на английском"],

        "header3" : ["Вопрос3", "Впрос3, но на английском"],
        "text3" : ["Текст", "Текст, но на английском"]
    }

    for (let id in setTextContent) {
        document.getElementById(id).textContent = setTextContent[id][ind];
    }
}