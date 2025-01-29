export function hostFromUrl(url) { // No you're lazy!
  try {
    let host = new URL(url).hostname
    return (
      (host.substring(0, 4) === "www.")
      ? host.substring(4)
      : host
    )
  }
  catch {
    return ""
  }
}

// open window by name || create new window if it doesnt exists
export function openWindow(win) {
  let path = "/windows/" + win + ".html";
  let url = chrome.runtime.getURL(path);

  chrome.tabs.query({url : url}, function (tabs) {
      if (tabs.length >= 1) {
          chrome.tabs.update(tabs[0].id,{"active":true, "highlighted":true});
      } else {
          url = chrome.runtime.getURL(".." + path);
          chrome.tabs.create({url : url});
      }
  });
}