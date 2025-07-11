import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Noticia_Text } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const noticiaText = Noticia_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-noticia",
  display: "swap",
})

export const metadata: Metadata = {
  title: "vighnesh.space",
  description:
    "Software engineer, photographer, and curious mind exploring the intersection of technology and creativity.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${noticiaText.variable}`}>
      <body className="font-montserrat bg-white antialiased">
        <Navigation />
        <div className="ml-20">
          {children}
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
