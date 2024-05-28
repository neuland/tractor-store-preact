const team = "explore";

const api = async (path, opts = {}) => {
  const prefix = typeof window === "undefined" ? `http://localhost:3001` : "";
  let url = `${prefix}/${team}${path}`;
  if (opts.query) {
    url += `?${new URLSearchParams(opts.query).toString()}`;
  }
  return await fetch(url, opts).then((res) => res.json());
};

export async function fetchPageData(page, query) {
  if (page === "about") {
    return api("/api/about", { query });
  }
}

export async function fetchFragmentData(name, query) {
  if (name === "navigation") {
    return api("/api/navigation", { query });
  }
}
