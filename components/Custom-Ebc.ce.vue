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
                <button @click="togglePass" class="edit-btn">
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
              <form id="password-form" @submit.prevent="savePassword">
                <div class="row my-3">
                  <div class="col-12 col-lg-4 font-weight-bold">
                    {{ translate('user-name') }}
                  </div>
                  <div class="col-12 col-lg-8">
                    {{ receivedData?.username }}
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
                                d="M20.69 11.7C20.57 11.44 17.83 5.25 12 5.25C11.4418 5.24942 10.8851 5.30977 10.34 5.43C10.1604 5.48559 10.0083 5.60656 9.91369 5.76899C9.81908 5.93141 9.78892 6.12343 9.82916 6.30704C9.8694 6.49064 9.97712 6.65244 10.131 6.76041C10.2849 6.86837 10.4736 6.91462 10.66 6.89C11.1007 6.79789 11.5497 6.75098 12 6.75C16.18 6.75 18.58 10.85 19.17 12C18.8103 12.7028 18.3886 13.3721 17.91 14C17.824 14.1107 17.7708 14.2433 17.7564 14.3827C17.7419 14.5221 17.7668 14.6627 17.8282 14.7887C17.8897 14.9147 17.9851 15.0209 18.1039 15.0954C18.2226 15.1699 18.3598 15.2096 18.5 15.21C18.6139 15.2096 18.7262 15.1833 18.8285 15.1331C18.9307 15.0828 19.0201 15.01 19.09 14.92C19.7198 14.1202 20.2566 13.2512 20.69 12.33C20.7338 12.2308 20.7564 12.1235 20.7564 12.015C20.7564 11.9065 20.7338 11.7992 20.69 11.7Z"
                                fill="#000000"
                              />
                              <path
                                d="M6.52999 5.47003C6.38781 5.33755 6.19976 5.26543 6.00546 5.26885C5.81116 5.27228 5.62578 5.35099 5.48836 5.48841C5.35095 5.62582 5.27224 5.81121 5.26881 6.00551C5.26538 6.19981 5.33751 6.38785 5.46999 6.53003L6.38999 7.45003C5.08727 8.64844 4.03971 10.0973 3.30999 11.71C3.27066 11.8034 3.2504 11.9037 3.2504 12.005C3.2504 12.1064 3.27066 12.2067 3.30999 12.3C3.42999 12.56 6.16999 18.75 12 18.75C13.5593 18.7577 15.0863 18.3056 16.39 17.45L17.47 18.53C17.6106 18.6705 17.8012 18.7494 18 18.7494C18.1987 18.7494 18.3894 18.6705 18.53 18.53C18.6704 18.3894 18.7493 18.1988 18.7493 18C18.7493 17.8013 18.6704 17.6107 18.53 17.47L6.52999 5.47003ZM10.36 11.47L12.57 13.69C12.2603 13.7927 11.9285 13.8097 11.6099 13.7393C11.2913 13.6689 10.9976 13.5137 10.76 13.29C10.518 13.0514 10.3511 12.7472 10.2801 12.4149C10.209 12.0826 10.2368 11.7367 10.36 11.42V11.47ZM12 17.25C7.80999 17.25 5.41999 13.14 4.82999 12C5.48267 10.6863 6.37068 9.50345 7.44999 8.51003L9.23999 10.3C8.85581 10.9209 8.69263 11.6534 8.7769 12.3787C8.86116 13.104 9.18793 13.7795 9.70422 14.2958C10.2205 14.8121 10.8961 15.1389 11.6213 15.2231C12.3466 15.3074 13.0791 15.1442 13.7 14.76L15.31 16.37C14.3052 16.954 13.1622 17.2579 12 17.25Z"
                                fill="#000000"
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
                                d="M12 18.75C6.17 18.75 3.43 12.56 3.31 12.3C3.27039 12.2049 3.25 12.103 3.25 12C3.25 11.897 3.27039 11.7951 3.31 11.7C3.43 11.44 6.17 5.25 12 5.25C17.83 5.25 20.57 11.44 20.69 11.7C20.7296 11.7951 20.75 11.897 20.75 12C20.75 12.103 20.7296 12.2049 20.69 12.3C20.57 12.56 17.83 18.75 12 18.75ZM4.83 12C5.42 13.15 7.83 17.25 12 17.25C16.17 17.25 18.58 13.15 19.17 12C18.58 10.85 16.17 6.75 12 6.75C7.83 6.75 5.42 10.85 4.83 12Z"
                                fill="#000000"
                              />
                              <path
                                d="M12 15.25C11.3572 15.25 10.7289 15.0594 10.1944 14.7023C9.65994 14.3452 9.24338 13.8376 8.99739 13.2437C8.75141 12.6499 8.68705 11.9964 8.81245 11.366C8.93785 10.7355 9.24738 10.1564 9.7019 9.7019C10.1564 9.24738 10.7355 8.93785 11.366 8.81245C11.9964 8.68705 12.6499 8.75141 13.2437 8.99739C13.8376 9.24338 14.3452 9.65994 14.7023 10.1944C15.0594 10.7289 15.25 11.3572 15.25 12C15.2474 12.8611 14.9041 13.6863 14.2952 14.2952C13.6863 14.9041 12.8611 15.2474 12 15.25ZM12 10.25C11.6539 10.25 11.3155 10.3526 11.0278 10.5449C10.74 10.7372 10.5157 11.0105 10.3832 11.3303C10.2508 11.6501 10.2161 12.0019 10.2836 12.3414C10.3512 12.6809 10.5178 12.9927 10.7626 13.2374C11.0073 13.4822 11.3191 13.6489 11.6586 13.7164C11.9981 13.7839 12.3499 13.7492 12.6697 13.6168C12.9895 13.4843 13.2628 13.26 13.4551 12.9722C13.6474 12.6845 13.75 12.3461 13.75 12C13.7474 11.5367 13.5622 11.0931 13.2345 10.7655C12.9069 10.4378 12.4633 10.2526 12 10.25Z"
                                fill="#000000"
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
                <button @click="toggleEmail" class="edit-btn">
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
              <form id="address-form" @submit.prevent="saveAddress">
                <div class="row my-3">
                  <div class="col-12 col-lg-4 font-weight-bold">
                    {{ translate('email') }}
                  </div>
                  <div
                    class="col-12 col-lg-8"
                    v-if="
                      !isEmail ||
                      receivedData.deliveryAddress ||
                      receivedData.emailAddress
                    "
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
                      <span
                        class="address-data"
                        v-if="!isEmail"
                      >
                        {{ receivedData.additionalDeliveryAddress }}
                      </span>
                      <div class="" v-else>
                        <input
                          class="additional-email address-data form-control"
                          type="email"
                          v-model="emailAddress"
                          :placeholder="
                            receivedData.additionalDeliveryAddress ||
                            receivedData.emailAddress
                          "
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
import { ref, computed, reactive, toRefs, watch, onMounted } from 'vue';
import { useFetch } from '../composables/useFetch';
import { resolveUrl } from '../utils/resolveUrl';
import { useDetectOutsideClick } from '../composables/useDetectOutsideClick';

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
  user: {
    type: String,
  },
  emailUrl: {
    type: String,
  },
  noEmailUrl: {
    type: String,
  },
  credentialUrl: {
    type: String,
  },
  logout: {
    type: String,
  },
});
const toogleFieldType = (i) => {
  fieldsInfo[i].fieldType =
    fieldsInfo[i].fieldType === 'password' ? 'text' : 'password';
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
    : receivedData.value.emailAddress;
});
const showEmail = computed(() => {
  return (
    receivedData.value.deliveryAddress ||
    receivedData.value.emailAddress ||
    translate('no_email')
  );
});
// return translations by keys
const prefix = 'shop.ebc.my_account.';
const translate = (key) => {
  return JSON.parse(props.translations)[prefix + key];
};

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
});
useDetectOutsideClick(emailRef, () => {
  isEmail.value = false;
});

onMounted(async () => {
  await getUserData();
  console.log(receivedData.value);
});

const isAditionalEmail = computed(() => {
  return (
    (isEmail.value || receivedData.value.additionalDeliveryAddress) &&
    receivedData.value.deliveryAddress
  );
});
// fields inputs
const passwords = reactive({
  oldPassword: null,
  newPassword: null,
  newPasswordRetype: null,
});
const { oldPassword, newPassword, newPasswordRetype } = toRefs(passwords);
const emails = reactive({
  additionalDeliveryEmailAddress: null,
  emailAddress: null,
});
const { additionalDeliveryEmailAddress } = toRefs(emails);
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
  if (generalError) showToast(generalError.errorMessage);
};
const clearFieldErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = null;
  });
};
// prepare data for ajax end-points calls
const prepareFormData = (action, fields = null) => {
  const formData = new FormData();
  console.log(fields);
  formData.append('action', action);
  if (fields) {
    for (const [key, value] of Object.entries(fields)) {
      formData.append(key, value);
    }
    return new URLSearchParams(formData);
  }
  return formData;
};
// fetch user data
const receivedData = ref({});
const isEmailMandatory = ref(null);
const emailUrl = ref(null);
const getUserData = async () => {
  const userData = await useFetch(
    props.credentialUrl,
    'POST',
    prepareFormData('edit')
  );
  userData.error.length
    ? handleGeneralError(userData.error)
    : (isEmailMandatory.value = userData.emailMandatory);

  emailUrl.value = isEmailMandatory.value ? props.emailUrl : props.noEmailUrl;
  const emailData = await useFetch(
    emailUrl.value,
    'POST',
    prepareFormData('edit')
  );
  emailData.error.length
    ? handleGeneralError(emailData.error)
    : (receivedData.value = emailData);
};
const emailAddress = computed({
  get() {
    return isEmailMandatory.value
      ? emails.additionalDeliveryEmailAddress
      : emails.emailAddress;
  },
  set(value) {
    if (isEmailMandatory.value) {
      emails.additionalDeliveryEmailAddress = value;
    } else {
      emails.emailAddress = value;
    }
  },
});
const getEmailKey = (value) => {
  console.log(value, Object.keys(emails));
  return Object.keys(emails).find((k) => emails[k] === value);
};
// handle forms states
const isPass = ref(null);
const isEmail = ref(null);
const togglePass = async () => {
  isPass.value = !isPass.value;
  clearFieldErrors();
};
const toggleEmail = async () => {
  isEmail.value = !isEmail.value;
};
// save data end-points calls
const savePassword = async () => {
  const received = await useFetch(
    props.credentialUrl,
    'POST',
    prepareFormData('save', passwords)
  );
  if (received.error.length) {
    handleFieldErrors(received.error);
    console.log('pass errors', received);
  } else {
    showToast(translate('save.success'), false);
    Object.keys(passwords).forEach((key) => {
      passwords[key] = null;
    });
    isPass.value = false;
    useFetch(props.logout, 'POST');
  }
};
const saveAddress = async () => {
  const received = await useFetch(
    emailUrl.value,
    'POST',
    prepareFormData('save', {
      [getEmailKey(emailAddress.value)]: emailAddress.value,
    })
  );
  if (received.error.length) {
    handleGeneralError(received.error);
    // const generalError = received.error.find((e) => e.errorType === "error");
    // if (generalError) showToast(generalError.errorMessage);
    console.log('email errors', received);
  } else {
    showToast(translate('save.success'), false);
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
    showToast(translate('delete.success'), false);
    getUserData();
    emails.additionalDeliveryEmailAddress = null;
    isEmail.value = false;
  }
};
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
// creating & emitting event for showing toast
const emit = defineEmits(['toggle-toast']);
const accountWrapper = ref(null);
const showToast = (msg, type = true) => {
  accountWrapper.value.dispatchEvent(
    new CustomEvent('toggle-toast', {
      bubbles: true,
      composed: true,
      detail: { messages: msg, type: type },
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
  stroke: v-bind(props.primaryColor);
  /* stroke-width: .2; */
}
.eye:hover {
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
</style>
