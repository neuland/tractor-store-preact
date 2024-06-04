const isServer = typeof window === "undefined";

export default async function (path, opts = {}) {
  const prefix = isServer ? process.env.DECIDE_URL : "";
  let url = `${prefix}/decide/api${path}`;
  if (opts.query) {
    url += `?${new URLSearchParams(opts.query).toString()}`;
  }
  return await fetch(url, opts).then((res) => res.json());
}
