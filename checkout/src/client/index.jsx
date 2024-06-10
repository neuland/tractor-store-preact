import { h, hydrate } from "preact";
import register from "preact-custom-element";
import AddToCartCe from "./fragments/AddToCartCe";
import MiniCartCe from "./fragments/MiniCartCe";
import App from "../App";

// client-side hydration on page level
function hydrateApp() {
  const $app = document.getElementById("checkout-app");
  if ($app) {
    const initialState = window.CHECKOUT_APP || {};
    hydrate(<App data={initialState} />, $app);
  }
}

// client-side hydration on fragment level
register(AddToCartCe, "checkout-addtocart", null, { shadow: true });
register(MiniCartCe, "checkout-minicart", null, { shadow: true });
hydrateApp();

console.log("checkout client ready");
