import { h } from "preact";

const isServer = typeof window === "undefined";

const Fragment = ({ team, name, ...props }) => {
  let esi = null;
  if (isServer) {
    const query = new URLSearchParams(props).toString();
    const url = `http://localhost:3001/${team}/fragment/${name}?${query}`;
    esi = <esi:include src={url} />;
  }
  return h(`${team}-${name}`, props, esi);
};

export default Fragment;
