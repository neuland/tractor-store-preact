# The Tractor Store - Preact

A micro frontends sample implementation of [The Tractor Store](https://micro-frontends.org/tractor-store/) built with Preact, ESI and Web Components. It's based on the [Blueprint](https://github.com/neuland/tractor-store-blueprint).

**Live Demo:** [TBA](#)

## About This Implementation

### Technologies

List of techniques used in this implementation.

| Aspect                     | Solution                                  |
| -------------------------- | ----------------------------------------- |
| 🛠️ Frameworks, Libraries   | [preact], [preact-router], [esbuild]      |
| 📝 Rendering               | SSR with Hydration                        |
| 🐚 Application Shell       | None                                      |
| 🧩 Client-Side Integration | Custom Elements ([preact-custom-element]) |
| 🧩 Server-Side Integration | ESI + Declarative Shadow DOM              |
| 📣 Communication           | Custom Events, HTML Attributes            |
| 🗺️ Navigation              | MPA, One SPA per Team, Hard-Nav Between   |
| 🎨 Styling                 | Self-Contained CSS (No Global Styles)     |
| 🍱 Design System           | None                                      |
| 🔮 Discovery               | None (Hardcoded URLs for Now)             |
| 🚚 Deployment              | Serverless (Cloudflare Workers)           |
| 👩‍💻 Local Development       | [concurrently], [nodeesi]                 |

[preact]: https://preactjs.com/
[preact-router]: https://github.com/preactjs/preact-router
[esbuild]: https://esbuild.github.io/
[preact-custom-element]: https://github.com/preactjs/preact-custom-element
[concurrently]: https://github.com/open-cli-tools/concurrently
[nodeesi]: https://github.com/Schibsted-Tech-Polska/nodesi

### Limitations

This implementation is deliberately kept simple to focus on the micro frontends aspects. URLs are hardcoded, components could be more DRY and no linting, testing or type-safety is implemented. In a real-world scenario, these aspects should be addressed properly.

### Todos

- [ ] Public deployment via Cloudflare Workers
- [ ] Web performance optimizations (e.g. on-demand loading, proper chunking, best practices, ...)
- [ ] Improve DX (linting, HMR, error handling)
- [ ] Show selected store on checkout page
- [ ] Migrate last lighthouse score [changes](https://github.com/neuland/tractor-store-blueprint/commit/d625f1892b9d5966b6a82c404a6d88be4bd98d56)

## How to run locally

Clone this repository and run the following commands:

```bash
git clone https://github.com/neuland/tractor-store-preact.git tractor-store-preact
cd tractor-store-preact
```

Install dependencies:

```bash
# install root dependencies (local only)
npm install
# install dependencies in all projects
npm run install:all
```

Start the development server:

```bash
npm start
```

Open http://localhost:3000 in your browser to see the integrated application.

Server- and client-side code is rebuilt automatically when you make changes. The servers restart automatically as well. You have to reload the browser manually.

## About The Authors

[neuland Büro für Informatik](https://neuland-bfi.de/) is a software development company based in Germany. We have a strong e-commerce background and experience in building verticalized software solutions.
