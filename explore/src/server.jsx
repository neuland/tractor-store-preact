import { h } from "preact";
import { Hono } from "hono";
import dotenv from "dotenv";
import { renderToString } from "preact-render-to-string";
import App from "./App";
import { fetchPageData, fetchFragmentData } from "./fetchData";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Recommendations from "./components/Recommendations";
import { html } from "./utils";
import {
  homeTeasers,
  recosForSkus,
  categoryTitle,
  categoryFilter,
  categoryProducs,
} from "./service";
dotenv.config({ path: "../.env" });

export default function createApp(beforeRoutes = (app) => {}) {
  const app = new Hono();

  // request logging
  app.use((c, next) => {
    console.log(c.req.method, c.req.path);
    return next();
  });

  if (beforeRoutes) beforeRoutes(app);

  /**
   * API endpoints
   */
  app.get("/explore/api/home", (c) => c.json({ teasers: homeTeasers() }));
  app.get("/explore/api/category", (c) => {
    const filter = c.req.query("filter");
    return c.json({
      title: categoryTitle(filter),
      products: categoryProducs(filter),
      filters: categoryFilter(filter),
    });
  });
  app.get("/explore/api/stores", (c) => c.json({ stores: stores() }));
  app.get("/explore/api/recommendations", (c) =>
    c.json({
      recommendations: recosForSkus(c.req.query("skus").split(",")),
    })
  );

  /**
   * ESI fragments
   */
  app.get("/explore/esi/header", async (c) => {
    const rendered = renderToString(<Header />);
    return c.html(fragmentHtml(rendered));
  });
  app.get("/explore/esi/footer", async (c) => {
    const rendered = renderToString(<Footer />);
    return c.html(fragmentHtml(rendered));
  });
  app.get("/explore/esi/recommendations", async (c) => {
    const skus = c.req.query("skus");
    const data = await fetchFragmentData("recommendations", { skus });
    const rendered = renderToString(<Recommendations {...data} />);
    return c.html(fragmentHtml(rendered, data));
  });

  function fragmentHtml(rendered, state = {}) {
    const json = JSON.stringify(state);
    return `
      <template shadowrootmode="open">${rendered}</template>
      <script type="application/json" data-state>${json}</script>
    `;
  }

  /**
   * Pages
   */
  app.get("/", async (c) => {
    const data = await fetchPageData("home");
    const jsx = <App data={data} path={c.req.path} />;
    const rendered = renderToString(jsx);
    const state = JSON.stringify(data || {});
    return c.html(pageHtml(rendered, state));
  });

  app.get("/products/:filter?", async (c) => {
    const data = await fetchPageData("category", c.req.param());
    const jsx = <App data={data} path={c.req.path} />;
    const rendered = renderToString(jsx);
    const state = JSON.stringify(data || {});
    return c.html(pageHtml(rendered, state));
  });

  app.get("/stores", async (c) => {
    const data = await fetchPageData("stores");
    const jsx = <App data={data} path={c.req.path} />;
    const rendered = renderToString(jsx);
    const state = JSON.stringify(data || {});
    return c.html(pageHtml(rendered, state));
  });

  function pageHtml(rendered, state) {
    return html`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tractor Store</title>
          <link rel="stylesheet" href="/explore/static/client.css" />
          <link rel="stylesheet" href="/decide/static/client.css" />
          <link rel="stylesheet" href="/checkout/static/client.css" />
        </head>
        <body data-boundary="explore-page">
          <div id="explore-app">${rendered}</div>
          <script type="application/json" data-state>
            ${state}
          </script>
          <script src="/explore/static/client.js" type="module"></script>
          <script src="/decide/static/client.js" type="module"></script>
          <script src="/checkout/static/client.js" type="module"></script>
          <script src="/cdn/js/helper.js" type="module"></script>
        </body>
      </html>
    `;
  }

  return app;
}
