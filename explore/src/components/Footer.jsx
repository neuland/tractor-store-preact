import { h } from "preact";
import { IMAGE_SERVER } from "../utils";
import c from "./Footer.module.css";

export default () => {
  return (
    <footer class={c.footer} data-boundary="explore-footer">
      <link rel="stylesheet" href="/explore/static/client.css" />
      <div class={c.cutter}>
        <div class={c.inner}>
          <div class={c.initiative}>
            {/* please leave this part untouched */}
            <img
              src={`${IMAGE_SERVER}/cdn/img/neulandlogo.svg`}
              alt="neuland - Büro für Informatik"
            />
            <p>
              the tractor store reference implementation <br />a{" "}
              <a href="https://neuland-bfi.de" target="_blank">
                neuland
              </a>{" "}
              project
            </p>
          </div>

          <div class={c.credits}>
            {/* replace this details about your implementation and organization */}
            <h4>techstack</h4>
            <p>
              build with no frameworks, server-side, modular monolith, Node.js
            </p>
            <p>
              build by{" "}
              <img
                src={`${IMAGE_SERVER}/cdn/img/neulandlogo.svg`}
                alt="neuland - Büro für Informatik"
              />{" "}
              <a href="https://neuland-bfi.de" target="_blank">
                neuland
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
