import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params
  const filePath = resolvedParams.path.join('/')
  const fullPath = path.join(process.cwd(), 'public', 'blog', filePath)
  
  try {
    const fileBuffer = await readFile(fullPath)
    const ext = path.extname(filePath).toLowerCase()
    
    let contentType = 'application/octet-stream'
    
    switch (ext) {
      case '.heic':
        contentType = 'image/heic'
        break
      case '.dng':
        contentType = 'image/x-adobe-dng'
        break
      case '.mov':
        contentType = 'video/quicktime'
        break
      default:
        contentType = 'application/octet-stream'
    }
    
    return new NextResponse(fileBuffer as any, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving file:', error)
    return new NextResponse('File not found', { status: 404 })
  }
}