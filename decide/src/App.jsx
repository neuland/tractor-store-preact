import { h } from "preact";
import { Router } from "preact-router";
import { Link } from "preact-router/match";
import About from "./pages/About";
import Stores from "./pages/Stores";

const App = ({ path, data }) => {
  return (
    <div>
      <nav>
        <Link href="/decide">Home</Link>
        <Link href="/decide/about">About</Link>
        <Link href="/decide/stores">Stores</Link>
      </nav>
      <Router url={path}>
        <div path="/decide">
          <h1>Decide Home</h1>
        </div>
        <About path="/decide/about" {...data} />
        <Stores path="/decide/stores" {...data} />
        <div default>
          <h1>404 Not Found {path}</h1>
        </div>
      </Router>
      <a href="/explore" data-native>
        « Explore
      </a>
      <br />
      <a href="/checkout" data-native>
        Checkout »
      </a>
    </div>
  );
};

export default App;
