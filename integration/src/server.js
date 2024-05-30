import express from "express";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";
import ESI from "nodesi";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const { EXPLORE_URL, DECIDE_URL, CHECKOUT_URL } = process.env;

const app = express();

const proxyTable = {
  "/explore": EXPLORE_URL,
  "/decide": DECIDE_URL,
  "/checkout": CHECKOUT_URL,
  "/": EXPLORE_URL, // home page
  "/products": EXPLORE_URL, // category page
  "/stores": EXPLORE_URL, // stores page
};

const esi = new ESI({
  allowedHosts: Object.values(proxyTable),
  logTo: console.log,
});

for (const path in proxyTable) {
  app.use(
    path,
    createProxyMiddleware({
      target: proxyTable[path],
      changeOrigin: true,
      pathRewrite: (path, req) => req.originalUrl,
      selfHandleResponse: true,
      on: {
        proxyRes: responseInterceptor(
          async (responseBuffer, proxyRes, req, res) => {
            console.log(req.path, proxyRes.headers["content-type"]);
            const body = responseBuffer.toString("utf8");
            return await esi.process(body);
          }
        ),
      },
    })
  );
}

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
