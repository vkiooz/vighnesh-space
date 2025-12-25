"use client"

export function HeroBanner() {
  return (
    <section className="relative">
      {/* Green Section with Large Typography */}
      <div className="bg-[#1a9e5c] text-white py-16 md:py-24 px-8 md:px-16 lg:px-24">
        {/* Tagline */}
        <p className="font-serif italic text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-4xl mb-20 md:mb-32">
          Moments captured with intention. We believe in the power of visual storytelling, 
          finding beauty in architecture, street life, and the quiet spaces between.
        </p>
        
        {/* Large Title */}
        <h2 className="font-serif font-bold text-[4rem] md:text-[8rem] lg:text-[12rem] xl:text-[14rem] leading-[0.85] tracking-tight text-black">
          Through<br />
          Emphoni
        </h2>
      </div>
      
      {/* White Section with Curved Transition */}
      <div className="bg-white relative pt-20 md:pt-28 pb-16 md:pb-24 px-8 md:px-16 lg:px-24">
        {/* Curved Corner Element */}
        <div className="absolute top-0 left-0 w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <path 
              d="M0,0 L0,100 Q0,0 100,0 L0,0 Z" 
              fill="#1a9e5c"
            />
          </svg>
        </div>
        
        {/* Content */}
        <div className="max-w-3xl ml-auto md:ml-32 lg:ml-48">
          {/* Label */}
          <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-400 mb-4 block">
            Hi there. We're Emphoni
          </span>
          
          {/* Statement */}
          <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-gray-900">
            Don't worry about finding the perfect shot. 
            Capture the moment. We can help tell the story.
          </p>
        </div>
      </div>
    </section>
  )
}

