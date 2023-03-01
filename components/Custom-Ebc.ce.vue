<template>
  <section class="stage">
    <div class="container-xl stage__container">
      <h2 class="my-4" :style="{'color': primaryColor}">{{ translate('title') }}</h2>
      <p class="card-text">{{ translate('text') }}</p>
      <div class="row">{{ user }} - {{ receivedData }}</div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useFetch } from '../composables/useFetch';
import { resolveUrl } from '../utils/resolveUrl';

// setting props
const props = defineProps({
  translations: {
    type: String,
  },
  primaryColor: {
    type: String,
    default: '#fff'
  },
  font: {
    type: String,
    default: '',
  },
  user: {
    type: String
  },
  emailUrl: {
    type: String
  },
  credentialUrl: {
    type: String
  }
});

// return translations by keys
const prefix = "shop.ebc.my_account.";
const translate = (key) => {
  return JSON.parse(props.translations)[prefix + key];
};


// fetch availabile vouchers
const receivedData = ref([]);
const getData = async () => {
  const received = await useFetch(props.emailUrl, 'POST', { action: "load_data" });
  received.error.length
    ? handleError(received.errorMessage)
    : (receivedData.value = received);
};

onMounted(async () => {
  await getData()
  console.log(receivedData.value)
})
// // setting component state
// const active = ref(false);
// watch(
//   () => props.isActive,
//   (newValue) => {
//     active.value = newValue === 'true';
//     if (active.value) {
//       !receivedData.value.length && getData();
//       search.value.focus();
//     }
//   }
// );

// // creating & emitting events
// const emit = defineEmits(['close-search']);
// const searchWrapper = ref(null);
// const hideSearch = () => {
//   active.value = false;
//   searchWrapper.value.dispatchEvent(
//     new CustomEvent('close-search', {
//       bubbles: true,
//       composed: true,
//     })
//   );
// };
</script>
<style></style>
