"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Marquee } from "@/components/ui/marquee"
import { Code, Server, Cloud, Camera, Palette, Lightbulb, Rocket, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function AboutPage() {
  const [isMarqueeVisible, setIsMarqueeVisible] = useState(true)
  return (
    <main>
        {/* Hero Section */}
        {/* <section className="bg-gradient-to-br from-gray-50 to-white py-12">
          <div className="mx-4 sm:mx-8 lg:mx-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 font-noticia">About Me</h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
                A journey through code, creativity, and capturing moments
              </p>
            </div>
          </div>
        </section> */}

        {/* Timeline Biography Section */}
        {/* <section className="py-2 bg-gradient-to-r from-gray-900 via-black to-gray-900 overflow-hidden">
          <Marquee speed={120} className="h-8">
            <span className="text-xl font-semibold text-white tracking-wider font-noticia">
              Hello, this is Vighnesh. Marquees are so back XD. Anyways, I'm a software engineer and this is my website. Have fun exploring. Hmu if you want to chat.
            </span>
          </Marquee>
        </section> */}

        {/* show marquee toggle button */}
        {/* <div className="flex justify-center items-center">
          <Button variant="outline" className="text-white" onClick={() => setIsMarqueeVisible(!isMarqueeVisible)}>
            {isMarqueeVisible ? "Hide Marquee" : "Show Marquee"}
          </Button>
        </div> */}
        
        <section className="py-12 lg:py-24 bg-gray-50 min-h-screen">
          <div className="mx-4 sm:mx-8 lg:mx-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300"></div>
                
                {/* Timeline Items */}
                <div className="space-y-8 lg:space-y-12">
                  {/* Hevo Data - Current */}
                  <div className="relative flex items-start">
                    <div className="absolute left-[-88px] flex items-center gap-3">
                      <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                        2024 - Now
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <img 
                                src="https://hevodata.com/favicon.ico" 
                                alt="Hevo Data" 
                                width={16} 
                                height={16} 
                                className="inline-block"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              
                      </div>
                    </div>
                    <div className="ml-16 sm:ml-20">
                      <div>
                        <div className="p-4 lg:p-6">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 flex flex-col sm:flex-row sm:items-center gap-2">
                            DevOps Engineer
                            <a href="https://hevodata.com" target="_blank" className="text-gray-500 hover:text-purple-700 text-sm border-b-2 border-gray-500">
                              Hevo Data
                            </a>
                          </h3>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed mb-3">
                            2 yrs 6 mos · Greater Bangalore Area · On-site
                          </p>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed">
                            Building and maintaining scalable data pipeline infrastructure. Working with modern DevOps practices, 
                            containerization, and cloud technologies to ensure reliable data processing at scale.
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
                            <Badge variant="default" className="w-fit mb-2 sm:mb-0">Present</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DevOps Engineer 2 */}
                  <div className="relative flex items-start">
                    <div className="absolute left-[-48px] flex items-center gap-3">
                      <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                        2024
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <img 
                                src="https://hevodata.com/favicon.ico" 
                                alt="Hevo Data" 
                                width={16} 
                                height={16} 
                                className="inline-block"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              
                      </div>
                    </div>
                    <div className="ml-16 sm:ml-20">
                      <div>
                        <div className="p-4 lg:p-6">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 flex flex-col sm:flex-row sm:items-center gap-2">
                            DevOps Engineer 2
                            <a href="https://hevodata.com" target="_blank" className="text-gray-500 hover:text-purple-700 text-sm border-b-2 border-gray-500">
                              Hevo Data
                            </a>
                          </h3>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed mb-3">
                            Full-time · Jul 2024 - Present · 1 yr 1 mo
                          </p>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed mb-4">
                            Advanced DevOps practices with focus on automation, monitoring, and infrastructure optimization. 
                            Leading initiatives in containerization and CI/CD pipeline improvements.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline" className="text-xs">Apache Kafka</Badge>
                            <Badge variant="outline" className="text-xs">Ansible</Badge>
                            <Badge variant="outline" className="text-xs">+5 skills</Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
                            <Badge variant="secondary" className="w-fit mb-2 sm:mb-0">Senior Role</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DevOps Engineer 1 */}
                  <div className="relative flex items-start">
                    <div className="absolute left-[-48px] flex items-center gap-3">
                      <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                        2023
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <img 
                                src="https://hevodata.com/favicon.ico" 
                                alt="Hevo Data" 
                                width={16} 
                                height={16} 
                                className="inline-block"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              
                      </div>
                    </div>
                    <div className="ml-16 sm:ml-20">
                      <div>
                        <div className="p-4 lg:p-6">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 flex flex-col sm:flex-row sm:items-center gap-2">
                            DevOps Engineer 1
                            <a href="https://hevodata.com" target="_blank" className="text-gray-500 hover:text-purple-700 text-sm border-b-2 border-gray-500">
                              Hevo Data
                            </a>
                          </h3>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed mb-3">
                            Full-time · Jul 2023 - Jul 2024 · 1 yr 1 mo
                          </p>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed mb-4">
                            Foundation building in DevOps methodologies, working with cloud infrastructure, 
                            automation tools, and establishing reliable deployment pipelines.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline" className="text-xs">Python</Badge>
                            <Badge variant="outline" className="text-xs">Selenium Testing</Badge>
                            <Badge variant="outline" className="text-xs">+3 skills</Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
                            <Badge variant="outline" className="w-fit mb-2 sm:mb-0 border-blue-600 text-blue-600">Growth</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Software Engineer Internship */}
                  <div className="relative flex items-start">
                    <div className="absolute left-[-48px] flex items-center gap-3">
                      <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                        2023
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <img 
                                src="https://hevodata.com/favicon.ico" 
                                alt="Hevo Data" 
                                width={16} 
                                height={16} 
                                className="inline-block"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              
                      </div>
                    </div>
                    <div className="ml-16 sm:ml-20">
                      <div>
                        <div className="p-4 lg:p-6">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 flex flex-col sm:flex-row sm:items-center gap-2">
                            Software Development Engineer Intern
                            <a href="https://hevodata.com" target="_blank" className="text-gray-500 border-b-2 border-gray-500 hover:text-purple-700 text-sm">
                              Hevo Data
                            </a>
                          </h3>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed mb-3">
                            Internship · Jan 2023 - Jul 2023 · 6 mos
                          </p>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed mb-4">
                            Started my professional journey as an intern, learning software development practices, 
                            contributing to real projects, and building foundational technical skills.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline" className="text-xs">Python</Badge>
                            <Badge variant="outline" className="text-xs">Programming Language</Badge>
                            <Badge variant="outline" className="text-xs">Selenium Testing</Badge>
                            <Badge variant="outline" className="text-xs">+3 skills</Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
                            <Badge variant="outline" className="w-fit mb-2 sm:mb-0 border-purple-600 text-purple-600">Internship</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Design Team Lead */}
                  <div className="relative flex items-start">
                    <div className="absolute left-[-48px] flex items-center gap-3">
                      <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                        2022
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <img 
                                src="https://reva-hack-1.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Ffd6c14a6c305413499fec78bc54bb4ee%2Fassets%2Ffavicon%2F948.png&w=1440&q=75" 
                                alt="Reva Hack" 
                                className="inline-block"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                      </div>
                    </div>
                    <div className="ml-16 sm:ml-20">
                      <div>
                        <div className="p-4 lg:p-6">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 flex flex-col sm:flex-row sm:items-center gap-2">
                            Design Team Lead
                            <a href="https://reva-hack-1.devfolio.co/" target="_blank" className="text-gray-500 hover:text-purple-700 text-sm border-b-2 border-gray-500">
                              Reva Hack
                            </a>
                          </h3>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed mb-3">
                            Self-employed · Part-time · Jul 2019 - Dec 2022 · 8 mos<br/>
                            Bangalore, Karnataka, India
                          </p>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed mb-4">
                            Led creative design projects, managing team workflows and client relationships. 
                            Developed strong leadership and project management skills in a creative environment.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline" className="text-xs">Adobe Premiere Pro</Badge>
                            <Badge variant="outline" className="text-xs">Team Leadership</Badge>
                            <Badge variant="outline" className="text-xs">+4 skills</Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
                            <Badge variant="outline" className="w-fit mb-2 sm:mb-0 border-pink-600 text-pink-600">Leadership</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BETSOL Software Engineer */}
                  <div className="relative flex items-start">
                    <div className="absolute left-[-48px] flex items-center gap-3">
                      <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                        2022
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <img 
                                src="https://www.betsol.com/wp-content/uploads/2023/05/favicon.png" 
                                alt="BETSOL" 
                                width={16} 
                                height={16} 
                                className="inline-block"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              
                      </div>
                    </div>
                    <div className="ml-16 sm:ml-20">
                      <div>
                        <div className="p-4 lg:p-6">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 flex flex-col sm:flex-row sm:items-center gap-2">
                            Software Engineer
                            <a href="https://www.betsol.com" target="_blank" className="text-gray-500 hover:text-purple-700 text-sm border-b-2 border-gray-500">
                              BETSOL
                            </a>
                          </h3>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed mb-3">
                            Internship · Dec 2021 - Jun 2022 · 2 mos<br/>
                            Bangalore, Karnataka, India
                          </p>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed mb-4">
                            Early exposure to enterprise software development, working with established development 
                            practices and contributing to business applications.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline" className="text-xs">Python</Badge>
                            <Badge variant="outline" className="text-xs">Programming Language</Badge>
                            <Badge variant="outline" className="text-xs">Django</Badge>
                            <Badge variant="outline" className="text-xs">+4 skills</Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
                            <Badge variant="outline" className="w-fit mb-2 sm:mb-0 border-gray-600 text-gray-600">Early Career</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education - REVA University */}
                  <div className="relative flex items-start">
                    <div className="absolute left-[-86px] flex items-center gap-3">
                      <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                        2018 - 2022
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <img 
                                src="https://www.reva.edu.in/assets/demo/default/media/img/logo/favicon-32x32.png" 
                                alt="REVA University" 
                                width={16} 
                                height={16} 
                                className="inline-block"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                      </div>
                    </div>
                    <div className="ml-16 sm:ml-20">
                      <div>
                        <div className="p-4 lg:p-6">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 flex flex-col sm:flex-row sm:items-center gap-2">
                            B.Tech in Computer Science and Engineering
                            <a href="https://www.reva.edu.in" target="_blank" className="text-gray-500 hover:text-purple-700 text-sm border-b-2 border-gray-500">
                              REVA University
                            </a>
                          </h3>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed mb-3">
                            Bachelor of Technology - BTech, Computer Science<br/>
                            2018 - 2022 · Grade: 9.62
                          </p>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed">
                            Completed comprehensive computer science education with excellence, building strong foundations 
                            in programming, algorithms, and software engineering principles.
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
                            <Badge variant="outline" className="w-fit mb-2 sm:mb-0 border-indigo-600 text-indigo-600">Excellence</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Photography Journey */}
                  <div className="relative flex items-start">
                    <div className="absolute left-[-88px] flex items-center gap-3">
                      <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                        2020 - Now
                      </div>
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <div className="ml-16 sm:ml-20">
                      <div>
                        <div className="p-4 lg:p-6">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Photography Passion</h3>
                          <p className="text-gray-600 text-sm lg:text-[14px] leading-relaxed">
                            Discovered the art of capturing moments and telling stories through lens. From street photography 
                            to architectural compositions, each frame is a new perspective on the world around us.
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
                            <Badge variant="secondary" className="w-fit mb-2 sm:mb-0">Ongoing</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Get in touch */}
                  <div className="relative flex items-start">
                    <div className="absolute left-[-71px] flex items-center gap-3">
                      <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                        Connect
                      </div>
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="ml-16 sm:ml-20">
                      <div>
                        <div className="p-4 lg:p-6">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                            <Link className="flex items-center gap-2 hover:text-purple-600 transition-colors" href="/contact">
                              Get in touch to know more <ArrowRight className="w-4 h-4" />
                            </Link>
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
                            <Badge variant="outline" className="w-fit mb-2 sm:mb-0 border-gradient-to-r from-purple-600 to-pink-600 text-purple-600">Let's Connect</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* CTA Section */}
      {/* <section className="py-16 bg-black text-white">
        <div className="mx-4 sm:mx-8 lg:mx-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-noticia">Let's Create Something Together</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Whether you have a project in mind, want to collaborate, or just want to chat about technology and
              photography, I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                <Link href="/gallery">View My Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  )
}
