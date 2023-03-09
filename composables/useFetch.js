
//import { store } from "../store/store";
export const useFetch = async (url, method, data = undefined) => {
  try {
    const response = await fetch(url, {
      method,
      body: data,
      // headers: {
      //   "Content-type": "html",
      // },
    });
    //console.log('success', response);
    //return { error: [], deliveryAddress: '', additionalDeliveryAddress: '', emailAddress: '', isEmailMandatory: true}
    return response.json();
  } catch (error) {
    console.log("Error: ", error);
    store.responseMessage.isError = true;
    store.responseMessage.msg = error;
    return { error: true };
  }
};
