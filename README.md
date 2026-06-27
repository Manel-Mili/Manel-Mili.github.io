# Manel Mili - Academic Portfolio

Personal academic homepage for Manel Mili, PhD student in Medical AI at the Laboratory of Medical Technologies and Imaging (LTIM-LR12ES06), University of Monastir, Tunisia.

Built with Next.js 16 (App Router), Chakra UI, and TypeScript. Content is data-driven through JSON files, and the site is exported as a fully static website for GitHub Pages.

## Content

All content lives in `src/data/` as JSON:

- research.json - research interests
- pubs.json - journal articles
- procs.json - conference papers
- books.json - book chapters
- projects.json - selected projects
- edus.json - education
- exps.json - experience
- service.json - academic service
- skills.json - technical skills
- certs.json - certifications and training

Profile photo, CV PDF, and favicons are in `public/`. Name, contacts, and social links are in `app/components/Sidebar.tsx`. The bio text is in `app/bio/BioClient.tsx`. Site metadata is in `app/layout.tsx`.

## Local development

This project uses pnpm.

```bash
pnpm install
npm i framer-motion
pnpm dev          # http://localhost:3000
pnpm type-check   # TypeScript check
pnpm build        # static export to ./out
```

## Hosting on GitHub Pages

The site builds to a static `out/` folder and deploys automatically.

This project is configured for a GitHub Pages user page served from the domain root.

1. Push this project to the `main` branch of a repository named `Manel-Mili.github.io`.
2. In the repository, go to Settings > Pages and set Source to "GitHub Actions".
3. The included workflow builds and publishes on every push to `main`.

The site is live at `https://manel-mili.github.io`.

To deploy under a sub-path instead (a project repo like `username.github.io/portfolio`), set `NEXT_PUBLIC_BASE_PATH` to `/portfolio` in `.github/workflows/deploy.yml`. Local development always uses no base path.

## Credits

Based on an open-source academic homepage template (chakra-ui Next.js example), adapted for Manel Mili.
