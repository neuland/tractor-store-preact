import { h } from "preact";

const isServer = typeof window === "undefined";

const esiPrefix = (team) => {
  const urls = {
    checkout: process.env.CHECKOUT_URL,
  };
  return `${urls[team]}/${team}/fragment`;
};

const Fragment = ({ team, name, ...props }) => {
  let esi = null;
  if (isServer) {
    const query = new URLSearchParams(props).toString();
    const url = `${esiPrefix(team)}/${name}?${query}`;
    esi = <esi:include src={url} />;
  }
  return h(`${team}-${name}`, props, esi);
};

export default Fragment;
