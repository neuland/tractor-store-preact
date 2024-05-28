import { h } from "preact";
import { Router } from "preact-router";
import { Link } from "preact-router/match";
import About from "./pages/About";
import Stores from "./pages/Stores";

const App = ({ path, data }) => {
  return (
    <div>
      <nav>
        <Link href="/explore">Home</Link>
        <Link href="/explore/about">About</Link>
        <Link href="/explore/stores">Stores</Link>
      </nav>
      <Router url={path}>
        <div path="/explore">
          <h1>Explore Home</h1>
        </div>
        <About path="/explore/about" {...data} />
        <Stores path="/explore/stores" {...data} />
        <div default>
          <h1>404 Not Found {path}</h1>
        </div>
      </Router>
    </div>
  );
};

export default App;
