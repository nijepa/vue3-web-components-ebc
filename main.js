import { defineCustomElement } from "vue";
import ebc from "./components/Custom-Ebc.ce.vue";
const CustomEbc = defineCustomElement(ebc);
customElements.define("custom-ebc", CustomEbc);
