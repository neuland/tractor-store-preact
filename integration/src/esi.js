import ESI from "nodesi";

export default (allowedHosts) => {
  const esi = new ESI({ allowedHosts });

  return async (request, reply) => {
    // Hijack the response to process ESI
    reply.hijack();
    console.log("hijack");

    // Listen for the response from the upstream server
    request.raw.on("response", (proxyRes) => {
      let responseBuffer = Buffer.from([]);
      console.log("response");

      proxyRes.on("error", (error) => {
        console.error("Proxy Response Error:", error);
      });

      proxyRes.on("data", (chunk) => {
        console.log("data");
        responseBuffer = Buffer.concat([responseBuffer, chunk]);
      });

      proxyRes.on("end", async () => {
        const contentType = proxyRes.headers["content-type"];
        let body = responseBuffer.toString("utf8");

        if (contentType?.includes("text/html")) {
          try {
            console.log({ body });
            body = await esi.process(body);
          } catch (error) {
            console.error("ESI Processing Error:", error);
          }
        }

        reply.header("content-type", contentType).send(body);
      });
    });

    request.raw.on("error", (error) => {
      console.error("Request error:", error);
      reply.code(500).send("Internal Server Error");
      reply.raw.end();
    });
  };
};
