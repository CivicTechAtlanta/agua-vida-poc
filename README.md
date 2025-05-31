This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/agua-vida-poc](http://localhost:3000/agua-vida-poc) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Serve Exported Static Site
Run `npm run build` to generate static files. Then run `npx serve@latest out` to host static site locally. You may need to comment out the `basePath` configuration in the `next.config.ts` file before running `npm run build` to ensure the paths are correct locally.