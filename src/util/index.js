const mergeSearchWithParam = (search, params) => {
  let urlParams = new URLSearchParams();
  for (const key in params) {
    if (params[key] !== undefined) {
      urlParams.set(key, params[key].trim());
    }
  }
  return urlParams.toString();
};

export {
  mergeSearchWithParam
};
