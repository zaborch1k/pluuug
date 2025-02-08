async function getURLReport(obj) {
    let response = await fetch(obj.data.links.self, {
        'method': 'GET',
        'headers':{
            "accept": "application/json",
            "x-apikey": "39afea73f76c6336455c83e1aee4a76fceddd6ed10fe36e7d4d77a5980c4cf65"
        }
    });

    if (response.status !== 200) {
        return
    }

    let res = (await response.json()).data.attributes;
    return [res.status, res.stats]
}


export async function scanURL(url) {
    let response = await fetch('https://www.virustotal.com/api/v3/urls', {
        'method': 'POST',
        'headers': {
            "accept": "application/json",
            "content-type": "application/x-www-form-urlencoded",
            "x-apikey": "39afea73f76c6336455c83e1aee4a76fceddd6ed10fe36e7d4d77a5980c4cf65"
        },
        'body': new URLSearchParams({ url })
    })

    console.log('virustotal scanning status:', response.status)
    if (response.status !== 200) {
        return
    }

    let data = await response.json()

    while (true) {
        let [status, stats] = await getURLReport(data)
        if (status == 'completed') {
            return stats
        }

        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('virustotal next iteration (scan)')
    }
}


// <----------------------- debug ---------------------------------> 

// console.log(JSON.stringify(await scanURL('arvind-412.github.io')))
