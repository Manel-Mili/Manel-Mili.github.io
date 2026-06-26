# Manel Mili - Academic Portfolio

Personal academic homepage for Manel Mili, PhD student in medical AI at the Laboratory of Medical Technologies and Imaging (LTIM), University of Monastir, Tunisia.

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
pnpm dev          # http://localhost:3000
pnpm type-check   # TypeScript check
pnpm build        # static export to ./out
```

## Hosting on GitHub Pages

The site builds to a static `out/` folder and deploys automatically.

This project is configured for a GitHub Pages project site served from a sub-path. The base path is set to `/manel-mili` via the `NEXT_PUBLIC_BASE_PATH` environment variable in `.github/workflows/deploy.yml`.

1. Push this project to the `main` branch of a repository named `manel-mili`.
2. In the repository, go to Settings > Pages and set Source to "GitHub Actions".
3. The included workflow builds and publishes on every push to `main`.

The site will be live at `https://<owner>.github.io/manel-mili/`.

To deploy under a different path, change `NEXT_PUBLIC_BASE_PATH` in the workflow to `/<repo-name>`. For a user page (`<username>.github.io`, served from the domain root) or a custom domain, set `NEXT_PUBLIC_BASE_PATH` to an empty string.

Local development uses no base path, so `pnpm dev` serves from the root.

## After deploying

Update the placeholder domain `https://example.com` with the real URL in:

- `app/layout.tsx` (metadataBase, openGraph url, JSON-LD url and image)
- `app/robots.ts`
- `app/sitemap.ts`

## Credits

Based on an open-source academic homepage template (chakra-ui Next.js example), adapted for Manel Mili.
