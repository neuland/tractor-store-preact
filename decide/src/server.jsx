import { Hono } from "hono";
import { h } from "preact";
import { renderToString } from "preact-render-to-string";
import App from "./App";
import { fetchPageData, fetchFragmentData } from "./fetchData";
import Navigation from "./components/Navigation";
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
  app.get("/decide/api/about", (c) => c.json(aboutData));
  app.get("/decide/api/navigation", (c) => {
    const min = parseInt(c.req.query("min"), 10);
    const max = parseInt(c.req.query("max"), 10);
    return c.json({ avg: (min + max) / 2 });
  });

  app.get("/decide/esi/navigation", async (c) => {
    const params = {
      min: parseInt(c.req.query("min"), 10),
      max: parseInt(c.req.query("max"), 10),
    };
    const data = await fetchFragmentData("navigation", params);
    const rendered = renderToString(<Navigation {...data} />);
    const state = JSON.stringify(data || {});
    const html = `
      <template shadowrootmode="open">
        ${rendered}
      </template>
      <script type="application/json" data-state>${state}</script>
    `;
    return c.html(html);
  });

  // Universal routing and rendering
  app.get("/decide/:page?", async (c) => {
    const data = await fetchPageData(c.req.param("page"));
    const jsx = <App data={data} path={c.req.path} />;
    const rendered = renderToString(jsx);
    const state = JSON.stringify(data || {});
    return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Preact SSR</title>
      <link rel="stylesheet" href="/decide/static/client.css">
    </head>
    <body>
      <div id="app">${rendered}</div>
      <script type="application/json" data-state>${state}</script>
      <script src="/decide/static/client.js"></script>
    </body>
    </html>
  `);
  });

  return app;
}
