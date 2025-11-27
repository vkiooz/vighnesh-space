import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Post = {
  slug: string
  title: string
  date: string
  description: string
  content: string
  tags?: string[]
  published?: boolean
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): Post[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        description: data.description || '',
        content,
        tags: data.tags || [],
        published: data.published !== false,
      }
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
  const mdPath = path.join(postsDirectory, `${slug}.md`)
  
  let fullPath = ''
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath
  } else {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    description: data.description || '',
    content,
    tags: data.tags || [],
    published: data.published !== false,
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.mdx?$/, ''))
}

