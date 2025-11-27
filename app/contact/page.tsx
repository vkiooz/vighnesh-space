import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { ArrowUpRight } from "lucide-react"

export default function ContactPage() {
  return (
    <main>
      <Navigation />

      <div className="max-w-lg">
        <h1 className="text-xl font-medium mb-4">Contact</h1>
        
        <p className="text-muted-foreground mb-6">
          Want to chat? Feel free to reach out.
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Email</span>
            <Link href="mailto:hello@vighnesh.space" className="text-foreground hover:underline">
              hello@vighnesh.space
            </Link>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Location</span>
            <span className="text-foreground">Bangalore, India</span>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-muted-foreground mb-3">Elsewhere</p>
          <div className="flex gap-4 text-sm">
            <SocialLink href="https://github.com/vighneshk" label="GitHub" />
            <SocialLink href="https://linkedin.com/in/vighneshk" label="LinkedIn" />
            <SocialLink href="https://twitter.com/vighneshk" label="Twitter" />
            <SocialLink href="https://instagram.com/vighneshk" label="Instagram" />
          </div>
        </div>
      </div>
    </main>
  )
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5"
    >
      {label}
      <ArrowUpRight className="w-3 h-3" />
    </Link>
  )
}
