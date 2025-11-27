import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { getAllPosts } from "@/lib/posts"
import { ArrowUpRight } from "lucide-react"

export default function WritingsPage() {
  const posts = getAllPosts()

  return (
    <main>
      <Navigation />

      <div className="mb-8">
        <h1 className="text-xl font-medium mb-2">Writings</h1>
        <p className="text-muted-foreground text-sm">
          Thoughts on technology, photography, and life.
        </p>
      </div>

      <section>
        {posts.length === 0 ? (
          <div className="py-8 text-sm text-muted-foreground">
            <p className="mb-2">No posts yet.</p>
            <p>
              Add posts by creating <code className="px-1 py-0.5 bg-muted rounded text-xs">.md</code> files in{" "}
              <code className="px-1 py-0.5 bg-muted rounded text-xs">content/posts/</code>
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/writings/${post.slug}`}
                className="group flex items-baseline justify-between gap-4 py-3 border-t border-border first:border-t-0 hover:bg-muted/30 -mx-2 px-2 transition-colors"
              >
                <div className="flex-1">
                  <span className="text-foreground">{post.title}</span>
                  {post.description && (
                    <span className="text-muted-foreground text-sm ml-2">— {post.description}</span>
                  )}
                </div>
                <time 
                  dateTime={post.date}
                  className="text-sm text-muted-foreground font-mono flex-shrink-0"
                >
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </time>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
