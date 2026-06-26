import Provider from "./provider"
import type { Metadata, Viewport } from "next"
import { Roboto } from "next/font/google"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['400', '700'],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://manel-mili.github.io"),
  title: {
    default: "Manel Mili - Medical AI Researcher",
    template: "%s | Manel Mili",
  },
  description: "Manel Mili is a Ph.D. researcher in medical AI at LTIM, University of Monastir. Research in deep learning and explainable AI for medical image analysis.",
  authors: [{ name: "Manel Mili" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Manel Mili",
    title: "Manel Mili - Medical AI Researcher",
    description: "Ph.D. researcher in medical AI at LTIM, University of Monastir. Deep learning and explainable AI for medical image analysis.",
    url: "https://manel-mili.github.io",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Manel Mili - Medical AI Researcher",
    description: "Ph.D. researcher in medical AI at LTIM, University of Monastir.",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Person",
              name: "Manel Mili",
              givenName: "Manel",
              familyName: "Mili",
              jobTitle: "Ph.D. Researcher in Medical AI",
              worksFor: {
                "@type": "Organization",
                name: "University of Monastir",
              },
              affiliation: {
                "@type": "Organization",
                name: "Laboratory of Medical Technologies and Imaging (LTIM), University of Monastir",
              },
              url: "https://manel-mili.github.io",
              email: "manel.mili@isimm.u-monastir.tn",
              image: "https://manel-mili.github.io/manel-mili.webp",
              sameAs: [
                "https://scholar.google.com/citations?user=-kB49IMAAAAJ",
                "https://www.linkedin.com/in/manel-mili-574b76414/",
                "https://orcid.org/0000-0003-3892-8579",
              ],
            },
          })}}
        />
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
