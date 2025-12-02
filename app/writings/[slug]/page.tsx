import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts"
import { ArrowLeft } from "lucide-react"
import { PolaroidGallery } from "@/components/polaroid-gallery"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | Vighnesh`,
    description: post.description,
  }
}

interface GalleryImage {
  src: string
  caption: string
}

interface ContentPart {
  type: 'html' | 'gallery'
  content: string
  images?: GalleryImage[]
}

function parseContent(content: string): ContentPart[] {
  const parts: ContentPart[] = []
  const galleryRegex = /:::gallery\((.*?)\):::/g
  let lastIndex = 0
  let match

  while ((match = galleryRegex.exec(content)) !== null) {
    // Add HTML content before this gallery
    if (match.index > lastIndex) {
      const htmlContent = content.slice(lastIndex, match.index)
      if (htmlContent.trim()) {
        parts.push({
          type: 'html',
          content: parseMarkdown(htmlContent)
        })
      }
    }

    // Parse gallery images
    try {
      const imageData = JSON.parse(match[1])
      const images: GalleryImage[] = Object.entries(imageData).map(([src, caption]) => ({
        src: src.startsWith('/') ? src : `/${src}`,
        caption: String(caption)
      }))
      parts.push({
        type: 'gallery',
        content: '',
        images
      })
    } catch (e) {
      // If parsing fails, just skip this gallery
      console.error('Failed to parse gallery:', e)
    }

    lastIndex = match.index + match[0].length
  }

  // Add remaining HTML content
  if (lastIndex < content.length) {
    const htmlContent = content.slice(lastIndex)
    if (htmlContent.trim()) {
      parts.push({
        type: 'html',
        content: parseMarkdown(htmlContent)
      })
    }
  }

  return parts
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const contentParts = parseContent(post.content)

  return (
    <main>
      <Navigation />

      <article className="max-w-3xl">
        <Link 
          href="/writings" 
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          writings
        </Link>

        <header className="mb-8">
          <h1 className="text-xl font-medium mb-2">{post.title}</h1>
          <time 
            dateTime={post.date}
            className="text-sm text-muted-foreground"
          >
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
        </header>

        <div className="prose-content text-foreground/90 leading-relaxed space-y-4 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_code]:px-1 [&_code]:py-0.5 [&_code]:bg-muted [&_code]:rounded [&_code]:text-sm [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_a]:prose-link">
          {contentParts.map((part, index) => {
            if (part.type === 'gallery' && part.images) {
              return <PolaroidGallery key={index} images={part.images} />
            }
            return (
              <div 
                key={index}
                dangerouslySetInnerHTML={{ __html: part.content }}
              />
            )
          })}
        </div>
      </article>
    </main>
  )
}

function parseMarkdown(content: string): string {
  return content
    // Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Images and Videos: ![alt](url "caption" |size:small)
    .replace(/!\[([^\]]*)\]\(([^\s\)"]+)(?:\s+"([^"]+)")?(?:\s*\|([^)]*))?\)/g, (m, alt, src, title, options) => {
      let size = ''
      let link = ''
      
      if (options) {
        const sizeMatch = options.match(/size:(small|medium|large)/)
        const linkMatch = options.match(/link:(\S+)/)
        if (sizeMatch) size = sizeMatch[1]
        if (linkMatch) link = linkMatch[1]
      }
      
      const caption = title ? `<figcaption class="text-sm text-muted-foreground mt-2 text-center italic">${title}</figcaption>` : ''
      
      let sizeClass = 'max-w-2xl'
      if (size === 'small') {
        sizeClass = 'max-w-sm'
      } else if (size === 'medium') {
        sizeClass = 'max-w-md'
      } else if (size === 'large') {
        sizeClass = 'max-w-lg'
      }
      
      // Check if it's a video file
      const isVideo = /\.(mov|mp4|avi|webm)$/i.test(src)
      // Check if it's a special image format
      const isSpecialImage = /\.(heic|dng|raw)$/i.test(src)
      
      let mediaTag = ''
      if (isVideo) {
        mediaTag = `<video src="${src}" controls class="rounded-lg w-full shadow-sm" ${title ? `title="${title}"` : ''}>Your browser does not support the video tag.</video>`
      } else {
        const imgClass = isSpecialImage ? 'rounded-lg w-full shadow-sm opacity-90' : 'rounded-lg w-full shadow-sm'
        mediaTag = `<img src="${src}" alt="${alt || ''}" class="${imgClass}" ${isSpecialImage ? `title="Special format image - may not display correctly in all browsers"` : ''}/>`
      }
      
      const mediaContent = link ? `<a href="${link}" target="_blank" rel="noopener noreferrer">${mediaTag}</a>` : mediaTag
      
      return `<figure class="mx-auto my-8 ${sizeClass}">${mediaContent}${caption}</figure>`
    })
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      // Check if it's an external link (starts with http:// or https://)
      const isExternal = /^https?:\/\//.test(url)
      const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${url}" class="prose-link"${targetAttr}>${text}</a>`
    })
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/^\s*[-*] (.*$)/gim, '<li>$1</li>')
    .replace(/^\s*\d+\. (.*$)/gim, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<)(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[1-6]>)/g, '$1')
    .replace(/(<\/h[1-6]>)<\/p>/g, '$1')
    .replace(/<p>(<pre>)/g, '$1')
    .replace(/(<\/pre>)<\/p>/g, '$1')
    .replace(/<p>(<blockquote>)/g, '$1')
    .replace(/(<\/blockquote>)<\/p>/g, '$1')
    .replace(/<p>(<li>)/g, '$1')
    .replace(/(<\/li>)<\/p>/g, '$1')
    .replace(/<p>(<figure)/g, '$1')
    .replace(/(<\/figure>)<\/p>/g, '$1')
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
}
