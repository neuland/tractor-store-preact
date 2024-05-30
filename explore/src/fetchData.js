const isServer = typeof window === "undefined";

const api = async (path, opts = {}) => {
  const prefix = isServer ? process.env.EXPLORE_URL : "";
  let url = `${prefix}/explore/api${path}`;
  if (opts.query) {
    url += `?${new URLSearchParams(opts.query).toString()}`;
  }
  return await fetch(url, opts).then((res) => res.json());
};

export async function fetchPageData(page, query) {
  if (page === "stores") {
    return api("/stores", { query });
  } else if (page === "home") {
    return api("/home");
  } else if (page === "category") {
    return api("/category", { query });
  }
}

export async function fetchFragmentData(name, query) {
  if (name === "navigation") {
    return api("/navigation", { query });
  }
}
