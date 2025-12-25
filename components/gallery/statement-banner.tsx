"use client"

export function StatementBanner() {
  return (
    <section className="py-28 md:py-40 px-10 md:px-16 bg-[#0a0908] text-[#f5f0e8]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 max-w-[1400px] mx-auto items-center">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight">
          Things are<br />
          about to<br />
          get <span className="italic">CRAZY</span>
        </h2>
        <div className="flex flex-col gap-5">
          <p className="text-sm opacity-60 leading-relaxed">
            Exciting things cooking up, stay tuned
          </p>
          <div className="inline-block text-xs font-medium uppercase tracking-widest pt-4 border-t border-white/30 cursor-pointer hover:opacity-60 transition-opacity">
            <span>Read More</span>
          </div>
        </div>
      </div>
    </section>
  )
}
