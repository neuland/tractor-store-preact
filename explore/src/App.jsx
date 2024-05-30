import { h } from "preact";
import { Router, Link } from "preact-router";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import StoresPage from "./pages/StoresPage";
import Fragment from "./components/Fragment";
import { fetchPageData } from "./fetchData";
import { useState, useCallback } from "preact/hooks";
import "./styles.css";

const App = ({ path, data }) => {
  const [state, update] = useState(data);
  const [initial, setInitial] = useState(true);

  const fetchData = useCallback(
    async (url) => {
      // skip data fetching on initial render
      if (initial) {
        setInitial(false);
        return;
      }
      const route = url.current.type.route;
      const newData = await fetchPageData(route, url.matches);
      update(newData);
    },
    [initial]
  );

  return (
    <div data-boundary="explore-page">
      <Fragment team="explore" name="header" />
      <Router url={path} onChange={fetchData}>
        <HomePage path="/" {...state} />
        <CategoryPage path="/products/:filter?" {...state} />
        <StoresPage path="/stores" {...state} />
        <div default>
          <h1>404 Not Found {path}</h1>
        </div>
      </Router>
      <Fragment team="explore" name="footer" />
    </div>
  );
};

export default App;
