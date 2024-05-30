const esbuild = require("esbuild");
const cssModulesPlugin = require("esbuild-plugin-css-modules");

// Function to build both client and server
const buildBoth = async (watch = false, minify = false) => {
  const options = {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    bundle: true,
    minify,
    logLevel: "info",
    color: false,
    // team namespaces
    plugins: [
      cssModulesPlugin({ localIdentName: "ex_[local]--[hash:4:md5:hex]" }),
    ],
  };

  const clientOptions = {
    entryPoints: ["src/client.jsx"],
    outfile: "public/explore/static/client.js",
    platform: "browser",
    loader: { ".jsx": "jsx" },
    ...options,
  };

  const serverOptions = {
    entryPoints: ["src/server.node.js"],
    outfile: "dist/server.node.js",
    platform: "node",
    ...options,
  };

  try {
    await esbuild.build(clientOptions);
    await esbuild.build(serverOptions);
  } catch (e) {
    console.log("initial build failed", e);
  }

  if (watch) {
    const client = await esbuild.context(clientOptions);
    const server = await esbuild.context(serverOptions);
    client.watch();
    server.watch();
  }
};

// Handling CLI arguments
const main = async () => {
  const watch = process.argv.includes("--watch");
  const minify = process.argv.includes("--minify");
  await buildBoth(watch, minify);
};

main();
