import express from "express";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";
import ESI from "nodesi";

const app = express();

const proxyTable = {
  "/explore/": "http://localhost:3001",
};

const esi = new ESI({
  allowedHosts: Object.values(proxyTable),
  logTo: console.log,
});

console.log({
  allowedHosts: Object.values(proxyTable),
  logTo: console.log,
});

for (const path in proxyTable) {
  app.use(
    path,
    createProxyMiddleware({
      target: proxyTable[path],
      changeOrigin: true, // for vhosted sites
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
