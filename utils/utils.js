// empty object values for all keys
export const clearObjectValues = (object) => {
  Object.keys(object).forEach((key) => {
    object[key] = null;
  });
};
