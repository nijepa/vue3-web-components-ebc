<template>
  <section class="stage">
    <div class="container-xl stage__container">
      <h2 class="my-4" :style="{ color: primaryColor }">
        {{ translate('title') }}
      </h2>
      <p class="card-text">{{ translate('text') }}</p>
      <div class="row">
        <div class="col-sm-12 col-md-6 mb-3">
          <div class="card stage__card voucher-overview">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h4
                  class="overview-title"
                  @click="togglePass"
                >
                  {{ translate('access-data') }}
                </h4>
                <button
                  @click="togglePass"
                  class="edit-btn p-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>
              </div>
              <form id="password-form" onsubmit="savePasswordAction(event)">
                <div class="row my-3">
                  <div class="col-12 col-lg-4 font-weight-bold">
                    {{ translate('user-name') }}
                  </div>
                  <div class="col-12 col-lg-8">
                    {{ user }}
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-12 col-lg-4 font-weight-bold">
                    {{ translate('password') }}
                  </div>
                  <div class="col-12 col-lg-8">
                    <span id="ebc-password" class="account-data">
                      *********
                    </span>
                    <input
                      v-if="isPass"
                      id="oldPassword"
                      name="oldPassword"
                      class="account-data form-control  mb-3"
                      required
                      minlength="9"
                      type="password"
                      :placeholder="translate('old_password')"
                    />
                    <p class="text-danger oldPassword" hidden></p>
                    <input
                      v-if="isPass"
                      id="newPassword"
                      name="newPassword"
                      class="account-data form-control  mb-3"
                      required
                      minlength="9"
                      type="password"
                      :placeholder="translate('new_password')"
                    />
                    <p class="text-danger newPassword" hidden></p>
                    <input
                    v-if="isPass"
                      id="newPasswordRetype"
                      name="newPasswordRetype"
                      class="account-data form-control  mb-3"
                      required
                      minlength="9"
                      type="password"
                      :placeholder="translate('repeat_new_password')"
                    />
                    <p class="text-danger newPasswordRetype" hidden></p>
                    <button
                      v-if="isPass"
                      id="submit-changed-password"
                      class="btn btn-primary account-data  mb-3 disabled"
                      type="submit"
                    >
                      {{ translate('save_changes') }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 mb-3">
          <div class="card stage__card voucher-overview">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h4 class="overview-title">
                  {{translate('delivery-address')}}
                </h4>
                <button
                  @click="toggleEmail"
                  class="edit-btn p-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>
              </div>
              <form id="address-form" @submit="saveAddress">
                <div class="row my-3">
                  <div class="col-12 col-lg-4 font-weight-bold">
                    {{ translate('email') }}
                  </div>
                  <div class="col-12 col-lg-8">
                    <span id="deliveryAddress">
                      {{ receivedData.deliveryAddress }}
                    </span>
                  </div>
                  <div
                    class="col-12 col-lg-4 font-weight-bold mt-4 additional-email"
                  >
                    {{ translate('alternative_email') }}
                  </div>
                  <div class="col-12 col-lg-8">
                  <span id="additionalDeliveryAddress" class="address-data">
                      {{ receivedData.additionalDeliveryAddress }}
                    </span>
                  </div>
                  <div class="col-12 col-lg-8 mt-4 additional-email-data" v-if="isEmail">
                    
                    <input
                      id="additionalDeliveryEmailAddress"
                      class="additional-email address-data form-control "
                      type="email"
                      required
                    />
                    <button
                      id="submit-address"
                      class="btn btn-primary mt-3 address-data  disabled"
                      type="submit"
                    >
                      {{ translate('send_to_alternative_email') }}
                    </button>
                    <button
                      id="delete-address"
                      onclick="deleteAddressAction(event)"
                      class="btn btn-outline product-btn mt-3 address-data  disabled"
                      type="submit"
                    >
                      {{ translate('delete_alternative_email') }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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
    default: '#fff',
  },
  font: {
    type: String,
    default: '',
  },
  user: {
    type: String,
  },
  emailUrl: {
    type: String,
  },
  credentialUrl: {
    type: String,
  },
});

// return translations by keys
const prefix = 'shop.ebc.my_account.';
const translate = (key) => {
  return JSON.parse(props.translations)[prefix + key];
};

// fetch availabile vouchers
const receivedData = ref([]);
const getData = async () => {
  const received = await useFetch(props.emailUrl, 'POST', {
    action: 'load_data',
  });
  received.error.length
    ? handleError(received.errorMessage)
    : (receivedData.value = received);
};

onMounted(async () => {
  await getData();
  console.log(receivedData.value);
});

const isPass = ref(null)
const isEmail = ref(null)
const togglePass = () => {
  isEmail.value = false
  isPass.value = !isPass.value
}
const toggleEmail = () => {
  isPass.value = false
  isEmail.value = !isEmail.value
}

const saveAddressAction = () => {

}
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
<style>
* {
    scroll-margin-top: 150px;
}

*, ::after, ::before {
    box-sizing: border-box;
}
body {
    opacity: 1 !important;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
    font-family: 'Open Sans Regular', sans-serif;
    color: #000000;
}
.stage__container {
  position: relative;
}
@media (min-width: 992px){
.stage {
    padding: 2rem 0 3.5rem;
}
}
@media (min-width: 768px){
.stage {
    padding: 1.5rem 0 3rem;
}
}
.stage {
    padding-bottom: 1.5rem;
}
@media (min-width: 1200px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl {
    max-width: 1140px;
  }
}
.container,
.container-fluid,
.container-lg,
.container-md,
.container-sm,
.container-xl {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.account-data,
.address-data {
  width: 100%;
}
.form-control {
  height: 3rem;
}
.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}
.d-none {
  display: none !important;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
[type='button']:not(:disabled),
[type='reset']:not(:disabled),
[type='submit']:not(:disabled),
button:not(:disabled) {
  cursor: pointer;
}
.edit-btn {
  background: transparent;
  color: #b30000;
  border: none;
}
.p-0 {
  padding: 0 !important;
}
.mb-4,
.my-4 {
  margin-bottom: 1.5rem !important;
}
.mt-4,
.my-4 {
  margin-top: 1.5rem !important;
}
.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.mt-3,
.my-3 {
  margin-top: 1rem !important;
}
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  line-height: 1.25;
  /*color: #b30000;*/
}
h2,
.h2 {
  font-size: 1.75rem;
}
h4, .h4 {
    font-size: 1.1875rem;
}
.h4, h4 {
    font-size: 1.5rem;
}

.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
}
h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
}
.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}


.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}


.font-weight-bold {
  font-weight: 700 !important;
}
.overview-title {
  font-size: 1.75rem;
  color: #b30000;
}
.overview-title {
  text-align: center;
}
.edit-btn svg {
  width: 1.5rem;
  height: 1.5rem;
}

svg {
  overflow: hidden;
  vertical-align: middle;
}
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  line-height: 1.25;
  color: #b30000;
}

.col,
.col-1,
.col-10,
.col-11,
.col-12,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-auto,
.col-lg,
.col-lg-1,
.col-lg-10,
.col-lg-11,
.col-lg-12,
.col-lg-2,
.col-lg-3,
.col-lg-4,
.col-lg-5,
.col-lg-6,
.col-lg-7,
.col-lg-8,
.col-lg-9,
.col-lg-auto,
.col-md,
.col-md-1,
.col-md-10,
.col-md-11,
.col-md-12,
.col-md-2,
.col-md-3,
.col-md-4,
.col-md-5,
.col-md-6,
.col-md-7,
.col-md-8,
.col-md-9,
.col-md-auto,
.col-sm,
.col-sm-1,
.col-sm-10,
.col-sm-11,
.col-sm-12,
.col-sm-2,
.col-sm-3,
.col-sm-4,
.col-sm-5,
.col-sm-6,
.col-sm-7,
.col-sm-8,
.col-sm-9,
.col-sm-auto,
.col-xl,
.col-xl-1,
.col-xl-10,
.col-xl-11,
.col-xl-12,
.col-xl-2,
.col-xl-3,
.col-xl-4,
.col-xl-5,
.col-xl-6,
.col-xl-7,
.col-xl-8,
.col-xl-9,
.col-xl-auto {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}
.col-12 {
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
}
@media (min-width: 992px) {
  .col-lg-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
}
@media (min-width: 992px) {
.col-lg-8 {
    -ms-flex: 0 0 66.666667%;
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
}
}
@media (min-width: 576px) {
  .col-sm-12 {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
  }
}
@media (min-width: 768px) {
  .col-md-6 {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }
}

.card {
  border: none;
}
.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}
.voucher-overview {
  padding: 1rem;
  background: rgb(255, 255, 255);
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 12%);
}
.stage__card {
  height: 100%;
  background-color: transparent;
  border: none;
}



.stage__card .card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.stage__card .card-body {
  justify-content: unset;
}
.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
}
.justify-content-between {
  -ms-flex-pack: justify !important;
  justify-content: space-between !important;
}

.d-flex {
  display: -ms-flexbox !important;
  display: flex !important;
}
@media (max-width: 576px) {
.products-list-wrapper, .voucher-overview {
    padding: 1rem 0;
    box-shadow: none;
}
}.btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.btn {
    letter-spacing: -0.0125rem;
    padding: 0.75rem;
    font-weight: 600;
    border-radius: 0.5rem;
}
.btn-primary {
    background-color: #b30000;
    color: rgb(255, 255, 255);
    outline: none;
    border: 0;
}
.account-data, .address-data {
    width: 100%;
}

.form-control {
    height: 3rem;
}
.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
}
.btn-primary:hover, .btn-primary:active, .btn-primary:focus, .btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .btn-soft-primary:hover, .btn-soft-primary:active, .btn-soft-primary:focus, .btn-soft-primary:not(:disabled):not(.disabled).active, .btn-soft-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle {
    background-color: #660000;
    border-color: #660000;
    outline: none;
    box-shadow: none;
    color: rgb(255, 255, 255);
}
.product-btn {
    border-color: #b30000;
    color: #b30000;
}
.product-btn:hover, .product-btn:active, .product-btn:focus {
    background-color: #b30000;
    border-color: #b30000;
    box-shadow: 0 0 0 0.2rem #d9d9d9;
    color: white;
}
</style>
