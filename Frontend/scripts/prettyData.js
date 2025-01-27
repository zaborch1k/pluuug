export function getPrettyThreatType(threatType, lang) { 
    let rawThreatTypes = ["MALWARE", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION", "SOCIAL_ENGINEERING"];

    let ruThreatTypes = ["Вредоносное ПО", "Нежелательное ПО", "Потенциально опасное приложение", "Социальная инженерия"];
    let engThreatTypes = ["Malware", "Unwanted software", "Potentially harmful application", "Social engineering"];

    let i = 0;
    for (i; i < rawThreatTypes.length - 1; i++) {
        if (rawThreatTypes[i] == threatType) {
            break;
        }
    }
    console.log(lang)
    if (lang == "ru-RU" || lang == "ru") {
        return ruThreatTypes[i];

    } else {
        return engThreatTypes[i];
    }
}

export function getPrettyDate(date) {
    date = new Date(date);

    let day = (date.getDate()).toString().padStart(2, "0");

    let month = (date.getMonth() + 1).toString().padStart(2, "0");

    let year = (date.getFullYear()).toString();

    let hours = (date.getHours()).toString().padStart(2, "0");

    let minutes = (date.getMinutes()).toString().padStart(2, "0");

    let prettyDate =  day + '.' + month + '.' + year + ' ' + hours + ":" + minutes;
    
    return prettyDate;
}
