// vue3 web component toast handling
const toast = document.querySelector("custom-toast");
const td = {}
// const ts = { position: "center", decoration: false, colorized: false, backdrop: false };
// toast.setAttribute("toast-style", JSON.stringify(ts));
const messages = {
  success: "$!{messages.get('shop.ebc.messages.success')}",
  error: "$!{messages.get('shop.ebc.messages.error')}"
}
function showToast(msg, type, fixed = false) {
  td.message = JSON.parse(JSON.stringify(msg))
  td.title = messages[type]
  td.type = type
  toast.setAttribute("toast-data", JSON.stringify(td));
  if(fixed) {
    toast.setAttribute("fixed", JSON.stringify(fixed))
    toast.setAttribute("logout-url", JSON.stringify(ebcProps.logout))
    toast.setAttribute("logout-title", JSON.stringify(ebcProps.title))
  }
  toast.setAttribute("is-active", "true");
}
window.addEventListener("close-toast", toastClosed);
function toastClosed() {
  toast.setAttribute("is-active", "false");
}
// vue3 web component ebc handling
const ebc = document.querySelector("custom-ebc");
function setAttributes(el, attrs) {
  for (var key in attrs) {
    const attr =
      typeof attrs[key] !== "string"
        ? JSON.stringify(attrs[key])
        : attrs[key];
    el.setAttribute(key, attr);
  }
}
const ebcProps = {
  translations: {
    #foreach($resource in ${messages.getResourcesWithPrefix('shop.ebc.my_account')})
      '$!{resource.getKey()}': '$!{resource.getValue().replace("'", "")}',
    #end
  },
  user: document.querySelector('.site-title').innerText,
  "primary-color": getComputedStyle(document.querySelector('.site-title')).color,
  "hover-color": getComputedStyle(document.querySelector('.hover-color')).color,
  font: getComputedStyle(document.querySelector('.site-title')).fontFamily,
  "action-url": "${link.getAction('/ajax/taxfreenoncashbenefit/email')}",
  "logout": "${link.getAction('/taxfreenoncashbenefit/logout')}"
};
setAttributes(ebc, ebcProps);
window.addEventListener("toggle-toast", toggleToast);
function toggleToast(e) {
  showToast(e.detail.messages, e.detail.type, e.detail.fixed)
}