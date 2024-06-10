import { h } from "preact";
import { IMAGE_SERVER } from "../utils.js";
import c from "./CompactHeader.module.css";

export default () => {
  return (
    <header class={c.root}>
      <div class={c.inner}>
        <a class={c.link} href="/" data-native>
          <img
            class={c.logo}
            src={`${IMAGE_SERVER}/cdn/img/logo.svg`}
            alt="Micro Frontends - Tractor Store"
          />
        </a>
      </div>
    </header>
  );
};
