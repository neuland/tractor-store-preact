import { h } from "preact";
import Recommendation from "./Recommendation.jsx";
import c from "./Recommendations.module.css";

const Recommendations = ({ recommendations }) => {
  return recommendations.length ? (
    <div class={c.recommendations} data-boundary="checkout">
      <link rel="stylesheet" href="/checkout/static/client.css" />
      <h2>Recommendations</h2>
      <ul class={c.list}>{recommendations.map(Recommendation)}</ul>
    </div>
  ) : null;
};

Recommendations.api = "/recommendations";

export default Recommendations;
