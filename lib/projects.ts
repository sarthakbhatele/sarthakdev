// v2
export type Project = {
  id: string
  title: string
  type: 'freelance' | 'personal'
  year: number
  description: string
  longDescription: string
  stack: string[]
  features: { title: string; detail: string }[]
  screenshot: string
  github: string
  link: string
}

export const projects: Project[] = [
  {
    id: 'syneidesis',
    title: 'Syneidesis',
    type: 'freelance',
    year: 2025,
    description: 'Production-grade bilingual e-commerce platform for a health supplement brand with one-time and subscription checkout via Stripe.',
    longDescription: 'Syneidesis is a production-grade, bilingual (MXN/Spanish) e-commerce platform for a health supplement brand, enabling both guest and authenticated users to purchase products via one-time payments or auto-renewing subscriptions. The architecture spans a React 19 + Redux SPA frontend, a Node.js/Express REST API, and MongoDB Atlas, with ImageKit for CDN-based media delivery.',
    stack: ['React 19', 'Redux Toolkit', 'Node.js/Express 5', 'MongoDB', 'Stripe API', 'ImageKit', 'Vite'],
    features: [
      {
        title: 'Dual-Mode Stripe Checkout',
        detail: 'Unified handler dynamically resolves Stripe session mode (payment vs. subscription), applies coupon discounts, and passes verified financial metadata to webhook for tamper-proof order creation.',
      },
      {
        title: 'Webhook-Driven Order Fulfillment',
        detail: 'Verifies Stripe signatures, reconstructs order items, performs idempotency check before creation, and atomically clears processed cart items — zero duplicate orders.',
      },
      {
        title: 'Influencer Discount Code System',
        detail: 'Full CRUD engine that mirrors Stripe Coupons on every admin update, validates codes against expiry, usage caps, and minimum order amounts with per-code analytics.',
      },
      {
        title: 'Guest + Auth Hybrid Cart',
        detail: 'Dual-identity cart resolved by userId OR guestId. All prices sourced exclusively from DB on every mutation — stateless, price-consistent, tamper-proof.',
      },
    ],
    screenshot: '/images/projects/p1.webp',
    github: 'https://github.com/sarthakbhatele/syneidesis-frontend--original',
    link: 'https://syneidesis-frontend-original.vercel.app',
  },
  {
    id: 'mdfld-ecom',
    title: 'MDFLD Ecom',
    type: 'freelance',
    year: 2025,
    description: 'A modern e-commerce storefront built for a fashion-forward client with a focus on performance and seamless UX.',
    longDescription: 'MDFLD Ecom is a client e-commerce project delivering a clean, performant shopping experience. Built with modern tooling and focused on conversion-optimised UI flows.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    features: [
      { title: 'Feature One', detail: 'Placeholder — to be filled.' },
      { title: 'Feature Two', detail: 'Placeholder — to be filled.' },
    ],
    screenshot: '/images/projects/p2.webp',
    github: 'https://github.com/sarthakbhatele',
    link: 'https://github.com/sarthakbhatele',
  },
  {
    id: 'keaver-foundation',
    title: 'Keaver Foundation',
    type: 'freelance',
    year: 2025,
    description: 'Non-profit foundation website with donation flows, event listings, and a content management layer.',
    longDescription: 'Keaver Foundation is a client project for a non-profit organisation. Designed for accessibility and impact — clean content hierarchy, donation flows, and event management.',
    stack: ['Next.js', 'Sanity CMS', 'Tailwind CSS'],
    features: [
      { title: 'Feature One', detail: 'Placeholder — to be filled.' },
      { title: 'Feature Two', detail: 'Placeholder — to be filled.' },
    ],
    screenshot: '/images/projects/p3.webp',
    github: 'https://github.com/sarthakbhatele',
    link: 'https://github.com/sarthakbhatele',
  },
  {
    id: 'career-udaan',
    title: 'Career Udaan',
    type: 'personal',
    year: 2024,
    description: 'AI-powered career acceleration platform unifying interview prep, resume analysis, cover letter generation, and live market insights.',
    longDescription: 'Career Udaan is an AI-powered career acceleration platform that helps professionals prepare for interviews, optimize resumes, and gain real-time industry intelligence across multiple career domains. It solves the fragmented job-prep experience by unifying AI-driven quizzes, resume analysis, cover letter generation, and live market insights into a single authenticated workspace.',
    stack: ['Next.js 15', 'Gemini 2.5 Flash', 'OpenAI GPT-4o-mini', 'Prisma', 'PostgreSQL', 'Inngest', 'Clerk Auth'],
    features: [
      {
        title: 'RAG-Powered Question Pool Engine',
        detail: 'Dual-AI pipeline (GPT-4o-mini + OpenAI embeddings) with cosine-similarity filtering and MD5-hash history ledger. Self-expanding pool of 1,000 questions per domain — users never see a repeated question.',
      },
      {
        title: 'Inngest Insight Pipeline',
        detail: 'Event-driven background functions with weekly cron batch, per-industry deduplication via concurrency.key, 5-minute cooldown guard, and automatic staleness detection on a 7-day rolling cycle.',
      },
      {
        title: 'Multi-Domain Career Profiles',
        detail: 'UserDomain model with plan-gated limits (FREE: 1, PRO: 3 domains), atomic $transaction-wrapped creation, and switchable active-domain context across quiz, resume, and dashboard features.',
      },
      {
        title: 'AI Resume & Cover Letter Suite',
        detail: 'Gemini 2.5 Flash server actions for resume enhancement, cover letter generation, and ATS scoring. Results persisted in PostgreSQL with markdown editor and one-click PDF export.',
      },
    ],
    screenshot: '/images/projects/p4.webp',
    github: 'https://github.com/sarthakbhatele/career-udaan',
    link: 'https://career-udaan.vercel.app',
  },
  {
    id: 'kairox',
    title: 'Kairox',
    type: 'personal',
    year: 2025,
    description: 'Personal project — details coming soon.',
    longDescription: 'Kairox is a personal project currently in development. Details to be added.',
    stack: ['Next.js', 'TypeScript'],
    features: [
      { title: 'Feature One', detail: 'Placeholder — to be filled.' },
      { title: 'Feature Two', detail: 'Placeholder — to be filled.' },
    ],
    screenshot: '/images/projects/p5.webp',
    github: 'https://github.com/sarthakbhatele',
    link: 'https://github.com/sarthakbhatele',
  },
]