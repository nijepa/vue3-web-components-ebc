export function resolveUrl(context, path) {
  const currentUrl = window.location.href;
  return currentUrl.slice(0, currentUrl.search(`${context}/`) + 6) + path;
}
