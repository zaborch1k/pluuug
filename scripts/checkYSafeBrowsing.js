export async function checkYSafeBrowsing (url) {
    let response = await fetch('https://sba.yandex.net/v4/threatMatches:find?key=b047da0f-4a8b-4e60-b8a9-f9c52e798c3e', {
        'method': 'POST',
        'headers': {
            "accept": "application/json",
            "content-type": "application/x-www-form-urlencoded"
        },
        'body': JSON.stringify({
            "client": {
              "clientId": "{sfdsfds}",
              "clientVersion": "{52.52.52}"
            },
            "threatInfo": {
              "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
              "platformTypes": ["ALL_PLATFORMS"],
              "threatEntryTypes": ["THREAT_ENTRY_TYPE_UNSPECIFIED", "EXECUTABLE", "URL"],
              "threatEntries": [
                {"url": url}
              ]
            }
          })
    })

    if (response.status !== 200) {
        return
    }

    let res = (await response.json()).matches;

    if (res === undefined) {
        return ["SAFE", undefined, "YandexSafeBrowsing"]
    }

    return ["UNSAFE", res[0].threatType, "YandexSafeBrowsing"]
}

