import Image from "next/image"

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white">
      <div>
        <div className="flex flex-col lg:flex-row justify-center lg:min-h-screen">
          {/* Biography Section */}
          <div className="w-full lg:w-2/5 bg-[#F5F5F5] flex items-center min-h-[53vh] justify-center order-2 lg:order-1 px-4 py-8 lg:py-0">
            <div className="max-w-md w-full text-center">
              <div className="space-y-4 lg:space-y-6 text-gray-700 leading-relaxed">
                <div className="space-y-2 lg:space-y-3 text-sm sm:text-base lg:text-base">
                  <p>software engineer by profession,</p>
                  <p>hobby photographer by passion,</p>
                  <p>technology enthusiast and much more.</p>
                </div>
                
                <div className="pt-4 lg:pt-6">
                  <p className="font-medium text-sm sm:text-base">Happiness over Hustle :)</p>
                </div>
                
                <div className="pt-6 lg:pt-8">
                  <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                    <a 
                      href="/gallery" 
                      className="inline-flex items-center justify-center px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                      View Gallery
                    </a>
                    <a 
                      href="/contact" 
                      className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      Get in Touch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image Section */}
          <div className="w-full relative order-1 lg:order-2 h-96 sm:h-80 lg:h-auto">
            <Image
              src="/me.jpeg"
              alt="vighnesh"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}