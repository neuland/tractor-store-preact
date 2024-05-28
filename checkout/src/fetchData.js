const isServer = typeof window === "undefined";

const api = async (path, opts = {}) => {
  const prefix = isServer ? process.env.CHECKOUT_URL : "";
  let url = `${prefix}/checkout/api${path}`;
  if (opts.query) {
    url += `?${new URLSearchParams(opts.query).toString()}`;
  }
  return await fetch(url, opts).then((res) => res.json());
};

export async function fetchPageData(page, query) {
  if (page === "about") {
    return api("/about", { query });
  }
}

export async function fetchFragmentData(name, query) {
  if (name === "navigation") {
    return api("/navigation", { query });
  }
}
