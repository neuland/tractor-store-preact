# The Tractor Store - Preact

A micro frontends sample implementation written in [Preact](https://preactjs.com/) and based on the [Tractor Store Blueprint](https://github.com/neuland/tractor-store-blueprint) by [neuland](https://neuland-bfi.de/).

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

### Open Todos

- [x] Implement all blueprint features
- [ ] Public deployment via Cloudflare Workers
- [ ] Improve DX (linting, HMR, error handling)

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

## About the Authors

[neuland Büro für Informatik](https://neuland-bfi.de/) is a software development company based in Germany. We have a strong e-commerce background and experience in building verticalized software solutions.
