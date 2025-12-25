"use client"

export function GalleryFooter() {
  return (
    <footer className="py-24 md:py-36 px-10 md:px-16 bg-[#0a0908] text-[#f5f0e8] text-center">
      <div className="max-w-[600px] mx-auto mb-16">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-none mb-6">
          Through<br />
          <span className="text-[#d4a853] italic">Emphoni</span>
        </h2>
        <p className="text-sm opacity-50 leading-relaxed mb-8">
          Finding the extraordinary in ordinary moments.<br />
          Each frame, a story. Each shadow, a memory.
        </p>
        <div className="flex items-center justify-center gap-3 text-xs opacity-30 tracking-widest">
          <span>35mm</span>
          <span className="text-[#d4a853]">•</span>
          <span>f/2.8</span>
          <span className="text-[#d4a853]">•</span>
          <span>ISO 400</span>
        </div>
      </div>
      <p className="text-xs opacity-20 tracking-widest uppercase">
        © {new Date().getFullYear()} • All photographs by Vighnesh
      </p>
    </footer>
  )
}
