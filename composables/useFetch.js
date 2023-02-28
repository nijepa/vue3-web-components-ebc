
//import { store } from "../store/store";
export const useFetch = async (url, method, data = undefined) => {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    //console.log('success', response);
    return response.json();
  } catch (error) {
    console.log("Error: ", error);
    store.responseMessage.isError = true;
    store.responseMessage.msg = error;
    return { error: true };
  }
};