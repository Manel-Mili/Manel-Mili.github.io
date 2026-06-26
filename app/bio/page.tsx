import type { Metadata } from "next"
import BioPage from "./BioClient"

export const metadata: Metadata = {
  title: "Bio and Photo",
  description: "Biography and professional photo for Manel Mili, Ph.D. researcher in medical AI at LabTIM, University of Monastir.",
  openGraph: {
    title: "Bio and Photo | Manel Mili",
    description: "Biography and professional photo for Manel Mili, Ph.D. researcher in medical AI at the University of Monastir.",
    siteName: "Manel Mili",
  },
}

export default function Page() {
  return <BioPage />
}
