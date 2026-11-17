# Waleed Tariq — Portfolio

Personal portfolio site for Waleed Tariq: experience, community work with GameGrid, certifications, and contact info.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Sass modules, GSAP and Framer Motion for animation.

## Pages

| Route         | Nav label      |
| ------------- | -------------- |
| `/`           | Home           |
| `/work`       | Experience     |
| `/blueprints` | Community      |
| `/tools`      | Certifications |
| `/contact`    | Contact Me     |

## Development

Requires Node 20.9 or newer (see `.nvmrc`).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Deployed with Nixpacks (`nixpacks.toml`): `npm ci`, `npm run build`, `npm start`.
