import { h, hydrate } from "preact";
import register from "preact-custom-element";
import NavigationCe from "./fragments/NavigationCe";
import App from "./App";

// client-side hydration on page level
window.onload = () => {
  const $app = document.getElementById("checkout-app");
  if ($app) {
    const state = JSON.parse($app.nextElementSibling.textContent || "{}");
    hydrate(<App data={state} />, $app);
  }
};

// hook into preact-custom-elements initialization and provide state from DOM to custom elements
window.addEventListener(
  "_preact",
  (event) => {
    const $el = event.target;
    const tagName = $el.tagName.toLowerCase();
    if (tagName.startsWith("checkout-") && $el.shadowRoot) {
      const $state = $el.querySelector("script[data-state]");
      const state = JSON.parse($state?.textContent || "{}");
      event.detail.context = state;
      $el.setAttribute("hydate", true);
    }
  },
  { capture: true }
);

// client-side hydration on fragment level
register(NavigationCe, "checkout-navigation", null, { shadow: true });
