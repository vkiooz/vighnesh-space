import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { ArrowUpRight, ExternalLink, Github, Linkedin, Twitter, Grid3x3 } from "lucide-react"

const experience = [
  { year: "2024-now", role: "DevOps Engineer 2", company: "Hevo Data", current: true, school: undefined, degree: undefined, grade: undefined },
  { year: "2023", role: "DevOps Engineer 1", company: "Hevo Data", school: undefined, degree: undefined, grade: undefined },
  { year: "2023", role: "SDE Intern", company: "Hevo Data", school: undefined, degree: undefined, grade: undefined },
  { year: "2022", role: "Design Lead", company: "Reva Hack", school: undefined, degree: undefined, grade: undefined },
  { year: "2021", role: "SDE Intern", company: "BETSOL", school: undefined, degree: undefined, grade: undefined },
  { year: "2018-22", degree: "B.Tech CS", school: "REVA University", grade: "9.82", company: undefined, role: undefined, current: false },
]

export default function HomePage() {
  return (
    <main>
      <Navigation />
      
      {/* Two column layout */}
      <div className="grid md:grid-cols-[1fr_280px] gap-12 md:gap-16">
        {/* Left column - About */}
        <div>
          {/* Header with image */}
          <div className="flex items-center gap-4 mb-8">
            {/* <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-muted">
              <Image
                src="/me.jpeg"
                alt="Vighnesh"
                width={64}
                height={64}
                className="w-full h-full object-cover"
                priority
              />
            </div> */}
            <div>
              <h1 className="text-xl font-medium">Vighnesh</h1>
              <p className="text-sm text-muted-foreground">Bangalore, India</p>
            </div>
          </div>
          
          {/* Bio */}
          <div className="space-y-4 text-muted-foreground">
            <p>
              DevOps engineer at{" "}
              <Link href="https://hevodata.com" target="_blank" className="prose-link text-foreground">
                Hevo Data
              </Link>
              . Building scalable data pipeline infrastructure.
            </p>
            <p>
              Hobby{" "}
              <Link href="/gallery" className="prose-link text-foreground">
                photographer
              </Link>
              . Happiness over hustle.
            </p>
          </div>

          {/* Links */}
          <div className="mt-8 space-y-3">
            <h2 className="text-sm text-muted-foreground mb-3">Links</h2>
            <div className="space-y-2">
              <LinkItem href="/writings" label="Writings" desc="thoughts and notes" />
              <LinkItem href="/gallery" label="Gallery" desc="photography" />
              <LinkItem href="/quotes" label="Quotes" desc="favorite quotes" />
              <LinkItem href="/list100" label="List 100" desc="things to do before 100" />
              <LinkItem href="/roast" label="Roast Me" desc="AI with a flavour" />
            </div>
          </div>

          {/* Social */}
          <div className="mt-8 flex gap-4">
            <Link href="https://github.com/vi9hnesh" target="_blank" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/vighneshks/" target="_blank" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">LinkedIn</span>
            </Link>
            <Link href="https://x.com/vighnesh_001" target="_blank" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
              <Twitter className="w-4 h-4" />
              <span className="text-sm">Twitter</span>
            </Link>
            <Link href="https://bento.me/vi9" target="_blank" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
              <Grid3x3 className="w-4 h-4" />
              <span className="text-sm">Bento</span>
            </Link>
          </div>
        </div>

        {/* Right column - Timeline at a glance */}
        <div className="md:border-l md:border-border md:pl-8">
          {/* Experience */}
          <div>
            <h2 className="text-sm text-muted-foreground mb-4">Experience</h2>
            <div className="space-y-3">
              {experience.map((item, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-muted-foreground text-xs font-mono w-24 flex-shrink-0">{item.year}</span>
                  <div>
                    <span className="text-foreground">{item.role || item.degree}</span>
                    {item.current && <span className="ml-2 text-xs text-muted-foreground">•</span>}
                    <div className="text-muted-foreground text-xs">
                      {item.company && (
                        <a
                          href={
                            item.company === "Hevo Data" ? "https://hevodata.com" :
                            item.company === "Reva Hack" ? "https://reva-hack-1.devfolio.co/" :
                            item.company === "BETSOL" ? "https://www.betsol.com" :
                            "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                        >
                          {item.company}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )}
                      {item.school && !item.company && (
                        <a
                          href="https://www.reva.edu.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                        >
                          {item.school}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )}
                      {item.school && item.grade && ` · ${item.grade}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function LinkItem({ href, label, desc }: { href: string; label: string; desc: string }) {
  const isExternal = href.startsWith("http")
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      className="group flex items-center justify-between py-1.5 -mx-2 px-2 rounded hover:bg-muted/50 transition-colors"
    >
      <div>
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground text-sm ml-2">— {desc}</span>
      </div>
      <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  )
}
