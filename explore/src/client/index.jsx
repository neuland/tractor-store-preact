import { h, hydrate } from "preact";
import register from "preact-custom-element";
import HeaderCe from "./fragments/HeaderCe";
import FooterCe from "./fragments/FooterCe";
import RecommendationsCe from "./fragments/RecommendationsCe";
import StorePickerCe from "./fragments/StorePickerCe";
import App from "../App";

// client-side hydration on page level
function hydrateApp() {
  const $app = document.getElementById("explore-app");
  if ($app) {
    const initialState = window.EXPLORE_APP || {};
    hydrate(<App data={initialState} />, $app);
  }
}

// client-side hydration on fragment level
register(HeaderCe, "explore-header", null, { shadow: true });
register(FooterCe, "explore-footer", null, { shadow: true });
register(RecommendationsCe, "explore-recommendations", null, { shadow: true });
register(StorePickerCe, "explore-storepicker", null, { shadow: true });
hydrateApp();

console.log("explore client ready");
