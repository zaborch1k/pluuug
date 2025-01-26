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