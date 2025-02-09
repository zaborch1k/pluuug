import { getPrettyThreatType } from "./prettyData.js"

export function setTextPopup(lang) {
    let ind = (lang == "ru") ? 0 : 1;

    let setTextContent = {
        "title": ["Защита от фишинга", "Phishing Protection"],
        "name": ["Защита от фишинга", "Phishing Protection"],
        "actButton": ["включить проверку", "enable check"],
        "controlButton": ["контроль", "control"],
    }

    for (let id in setTextContent) {
        document.getElementById(id).textContent = setTextContent[id][ind];
    }

}

export function setTextControlWdw(lang) {
    let ind = (lang == "ru") ? 0 : 1;

    let setTextContent = {
        "title": ["Контроль", "Control"],
        "header": ["Защита от фишинга", "Phishing protection"],
        "white-list-btn": ["Белый список", "Whitelist"],
        "history-btn": ["История блокировок", "Block history"],
        "white-list-adder-save-btn": ["Сохранить", "Save"],
        "history-clear-btn": ["Очистить историю", "Clear history"],
        "history-download-btn": ["Скачать историю", "Download block history"],
    }

    for (let id in setTextContent) {
        document.getElementById(id).textContent = setTextContent[id][ind];
    }

    let setPlaceholder = {
        "white-list-finder": ["Поиск", "Search"],
        "white-list-adder": ["Добавьте домен", "Add domain"],
        "history-search": ["Поиск", "Search"]
    }

    for (let id in setPlaceholder) {
        document.getElementById(id).setAttribute("placeholder", setPlaceholder[id][ind])
    }

    let setSelectTextContent = {
        "history-sort": [["Сначала новые", "Сначала старые"], ["New ones first", "Old ones first"]],
        "history-reason-sort":
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
        "header": [
            `По данным сервиса ${service}, "${pendingUrl}" небезопасен. Дальнейшее посещение может подвергнуть Вас риску.`,
            `According to ${service}, "${pendingUrl}" is known to be malicious. Do you still want to proceed?`
        ],

        "reason": [
            `Тип угрозы: ${threatType}`, `Threat type: ${threatType}`
        ],

        "readMore": [
            "Подробнее", "Read more"
        ],

        "description": [
            description[0], description[1]
        ],

        "returnButton": [
            `Вернуться на "${prevUrl}"`, `Return to "${prevUrl}"`
        ],

        "proceedButton": [
            `Продолжить в "${pendingUrl}"`,
            `Proceed to "${pendingUrl}"`
        ],

        "whiteListButton": [
            `Добавить "${pendingUrl}" в белый список и продолжить`,
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
        "title": ["Настройки", "Options"],
        "header": ["Настройки", "Options"],
        "chooseLang": ["Язык:", "Language"],
        "langDescription": ["обновите страницы, чтобы изменения вступили в силу", "refresh pages for changes to take effect"],
        "choose-mode-header": ["Режимы защиты:", "Protection modes:"],

        "label1": [
            "Первый режим:",
            "First mode:"
        ],
        "label1-desk": [
            "блокировка сайта до его полной проверки. Обеспечивает большую безопасность, но замедляет пользование браузером",
            "blocking the site until it is fully checked. Provides greater security, but slows down the browser"
        ],
        "label2": [
            "Второй режим:",
            "Second mode:"
        ],
        "label2-desk": [
            "фоновая проверка сайта. Своевременные уведомления и минимальное влияние на производительность",
            "background site check. Timely notifications and minimal impact on performance"
        ]
    }

    for (let id in setTextContent) {
        document.getElementById(id).textContent = setTextContent[id][ind];
    }
}

export function setTextFaq(lang) {
    let ind = (lang == "ru" || lang == "ru-RU") ? 0 : 1;

    let setTextContent = {
        "title": ["ЧЗВ", "FAQ"],
        "header": ["ЧЗВ", "FAQ"],
        "header1": [
            "Для чего это расширение?",
            "What is this extension for?"
        ],
        "text1": [
            "Цель данного расширения – обезопасить Ваше пользование интернетом. Мы проверяем посещаемые Вами сайты, и при наличии угрозы сообщаем об этом Вам. ",
            "The purpose of this extension is to secure your use of the Internet. We check the sites you visit and if there is a threat, we inform you about it."
        ],


        "header2": [
            "К каким данным расширение имеет доступ?",
            "What data does the extension have access to?"],
        "text2": [
            "Расширение получает доступ только к самому необходимому для его работы – URL-адресу текущей страницы. Если потребуется временно ограничить и это, достаточно нажать на кнопку “отключить проверку”.",
            "The extension only gets access to what is most necessary for its operation – the URL of the current page. If you need to temporarily restrict this too, just click the “disable checking” button."
        ],


        "header3": [
            "Какие сервисы мы используем?",
            "What services do we use?"
        ],
        "text3": [
            "Для проверки URL мы используем Google Safe Browsing (https://safebrowsing.google.com/) и Virustotal (https://www.virustotal.com/gui/home/upload).",
            "To check URLs we use Google Safe Browsing (https://safebrowsing.google.com/) and Virustotal (https://www.virustotal.com/gui/home/upload)."
        ],


        "header4": [
            "Что такое белый список?",
            "What is a whitelist?"
        ],
        "text4": [
            "Белый список – список доменов, которые не будут проходить проверку. Это полезно, чтобы не проверять часто посещаемые сайты, в безопасности которых Вы уверены, или в случае несогласия с вердиктом проверки для конкретного сайта. Белый список можно пополнить как вручную (из “контроля”), так и при блокировке определенного URL (“добавить в белый список“).",
            "Whitelist – a list of domains that will not be checked. This is useful to avoid checking frequently visited sites that you are sure are safe, or if you disagree with the check verdict for a specific site. The whitelist can be added either manually (from “control”) or when blocking a specific URL (“add to whitelist“)."
        ],


        "header5": [
            "Что за режимы?",
            "What are these modes?"
        ],
        "text5": [
            "Всего присутствует два режима работы:\n1. Первый режим подразумевает под собой полную защиту: расширение блокирует сайт до того, как он не пройдет защиту. Если по данным наших сервисов данный URL-адрес безопасен, выполнится переход; иначе Вы получите сообщение об угрозе вредоносности с описанием причины. Этот режим обеспечивает большую безопасность, но замедляет пользование сайтами. \n2. Второй режим (рекомендуемый). Проверка происходит в фоновом режиме, без блокировки запроса, что позволяет комфортно пользоваться браузером, но получать своевременные уведомления в случае существования угрозы",
            "There are two modes of operation:\n1. The first mode implies full protection: the extension blocks the site until it passes the protection. If, according to our services, the URL is safe, the transition will be performed; otherwise, you will receive a message about the threat of malware with a description of the reason. This mode provides greater security, but slows down the use of sites.\n2. The second mode (recommended). The check is performed in the background, without blocking the request, which allows you to comfortably use the browser, but receive timely notifications in case of a threat."
        ],


        "header6": [
            "О каких “угрозах” идёт речь?",
            "What are the “threats” we are discussing?"
        ],
        "text6": [
            "В наших предупреждениях Вы увидите краткое описание угрозы, которая, по данным наших сервисов, присутствует на этом сайте. Ниже приведен их полный список:\n1. Вредоносное ПО - программы, которые нарушают нормальное функционирование конечных устройств. Вы можете столкнуться с несанкционированным доступом, утечкой Ваших данных или блокировкой устройства.\n2. Нежелательное ПО - программы, которые могут устанавливать дополнительное программное обеспечение, изменять поведение цифрового устройства, а также выполнять действия без запроса или разрешения пользователя, например:\n- программы для показа рекламы\n- программы с вводящим в заблуждение поведением\n- программы слежки\n- программы для майнинга криптовалют\n3. Потенциально опасное приложение может снижать производительность компьютера, отображать рекламные объявления или устанавливать другое, более вредоносное программное обеспечение\n4. Социальная инженерия - метод атаки без использования технических средств. Злоумышленники могут обманным путем заставить Вас раскрыть конфиденциальные данные (пароли, данные банковских счетов) или совершить потенциально опасные действия (установить вредоносную программу), выдавая себя за известный сервис.",
            "In our alerts, you will see a brief description of the threat that, according to our services, is present on this site. Below is a full list:\n1. Malicious software - programs that disrupt the normal functioning of end devices. You may face unauthorized access, leakage of your data, or device blocking. \n2. Unwanted software - programs that can install additional software, change the behavior of a digital device, and also perform actions without the user's request or permission, for example: advertising programs programs with misleading behavior surveillance programs cryptocurrency mining programs \n3. A potentially dangerous application can reduce computer performance, display advertisements, or install other, more malicious software \n4. Social engineering - an attack method without the use of technical means. Attackers can deceive you into revealing confidential data (passwords, bank account information) or perform potentially dangerous actions (install malware) by posing as a well-known service."
        ],


        "header7": [
            "Расширение ошиблось, этот сайт не является вредоносным!",
            "The extension was wrong, this site is not malicious!"
        ],
        "text7": [
            "К сожалению, мы не можем гарантировать стопроцентную точность проверки, а значит возможны ошибки и ложные срабатывания. Тем не менее, рекомендуем проверить ещё раз: зачастую, вредоносные сайты могут маскироваться под вполне известные сервисы. Посмотрите внимательнее на URL страницы, убедитесь, что там нет ничего подозрительного. Если Вы все же хотите перейти на эту страницу, нажмите “продолжить в” или “добавить в белый список”. ",
            "Unfortunately, we cannot guarantee the absolute accuracy of the check, which means that errors and false positives are possible. Nevertheless, we recommend checking again: malicious sites can often disguise themselves as well-known services. Take a closer look at the URL of the page, make sure that there is nothing suspicious there. If you still want to go to this page, click “continue to” or “add to whitelist”."
        ],
    }

    for (let id in setTextContent) {
        document.getElementById(id).textContent = setTextContent[id][ind];
    }
}