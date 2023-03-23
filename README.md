# custom-ebc

## Vite, Vue3 web-component *`custom-ebc`*

(standalone web component made with Vue3 & Vite)

<hr>

## Usage

### Import component

#### in HTML header in `structure.vm` velocity template

```html
  <script type="module" crossorigin src="/scripts/path/to/ebc.js"></script>
```

### Place component

#### in velocity template `account_details.vm`

```html
  <custom-ebc></custom-ebc>
```

## Interacting with component

### Script for getting required translations & styles and *listening* to event:

```js
  <script async defer>
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
      "primary-color": getComputedStyle(document.querySelector('.site-title')).color,
      "hover-color": getComputedStyle(document.querySelector('.hover-color')).color,
      font: getComputedStyle(document.querySelector('.site-title')).fontFamily,
      "action-url": "${link.getAction('/ajax/taxfreenoncashbenefit/email')}"
    };
    setAttributes(ebc, ebcProps);
    window.addEventListener("toggle-toast", toggleToast);
    function toggleToast(e) {
      showToast(e.detail.messages, e.detail.type, e.detail.fixed)
    }
  </script>
```

<hr>

### Props

- #### ***Translations are recived from velocity action as object, need to use JSON.parse:***

  ### **`translations`**

    - Type: String

<br/>

- #### ***Styles are received from site elements:***

  ### **`primaryColor`**

    - Type: String

  ### **`hoverColor`**

    - Type: String

  ### **`font`**

    - Type: String

<br/>

- #### ***Action url are received from velocity action:***

  ### **`actionUrl`**

    - Type: String
    - Default: ''

<hr>

## Deployment

- build app
- rename compiled file to **`ebc.js`**
- upload file to **`Doocroot-Explorer -> scripts/path/for/app`**

<hr>

### Project setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run serve
```

#### Compiles and minifies for production

```
npm run build
```
