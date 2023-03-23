// prepare data for ajax end-points calls
//const beanName = "employeeChangePasswordBean.";
export const prepareFormData = (action, fields = null, bean = null) => {
  const formData = new FormData();
  //const bean = isPassword ? beanName : "";
  formData.append("action", action);
  if (fields) {
    for (const [key, value] of Object.entries(fields)) {
      formData.append(bean + key, value);
    }
    return new URLSearchParams(formData);
  }
  return formData;
};
