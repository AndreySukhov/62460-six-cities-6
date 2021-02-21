const cloneSearchUrlParams = (search) => {
  if (search instanceof URLSearchParams) {
    return new URLSearchParams(search.toString());
  }

  return search;
};

const searchStringToURLParams = (search) => {
  if (typeof search === `string`) {
    search = search.replace(/^\?/, `string`);
  }

  return search instanceof URLSearchParams ? cloneSearchUrlParams(search) : new URLSearchParams(search);
};

export {
  searchStringToURLParams
};
