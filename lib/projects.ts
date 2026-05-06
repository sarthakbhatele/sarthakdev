// v2
export type Project = {
  id: string
  title: string
  type: 'freelance' | 'personal'
  year: number
  description: string
  longDescription: string
  stack: string[]
  cardStack: string[]   // 2-3 key techs shown on card; full stack shown in modal
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
    cardStack: ['React 19', 'Node.js/Express 5', 'MongoDB'],
    screenshot: '/images/projects/p11.webp',
    github: 'https://github.com/sarthakbhatele/syneidesis-frontend--original',
    link: 'https://syneidesis-frontend-original.vercel.app',
  },
  {
    id: 'mdfld-ecom',
    title: 'MDFLD Ecom',
    type: 'freelance',
    year: 2026,
    description: 'Full-stack sportswear e-commerce platform handling the complete retail lifecycle — variant inventory, discount systems, admin panel, and Stripe webhook order fulfillment.',
    longDescription: 'MDFLD is a full-stack sportswear e-commerce platform (football/soccer merchandise) built with Next.js 16, MongoDB, and Stripe — designed to handle the complete retail lifecycle from product browsing to order fulfillment. The architecture spans 14 Mongoose models, 12+ API namespaces, a Stripe webhook pipeline, Cloudinary media management, Brevo transactional email, and PDF invoice generation — all type-safe with TypeScript.',
    stack: ['Next.js 16', 'TypeScript', 'MongoDB (Mongoose)', 'Stripe', 'Cloudinary', 'Brevo SMTP', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    features: [
      {
        title: 'Stripe Webhook Order Pipeline',
        detail: 'Raw-body Stripe webhook handler (checkout.session.completed) that atomically creates orders, deducts per-size inventory, increments discount code usage, triggers low-stock admin alerts, clears the cart, and dispatches a transactional confirmation email — zero data duplication via session-ID deduplication checks.',
      },
      {
        title: 'Influencer Discount Code System',
        detail: 'DiscountCode model with usage limits, expiry dates, minimum order thresholds, and a mirrored Stripe Coupon (createStripeCoupon / deleteStripeCoupon) — codes are validated server-side and applied before Stripe Checkout session creation.',
      },
      {
        title: 'Dynamic Admin Control Panel',
        detail: 'Full admin panel covering 12 management surfaces — products, orders, users, discounts, categories, activity logs, site content, social posts, settings, contacts, notifications, and stats. A singleton StoreSettings model enables live-editing of promo banners and footer copy without a code deploy.',
      },
      {
        title: 'PDF Invoice & Transactional Email System',
        detail: 'pdfkit-generated PDF invoices with snapshotted shipping addresses and priceAtPurchase fields to prevent retrospective price drift, paired with Brevo SMTP for 8 templated transactional emails covering the full order lifecycle — confirmed, shipped, delivered, refunded, and auth flows.',
      },
    ],
    cardStack: ['Next.js 16', 'MongoDB', 'Stripe'],
    screenshot: '/images/projects/p22.webp',
    github: '',
    link: 'https://mdfld.vercel.app',
  },
  {
    id: 'keaver-foundation',
    title: 'Keaver Foundation',
    type: 'freelance',
    year: 2025,
    description: 'High-impact landing page for a global scholarship organisation connecting exceptional students from underserved communities with Ivy League institutions.',
    longDescription: 'Keaver Foundation is a client project for a global scholarship organisation discovering exceptional students in underserved communities and connecting them with Ivy League and top-tier institutions. Built with a cinematic scroll experience, the site implements a multi-section narrative flow covering Mission, Programs, Impact statistics, and a Sponsorship Application section — achieving 90 Accessibility, 96 Best Practices, and 100 SEO Lighthouse scores.',
    stack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    features: [
      {
        title: 'Cinematic Scroll Experience',
        detail: 'Smooth anchor navigation with section-based storytelling, animated counters, and scroll-triggered reveals — designed to maximise donor and volunteer conversions through progressive narrative pacing.',
      },
      {
        title: 'Lighthouse-Optimised Architecture',
        detail: 'Achieved 90 Accessibility, 96 Best Practices, and 100 SEO scores — built on fully semantic HTML with optimized metadata, structured content hierarchy, and ARIA-compliant interactive elements.',
      },
      {
        title: 'Multi-Section Narrative Flow',
        detail: 'Mission, Programs, Impact statistics, and a Sponsorship Application section structured to guide visitors from awareness to action, with animated impact counters reinforcing credibility.',
      },
      {
        title: 'Conversion-Focused UI',
        detail: 'Designed with a clear volunteer and donor conversion path — prominent CTAs, trust-building impact metrics, and a frictionless sponsorship application entry point.',
      },
    ],
    cardStack: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    screenshot: '/images/projects/p33.webp',
    github: '',
    link: 'https://keaver.vercel.app',
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
    cardStack: ['Next.js 15', 'Gemini 2.5 Flash', 'PostgreSQL'],
    screenshot: '/images/projects/p44.webp',
    github: 'https://github.com/sarthakbhatele/career-udaan',
    link: 'https://career-udaan.vercel.app',
  },
  {
    id: 'kairox',
    title: 'Kairo-X',
    type: 'personal',
    year: 2026,
    description: 'AI-powered career suite unifying resume tailoring, automated job discovery, Gmail outreach campaigns, and AI interview prep — with a companion Chrome Extension.',
    longDescription: 'Kairo-X is a comprehensive AI-powered career suite designed to streamline job seeking through automated resume tailoring, application tracking, and AI-driven interview preparation. It solves the fragmentation of the job search process by offering a unified platform with a Chrome Extension for job capture and a robust Next.js 16 web application. The technical complexity lies in its event-driven architecture using Inngest for background tasks, pgvector for semantic text matching, and dynamically compiled PDF generation via Puppeteer.',
    stack: ['Next.js 16', 'PostgreSQL', 'pgvector', 'Groq (llama-3.3)', 'Gemini', 'Inngest', 'Puppeteer', 'Tavily Search API', 'Google OAuth'],
    features: [
      {
        title: 'AI Resume Tailoring',
        detail: 'Automated pipeline using pgvector for semantic chunk matching against Gemini embeddings and Groq for context-aware text generation — producing personalized, ATS-friendly resumes compiled to PDF via Puppeteer.',
      },
      {
        title: 'Automated Job Discovery',
        detail: 'Cron-driven workflow using the Tavily Search API and Inngest background jobs to fetch and score job descriptions against user embeddings — resulting in a dynamically updated daily feed of high-match opportunities.',
      },
      {
        title: 'Outreach Email Campaigns',
        detail: 'Bulk cold-email campaign system utilizing Google OAuth and programmatic MIME message construction — automated, scheduled delivery of personalized emails directly from the user\'s Gmail account.',
      },
      {
        title: 'Interactive AI Interview Prep',
        detail: 'Structured AI coaching sessions and mock interviews powered by Groq llama-3.3 — tailored candidate feedback, dynamically generated study roadmaps, and systematically tracked performance metrics.',
      },
    ],
    cardStack: ['Next.js 16', 'pgvector', 'Groq'],
    screenshot: '/images/projects/p55.webp',
    github: '',
    link: 'https://www.kairox.in',
  },
]