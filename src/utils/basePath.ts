// Base path for deployment under a sub-path (e.g. GitHub Pages project site).
// Empty for local dev and root deployments; set via NEXT_PUBLIC_BASE_PATH at build time.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Prefix an absolute in-app path (asset or route) with the base path.
export function withBase(path: string): string {
  return `${basePath}${path}`;
}
