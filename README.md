This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

portfolio/
├─ app/
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ chess/
│  │  ├─ ChessGrid.tsx
│  │  ├─ KingScene.tsx
│  │  └─ PawnProgress.tsx
│  ├─ core/
│  │  ├─ Loader.tsx
│  │  ├─ Marquee.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ SmoothScroll.tsx
│  │  ├─ Toggle.tsx
│  │  └─ UnifiedLoader.tsx
│  ├─ pacman/
│  │  ├─ ArcadeQuote.tsx
│  │  ├─ GhostBadge.tsx
│  │  └─ PacmanCanvas.tsx
│  └─ sections/
│     ├─ About.tsx
│     ├─ Contact.tsx
│     ├─ Hero.tsx
│     ├─ ProjectModal.tsx
│     ├─ Projects.tsx
│     └─ Skills.tsx
├─ hooks/
│  ├─ useLenis.ts
│  ├─ useScrollProgress.ts
│  └─ useTheme.ts
├─ lib/
│  ├─ projects.ts
│  └─ quotes.ts
├─ public/
│  ├─ images/
│  │  ├─ projects/
│  │  │  ├─ p1.webp
│  │  │  ├─ p2.webp
│  │  │  ├─ p3.webp
│  │  │  ├─ p4.webp
│  │  │  └─ p5.webp
│  │  ├─ photo.webp
│  │  ├─ photo2.png
│  │  ├─ photo3.png
│  │  ├─ photo4.png
│  │  ├─ photo5.png
│  │  └─ photo6.png
│  ├─ models/
│  │  └─ king.glb
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ store/
│  └─ themeStore.ts
├─ styles/
│  └─ themes.css
├─ .gitignore
├─ AGENTS.md
├─ CLAUDE.md
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ README.md
└─ tsconfig.json

