"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Globe, Moon, Sun, Menu, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, real-time inventory management, and comprehensive admin dashboard with analytics.",
      image: "/images/ecommerce-platform.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express"],
      githubUrl: "https://github.com/yourusername/ecommerce-platform",
      liveUrl: "https://your-ecommerce-demo.vercel.app",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application built with Next.js and PostgreSQL. Real-time updates with Socket.io, drag-and-drop functionality, team collaboration features, and advanced project tracking.",
      image: "/images/task-management.png",
      technologies: ["Next.js", "PostgreSQL", "Socket.io", "Tailwind CSS", "Prisma", "TypeScript"],
      githubUrl: "https://github.com/yourusername/task-manager",
      liveUrl: "https://your-taskmanager-demo.vercel.app",
    },
    {
      title: "Weather Dashboard",
      description:
        "A responsive weather dashboard with location-based forecasts, interactive charts, and weather alerts. Built with React and integrated with multiple weather APIs for accurate real-time data visualization.",
      image: "/images/weather-dashboard.png",
      technologies: ["React", "Chart.js", "Weather API", "Geolocation", "Material-UI", "PWA"],
      githubUrl: "https://github.com/yourusername/weather-dashboard",
      liveUrl: "https://your-weather-demo.vercel.app",
    },
  ]

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Theme toggle function
  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Apply theme to document
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [isDark])

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme === "dark") {
        setIsDark(true)
      } else if (savedTheme === "light") {
        setIsDark(false)
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        setIsDark(prefersDark)
      }
    }
  }, [])

  // Save theme to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", isDark ? "dark" : "light")
    }
  }, [isDark])

  // Intersection Observer for animations
  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set([...prev, entry.target.id]))
            }
          })
        },
        { threshold: 0.1 },
      )

      const sections = document.querySelectorAll("section[id]")
      sections.forEach((section) => observer.observe(section))

      return () => {
        sections.forEach((section) => observer.unobserve(section))
      }
    }
  }, [isLoading])

  // Smooth scrolling function
  const scrollToSection = (sectionId: string) => {
    if (typeof document !== "undefined") {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
        setIsMobileMenuOpen(false)
      }
    }
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin absolute"></div>
          </div>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300 animate-pulse text-center">
            Loading Portfolio...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <button onClick={() => scrollToSection("about")} className="flex items-center space-x-2 cursor-pointer">
            <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">Portfolio</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-8 text-sm font-medium">
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
            </nav>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-gray-700" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-gray-700" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Centered */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-4 py-6 flex flex-col items-center space-y-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-center px-6 py-3 text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors w-full max-w-xs"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-center px-6 py-3 text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors w-full max-w-xs"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-center px-6 py-3 text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors w-full max-w-xs"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="about"
        className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center transition-all duration-1000 ${
          visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Shaheer Hassan
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300">Full-Stack Developer</p>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              I create modern web applications with clean code and intuitive user experiences. Passionate about building
              scalable solutions using the latest technologies and best practices.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 sm:px-4 py-2 transition-colors duration-300">
              <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Frontend</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 sm:px-4 py-2 transition-colors duration-300">
              <Code className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Backend</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 sm:px-4 py-2 transition-colors duration-300">
              <Database className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Database</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
              <a href="mailto:your.email@example.com">
                <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 transition-all duration-1000 ${
          visibleSections.has("projects") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills in full-stack development and modern web
              technologies.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 group ${
                  visibleSections.has("projects") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index === 0}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=400&width=800"
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-start justify-between gap-2">
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </span>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 h-8 w-8"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 h-8 w-8"
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </a>
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-all duration-1000 ${
          visibleSections.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Let's Work Together
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your
                ideas to life with modern web technologies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <a href="mailto:your.email@example.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 dark:bg-gray-800 py-6 sm:py-8 border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Shaheer Hassan. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700" asChild>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700" asChild>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
