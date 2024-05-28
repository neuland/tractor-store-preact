import { h } from "preact";
import { Router } from "preact-router";
import { Link } from "preact-router/match";
import About from "./pages/About";
import Stores from "./pages/Stores";

const App = ({ path, data }) => {
  return (
    <div>
      <nav>
        <Link href="/checkout">Home</Link>
        <Link href="/checkout/about">About</Link>
        <Link href="/checkout/stores">Stores</Link>
      </nav>
      <Router url={path}>
        <div path="/checkout">
          <h1>Checkout Home</h1>
        </div>
        <About path="/checkout/about" {...data} />
        <Stores path="/checkout/stores" {...data} />
        <div default>
          <h1>404 Not Found {path}</h1>
        </div>
      </Router>
      <a href="/decide" data-native>
        « Decide
      </a>
      <br />
      <a href="/explore" data-native>
        Explore ↩
      </a>
    </div>
  );
};

export default App;
