import { Hono } from "hono";
import { h } from "preact";
import { html } from "./utils";
import { renderToString } from "preact-render-to-string";
import App from "./App";
import { fetchPageData, fetchFragmentData } from "./fetchData";
import Header from "./components/Header";
import data from "./database";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export default function createApp(beforeRoutes = (app) => {}) {
  const app = new Hono();

  const aboutData = {
    title: "About Us!",
    content: "This is the about page content, served from an API endpoint.",
  };

  // request logging
  app.use((c, next) => {
    console.log(c.req.method, c.req.path);
    return next();
  });

  if (beforeRoutes) {
    beforeRoutes(app);
  }

  // API endpoint
  app.get("/explore/api/about", (c) => c.json(aboutData));
  app.get("/explore/api/home", (c) =>
    c.json({
      teasers: [
        {
          title: "Classic Tractors",
          image: "/cdn/img/scene/[size]/classics.webp",
          url: "/products/classic",
        },
        {
          title: "Autonomous Tractors",
          image: "/cdn/img/scene/[size]/autonomous.webp",
          url: "/products/autonomous",
        },
      ],
      recommendationSkus: ["CL-01-GY", "AU-07-MT"],
    })
  );
  app.get("/explore/api/category", (c) => {
    const filter = c.req.query("filter");

    const cat = filter && data.categories.find((c) => c.key === filter);

    const title = cat ? cat.name : "All Machines";
    const products = cat
      ? cat.products
      : data.categories.flatMap((c) => c.products);
    // sort products by price descending
    products.sort((a, b) => b.startPrice - a.startPrice);
    const filters = [
      { url: "/products", name: "All", active: !cat },
      ...data.categories.map((c) => ({
        url: `/products/${c.key}`,
        name: c.name,
        active: c.key === filter,
      })),
    ];

    return c.json({ title, products, filters });
  });

  app.get("/explore/api/stores", (c) => {
    return c.json({ stores: data.stores });
  });

  app.get("/explore/esi/header", async (c) => {
    const rendered = renderToString(<Header />);
    const html = `
      <template shadowrootmode="open">
        ${rendered}
      </template>
   `;
    return c.html(html);
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

  // Universal routing and rendering
  app.get("/explore/:page?", async (c) => {
    const data = await fetchPageData(c.req.param("page") || "home");
    const jsx = <App data={data} path={c.req.path} />;
    const rendered = renderToString(jsx);
    const state = JSON.stringify(data || {});
    return c.html(html`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tractor Store</title>
          <link rel="stylesheet" href="/explore/static/client.css" />
          <link rel="stylesheet" href="/decide/static/client.css" />
          <link rel="stylesheet" href="/checkout/static/client.css" />
        </head>
        <body data-boundary="explore-page">
          <div id="app">${rendered}</div>
          <script type="application/json" data-state>
            ${state}
          </script>
          <script src="/explore/static/client.js" type="module"></script>
          <script src="/decide/static/client.js" type="module"></script>
          <script src="/checkout/static/client.js" type="module"></script>
          <script src="/cdn/js/helper.js" type="module"></script>
        </body>
      </html>
    `);
  });

  return app;
}
