import { h, hydrate } from "preact";
import App from "../App";

// client-side hydration on page level
function hydrateApp() {
  const $app = document.getElementById("decide-app");
  if ($app) {
    const initialState = window.DECIDE_APP || {};
    hydrate(<App data={initialState} />, $app);
    console.log("decide app hydrated");
  }
}

hydrateApp();

console.log("decide client ready");
