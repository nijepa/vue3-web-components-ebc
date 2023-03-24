<template>
  <section class="stage" ref="accountWrapper">
    <div class="stage__container">
      <h2 class="my-4" :style="{ color: primaryColor }">
        {{ translate('title') }}
      </h2>
      <p class="card-text">{{ translate('text') }}</p>
      <div class="row">
        <div class="col-sm-12 col-md-6 mb-3" ref="passRef">
          <div class="card stage__card voucher-overview">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h4 class="overview-title" @click="togglePass">
                  {{ translate('access-data') }}
                </h4>
                <button
                  @click="togglePass"
                  v-if="userName"
                  class="edit-btn"
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
              <div v-if="!userName" class="loading-spinner"></div>
              <form v-else id="password-form" @submit.prevent="savePassword">
                <div class="row my-3">
                  <div class="col-12 col-lg-4 font-weight-bold">
                    {{ translate('user-name') }}
                  </div>
                  <div class="col-12 col-lg-8">
                    {{ userName }}
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-12 col-lg-4 font-weight-bold mt-3">
                    {{ translate('password') }}
                  </div>
                  <div class="col-12 col-lg-8 mt-3">
                    <Transition name="slide-up" mode="out-in">
                      <span
                        id="ebc-password"
                        class="account-data"
                        v-if="!isPass"
                      >
                        *********
                      </span>
                      <div class="" v-else>
                        <div
                          v-for="(pass, propertyName, i) in passwords"
                          :key="i"
                        >
                          <div
                            class="d-flex mb-3"
                            style="align-items: center; column-gap: 0.5rem"
                          >
                            <input
                              v-model="passwords[propertyName]"
                              class="account-data form-control"
                              required
                              minlength="9"
                              :type="fieldsInfo[i].fieldType"
                              :placeholder="fieldsInfo[i].placeholder"
                              :class="errors[propertyName] && 'is-invalid'"
                              :title="fieldsInfo[i].placeholder"
                              @focus="errors[propertyName] = null"
                            />
                            <svg
                              width="32px"
                              height="32px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              class="eye"
                              @click="toogleFieldType(i)"
                              v-if="fieldsInfo[i].fieldType === 'password'"
                            >
                              <path
                                d="M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <svg
                              width="32px"
                              height="32px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              class="eye"
                              @click="toogleFieldType(i)"
                              v-if="fieldsInfo[i].fieldType === 'text'"
                            >
                              <path
                                d="M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          <p
                            v-if="errors[propertyName]"
                            class="text-danger"
                            v-html="errors[propertyName]"
                          ></p>
                        </div>
                        <button
                          class="btn btn-primary account-data mb-3 disabled"
                          type="submit"
                        >
                          {{ translate('save_changes') }}
                        </button>
                      </div>
                    </Transition>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 mb-3" ref="emailRef">
          <div class="card stage__card voucher-overview">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h4 class="overview-title">
                  {{ translate('delivery-address') }}
                </h4>
                <button
                  @click="toggleEmail"
                  v-if="receivedData.success"
                  class="edit-btn"
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
              <div
                v-if="!receivedData.success"
                class="loading-spinner"
              ></div>
              <form v-else id="address-form" @submit.prevent="saveAddress">
                <div class="row my-3">
                  <div class="col-12 col-lg-4 font-weight-bold">
                    {{ translate('email') }}
                  </div>
                  <div
                    class="col-12 col-lg-8"
                    v-if="!isEmail || isEmailMandatory"
                  >
                    <span id="deliveryAddress">
                      {{ showEmail }}
                    </span>
                  </div>
                </div>
                <div class="row my-3">
                  <Transition name="slide-up" mode="out-in">
                    <div
                      class="col-12 col-lg-4 font-weight-bold additional-email mt-3"
                      v-if="isAditionalEmail"
                    >
                      {{ translate('alternative_email') }}
                    </div>
                    <div
                      class="col-12 col-lg-4 font-weight-bold additional-email mt-3"
                      v-else
                    ></div>
                  </Transition>
                  <div
                    class="col-12 col-lg-8 mt-3"
                    :class="
                      isEmail && !receivedData.deliveryAddress && 'no-email'
                    "
                  >
                    <Transition name="slide-up" mode="out-in">
                      <span class="address-data" v-if="!isEmail">
                        {{ receivedData.additionalDeliveryAddress }}
                      </span>
                      <div class="" v-else>
                        <input
                          class="additional-email address-data form-control"
                          type="email"
                          v-model="emailAddress"
                          :placeholder="receivedData.additionalDeliveryAddress || receivedData.deliveryAddress"
                          required
                        />
                        <button
                          class="btn btn-primary mt-3 address-data disabled"
                          type="submit"
                        >
                          {{ getButtonText(true) }}
                        </button>
                        <button
                          @click.prevent="deleteAddress"
                          class="btn btn-outline product-btn mt-3 address-data disabled"
                          type="submit"
                          v-if="hasDeleteButton"
                        >
                          {{ getButtonText() }}
                        </button>
                      </div>
                    </Transition>
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
import { ref, computed, reactive, onMounted } from 'vue';
import { useFetch } from '../composables/useFetch';
import { useDetectOutsideClick } from '../composables/useDetectOutsideClick';
import { resolveUrl } from '../utils/resolveUrl';
import { prepareFormData } from '../utils/prepareFormData';
import { clearObjectValues } from '../utils/utils';

// setting props
const props = defineProps({
  translations: {
    type: String,
  },
  primaryColor: {
    type: String,
    default: '#fff',
  },
  hoverColor: {
    type: String,
    default: '#660000',
  },
  font: {
    type: String,
    default: '',
  },
  actionUrl: {
    type: String,
    default: '',
  },
});
// actions paths
const urls = {
  email: 'email/delivery_address',
  noEmail: 'email/login',
  credential: 'credential',
  accountDetails: 'account_details',
};
// seting template elements states
const toogleFieldType = (i) => {
  fieldsInfo[i].fieldType =
    fieldsInfo[i].fieldType === 'password' ? 'text' : 'password';
};
const resetFieldType = () => {
  fieldsInfo.forEach((f) => (f.fieldType = 'password'));
};
const getButtonText = (type = false) => {
  if (type) {
    return isEmailMandatory.value
      ? translate('send_to_alternative_email')
      : translate('save_email');
  }
  return isEmailMandatory.value
    ? translate('delete_alternative_email')
    : translate('delete_email');
};
const hasDeleteButton = computed(() => {
  return isEmailMandatory.value
    ? receivedData.value.additionalDeliveryAddress
    : receivedData.value.deliveryAddress;
});
const showEmail = computed(() => {
  return receivedData.value.deliveryAddress || translate('no_email');
});
const isAditionalEmail = computed(() => {
  return (
    (isEmail.value || receivedData.value.additionalDeliveryAddress) &&
    receivedData.value.deliveryAddress && isEmailMandatory.value
  );
});
// return translations by keys
const prefix = 'shop.ebc.my_account.';
const translate = (key) => {
  return JSON.parse(props.translations)[prefix + key];
};
// define fields types/translations
const fieldsInfo = reactive([
  {
    fieldType: 'password',
    placeholder: translate('old_password'),
  },
  {
    fieldType: 'password',
    placeholder: translate('new_password'),
  },
  {
    fieldType: 'password',
    placeholder: translate('repeat_new_password'),
  },
]);
// handle click outside
const passRef = ref();
const emailRef = ref();
useDetectOutsideClick(passRef, () => {
  isPass.value = false;
  resetFieldType();
});
useDetectOutsideClick(emailRef, () => {
  isEmail.value = false;
});
// load user data
onMounted(async () => {
  await getUserData();
});
// fields inputs
const passwords = reactive({
  oldPassword: null,
  newPassword: null,
  newPasswordRetype: null,
});
const emails = reactive({
  additionalDeliveryAddress: null,
  deliveryAddress: null,
});
// handle errors
const errors = reactive({
  oldPassword: null,
  newPassword: null,
  newPasswordRetype: null,
});
const handleFieldErrors = (err) => {
  const fieldErrors = err.filter((e) => {
    return e.errorType === 'FieldError';
  });
  if (fieldErrors.length) {
    fieldErrors.forEach((f) => {
      errors[f.errorField] = f.errorMessage;
    });
  }
};
const handleGeneralError = (err) => {
  const generalError = err.find((e) => e.errorType === 'error');
  if (generalError) showToast(generalError.errorMessage, 'error');
};
// fetch data credentials & emails
const receivedData = ref({});
const isEmailMandatory = ref(null);
const emailUrl = ref(null);
const userName = ref(null);
const getUserData = async () => {
  const userData = await useFetch(
    resolveUrl(props.actionUrl, urls.accountDetails),
    'POST',
    prepareFormData('init')
  );
  if (userData.error.length) {
    handleGeneralError(userData.error);
  } else {
    isEmailMandatory.value = userData.emailMandatory;
    userName.value = userData.username;
  }

  emailUrl.value = isEmailMandatory.value
    ? resolveUrl(props.actionUrl, urls.email)
    : resolveUrl(props.actionUrl, urls.noEmail);
  const emailData = await useFetch(
    emailUrl.value,
    'POST',
    prepareFormData('edit')
  );
  emailData.error.length
    ? handleGeneralError(emailData.error)
    : (receivedData.value = emailData);
};
// handle email type
const emailAddress = computed({
  get() {
    return isEmailMandatory.value
      ? emails.additionalDeliveryAddress
      : emails.deliveryAddress;
  },
  set(value) {
    if (isEmailMandatory.value) {
      emails.additionalDeliveryAddress = value;
    } else {
      emails.deliveryAddress = value;
    }
  },
});
// define email type (email or aditional email)
const getEmailKey = (value) => {
  return Object.keys(emails).find((k) => emails[k] === value);
};
// handle forms states
const isPass = ref(null);
const isEmail = ref(null);
const togglePass = () => {
  isPass.value = !isPass.value;
  clearObjectValues(errors);
};
const toggleEmail = () => {
  isEmail.value = !isEmail.value;
};
// end-points calls for saving/deleting data
const savePassword = async () => {
  const received = await useFetch(
    resolveUrl(props.actionUrl, urls.credential),
    'POST',
    prepareFormData('save', passwords, 'employeeChangePasswordBean.')
  );
  if (received.error.length) {
    handleFieldErrors(received.error);
    console.log('pass errors', received);
  } else {
    showToast(translate('save.success'), 'success', true);
    clearObjectValues(passwords);
    isPass.value = false;
  }
};
const saveAddress = async () => {
  const received = await useFetch(
    emailUrl.value,
    'POST',
    prepareFormData(
      'save',
      {
        [getEmailKey(emailAddress.value)]: emailAddress.value,
      },
      'deliveryEmailAddressBean.'
    )
  );
  if (received.error.length) {
    handleGeneralError(received.error);
    console.log('email errors', received);
  } else {
    showToast(translate('save.success'), 'success');
    getUserData();
    emailAddress.value = null;
    isEmail.value = false;
  }
};
const deleteAddress = async () => {
  const received = await useFetch(
    emailUrl.value,
    'POST',
    prepareFormData('delete')
  );
  if (received.error.length) {
    handleGeneralError(received.error);
    console.log('delete email error', received);
  } else {
    showToast(translate('delete.success'), 'success');
    getUserData();
    emails.additionalDeliveryAddress = null;
    isEmail.value = false;
  }
};
// creating & emitting event for showing toast
const emit = defineEmits(['toggle-toast']);
const accountWrapper = ref(null);
const showToast = (messages, type, fixed = false) => {
  accountWrapper.value.dispatchEvent(
    new CustomEvent('toggle-toast', {
      bubbles: true,
      composed: true,
      detail: { messages, type, fixed },
    })
  );
};
</script>
<style>
* {
  scroll-margin-top: 150px;
}

*,
::after,
::before {
  box-sizing: border-box;
}

.stage {
  padding-bottom: 1.5rem;
  font-family: v-bind(props.font);
  display: flex;
}

.stage__container {
  position: relative;
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

.form-control.is-invalid,
.was-validated .form-control:invalid {
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem) !important;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.form-control.is-invalid:focus,
.was-validated .form-control:invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgb(220 53 69 / 25%);
}

[type='button']:not(:disabled),
[type='reset']:not(:disabled),
[type='submit']:not(:disabled),
button:not(:disabled) {
  cursor: pointer;
}

.edit-btn {
  background: transparent;
  color: v-bind(props.primaryColor);
  border: none;
  padding: 0 !important;
}

.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.mb-4,
.my-4 {
  margin-bottom: 1.5rem !important;
}

.mt-4,
.my-4 {
  margin-top: 1.5rem !important;
}

.mt-3,
.my-3 {
  margin-top: 1rem !important;
}

h2 {
  font-size: 1.75rem;
  line-height: 1.25;
}

h4 {
  font-size: 1.1875rem;
  line-height: 1.25;
}

h4 {
  font-size: 1.5rem;
}

h2,
h4 {
  font-weight: 500;
  line-height: 1.2;
}

h2,
h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  line-height: 1.25;
  color: v-bind(props.primaryColor);
}

.row {
  margin-right: -15px;
  margin-left: -15px;
}

.font-weight-bold {
  font-weight: 700 !important;
}

.overview-title {
  font-size: 1.75rem;
  color: v-bind(props.primaryColor);
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

.col,
.col-12,
.col-lg-4,
.col-lg-8,
.col-md-6,
.col-sm-12 {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  float: left;
}

.col-12 {
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
}

@media (min-width: 992px) {
  .stage {
    padding: 2rem 0 3.5rem;
  }

  .col-lg-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }

  .col-lg-8 {
    -ms-flex: 0 0 66.666667%;
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
}

@media (min-width: 1200px) {
  .stage__container {
    max-width: 1140px;
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
  .stage {
    padding: 1.5rem 0 3rem;
  }

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
  /* background-color: #fff; */
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.stage__card {
  height: 100%;
  background-color: transparent;
  border: none;
  padding: 1rem;
  background: rgb(255, 255, 255);
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 12%);
}

.stage__card .card-body {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  height: 100%;
  justify-content: unset;
  min-height: 191px;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
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
  .products-list-wrapper,
  .voucher-overview {
    padding: 1rem 0;
    box-shadow: none;
  }
}

.btn {
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
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn {
  letter-spacing: -0.015rem;
  padding: 0.75rem;
  font-weight: 600;
  border-radius: 0.5rem;
}

.btn-primary {
  background-color: v-bind(props.primaryColor);
  color: rgb(255, 255, 255);
  outline: none;
  border: 0;
}

.account-data,
.address-data {
  width: 100%;
}

.no-email {
  margin-top: -1.5rem !important;
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

.btn-primary:hover,
.btn-primary:active,
.btn-primary:focus,
.btn-primary:not(:disabled):not(.disabled).active,
.btn-primary:not(:disabled):not(.disabled):active,
.show > .btn-primary.dropdown-toggle {
  background-color: v-bind(props.hoverColor);
  border-color: v-bind(props.hoverColor);
  outline: none;
  box-shadow: none;
  color: rgb(255, 255, 255);
}

.product-btn {
  border-color: v-bind(props.primaryColor);
  color: v-bind(props.primaryColor);
}

.product-btn:hover,
.product-btn:active,
.product-btn:focus {
  background-color: v-bind(props.primaryColor);
  border-color: v-bind(props.primaryColor);
  box-shadow: 0 0 0 0.2rem #d9d9d9;
  color: white;
}

.bi:hover {
  fill: v-bind(props.hoverColor);
}

.text-danger {
  color: #dc3545 !important;
}

.eye {
  cursor: pointer;
  /* stroke: v-bind(props.primaryColor); */
  /* stroke-width: .2; */
}

.eye path {
  stroke: v-bind(props.primaryColor);
}

.eye:hover path {
  stroke: v-bind(props.hoverColor);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.loading-spinner {
  display: block;
  width: 80px;
  height: 80px;
  margin: 3rem auto;
}

.loading-spinner:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: v-bind(props.primaryColor) transparent
    v-bind(props.primaryColor) transparent;
  animation: loading-spinner 1.2s linear infinite;
}

@keyframes loading-spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
