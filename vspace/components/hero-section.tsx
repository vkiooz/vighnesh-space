import Image from "next/image"

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white">
      <div>
        <div className="flex flex-col lg:flex-row justify-center min-h-screen">
          {/* Biography Section */}
          <div className="w-full lg:w-2/5 bg-[#F5F5F5] flex items-center justify-center order-2 lg:order-1">
            <div className="max-w-md w-full">
              <div className="space-y-3 sm:space-y-4 text-gray-700 text-center leading-relaxed text-sm sm:text-base">
                <p>software engineer by profession,</p>
                <p>hobby photographer by passion,</p>
                <p>technology enthusiast and much more.</p>
                
                <div className="pt-4 sm:pt-6">
                  <p className="font-medium">Happiness over Hustle :)</p>
                </div>
                
                <div className="pt-6">
                  <div className="flex justify-center space-x-4">
                    <a href="/gallery" className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                      View Gallery
                    </a>
                    <a href="/contact" className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Get in Touch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image Section */}
          <div className="w-full relative order-1 lg:order-2">
            <Image
              src="/me.jpeg"
              alt="vighnesh"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}